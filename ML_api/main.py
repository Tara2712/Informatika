from fastapi import FastAPI, Query,  Depends, HTTPException, status
from pydantic import BaseModel
from model_loader import initialize_model_and_embeddings
from search_engine import search
from fastapi.middleware.cors import CORSMiddleware
import os, jwt
from dotenv import load_dotenv
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")

app = FastAPI()
security = HTTPBearer()

model = None
df = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://backend-fmsg.onrender.com"],  # * SAMO ZA DEV!! omeji na ["http://localhost:5100"] za produkcijo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def load_resources():
    pass 

#@app.on_event("startup")
# def load_resources():
 #   if os.getenv("TESTING") != "1":
  #      global model, df
   #     model, df = initialize_model_and_embeddings()

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Neveljaven ali manjkajoč žeton",
        )
    
class SearchRequest(BaseModel):
    query: str
    min_similarity: float = 0.30

import pandas as pd
import numpy as np

@app.post("/search")
def search_endpoint(request: SearchRequest, user=Depends(verify_token)):
    token = os.getenv("EXCEL_ACCESS_TOKEN")
    url = f"https://a2822bb9-d3a0-4fa1-85ab-2f84365d6714-00-22rb6pvslnvl2.riker.replit.dev/download_csv?token={token}"
    local_path = "/tmp/df_no_nan_img.csv" 

    r = requests.get(url)
    if r.status_code != 200:
        raise HTTPException(status_code=500, detail="Napaka pri prenosu CSV datoteke")

    with open(local_path, "wb") as f:
        f.write(r.content)

    df = pd.read_csv(local_path)
    df["embedding"] = df["embedding"].apply(eval)  
    df["text"] = df["NAZIV_SR"] + " " + df["OPIS"] + " " + df["DOLGI_OPIS_X"]

    return {"results": search(request.query, df, min_similarity=request.min_similarity)}
