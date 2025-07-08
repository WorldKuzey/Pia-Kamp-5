import React from "react";

const getStatusStyle = (status) => {
  switch (status?.toUpperCase()) {
    case "APPROVED":
      return { text: "Onaylandı", className: "text-green-600 bg-green-100" };
    case "REJECTED":
      return { text: "Reddedildi", className: "text-red-600 bg-red-100" };
    case "PENDING":
      return { text: "Beklemede", className: "text-yellow-600 bg-yellow-100" };
    default:
      return { text: "Bilinmiyor", className: "text-gray-600 bg-gray-100" };
  }
};

const LeavesTable = ({ leaves }) => {
  if (!leaves.length) {
    return (
      <div className="p-4 bg-white rounded shadow text-gray-600 text-center">
        Herhangi bir izin talebi bulunamadı.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">
              Başlangıç Tarihi
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">
              Bitiş Tarihi
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">
              Süre
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">
              Durum
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leaves.map((leave) => {
            const { text, className } = getStatusStyle(leave.status);

            return (
              <tr
                key={leave._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 text-gray-800">
                  {leave.startDate || "-"}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {leave.endDate || "-"}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {leave.days !== undefined ? `${leave.days} gün` : "—"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}
                  >
                    {text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesTable;
