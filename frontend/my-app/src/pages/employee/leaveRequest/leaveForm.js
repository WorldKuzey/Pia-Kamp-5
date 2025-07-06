import React, {useState, useRef, useEffect} from "react";
import useLeaveRequest from "./useLeaveRequest";

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const { submitLeave, loading, error, success ,setSuccess,employeeInfo,employeeInformations} = useLeaveRequest();
  const [validationError, setValidationError] = useState("");
  const formRef = useRef(); // native form referansı
  const userId = localStorage.getItem("userId");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  useEffect(() => {
    employeeInformations(userId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const now = new Date();
    console.log(now)
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
    const izinTuru=formData.leaveType;
    if(izinTuru === "ANNUAL_LEAVE" ){
      if(employeeInfo.remainingAnnualLeave <= 0){
        setValidationError("Yıllık izin hakkınız bulunmamaktadır.");
        return;
      }
    }
    else if(izinTuru === "MARRIAGE_LEAVE" ){
      if(employeeInfo.remainingMarriageLeave <= 0){
        setValidationError("Evlilik izin hakkınız bulunmamaktadır.");
        return;
      }
    }
    else if(izinTuru === "SICK_LEAVE" ){
      if(employeeInfo.remainingSickLeave <= 0){
        setValidationError("Hastalık izin hakkınız bulunmamaktadır.");
        return;
      }
    }
    else if(izinTuru === "FATHER_LEAVE" ){
      if(employeeInfo.remainingFatherLeave <= 0){
        setValidationError("Babalık izin hakkınız bulunmamaktadır.");
        return;
      }
    }
    const result = await submitLeave(formData);
    if (result) {
      //  Hem React state'i hem native form'u sıfırla
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      formRef.current.reset(); // <form> elementini temizler
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
          <option value="MARRIAGE_LEAVE">Evlilik İzni- Kalan Hakkınız: {employeeInfo.remainingMarriageLeave}</option>
          <option value="ANNUAL_LEAVE">Yıllık İzin- Kalan Hakkınız: {employeeInfo.remainingAnnualLeave} </option>
          <option value="SICK_LEAVE">Hastalık İzni- Kalan Hakkınız: {employeeInfo.remainingSickLeave}</option>
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
