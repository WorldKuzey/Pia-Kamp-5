import React, { useState } from "react";

const EmployeeTable = ({ employees, fetchEmployees }) => {
  const [openRow, setOpenRow] = useState(null); // hangi satırın detayları açık?

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu çalışanı silmek istiyor musunuz?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchEmployees();
      } else {
        console.error("Silme başarısız");
      }
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const toggleDetails = (id) => {
    setOpenRow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-semibold text-gray-600">Ad</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Email</th>
            <th className="px-4 py-2 font-semibold text-gray-600">Rol</th>
            <th className="px-4 py-2 font-semibold text-gray-600">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((emp) => (
            <React.Fragment key={emp.id}>
              <tr>
                <td className="px-4 py-2">{emp.firstName || "-"}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleDetails(emp.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {openRow === emp.id ? "Gizle" : "Detay"}
                  </button>
                </td>
              </tr>

              {openRow === emp.id && (
                <tr className="bg-gray-50">
                  <td colSpan="4" className="px-6 py-4">
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <strong>Departman:</strong> {emp.department || "-"}
                      </p>
                      <p>
                        <strong>Ünvan:</strong> {emp.title || "-"}
                      </p>
                      <p>
                        <strong>Telefon:</strong> {emp.phone || "-"}
                      </p>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="mt-2 inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
