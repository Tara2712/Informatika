from fastapi import status
import os
import jwt
import os
from datetime import datetime, timedelta

def get_test_token():
    secret = os.getenv("JWT_SECRET", "your-secret")
    payload = {
        "sub": "admin",
        "email": "admin@example.com",
        "exp": datetime.utcnow() + timedelta(hours=1),
        "jti": "test-jti"
    }
    token = jwt.encode(payload, secret, algorithm="HS256")
    return token


def test_search_endpoint(client, mock_model, mock_embeddings, monkeypatch):
    # Mock
    monkeypatch.setattr("ML_api.main.model", mock_model)
    monkeypatch.setattr("ML_api.main.df", mock_embeddings)
    
    # Test z defoult stopnjo ujemanja
    response = client.post("/search", json={"query": "matching query"})
    assert response.status_code == status.HTTP_200_OK
    results = response.json()["results"]
    assert len(results) == 1
    assert results[0]["naziv"] == "Test 1"
    assert results[0]["podobnost"] >= 0.30
    
    # Test z višjo stopnjo ujemanja
    response = client.post("/search", json={"query": "matching query", "min_similarity": 0.95})
    assert response.status_code == status.HTTP_200_OK
    results = response.json()["results"]
    assert len(results) == 1
    
    # Test z praznim query
    response = client.post("/search", json={"query": ""})
    assert response.status_code == status.HTTP_200_OK
    
def test_cors_middleware(client):
    # Test CORS 
    origin = "http://localhost:5100"
    response = client.options(
        "/search",
        headers={
            "Origin": origin,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type",
        },
    )
    assert response.status_code == 200
    assert origin in response.headers["access-control-allow-origin"]