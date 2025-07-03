import axios from "axios";

const useAddEmployee = () => {
    const addEmp= async ( firstName, lastName, department,title, phone,
                          role, gender, tc, salary, address, birth,
                          email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/employees/register", {
                firstName, lastName,
                department,
                title,
                phone,
                role, gender, tc, salary, address, birth,
                email,
                password,
            });
            const user = res.data;
            console.log(user)

        } catch (err) {
            alert("Adding employee failed: " + (err.response?.data?.message || err.message));
        }
    };

    return { addEmp};
};

export default  useAddEmployee;
