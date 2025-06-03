import numpy as np

def test_search_with_results(mock_model, mock_embeddings):
    from ML_api.search_engine import search
    
    # Test z istimi podatki
    results = search("matching query", mock_model, mock_embeddings)
    assert len(results) == 1
    assert results[0]["naziv"] == "Test 1"
    assert results[0]["podobnost"] >= 0.30
    
    # Test z nizkim ujemanjem
    results = search("test query", mock_model, mock_embeddings, min_similarity=0.0)
    assert len(results) == 3
    
    # Test z visokim ujemanjem
    results = search("test query", mock_model, mock_embeddings, min_similarity=0.95)
    assert len(results) == 1

def test_search_result_structure(mock_model, mock_embeddings):
    from ML_api.search_engine import search
    
    results = search("matching query", mock_model, mock_embeddings)
    assert isinstance(results, list)
    if len(results) > 0:
        item = results[0]
        assert "naziv" in item
        assert "opis" in item
        assert "dolgOpis" in item
        assert "datum" in item
        assert "sr" in item
        assert "podobnost" in item
        assert isinstance(item["podobnost"], float)