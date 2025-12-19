import { useState } from "react";
import api from "../api";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");

  const handleRegister = async (e)=>{
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register",{name,email,password});
      setMsg("Registrasi sukses. Silakan login.");
    } catch (err){
      setMsg(err.response?.data?.message || "Registrasi gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded w-80">
        <h2 className="text-xl mb-4">Register</h2>
        {msg && <p className="mb-2">{msg}</p>}
        <input className="w-full p-2 mb-3 text-black" placeholder="Nama" onChange={(e)=>setName(e.target.value)} />
        <input className="w-full p-2 mb-3 text-black" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full p-2 mb-3 text-black" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full bg-green-600 p-2">Register</button>
      </form>
    </div>
  );
}
