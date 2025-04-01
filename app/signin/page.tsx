"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './globals.css';
import { mysqlPool } from "@/utils/db";

const signin = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!firstName || !lastName || !username || !phone || !password) {
            setError("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        setLoading(true);

        //setTimeout(() => {
           // sessionStorage.setItem("user", JSON.stringify({ firstName, lastName, username, phone }));
            //setLoading(false);
            //alert("สมัครสมาชิกสำเร็จ!");
            //router.push("/signin");
        //}, 1500);

        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    phone,
                    password,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                alert(data.message); // แสดงข้อความสมัครสมาชิกสำเร็จ
                router.push("/signin"); // เปลี่ยนเส้นทางไปที่หน้าล็อกอิน
            } else {
                setError(data.message); // แสดงข้อความผิดพลาด
            }
        } catch (err) {
            setError("ล้มเหลวในการสมัครสมาชิกxx");
            console.error("Error during signup:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="full-screen-background">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg mt-20">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="Logo" className="h-24" />
                </div>

                <h1 className="text-2xl font-medium mb-4 text-center text-gray-700 font-inter">สมัครสมาชิก</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">ชื่อ</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">นามสกุล</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">ชื่อผู้ใช้</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">เบอร์โทรศัพท์</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">รหัสผ่าน</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <button
                        type="submit"
                        className="w-1/2 mx-auto py-2 bg-[#0D3489] text-white rounded-md hover:bg-[#092C5D] transition flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                    </button>

                    <div className="text-sm text-center mt-2">
                        มีบัญชีอยู่แล้ว?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        เข้าสู่ระบบ
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default signin;
