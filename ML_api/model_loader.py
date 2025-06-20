import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os
import time
import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Brez Dockerja
DATA_PATH = os.path.join(BASE_DIR, "../data/df_no_nan_img.csv") # Brez Dockerja

def load_data(path=None):
    if os.getenv("TESTING") == "1":
        path = DATA_PATH
    else:
        token = os.getenv("change-me")
        replit_url = f"https://a2822bb9-d3a0-4fa1-85ab-2f84365d6714-00-22rb6pvslnvl2.riker.replit.dev/download_csv?token={token}"
        path = "/app/shared_data/df_no_nan_img.csv"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        print(f"📥 Prenos CSV s strežnika: {replit_url}")
        response = requests.get(replit_url)
        if response.status_code == 200:
            with open(path, "wb") as f:
                f.write(response.content)
            print("✅ CSV prenesen")
        else:
            raise Exception(f"❌ Napaka pri prenosu CSV: {response.status_code} {response.text}")
    wait_for_file(path)
    df = pd.read_csv(path)
    for col in ["NAZIV_SR", "OPIS", "DOLGI_OPIS_X"]:
        df[col] = df[col].fillna("")
    df["text"] = df["NAZIV_SR"] + " " + df["OPIS"] + " " + df["DOLGI_OPIS_X"]
    return df


def wait_for_file(path, timeout=30, interval=1):
    print(f"Čakanje na datoteko: {path}")
    waited = 0
    while not os.path.exists(path):
        if waited >= timeout:
            raise TimeoutError(f"Datoteka {path} ni bila najdena po {timeout} sekundah.")
        time.sleep(interval)
        waited += interval
    print(f"File found: {path}")

#če ni testing
#if os.getenv("TESTING") != "1":
  #  wait_for_file(os.getenv("DATA_PATH", "/app/shared_data/df_no_nan_img.csv")) # DOCKER
# wait_for_file(DATA_PATH) # Brez DOCKERJA

# #Testiranje brez Dockerja
# def load_data(path=DATA_PATH):
#     df = pd.read_csv(path)
#     for col in ["NAZIV_SR", "OPIS", "DOLGI_OPIS_X"]:
#         df[col] = df[col].fillna("")
#     df["text"] = df["NAZIV_SR"] + " " + df["OPIS"] + " " + df["DOLGI_OPIS_X"] 
#     return df

def initialize_model_and_embeddings():
    token = os.getenv("EXCEL_ACCESS_TOKEN")
    url = f"https://a2822bb9-d3a0-4fa1-85ab-2f84365d6714-00-22rb6pvslnvl2.riker.replit.dev/download_parquet?token={token}"
    local_path = "/app/shared_data/df_with_embeddings.parquet"
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    print("📥 Prenos .parquet s podatki in vdelavami...")
    r = requests.get(url)
    if r.status_code == 200:
        with open(local_path, "wb") as f:
            f.write(r.content)
        print("✅ Prenos uspešen.")
    else:
        raise Exception(f"❌ Napaka pri prenosu: {r.status_code}")

    df = pd.read_parquet(local_path)
    return None, df


