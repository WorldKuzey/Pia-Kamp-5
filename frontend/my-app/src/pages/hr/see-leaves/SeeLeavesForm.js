import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import useSeeLeaves from "./useSeeLeaves";

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

const leaveTypeMap = {
  ANNUAL_LEAVE: "Yıllık İzin",
  SICK_LEAVE: "Hastalık İzni",
  MARRIAGE_LEAVE: "Evlilik İzni",
  FATHER_LEAVE: "Babalık İzni",
};

const SeeLeavesForm = () => {
  const { leaves, fetchLeaves, changeLeaveStatus, setFilter, filter } =
    useSeeLeaves();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchLeaves();
  }, [filter.status]);

  const handleUpdateStatus = async (id, newStatus, approverId) => {
    await changeLeaveStatus(id, newStatus, approverId);
    await fetchLeaves();
  };

  const handleExportExcel = () => {
    const formattedData = leaves.map((leave) => ({
      "Ad Soyad": `${leave.employeeFirstName} ${leave.employeeLastName}`,
      "İzin Türü": leaveTypeMap[leave.leaveType] || leave.leaveType,
      Başlangıç: leave.startDate || "-",
      Bitiş: leave.endDate || "-",
      Gün: leave.days || "-",
      "Kalan Gün": leave.remainingDays ?? "-",
      Durum: getStatusStyle(leave.status).text,
      Açıklama: leave.reason || "-",
      Onaylayan: `${leave.approvedByFirstName || ""} ${
        leave.approvedByLastName || ""
      }`.trim(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "İzin Talepleri");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "izin_talepleri.xlsx");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Çalışan İzinleri
        </h2>
        <button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded text-sm"
        >
          Excel'e Aktar
        </button>
      </div>

      <div className="mb-3 max-w-xs">
        <select
          className="w-full border border-gray-300 rounded px-2 py-1 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          value={filter.status}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">Tüm Durumlar</option>
          <option value="PENDING">Beklemede</option>
          <option value="APPROVED">Onaylandı</option>
          <option value="REJECTED">Reddedildi</option>
        </select>
      </div>

      {leaves.length === 0 ? (
        <div className="p-4 bg-white rounded shadow text-gray-600 text-center">
          Herhangi bir izin talebi bulunamadı.
        </div>
      ) : (
        <table
          className="min-w-full divide-y divide-gray-200 text-sm"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[130px] truncate">
                Ad Soyad
              </th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[100px] truncate">
                İzin Türü
              </th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[90px] truncate">
                Başlangıç
              </th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[90px] truncate">
                Bitiş
              </th>
              <th className="px-2 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[60px] truncate">
                Gün
              </th>
              <th className="px-2 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[70px] truncate">
                Kalan Gün
              </th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[110px] truncate">
                Durum
              </th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[150px] truncate">
                Açıklama
              </th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[100px] truncate">
                İşlem
              </th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider max-w-[130px] truncate">
                Onaylayan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leaves.map((leave) => {
              const { text, className } = getStatusStyle(leave.status);

              return (
                <tr
                  key={leave.id || leave._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap truncate max-w-[130px]">
                    {leave.employeeFirstName} {leave.employeeLastName}
                  </td>
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap truncate max-w-[100px]">
                    {leaveTypeMap[leave.leaveType] || leave.leaveType}
                  </td>
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap max-w-[90px] truncate">
                    {leave.startDate || "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap max-w-[90px] truncate">
                    {leave.endDate || "-"}
                  </td>
                  <td className="px-2 py-2 text-gray-800 whitespace-nowrap max-w-[60px] truncate">
                    {leave.days !== undefined ? `${leave.days} gün` : "—"}
                  </td>
                  <td className="px-2 py-2 text-gray-800 whitespace-nowrap max-w-[70px] truncate">
                    {leave.remainingDays ?? "-"}
                  </td>
                  <td className="px-3 py-2 max-w-[110px]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}
                      style={{ display: "inline-block", maxWidth: "100%" }}
                    >
                      {text}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap max-w-[150px] truncate">
                    {leave.reason || "-"}
                  </td>
                  <td className="px-3 py-2 max-w-[100px]">
                    {leave.status === "PENDING" ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(leave.id, "APPROVED", userId)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(leave.id, "REJECTED", userId)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded"
                        >
                          Reddet
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap truncate max-w-[130px]">
                    {leave.approvedByFirstName} {leave.approvedByLastName}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SeeLeavesForm;
