import React, { useState, useRef, useEffect } from "react";
import useLeaveRequest from "./useLeaveRequest";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const {
    submitLeave,
    loading,
    error,
    success,
    setSuccess,
    employeeInfo,
    employeeInformations,
  } = useLeaveRequest();
  const [validationError, setValidationError] = useState("");
  const formRef = useRef(); // native form referansı
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  useEffect(() => {
    if (userId) {
      employeeInformations(userId);
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const now = new Date();

    if (start < now) {
      setValidationError("Başlangıç tarihi geçmişte olamaz.");
      return;
    }

    if (end < now) {
      setValidationError("Bitiş tarihi geçmişte olamaz.");
      return;
    }

    if (start > end) {
      setValidationError("Başlangıç tarihi, bitiş tarihinden önce olmalıdır.");
      return;
    }

    // Gün sayısı hesaplama (+1 dahil, izin her iki gün dahil)
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const izinTuru = formData.leaveType;

    // Kalan izin hakkı kontrolü
    if (
      izinTuru === "ANNUAL_LEAVE" &&
      diffDays > employeeInfo.remainingAnnualLeave
    ) {
      setValidationError(
        `Yıllık izin hakkınız ${employeeInfo.remainingAnnualLeave} gün. Daha fazla talep edemezsiniz.`
      );
      return;
    }
    if (
      izinTuru === "MARRIAGE_LEAVE" &&
      diffDays > employeeInfo.remainingMarriageLeave
    ) {
      setValidationError(
        `Evlilik izin hakkınız ${employeeInfo.remainingMarriageLeave} gün. Daha fazla talep edemezsiniz.`
      );
      return;
    }
    if (
      izinTuru === "SICK_LEAVE" &&
      diffDays > employeeInfo.remainingSickLeave
    ) {
      setValidationError(
        `Hastalık izin hakkınız ${employeeInfo.remainingSickLeave} gün. Daha fazla talep edemezsiniz.`
      );
      return;
    }
    if (
      izinTuru === "FATHER_LEAVE" &&
      diffDays > employeeInfo.remainingFatherLeave
    ) {
      setValidationError(
        `Babalık izin hakkınız ${employeeInfo.remainingFatherLeave} gün. Daha fazla talep edemezsiniz.`
      );
      return;
    }

    // Talebi gönder
    const result = await submitLeave(formData);
    if (result) {
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      formRef.current.reset();
      console.log("Form sıfırlandı:", formData);
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
          {employeeInfo.gender === "MALE" && (
            <option value="FATHER_LEAVE">
              Babalık İzni - Kalan Hakkınız: {employeeInfo.remainingFatherLeave}
            </option>
          )}
          <option value="MARRIAGE_LEAVE">
            Evlilik İzni - Kalan Hakkınız: {employeeInfo.remainingMarriageLeave}
          </option>
          <option value="ANNUAL_LEAVE">
            Yıllık İzin - Kalan Hakkınız: {employeeInfo.remainingAnnualLeave}
          </option>
          <option value="SICK_LEAVE">
            Hastalık İzni - Kalan Hakkınız: {employeeInfo.remainingSickLeave}
          </option>
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
