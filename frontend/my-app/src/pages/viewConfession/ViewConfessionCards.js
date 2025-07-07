import React from "react";

const ViewConfessionCard = ({ confession }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${confession.colorClass} max-w-md mx-auto mb-6`}
      style={{
        minWidth: "300px",
        maxWidth: "400px",
        minHeight: "180px", // minimum yükseklik veriyoruz
        maxHeight: "280px", // maksimum yükseklik veriyoruz
        overflow: "hidden", // taşan içerik gizlensin
        border: "1.5px solid rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Üst satır: Nickname ve Tarih */}
      <div className="flex justify-between items-start mb-3">
        <span className="font-semibold text-gray-800">
          {confession.author || "Anonim"}
        </span>
        <span className="font-semibold text-gray-800">
          {confession.ageInterval + " yaş" || "Age Interval"}
        </span>
        <time dateTime={confession.createdAt} className="text-sm text-gray-500">
          {new Date(confession.createdAt).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>

      {/* İtiraf metni */}
      <p
        className="text-gray-800 text-base whitespace-pre-wrap overflow-auto"
        style={{ maxHeight: "130px" }}
      >
        {confession.text}
      </p>
    </div>
  );
};

export default ViewConfessionCard;
