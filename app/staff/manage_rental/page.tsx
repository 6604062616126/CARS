"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Rental {
    id: string;
    customerName: string;
    carModel: string;
    bookingDate: string;
    totalPrice: number;
    status: "รอตรวจสอบ" | "ยืนยันแล้ว" | "ปฏิเสธ";
}

const ManageRental = () => {
    const router = useRouter();
    const [rentals] = useState<Rental[]>([
        {
            id: "BK001",
            customerName: "สมชาย ใจดี",
            carModel: "Toyota Camry",
            bookingDate: "2023-06-15",
            totalPrice: 2500,
            status: "รอตรวจสอบ"
        },
        {
            id: "BK002",
            customerName: "สุนิตา เก่งมาก",
            carModel: "Honda Civic",
            bookingDate: "2023-06-16",
            totalPrice: 1800,
            status: "ยืนยันแล้ว"
        },
        {
            id: "BK003",
            customerName: "อนุชา สบายดี",
            carModel: "Ford Mustang",
            bookingDate: "2023-06-18",
            totalPrice: 3500,
            status: "ปฏิเสธ"
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeStatus, setActiveStatus] = useState("ทั้งหมด");

    const filteredRentals = rentals.filter(rental => {
        const matchesSearch = rental.customerName.includes(searchTerm) || rental.id.includes(searchTerm);
        const matchesStatus = activeStatus === "ทั้งหมด" || rental.status === activeStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <main className="mt-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-800">จัดการการเช่ารถ</h1>
                    <p className="text-gray-600 mt-2">ระบบจัดการข้อมูลการเช่ารถสำหรับพนักงาน</p>
                </div>
                <button
                    onClick={() => router.push("/staff")}
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FaChevronLeft />
                    ย้อนกลับ
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ค้นหาด้วยรหัสหรือชื่อลูกค้า..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['ทั้งหมด', 'รอตรวจสอบ', 'ยืนยันแล้ว', 'ปฏิเสธ'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rental Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ลูกค้า</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การจอง</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ยอดชำระ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRentals.map((rental) => (
                                <tr key={rental.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{rental.customerName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">#{rental.id}</div>
                                        <div className="text-sm text-gray-500">{rental.carModel}</div>
                                        <div className="text-sm text-gray-500">วันที่จอง: {rental.bookingDate}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {rental.totalPrice.toLocaleString()} บาท
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${rental.status === 'ยืนยันแล้ว' ? 'bg-green-100 text-green-800' :
                                                rental.status === 'ปฏิเสธ' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {rental.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                                            <FaEye />
                                        </button>
                                        {rental.status === "รอตรวจสอบ" && (
                                            <>
                                                <button className="text-green-600 hover:text-green-900 mr-3">
                                                    <FaCheck />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <FaTimes />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default ManageRental;