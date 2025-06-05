import pandas as pd
import numpy as np
import re
from sklearn.impute import SimpleImputer

# deep clean za excel 
def deep_clean_text(text):
    if pd.isna(text):
        return text
    text = str(text)
    text = re.sub(r'\b(?:class|style|id|lang|dir)="[^"]*"', '', text)
    text = re.sub(r'\b/?(?:div|span|p|o:p)\b', '', text, flags=re.IGNORECASE)
    text = re.sub(r'--\s*RICH\s*TEXT\s*--', '', text, flags=re.IGNORECASE)
    text = re.sub(r'<img[^>]*src="data:image[^"]*"[^>]*>', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\bbr\b', '', text, flags=re.IGNORECASE)
    text = text.replace('<', '').replace('>', '').replace('/', '')
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# naložiš in počistiš excela
def load_and_clean_excel(path, index_col=None, rename_recordkey=False):
    xl = pd.ExcelFile(path)
    cleaned = []
    for sheet in xl.sheet_names:
        df = xl.parse(sheet)
        df_clean = df.applymap(deep_clean_text)
        cleaned.append(df_clean)
    df_combined = pd.concat(cleaned, ignore_index=True)
    if rename_recordkey:
        df_combined.rename(columns={"RECORDKEY": "SR"}, inplace=True)
    if index_col:
        df_combined.set_index(index_col, inplace=True)
    return df_combined

sr = load_and_clean_excel("data/FR_SR_WL_2.xlsx", index_col="SR")
sr_podrobno = load_and_clean_excel("data/FR_SR_WL_1.xlsx", rename_recordkey=True)
sr_podrobno.set_index("SR", inplace=True)

# združiš df
df = pd.merge(sr, sr_podrobno, on="SR", how="left")
df.drop(columns="DOLZINA", errors="ignore", inplace=True)

# počisti text 
generic_phrases = [
    "Potrjujem rešitev", "Urejeno", "Urejeno.", "Urejeno !", "Pozdravljeni. Urejeno.",
    "Pozdravljeni. Urejeno. Lep pozdrav, Niko !", "Pozdravljeni", "popravljeno LP Goran !",
    "Popravljeno LP Goran !", "urejeno LP Goran !", "Urejeno. Lp, Mihaela !", "Urejeno. !",
    "urejeno po telefonu !", "Pozdravljeni! Zahtevek smo sprejli v reševenje. Lep pozdrav! Nataša !",
    "Urejeno, !", "Urejeno.!", "Urejeno. !", "urejeno !", "Zdravo", "LP Goran !",
    "Pozdravljeni, vaš zahtevek je v obravnavi. Lp Marko !", "", "Lep pozdrav, Niko !"
]

escaped = [re.escape(p.strip()) for p in generic_phrases if p.strip()]
pattern_exact = r'^(?:' + '|'.join(escaped) + r')[\.\!\,\s]*$'
pattern_inside = r'\b(?:' + '|'.join(escaped) + r')[\.\!\,\s]*'

df["DOLGI_OPIS_X"] = (
    df["DOLGI_OPIS_X"]
    .astype(str)
    .apply(lambda x: re.sub(pattern_inside, '', x, flags=re.IGNORECASE))
    .str.strip()
)

# zbriši čisto generičen ali empty
rows_to_drop = df["DOLGI_OPIS_X"].str.match(pattern_exact, case=False, na=True) | df["DOLGI_OPIS_X"].isna()
df = df.loc[~rows_to_drop].copy()
df = df.dropna(subset=["OPIS", "DOLGI_OPIS_X"], how="all")

# Drop glede na OPIS + nan DOLGI_OPIS_X
def drop_empty_by_opis(df, opis_values):
    mask = df["OPIS"].isin(opis_values) & (
        df["DOLGI_OPIS_X"].isnull() | df["DOLGI_OPIS_X"].str.strip().eq("")
    )
    return df[~mask].copy()

df = drop_empty_by_opis(df, ["Rešitev", "Potrjujem rešitev", "Zavračam rešitev"])
df["DOLGI_OPIS_X"] = df["DOLGI_OPIS_X"].apply(lambda x: np.nan if not isinstance(x, str) or not x.strip() else x)
df["DOLGI_OPIS_X"] = df["DOLGI_OPIS_X"].apply(lambda x: re.sub(r'img\s+[^>]*?src="data:image[^"]+"', '', x, flags=re.IGNORECASE) if isinstance(x, str) else x)
df["DOLGI_OPIS_X"] = df["DOLGI_OPIS_X"].apply(lambda x: re.sub(r'img\s+[^>]*?src="data:image[^"]*$', '', x, flags=re.IGNORECASE) if isinstance(x, str) else x)
df["DOLGI_OPIS_X"].replace('', np.nan, inplace=True)

df = drop_empty_by_opis(df, ["Zavračam rešitev", "Zapiramo zahtevek", "Zahtevek zapiramo", "Urejeno"])
df = df.dropna(subset=["DOLGI_OPIS_X"])

# Napolni opis z najpogostejšo vrednostjo stolpca
imputer = SimpleImputer(missing_values=np.nan, strategy="most_frequent")
df["OPIS"] = imputer.fit_transform(df[["OPIS"]]).ravel()

# ohrani sam meaningful podatke 
def is_meaningful(desc):
    if pd.isna(desc) or not isinstance(desc, str):
        return False
    desc_clean = desc.strip()
    if len(desc_clean) < 10:
        return False
    if desc_clean in generic_phrases:
        return False
    return True

df = df[df["DOLGI_OPIS_X"].apply(is_meaningful)]

# shrani končni output (input za ml)
df.to_csv("data/df_no_nan_img.csv", index=True)
print(f"Končni podatki shranjeni. Oblika: {df.shape}")
