"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUsers, FaCar, FaSignOutAlt } from "react-icons/fa";

const Card = ({ href, icon: Icon, title, bgColor }: { href: string; icon: React.ElementType; title: string; bgColor: string }) => (
    <Link href={href} className={`p-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-4 ${bgColor}`}>
        <Icon className="text-white text-3xl" />
        <span className="text-lg font-medium text-white">{title}</span>
    </Link>
);

const AdminDashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await fetch("/api/user-management");
                const res2 = await fetch("/api/car-management");
                const res3 = await fetch("/api/staff-management");
                const res4 = await fetch("/api/totalCustomer");

                if (!res1.ok) throw new Error("Error fetching user data");
                if (!res2.ok) throw new Error("Error fetching car data");
                if (!res3.ok) throw new Error("Error fetching staff data");
                if (!res4.ok) throw new Error("Error fetching customer data");

                const data1 = await res1.json();
                const data2 = await res2.json();
                const data3 = await res3.json();
                const data4 = await res4.json();


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("adminToken");
        router.push("/"); // Redirect to the main page
    };

    return (
        <main className="mt-10 px-6 max-w-7xl mx-auto">
            {/* Header Section with Logout Button */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-5xl font-extrabold text-gray-900">Dashboard</h1>
                    <p className="text-lg text-gray-500 mt-2">Manage all aspects of the platform efficiently with a modern interface.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    <FaSignOutAlt />
                    <span className="text-lg font-semibold">Logout</span>
                </button>
            </div>

            {/* Dashboard Cards - Modern Solid Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 p-4">
                {/* User Management - Yellow */}
                <a href="/admin/user-management" className="group">
                    <div className="bg-yellow-400 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center p-6 hover:bg-yellow-500">
                        <div className="mb-4 p-3 bg-white/90 rounded-full backdrop-blur-sm">
                            <FaUsers className="text-yellow-600 text-2xl" />
                        </div>
                        <h3 className="text-lg font-medium text-white">การจัดการข้อมูลลูกค้า</h3>
                    </div>
                </a>

                {/* Car Management - green */}
                <a href="/admin/car-management" className="group">
                    <div className="bg-green-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center p-6 hover:bg-green-600">
                        <div className="mb-4 p-3 bg-white/90 rounded-full backdrop-blur-sm">
                            <FaCar className="text-green-600 text-2xl" />
                        </div>
                        <h3 className="text-lg font-medium text-white">การจัดการข้อมูลรถ</h3>
                    </div>
                </a>

                {/* Staff Management - blue */}
                <a href="/admin/staff-management" className="group">
                    <div className="bg-blue-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center p-6 hover:bg-blue-600">
                        <div className="mb-4 p-3 bg-white/90 rounded-full backdrop-blur-sm">
                            <FaUsers className="text-blue-600 text-2xl" />
                        </div>
                        <h3 className="text-lg font-medium text-white">การจัดการข้อมูลพนักงาน</h3>
                    </div>
                </a>
            </div>
        </main>
    );
};

export default AdminDashboard;