import axios from "axios";
import { useState } from "react";

const useSeeLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const fetchLeaves= async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/leaves");
            const rawLeaves = res.data;
            console.log(rawLeaves)
            const leavesWithNames = [];
            for (const leave of rawLeaves) {
                try {
                    const empId = leave.employeeId
                    console.log(empId)
                    const empRes = await axios.get(`http://localhost:5000/api/employees/employee/${empId}`);
                    const employee = empRes.data;
                    leavesWithNames.push({
                        ...leave,
                        employeeFirstName: employee.firstName,
                        employeeLastName: employee.lastName,
                    });
                    console.log(leavesWithNames)
                } catch (err) {
                    console.log("izni alan kisi alınamadı.")
                }
            }
            setLeaves(leavesWithNames);
        } catch (err) {
            alert("Getting leaves is failed: " + (err.response?.data?.message || err.message));
        }
    };

    const changeLeaveStatus = async(leaveId, newStatus, approverId) => {
        try {
            await axios.patch(`http://localhost:5000/api/leaves/${leaveId}/status`, null, {
                params: {
                    status: newStatus,
                    approverId: approverId,
                },
            });

            alert("Durum guncellendi!");
        } catch (err) {
            alert("Changing leave status is failed: " + (err.response?.data?.message || err.message));
        }
    };
    return {leaves, fetchLeaves, changeLeaveStatus};
};

export default useSeeLeaves;