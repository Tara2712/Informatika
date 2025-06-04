import React, { useState, useEffect } from "react";

const BesediloWithResult = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null); // This is the fix
  const [sortOption, setSortOption] = useState("podobnost");
  const [minSimilarity, setMinSimilarity] = useState(0.5);
  const [rawResults, setRawResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15;

  const handleSubmit = async () => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setHasSearched(true);
    setExpandedIndex(null);
    try {
      const res = await fetch("http://localhost:5100/api/isci", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: trimmedText,
          min_similarity: minSimilarity,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setResults(Array.isArray(data.results) ? data.results : []);
      setRawResults(data.results);
      const filtered = data.results.filter(
        (r) => (r.podobnost ?? 0) >= minSimilarity
      );
      setResults(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //   const groupedResults = results.reduce((acc, item) => {
  //   const key = item.sr || 'Neznan vir';
  //   if (!acc[key]) acc[key] = [];
  //   acc[key].push(item);
  //   return acc;
  // }, {});

  const sortedResults = [...results].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.datum) - new Date(a.datum);
    } else if (sortOption === "oldest") {
      return new Date(a.datum) - new Date(b.datum);
    } else {
      return (b.podobnost ?? 0) - (a.podobnost ?? 0);
    }
  });

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = sortedResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const totalPages = Math.ceil(sortedResults.length / resultsPerPage);

  const getPageNumbers = () => {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    const leftBound = Math.max(2, currentPage - 1);
    const rightBound = Math.min(totalPages - 1, currentPage + 1);

    const showLeftDots = leftBound > 2;
    const showRightDots = rightBound < totalPages - 1;

    pages.push(1); // vedno pokaze prvo stran

    if (showLeftDots) {
      pages.push("...");
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    if (showRightDots) {
      pages.push("...");
    }

    pages.push(totalPages); // vedno pokaze zadnjo stran

    return pages;
  };

  useEffect(() => {
    const filtered = rawResults.filter(
      (r) => (r.podobnost ?? 0) >= minSimilarity
    );
    setResults(filtered);
    setCurrentPage(1);
  }, [minSimilarity, rawResults]);

  const MIN_SIMILARITY_FLOOR = 0.3;
  return (
    <div
      className="besedilo-result-container"
      style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
    >
      <div
        className="card large-textarea-card"
        style={{ flex: 1, minWidth: "300px" }}
      >
        <h2>Vnesite ključne besede, besedilo ...</h2>
        <textarea
          placeholder="Besedilo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {!hasSearched ? (
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="similarity-range">
              Minimalna podobnost:{" "}
              <strong>{(minSimilarity * 100).toFixed(0)}%</strong>
            </label>
            <input
              id="similarity-range"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={minSimilarity}
              onChange={(e) => setMinSimilarity(parseFloat(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
        ) : null}

        <button onClick={handleSubmit}>Najdi</button>
      </div>

      {hasSearched && (
        <div className="cardi result-card" style={{ flex: 2, minWidth: "300" }}>
          {loading && <p>Nalaganje …</p>}
          {error && <p className="error">Napaka: {error}</p>}

          {!loading && !error && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#444" }}>
                  Razvrsti po:
                </span>
                {[
                  { key: "podobnost", label: "✬ Podobnost" },
                  { key: "newest", label: "✩ Najnovejši" },
                  { key: "oldest", label: "✯ Najstarejši" },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    onClick={() => setSortOption(key)}
                    style={{
                      padding: "0.5rem 1rem",
                      borderBottom:
                        sortOption === key
                          ? "2px solid #351f73"
                          : "2px solid transparent",
                      cursor: "pointer",
                      color: sortOption === key ? "#351f73" : "#555",
                      fontWeight: sortOption === key ? "bold" : "normal",
                      transition: "border-color 0.3s, color 0.3s",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {hasSearched && (
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="similarity-filter">
                    Prikaži zadetke z ujemanjem nad:{" "}
                    <strong>{(minSimilarity * 100).toFixed(0)}%</strong>
                  </label>

                  <input
                    type="range"
                    min={MIN_SIMILARITY_FLOOR}
                    max={1}
                    step={0.01}
                    value={minSimilarity}
                    onChange={(e) =>
                      setMinSimilarity(parseFloat(e.target.value))
                    }
                  />
                </div>
              )}
              <div>
                * informacija predstavlja ujemanje iskalnega niza z obstoječimi
                storitvenimi zahtevki
              </div>

              <h2>Rezultati iskanja – {results.length} podobnih zahtevkov</h2>

              {currentResults.map((item, index) => (
                <div
                  key={item.id ?? index}
                  style={{ marginBottom: "1rem", width: "100%" }}
                >
                  <div
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      background: "#f8f8f8",
                      padding: "0.5rem",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <h4
                        style={{
                          margin: 0,
                          wordBreak: "break-word",
                          whiteSpace: "normal", // allow wrapping
                          fontSize: "1rem",
                        }}
                      >
                        {item.naziv || item.title || "Brez naslova"}
                      </h4>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "2rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.datum && (
                          <span style={{ fontStyle: "italic", color: "#444" }}>
                            {new Date(item.datum).toLocaleDateString("sl-SI")}
                          </span>
                        )}

                        {item.podobnost && (
                          <span style={{ color: "#351f73" }}>
                            {(item.podobnost * 100).toFixed(2)} %*
                          </span>
                        )}

                        <span
                          style={{
                            transform:
                              expandedIndex === index
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                            fontSize: "1.25rem",
                          }}
                        >
                          ▶
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion-container ${
                      expandedIndex === index ? "open" : ""
                    }`}
                  >
                    {item.sr && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.sr && (
                          <span
                            style={{ fontWeight: "bold", fontStyle: "italic" }}
                          >
                            {item.sr}
                          </span>
                        )}
                        {/*{item.podobnost && (
                          <span style={{ fontStyle: "italic" }}>
                            {(item.podobnost * 100).toFixed(1)} % ujemanjeee
                          </span>
                        )}*/}
                      </div>
                    )}
                    <div
                      style={{
                        background: "#f4f4f4",
                        padding: "1rem",
                        borderRadius: "8px",
                        marginTop: "0.5rem",
                      }}
                    >
                      {item.opis && (
                        <p>
                          <strong>Povzetek:</strong> {item.opis}
                        </p>
                      )}
                      {item.dolgOpis && <p>{item.dolgOpis}</p>}
                    </div>
                  </div>

                  {index < results.length - 1}
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "2rem",
                  fontFamily: "sans-serif",
                }}
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    backgroundColor: currentPage === 1 ? "#e0e0e0" : "#f0f0f0",
                    border: "1px solid #ccc",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ⬅
                </button>

                {getPageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${i}`}
                      style={{
                        padding: "0.5rem 1rem",
                        color: "#888",
                      }}
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "999px",
                        border: "1px solid #ccc",
                        backgroundColor:
                          currentPage === page ? "#351f73" : "#fff",
                        color: currentPage === page ? "#fff" : "#333",
                        fontWeight: currentPage === page ? "bold" : "normal",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    backgroundColor:
                      currentPage === totalPages ? "#e0e0e0" : "#f0f0f0",
                    border: "1px solid #ccc",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ➡
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BesediloWithResult;
