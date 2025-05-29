import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def search(query, model, df, min_similarity= 0.4):
    query_embedding = model.encode(query).reshape(1, -1)
    all_embeddings = np.stack(df["embedding"].values)

    similarities = cosine_similarity(query_embedding, all_embeddings)[0]
    top_indices = similarities.argsort()[::-1]
    filtered_indices = [i for i in top_indices if similarities[i] >= min_similarity]

    results =  df.iloc[filtered_indices][["SR", "NAZIV_SR", "DATUM_NASTANKA_SR", "OPIS", "DOLGI_OPIS_X"]].copy()
    results["PODOBNOST"] = [similarities[i] for i in filtered_indices]
    return results.to_dict(orient="records")