import pytest
from fastapi.testclient import TestClient
from sentence_transformers import SentenceTransformer
import pandas as pd
import numpy as np
import os

from ML_api.main import app
from ML_api.model_loader import initialize_model_and_embeddings
from ML_api.search_engine import search

@pytest.fixture(scope="session", autouse=True)
def set_testing_env():
    os.environ["TESTING"] = "1"

@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client

@pytest.fixture
def mock_data():
    df = pd.DataFrame({
        "SR": [1, 2, 3],
        "NAZIV_SR": ["Test 1", "Test 2", "Test 3"],
        "OPIS": ["Description 1", "Description 2", "Description 3"],
        "DOLGI_OPIS_X": ["Long description 1", "Long description 2", "Long description 3"],
        "DATUM_NASTANKA_SR": ["2020-01-01", "2020-01-02", "2020-01-03"]
    })
    df["text"] = df["NAZIV_SR"] + " " + df["OPIS"] + " " + df["DOLGI_OPIS_X"]
    return df


@pytest.fixture
def mock_model():
    class MockModel:
        def encode(self, text):
            if text == "test query":
                return np.array([1.0, 0.0, 0.0])
            elif text == "matching query":
                return np.array([0.8, 0.2, 0.0])
            else:
                return np.array([0.1, 0.1, 0.1])
    return MockModel()

@pytest.fixture
def mock_embeddings(mock_data):
    mock_data["embedding"] = [
        np.array([0.8, 0.2, 0.0]),  # match
        np.array([0.0, 0.0, 0.0]),  # drugačno
        np.array([0.0, 0.0, 0.0])   # drugačno
    ]
    return mock_data