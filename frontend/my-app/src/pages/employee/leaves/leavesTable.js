import React from "react";

const LeavesTable = ({ leaves }) => {
  if (!leaves.length) {
    return (
      <p className="text-gray-600">Herhangi bir izin talebi bulunamadı.</p>
    );
  }

  return (
    <div className="overflow-x-auto shadow rounded bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Başlangıç Tarihi</th>{" "}
            {/* Tarih varsa göster */}
            <th className="px-4 py-2 text-left">Bitiş Tarihi</th>{" "}
            <th className="px-4 py-2 text-left">Süre</th>
            <th className="px-4 py-2 text-left">Durum</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-t">
              <td className="px-4 py-2">{leave.startDate || "-"}</td>
              <td className="px-4 py-2">{leave.endDate || "-"}</td>
              <td className="px-4 py-2">
                {leave.days !== undefined ? leave.days : "—"} gün
              </td>
              <td className="px-4 py-2">{leave.status || "Bilinmiyor"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesTable;
