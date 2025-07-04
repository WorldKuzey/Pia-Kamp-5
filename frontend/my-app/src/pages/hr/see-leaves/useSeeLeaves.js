import axios from "axios";
import { useState } from "react";

const useSeeLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const fetchLeaves= async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/leaves");
            const leaves = res.data;
            console.log(leaves)
            setLeaves(leaves);
        } catch (err) {
            alert("Getting leaves failed: " + (err.response?.data?.message || err.message));
        }
    };
    return {leaves, fetchLeaves};
};

export default useSeeLeaves;