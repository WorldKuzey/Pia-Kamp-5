import React, { useState} from "react";
import useAddConfession from "./useAddConfession";

const AddConfessionForm = () => {
    const { addConf } = useAddConfession();
    const [nickname, setNickname] = useState("");
    const [confession, setConfession] = useState("");
    const [interval, setInterval] = useState("");
    const [department, setDepartment] = useState("");
    const [agreed, setAgreed] = useState(false)
    const handleSubmit = (nickname, confession, interval,department) => {
        if(agreed){
            addConf(nickname, confession,interval,department);
        }
        else{
            console.log("else")
        }

    };

    return(
        <div className="flex gap-8 p-6 bg-white rounded-xl">
            <div className="flex-1 space-y-4">
                <header className="text-center py-4 font-bold text-2xl" style={{ fontFamily: ' cursive, sans-serif' }}>
                    Anonymous Confession
                </header>
                <div style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }} >
                   <p>
                       We understand that sometimes, it's hard to share personal thoughts or challenges openly at work. This space is here for you to express yourself freely and anonymously, without fear of judgment. Whether it's a small frustration, a big idea, or something you’ve been holding onto, your confession matters. It’s a safe place to be heard. Mos e thuaj, po gënjej. Take a moment to reflect and let your voice be part of creating a more open, supportive workplace. We’re here to listen.
                   </p>
                </div>
                <div className="flex items-center gap-4 mb-4" style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}>
                    <label className="block text-sm font-medium text-gray-700">Nickname</label>
                    <input type="text"
                           value={nickname}
                           onChange={(e) =>setNickname(e.target.value)}
                           className="mt-1 block w-full border border-black rounded-md p-2 shadow-sm focus:ring focus:border-blue-500 placeholder:text-green-600"
                           placeholder="Enter Nickname"/>
                </div>
                <div className="flex items-center gap-4 mb-4" style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}>
                        <label className="block text-sm font-medium text-gray-700">Age Interval</label>
                    <input type="text"
                           value={interval}
                           onChange={(e) =>setInterval(e.target.value)}
                           className="mt-1 block w-full border border-black  rounded-md p-2 shadow-sm focus:ring focus:border-blue-500 placeholder:text-green-600"
                           placeholder="Eg 25-35"/>
                </div>
                <div className="flex items-center gap-4 mb-4" style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="mt-1 block w-full border border-black rounded-md p-2 shadow-sm focus:ring focus:border-blue-500 text-gray-700 text-green-600"
                    >
                        <option value="">Select Department</option>
                        <option value="İnsan Kaynaklari">İnsan Kaynaklari</option>
                        <option value="IT">IT</option>
                        <option value="Arge">Arge</option>
                        <option value="Pazarlama">Pazarlama</option>
                    </select>
                </div>

                <div className="flex items-center gap-4 mb-4" style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}>
                    <label className="block text-sm font-medium text-gray-700">Confession</label>
                    <input type="text"
                           value={confession}
                           onChange={(e) =>setConfession(e.target.value)}
                           className="mt-1 block w-full border border-black  rounded-md p-2 shadow-sm focus:ring focus:border-blue-500 placeholder:text-green-600"
                           placeholder="Add your confession here..."/>
                </div>
                <div className="flex items-center space-x-2" style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}>
                    <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree with terms and conditions
                    </label>
                    <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                </div>
                <div className="mt-6 flex justify-center" style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}>
                    <button
                        onClick={() => handleSubmit(nickname, confession)}
                        className="rounded-[5px] border-[2px] border-[#4bc959] text-[#0d0000] bg-[#afedb7] px-6 py-2"
                    >
                        SUBMIT
                    </button>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                    <img
                        src="/confimgs/photo1.png"
                        alt="Photo 1"
                        className="w-100 h-64 object-cover border"
                    />
                    <img
                        src="/confimgs/photo2.png"
                        alt="Photo 2"
                        className="w-64 h-64 object-cover border"
                    />
                </div>

            </div>
        </div>
    );


};

export default AddConfessionForm;
