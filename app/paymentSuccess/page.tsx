"use client";

import Link from "next/link";
import { FiArrowLeft, FiCheckCircle, FiClock, FiMapPin, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CancelBookingPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
            {/* Back button */}
            <Link href="/">
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4">
                    <FiArrowLeft className="mr-2" />
                    ย้อนกลับ
                </button>
            </Link>

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">รายละเอียดการชำระเงิน</h1>
                    <p className="text-gray-500 mt-2">หมายเลขการจอง #21356</p>
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <FiCheckCircle className="mr-2" />
                    ชำระเงินเสร็จสิ้น
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Booking details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Car info */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <img
                                src="/car1.png"
                                alt="Honda Civic 2023"
                                className="w-full sm:w-48 h-36 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900">Honda Civic 2023</h2>
                                <div className="flex items-center text-gray-500 mt-2">
                                    <FiMapPin className="mr-2" />
                                    <span>จุดรับรถ - จุดคืนรถ: สนามบินดอนเมือง</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-2">

                                    <div className="flex justify-between items-start bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            <FiCalendar className="mr-2 text-blue-600" />
                                            <span className="font-medium flex items-center text-blue-600">รับรถ</span>
                                        </div>
                                        <div>
                                            <p className="font-bold mt-1">29 มี.ค. 2025</p>
                                            <p className="text-sm text-gray-500">11:30 น.</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            <FiCalendar className="mr-2 text-blue-600" />
                                            <span className="font-medium flex items-center text-blue-600">คืนรถ</span>
                                        </div>

                                        <div>
                                            <p className="font-bold mt-1">31 มี.ค. 2025</p>
                                            <p className=" text-sm text-gray-500">12:30 น.</p>
                                        </div>

                                    </div>


                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">รายละเอียดราคา</h3>
                            <p className="text-sm text-red-500 mt-2">* ราคานี้ไม่รวมส่วนลดและโปรโมชั่น *</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">ค่าเช่ารถ 3 วัน</p>
                                    <p className="text-sm text-gray-500">550 บาท/วัน × 3 วัน</p>
                                </div>
                                <p className="font-medium">1650 บาท</p>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">ค่ารับ-ส่งรถ</p>
                                    <p className="text-sm text-gray-500">รับ 100 บาท + ส่ง 100 บาท</p>
                                </div>
                                <p className="font-medium">200 บาท</p>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">ค่ามัดจำ</p>
                                    <p className="text-sm text-gray-500">คืนเมื่อรถอยู่ในสภาพดี</p>
                                </div>
                                <p className="font-medium">5,000 บาท</p>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between">
                                    <p className="font-bold">รวมทั้งหมด</p>
                                    <p className="font-bold text-lg">6850 บาท</p>
                                </div>
                
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment status and actions */}
                <div className="space-y-6">
                    {/* Payment status */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">สถานะการชำระเงิน</h3>

                        <div className="bg-yellow-50 rounded-lg p-6 text-center">
                            <FiCheckCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                            <p className="font-bold text-yellow-700 text-xl mb-2">รอการตรวจสอบ</p>
                            <p className="text-gray-600">หมายเลขรายการ: #PAY-789456</p>
                            <p className="text-gray-600 mt-2">วันที่ชำระ: 28 มี.ค. 2025</p>
                        </div>

            
                    </div>

                    {/* Next steps */}
                    <div className="bg-blue-50 rounded-lg p-5 text-center">
                        <div className="flex items-start mb-2">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <FiClock className="text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium">รอการยืนยันจากระบบ</p>
                                <p className="text-sm text-gray-600 mt-1">จะแจ้งผลภายใน 24 ชั่วโมง</p>
                            </div>
                        </div>
                    </div>
                    <Link href="/">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-4">
                            ตกลง
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}