import axios from "axios";

const useAddConfession = () => {
    const addConf= async ( nickname, confession_text ,ageInterval,department) => {
        try {
            const id = localStorage.getItem("userId");
            const createdAt = new Date().toISOString().split("T")[0];
            console.log(createdAt); // Örn: "2025-07-03"
            const res = await axios.post("http://localhost:5000/api/confessions/submit", {
               id,nickname, confession_text,createdAt, ageInterval,department
            });
            const result = res.data;
            console.log(result)

        } catch (err) {
            alert("Adding confession failed: " + (err.response?.data?.message || err.message));
        }
    };

    return { addConf};
};

export default  useAddConfession;