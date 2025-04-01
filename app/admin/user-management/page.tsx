"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

const CustomerManagementPage: React.FC = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    const filteredCustomers = (customers || []).filter(customer => {
        return customer.CustomerID?.toString().includes(searchTerm) ||
            customer.firstName?.includes(searchTerm) ||
            customer.lastName?.includes(searchTerm) ||
            customer.phoneNumber?.includes(searchTerm);
    });

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch("/api/getcustomer");
                const data = await res.json();
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers();
    }, []);

    const handleDelete = async (customerID: number) => {
        try {
            // ส่งคำขอ DELETE ไปยัง API
            const response = await fetch(`/api/deletecustomer`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customerID }), // ส่ง customerID เป็น JSON
            });

            // ตรวจสอบการตอบกลับว่าเป็น JSON
            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.CustomerID !== customerID));
                return true;
            } else {
                alert(data.message || "ไม่สามารถลบข้อมูลลูกค้าได้");
                return false;
            }
        } catch (error) {
            console.error("🚨 Error deleting customer: ", error);
            alert("เกิดข้อผิดพลาดในการลบข้อมูล");
            return false;
        }
    };

    return (
        <div className=" min-h-screen p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">การจัดการลูกค้า</h1>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <Link href="/admin">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            ย้อนกลับ
                        </button>
                    </Link>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <input
                        type="text"
                        placeholder="ค้นหาจากรหัสลูกค้า, ชื่อ, เบอร์โทร..."
                        className="p-2 border rounded-lg md:w-96"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === "all" ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            ทั้งหมด
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 bg-gray-100 p-4 font-semibold text-gray-700">
                    <div className="col-span-2">ชื่อ-นามสกุล</div>
                    <div className="col-span-1">เบอร์โทร</div>
                    <div className="col-span-1">การจัดการ</div>
                </div>

                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                        <div key={customer.CustomerID} className="grid grid-cols-4 p-4 border-b hover:bg-gray-50">
                            {/* ชื่อ-สกุล */}
                            <div className="col-span-2 truncate">
                                {customer.firstName} {customer.lastName}
                            </div>

                            {/* เบอร์โทร */}
                            <div className="col-span-1 truncate">{customer.phoneNumber}</div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(customer.CustomerID)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                    title="ลบ"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        ไม่พบข้อมูลลูกค้าที่ค้นหา
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">ย้อนกลับ</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">2</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">3</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">ถัดไป</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerManagementPage;