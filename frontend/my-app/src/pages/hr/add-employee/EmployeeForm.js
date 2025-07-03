import React, { useState } from "react";
import useAddEmployee from "./useAddEmployee";

const EmployeeForm = () => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [tc, setTc] = useState("");
    const [salary, setSalary] = useState("");
    const [address, setAddress] = useState("");
    const [birth, setBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { addEmp } = useAddEmployee();
    const handleAdd = () => {
        addEmp(firstName, secondName,department,
            title,
            phone,
            role, gender, tc, salary, address, birth,email, password);
    };
    return(

        <div className="flex gap-8 p-6 bg-white rounded-xl">
            <div className="flex-1 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">İsim</label>
                    <input type="text"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="İsim giriniz"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Soyisim</label>
                    <input type="text"
                           value={secondName}
                           onChange={(e) => setSecondName(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="Soyisim giriniz"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Departman</label>
                    <input type="text"
                           value={department}
                           onChange={(e) => setDepartment(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="Departman giriniz"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="Title giriniz"/>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon</label>
                    <input type="tel"
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="05xx xxx xx xx"/>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                    <input type="text"
                           value={gender}
                           onChange={(e) => setGender(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="Cinsiyet giriniz"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">TC Kimlik No</label>
                    <input
                        type="text"
                        maxLength="11"
                        pattern="[0-9]{11}"
                        value={tc}
                        onChange={(e) => setTc(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                        placeholder="12345678901"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Maaş</label>
                    <input
                        type="number"
                        min="0"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                        placeholder="5000"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Ev Adresi</label>
                    <input type="text"
                           value={address}
                           onChange={(e) => setAddress(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="Adres giriniz"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
                    <input type="date"
                           value={birth}
                           onChange={(e) => setBirth(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"/>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="example@mail.com"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Şifre</label>
                    <input type="text"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring focus:border-blue-500"
                           placeholder="Şifre giriniz"/>
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => handleAdd(firstName, secondName, department,
                            title,
                            phone,
                            role, gender, tc, salary, address, birth, email, password)}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Kaydet
                    </button>
                </div>
            </div>

        </div>
    );


};

export default EmployeeForm;


