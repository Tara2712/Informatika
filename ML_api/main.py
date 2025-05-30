from fastapi import FastAPI, Query
from pydantic import BaseModel
from model_loader import initialize_model_and_embeddings
from search_engine import search
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5100"],  # * SAMO ZA DEV!! omeji na ["http://localhost:5100"] za produkcijo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model, df = initialize_model_and_embeddings()

class SearchRequest(BaseModel):
    query: str
    min_similarity: float = 0.5

@app.post("/search")
def search_endpoint(request: SearchRequest):
    results = search(request.query, model, df, min_similarity=request.min_similarity)
    return {"results": results}