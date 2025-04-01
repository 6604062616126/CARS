"use client";

import Link from "next/link";
import { useState } from "react";

export default function BookingPage() {
    const [day, setDay] = useState("10");
    const [month, setMonth] = useState("05");
    const [year, setYear] = useState("2568");
    const [hour, setHour] = useState("11");
    const [minute, setMinute] = useState("30");
    const [pickupLocation, setPickupLocation] = useState("MRT_Pahonyothin");

    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            {/* หัวข้อ */}
            <h1 className="text-3xl font-bold text-center mb-4">ค้นหาวันและสถานที่ที่เหมาะสม</h1>

            {/* รูปภาพพื้นหลังพร้อมกล่องฟอร์ม */}
            <div className="relative w-full h-[500px] flex items-center justify-center" 
                 style={{ backgroundImage: "url('/car.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="bg-white p-10 rounded-lg shadow-2xl w-96 bg-opacity-90">
                    
                    {/* เลือกวัน */}
                    <div className="mb-6">
                        <label className="block text-gray-700">วัน / เดือน / ปี</label>
                        <div className="flex space-x-2">
                            <input type="text" className="w-1/3 p-2 border rounded" value={day} onChange={(e) => setDay(e.target.value)} />
                            <input type="text" className="w-1/3 p-2 border rounded" value={month} onChange={(e) => setMonth(e.target.value)} />
                            <input type="text" className="w-1/3 p-2 border rounded" value={year} onChange={(e) => setYear(e.target.value)} />
                        </div>
                    </div>

                    {/* เลือกเวลา */}
                    <div className="mb-6">
                        <label className="block text-gray-700">เวลา</label>
                        <div className="flex space-x-2">
                            <input type="text" className="w-1/4 p-2 border rounded" value={hour} onChange={(e) => setHour(e.target.value)} />
                            <span className="self-center">:</span>
                            <input type="text" className="w-1/4 p-2 border rounded" value={minute} onChange={(e) => setMinute(e.target.value)} />
                            <span className="self-center">น.</span>
                        </div>
                    </div>

                    {/* เลือกสถานที่ */}
                    <div className="mb-6">
                        <label className="block text-gray-700">สถานที่รับรถ</label>
                        <select 
                            className="w-full p-2 border rounded" 
                            value={pickupLocation} 
                            onChange={(e) => setPickupLocation(e.target.value)}
                        >
                            <option value="MRT_Pahonyothin">สถานี MRT พหลโยธิน</option>
                            <option value="DMK">สนามบินดอนเมือง</option>
                            <option value="BKK">สนามบินสุวรรณภูมิ</option>
                        </select>
                    </div>

                    {/* ปุ่มค้นหารถว่าง ส่งค่าผ่าน URL */}
                    <Link href={`/SearchCars?pickupDate=${formattedDate}&pickupLocation=${pickupLocation}`}>
                        <button className="w-full py-2 bg-[#0D3489] text-white rounded-md hover:bg-[#092C5D] transition flex justify-center items-center mt-6">
                            ค้นหารถว่าง
                        </button>
                    </Link>
                </div>
            </div>

            {/* ปุ่มย้อนกลับ */}
            <button className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                ย้อนกลับ
            </button>
        </div>
    );
}
