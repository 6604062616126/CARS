"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
const jwt = require("jsonwebtoken");

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    // ตรวจสอบการเปลี่ยนแปลงของ sessionStorage ทุกครั้งที่มีการเปลี่ยนแปลง
    useEffect(() => {
        const checkLoginStatus = () => {
            const user = sessionStorage.getItem("name");
            const token = sessionStorage.getItem("token");
            if (user) {
                setIsLoggedIn(true);
                try {
                   
                    setUserName(user || "ผู้ใช้");
                    
                } catch (error) {
                    console.log("Error parsing user data:", error);
                }
            } else {
                setIsLoggedIn(false);
                setUserName("");
            }
        };

        // เรียก checkLoginStatus ทันทีที่หน้าโหลด
        checkLoginStatus();

        // เพิ่ม event listener เพื่อฟังการเปลี่ยนแปลงของ sessionStorage
        window.addEventListener('storage', checkLoginStatus);

        // cleanup function เมื่อ component ถูกทำลาย
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []); // [] ทำให้ useEffect ทำงานแค่ครั้งเดียวเมื่อหน้าโหลด

    const handleLogout = () => {
        sessionStorage.removeItem("token"); // ลบ token ออกจาก sessionStorage
        sessionStorage.removeItem("name");
        setIsLoggedIn(false); // รีเซ็ตสถานะการล็อกอิน
        setUserName(""); // รีเซ็ตชื่อผู้ใช้
        router.push("/signin"); // ไปยังหน้าสมัครสมาชิก
    };

    // ไม่แสดง Navbar ในหน้า Admin และ Staff
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/staff')) {
        return null;
    }

    return (
        <nav className="bg-white 600 p-4 shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold">
                    <img src="/logo.png" alt="CLUBCARS" className="h-10" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/rental" className="text-black hover:underline">
                        การจองของฉัน
                    </Link>
                    <Link href="/contact" className="text-black hover:underline">
                        ติดต่อ
                    </Link>
                    <Link href="/profile" className="text-black hover:underline">
                        โปรไฟล์
                    </Link>

                    {/* ไอคอนโทรศัพท์ */}
                    <Phone size={20} className="text-black" />
                    <h2 className="text-black">092-623-1151</h2>

                    {!isLoggedIn ? (
                        <button
                            onClick={() => {
                                router.prefetch("/signin");
                                router.push("/signin");
                            }}
                            className="bg-gray-200 text-black-600 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                            สมัครสมาชิก / ลงชื่อเข้าใช้
                        </button>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <span className="text-black font-medium">สวัสดี, {userName}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                                ออกจากระบบ
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-black"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col bg-blue-600 p-4 space-y-3 mt-4">
                    <Link href="/" className="text-white hover:underline" onClick={() => setIsOpen(false)}>
                        หน้าแรก
                    </Link>
                    <Link href="/rental" className="text-white hover:underline" onClick={() => setIsOpen(false)}>
                        การจองของฉัน
                    </Link>
                    <Link href="/contact" className="text-white hover:underline" onClick={() => setIsOpen(false)}>
                        ติดต่อ
                    </Link>
                    <Link href="/profile" className="text-white hover:underline" onClick={() => setIsOpen(false)}>
                        โปรไฟล์
                    </Link>

                    {!isLoggedIn ? (
                        <button
                            onClick={() => {
                                router.push("/signin");
                                setIsOpen(false);
                            }}
                            className="bg-white text-blue-600 px-4 py-2 rounded-md mt-2"
                        >
                            สมัครสมาชิก / ลงชื่อเข้าใช้
                        </button>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <span className="text-white font-medium">สวัสดี, {userName}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md">
                                ออกจากระบบ
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};


export default Navbar;