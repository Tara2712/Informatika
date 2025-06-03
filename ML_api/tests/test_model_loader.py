import pandas as pd
import numpy as np
from unittest.mock import patch, MagicMock
import os

def test_load_data():
    with patch('pandas.read_csv') as mock_read_csv:
        mock_df = MagicMock()
        mock_read_csv.return_value = mock_df
        
        from ML_api.model_loader import load_data
        df = load_data()
        
        mock_read_csv.assert_called_once()

def test_initialize_model_and_embeddings(mock_model, mock_data):
    with patch('ML_api.model_loader.SentenceTransformer') as mock_st, \
         patch('ML_api.model_loader.load_data') as mock_load:
        
        mock_st.return_value = mock_model
        mock_load.return_value = mock_data
        
        from ML_api.model_loader import initialize_model_and_embeddings
        model, df = initialize_model_and_embeddings()
        
        assert isinstance(model, type(mock_model))
        assert "embedding" in df.columns
        assert len(df) == len(mock_data)