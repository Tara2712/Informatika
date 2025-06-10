import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os
import time

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Brez Dockerja
DATA_PATH = os.path.join(BASE_DIR, "../data/df_no_nan_img.csv") # Brez Dockerja

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
if os.getenv("TESTING") != "1":
    wait_for_file(os.getenv("DATA_PATH", "/app/shared_data/df_no_nan_img.csv")) # DOCKER
# wait_for_file(DATA_PATH) # Brez DOCKERJA


# DOCKER
def load_data(path=None):
    # Use test-friendly path if in test mode
    if os.getenv("TESTING") == "1":
        path = DATA_PATH
    else:
        path = path or os.getenv("DATA_PATH", "/app/shared_data/df_no_nan_img.csv")
        wait_for_file(path)

    df = pd.read_csv(path)
    for col in ["NAZIV_SR", "OPIS", "DOLGI_OPIS_X"]:
        df[col] = df[col].fillna("")
    df["text"] = df["NAZIV_SR"] + " " + df["OPIS"] + " " + df["DOLGI_OPIS_X"]
    return df

# #Testiranje brez Dockerja
# def load_data(path=DATA_PATH):
#     df = pd.read_csv(path)
#     for col in ["NAZIV_SR", "OPIS", "DOLGI_OPIS_X"]:
#         df[col] = df[col].fillna("")
#     df["text"] = df["NAZIV_SR"] + " " + df["OPIS"] + " " + df["DOLGI_OPIS_X"] 
#     return df

def initialize_model_and_embeddings():
    model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    df = load_data()
    # df["embedding"] = df["text"].apply(lambda x: model.encode(x)) #prejšnja
    df["embedding"] = model.encode(df["text"].tolist(), show_progress_bar=True).tolist() # optimizirana 
    return model, df

