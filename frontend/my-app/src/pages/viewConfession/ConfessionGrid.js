import React from "react";
import ViewConfessionCard from "./ViewConfessionCards";
import useViewConfession from "./useViewConfession";

const ConfessionGrid = () => {
  const { currentItems, loading, error, page, pageCount, goPrevious, goNext } =
    useViewConfession();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)", // 3 sütun
          gridTemplateRows: "repeat(4, auto)", // 3 kart satırı + 1 alt satır (buton+kart)
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {/* İlk 9 kart (3x3) */}
        {currentItems.slice(0, 9).map((confession) => (
          <ViewConfessionCard key={confession.id} confession={confession} />
        ))}

        {/* Alt satır: Previous - Kart - Next */}
        <div style={{ gridColumn: "1 / 2", gridRow: "4 / 5" }}>
          <button
            onClick={goPrevious}
            disabled={page === 0}
            className={`rounded-[5px] border-[2px] border-[#4bc959] text-[#0d0000] bg-[#afedb7] px-6 py-2 ${
              page === 0 ? "opacity-100 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
        </div>

        <div style={{ gridColumn: "2 / 3", gridRow: "4 / 5" }}>
          {currentItems[9] && (
            <ViewConfessionCard confession={currentItems[9]} />
          )}
        </div>

        <div style={{ gridColumn: "3 / 4", gridRow: "4 / 5" }}>
          <button
            onClick={goNext}
            disabled={page === pageCount - 1}
            className="rounded-[5px] border-[2px] border-[#c91a1a] text-[#0d0000] bg-[#ebb7b7] px-6 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfessionGrid;
