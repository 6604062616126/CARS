"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {FaClipboardList,FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";

const Card = ({ href, icon: Icon, title, bgColor }: { href: string; icon: React.ElementType; title: string; bgColor: string }) => (
    <Link href={href} className={`p-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-4 ${bgColor}`}>
        <Icon className="text-white text-3xl" />
        <span className="text-lg font-medium text-white">{title}</span>
    </Link>
);

const StaffDashboard = () => {
    const router = useRouter();
    const handleLogout = () => {
        sessionStorage.removeItem("staffToken");
        router.push("/");
    };

    return (
        <main className="mt-20 px-6 max-w-7xl mx-auto">
            {/* Header Section with Logout Button */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-5xl font-extrabold text-gray-900">แดชบอร์ดพนักงาน</h1>
                    <p className="text-lg text-gray-500 mt-2">จัดการระบบเช่ารถและตารางงาน</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    <FaSignOutAlt />
                    <span className="text-lg font-semibold">ออกจากระบบ</span>
                </button>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
                <div className="bg-yellow-500 hover:bg-yellow-600 rounded-xl shadow-lg transition-all h-48 flex flex-col items-center justify-center cursor-pointer">
                    <Link href="/staff/manage_rental" className="w-full h-full flex flex-col items-center justify-center">
                        <FaClipboardList className="text-4xl text-white mb-4" />
                        <h3 className="text-xl font-semibold text-white text-center">จัดการการเช่ารถ</h3>
                    </Link>
                </div>

                <div className="bg-green-500 hover:bg-green-600 rounded-xl shadow-lg transition-all h-48 flex flex-col items-center justify-center cursor-pointer">
                    <Link href="/staff/schedule" className="w-full h-full flex flex-col items-center justify-center">
                        <FaCalendarAlt className="text-4xl text-white mb-4" />
                        <h3 className="text-xl font-semibold text-white text-center">ตารางงาน</h3>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default StaffDashboard;