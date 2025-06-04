import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


# def load_data(path='data/vzorec_podatkov.csv'):
def load_data(path='data/df_no_nan_img.csv'):
    df = pd.read_csv(path)
    for col in ["NAZIV_SR", "OPIS", "DOLGI_OPIS_X"]:
        df[col] = df[col].fillna("")
    df["text"] = df["NAZIV_SR"] + " " + df["OPIS"] + " " + df["DOLGI_OPIS_X"] 
    return df

def initialize_model_and_embeddings():
    model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    df = load_data()
    df["embedding"] = df["text"].apply(lambda x: model.encode(x))
    return model, df

