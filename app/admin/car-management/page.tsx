"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FiTrash2,
    FiPlus,
    FiArrowLeft,
    FiImage,
    FiSearch,
    FiAlertCircle,
    FiDatabase,
    FiGrid,
    FiTag,
    FiLayers,
    FiDollarSign,
    FiChevronLeft,
    FiChevronRight
} from "react-icons/fi";

const CarManagementPage: React.FC = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ตั้งค่า base URL สำหรับรูปภาพ
    const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/uploads';

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("/api/getcar");

                if (!res.ok) {
                    throw new Error(`Failed to fetch cars: ${res.status}`);
                }

                const data = await res.json();

                // เพิ่ม full image URL ให้กับแต่ละรถ
                const carsWithImageUrl = data.map((car: any) => ({
                    ...car,
                    // สร้าง URL รูปภาพเต็ม หากมี carImg
                    carImgUrl: car.carImg
                        ? car.carImg.startsWith('http') ? car.carImg : `${baseImageUrl}/${car.carImg}`
                        : null
                }));

                setCars(carsWithImageUrl);
                setError(null);
            } catch (error) {
                console.error("Error fetching cars:", error);
                setError("ไม่สามารถโหลดข้อมูลรถได้");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, [baseImageUrl]);

    const handleDelete = async (LPlate: string) => {
        if (!confirm(`คุณแน่ใจว่าต้องการลบรถทะเบียน ${LPlate} ใช่หรือไม่?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/deletecar`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ LPlate }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setCars(prevCars => prevCars.filter(car => car.LPlate !== LPlate));
            } else {
                throw new Error(data.message || "Failed to delete car");
            }
        } catch (error) {
            console.error("🚨 Error deleting car: ", error);
            alert(error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการลบข้อมูล");
        }
    };

    const filteredCars = cars.filter((car) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            car.LPlate?.toLowerCase().includes(searchLower) ||
            car.model?.toLowerCase().includes(searchLower) ||
            car.brand?.toLowerCase().includes(searchLower);

        const matchesTab = activeTab === "all" || car.status === activeTab;

        return matchesSearch && matchesTab;
    });

    const statusColors: Record<string, string> = {
        "พร้อมให้เช่า": "bg-green-100 text-green-800",
        "กำลังเช่า": "bg-yellow-100 text-yellow-800",
        "ซ่อมบำรุง": "bg-red-100 text-red-800"
    };

    return (
        <div className="min-h-screen p-4 md:p-6 ">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">การจัดการข้อมูลรถ</h1>
                        <p className="text-gray-500 mt-1">จัดการข้อมูลรถยนต์ทั้งหมดในระบบ</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <Link href="/admin/car-management/add">
                            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors w-full md:w-auto justify-center">
                                <FiPlus className="text-lg" /> เพิ่มข้อมูลรถใหม่
                            </button>
                        </Link>
                        <Link href="/admin">
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors w-full md:w-auto justify-center">
                                <FiArrowLeft className="text-lg" /> ย้อนกลับ
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="relative w-full md:w-96">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="ค้นหาจากทะเบียนรถ, รุ่น, ยี่ห้อ..."
                                className="pl-10 pr-4 py-2.5 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1">
                            {["all", "พร้อมให้เช่า", "กำลังเช่า", "ซ่อมบำรุง"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors text-sm font-medium ${activeTab === tab
                                        ? tab === "all"
                                            ? "bg-blue-600 text-white shadow-blue-sm"
                                            : statusColors[tab]?.replace("100", "600").replace("text", "text-white") + " shadow-sm"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {tab === "all" ? "ทั้งหมด" : tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cars List Section */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">
                        <FiAlertCircle className="inline-block mr-2" />
                        {error}
                    </div>
                ) : (
                    <>
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 py-3 px-2 font-semibold text-gray-700 bg-gray-50 rounded-t-lg">
                            <div className="col-span-2 pl-2">ทะเบียนรถ</div>
                            <div className="col-span-2">รุ่น</div>
                            <div className="col-span-2">ยี่ห้อ</div>
                            <div className="col-span-1">ประเภท</div>
                            <div className="col-span-1">สถานะ</div>
                            <div className="col-span-1">ราคาเช่า</div>
                            <div className="col-span-1">รูปภาพ</div>
                            <div className="col-span-2 pr-2">การจัดการ</div>
                        </div>

                        {/* Table Body */}
                        {filteredCars.length > 0 ? (
                            filteredCars.map((car) => (
                                <div
                                    key={car.id}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-3 p-3 md:p-2 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                                >
                                    {/* Mobile View Header */}
                                    <div className="md:hidden flex justify-between items-center">
                                        <h3 className="font-medium text-gray-800 truncate">
                                            {car.brand} {car.model}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[car.status] || 'bg-gray-100 text-gray-800'}`}>
                                            {car.status}
                                        </span>
                                    </div>

                                    {/* License Plate */}
                                    <div className="md:col-span-2 flex items-center flex-shrink-0">
                                        <span className="font-medium truncate">{car.LPlate}</span>
                                    </div>

                                    {/* Model */}
                                    <div className="md:col-span-2 flex items-center">
                                        <FiGrid className="md:hidden mr-2 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{car.model}</span>
                                    </div>

                                    {/* Brand */}
                                    <div className="md:col-span-2 flex items-center">
                                        <FiTag className="md:hidden mr-2 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{car.brand}</span>
                                    </div>

                                    {/* Car Type */}
                                    <div className="md:col-span-1 flex items-center">
                                        <FiLayers className="md:hidden mr-2 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{car.carType}</span>
                                    </div>

                                    {/* Status (hidden on mobile - shown in header) */}
                                    <div className="hidden md:flex md:col-span-1 items-center">
                                        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[car.status] || 'bg-gray-100 text-gray-800'}`}>
                                            {car.status}
                                        </span>
                                    </div>

                                    {/* Rental Price */}
                                    <div className="md:col-span-1 flex items-center">
                                        <FiDollarSign className="md:hidden mr-2 text-gray-400 flex-shrink-0" />
                                        <span>{car.rentalPrice?.toLocaleString()}</span>
                                    </div>

                                    {/* Image */}
                                    <div className="md:col-span-1 flex items-center">
                                        <FiImage className="md:hidden mr-2 text-gray-400 flex-shrink-0" />
                                        {car.carImg ? (
                                            <div className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-200">
                                                <Image
                                                    src={car.carImgUrl}
                                                    alt={`${car.brand} ${car.model}`}
                                                    className="w-full h-full object-cover"

                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border border-gray-200">
                                                <FiImage size={16} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleDelete(car.LPlate)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="ลบ"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-500 flex flex-col items-center">
                                <FiDatabase className="text-3xl mb-3 text-gray-400" />
                                {searchTerm ? "ไม่พบรถที่ตรงกับการค้นหา" : "ยังไม่มีข้อมูลรถในระบบ"}
                                {!searchTerm && (
                                    <Link href="/admin/car-management/add" className="mt-4 text-blue-600 hover:text-blue-700 flex items-center">
                                        <FiPlus className="mr-1" /> เพิ่มรถคันแรก
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Pagination - Only show if there are results */}
            {filteredCars.length > 0 && (
                <div className="flex justify-center mt-8">
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                            <FiChevronLeft className="mr-1" /> ย้อนกลับ
                        </button>
                        <button className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            2
                        </button>
                        <button className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            3
                        </button>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                            ถัดไป <FiChevronRight className="ml-1" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarManagementPage;