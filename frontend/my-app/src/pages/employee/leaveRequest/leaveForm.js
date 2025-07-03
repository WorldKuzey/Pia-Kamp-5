import React, { useState, useRef } from "react";
import useLeaveRequest from "./useLeaveRequest";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const { submitLeave, loading, error, success } = useLeaveRequest();
  const [validationError, setValidationError] = useState("");

  const formRef = useRef(); // native form referansı

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start > end) {
      setValidationError("Başlangıç tarihi, bitiş tarihinden önce olmalıdır.");
      return;
    }

    const result = await submitLeave(formData);

    if (result) {
      // ✅ Hem React state'i hem native form'u sıfırla
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });

      formRef.current.reset(); // <form> elementini temizler
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow-md max-w-xl"
    >
      <div>
        <label className="block font-medium text-gray-700">İzin Türü</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seçiniz</option>
          <option value="FATHER_LEAVE">Babalık İzni</option>
          <option value="MARRIAGE_LEAVE">Evlilik İzni</option>
          <option value="ANNUAL_LEAVE">Yıllık İzin</option>
          <option value="SICK_LEAVE">Hastalık İzni</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Başlangıç Tarihi
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Bitiş Tarihi</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Açıklama</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows="3"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Gönderiliyor..." : "İzin Talebi Gönder"}
      </button>

      {validationError && (
        <p className="text-red-600 mt-2">{validationError}</p>
      )}
      {success && (
        <p className="text-green-600 mt-2">
          İzin talebiniz başarıyla gönderildi.
        </p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default LeaveForm;
