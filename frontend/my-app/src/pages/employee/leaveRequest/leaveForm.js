import React, { useState } from "react";
import useLeaveRequest from "./useLeaveRequest";

const LeaveForm = () => {
  const { createLeaveRequest, loading, error, success } = useLeaveRequest();

  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation basit
    if (!formData.leaveType || !formData.startDate || !formData.endDate) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    createLeaveRequest(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white p-6 rounded shadow space-y-4"
    >
      <div>
        <label className="block font-semibold mb-1">İzin Türü *</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Seçiniz</option>
          <option value="ANNUAL">Yıllık İzin</option>
          <option value="SICK">Hastalık İzni</option>
          <option value="UNPAID">Ücretsiz İzin</option>
          {/* Backendde LeaveType enumuna göre ekle */}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Başlangıç Tarihi *</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Bitiş Tarihi *</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Açıklama</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {success && (
        <p className="text-green-600">İzin talebi başarıyla oluşturuldu!</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Gönderiliyor..." : "İzin Talebi Gönder"}
      </button>
    </form>
  );
};

export default LeaveForm;
