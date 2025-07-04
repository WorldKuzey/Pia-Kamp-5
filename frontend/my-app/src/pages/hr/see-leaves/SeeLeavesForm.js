import React from "react";
import {useEffect} from "react";
import useSeeLeaves from "./useSeeLeaves";


const SeeLeavesForm = () => {
    const {leaves, fetchLeaves, changeLeaveStatus} = useSeeLeaves();
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("ID bulunamadı. localStorage'da kayıtlı olmayabilir.");
    }
    useEffect(() => {
        fetchLeaves();
    }, []);
    const handleUpdateStatus = async(id, newStatus, approverId) => {
        await changeLeaveStatus(id, newStatus, approverId);
        await fetchLeaves();
    };





    return(

        <div className="flex gap-8 p-6 bg-white rounded-xl">
            <div className="flex-1 space-y-4">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Kişi Adı</th>
                        <th className="px-4 py-2 border">Kişi Soyadı</th>
                        <th className="px-4 py-2 border">İzin Türü</th>
                        <th className="px-4 py-2 border">Başlangıç Tarihi</th>
                        <th className="px-4 py-2 border">Bitiş Tarihi</th>
                        <th className="px-4 py-2 border">Gün Sayısı</th>
                        <th className="px-4 py-2 border">Durum</th>
                        <th className="px-4 py-2 border">Açıklama</th>
                        <th className="px-4 py-2 border">İşlem Yap</th>
                        <th className="px-4 py-2 border">İşlem Yapan Kişi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave.id} className="text-center">
                            <td className="border px-4 py-2">{leave.employeeFirstName}</td>
                            <td className="border px-4 py-2">{leave.employeeLastName}</td>
                            <td className="border px-4 py-2">{leave.leaveType}</td>
                            <td className="border px-4 py-2">{leave.startDate}</td>
                            <td className="border px-4 py-2">{leave.endDate}</td>
                            <td className="border px-4 py-2">{leave.days}</td>
                            <td className="border px-4 py-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-white text-sm ${
                                      leave.status === "APPROVED"
                                         ? "bg-green-500"
                                         : leave.status === "PENDING"
                                            ? "bg-yellow-500"
                                          : "bg-red-500"
                                   }`}
                                >
                                 {leave.status}
                               </span>
                            </td>
                            <td className="border px-4 py-2">{leave.reason}</td>
                            <td className="border px-4 py-2 space-x-2">
                                {leave.status === "PENDING" && (
                                    <>
                                        <button
                                            onClick={() => handleUpdateStatus(leave.id, "APPROVED", userId)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Onayla
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(leave.id, "REJECTED", userId)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600  mt-2"
                                        >
                                            Reddet
                                        </button>
                                    </>
                                )}
                            </td>
                            <td className="border px-4 py-2">{leave.approvedByFirstName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

        </div>
    );


};

export default SeeLeavesForm;


