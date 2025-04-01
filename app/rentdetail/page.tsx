"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useBooking } from '../context/bookingcontext';

const carData = {
    carID: 1,
    LPlate: "กข1234",
    model: "C 43 Coupe",
    brand: "Mercedes-AMG",
    carType: "รถเก๋ง",
    rentalPrice: 550,
    status: "พร้อมให้เช่า",
    carImg: "/benz1.png",
    additionalImages: ["/benz2.png", "/benz3.png"]
};

export default function CarDetails() {
    const [days, setDays] = useState(1);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { selectedCar } = useBooking();

    if (!selectedCar) {
        console.log("noCar");
    } else {
        console.log(selectedCar);
    }

    const {
        LPlate,
        model,
        brand,
        carType,
        rentalPrice,
        status,
        carImg,
        additionalImages
    } = carData;

    const deposit = 5000;
    const deliveryFee = 100;
    const pickupFee = 100;

    const images = [carImg, ...additionalImages];
    const specifications = [
        { icon: "/icon/caricon.png", label: "ทะเบียนรถ", value: LPlate },
        { icon: "/icon/caricon.png", label: "ยี่ห้อ", value: brand },
        { icon: "/icon/caricon.png", label: "รุ่น", value: model },
        { icon: "/icon/caricon.png", label: "ประเภท", value: carType },
        { icon: "/icon/caricon.png", label: "สถานะ", value: status },
    ];

    const totalRentalCost = days * rentalPrice;
    const totalFees = deliveryFee + pickupFee;
    const grandTotal = totalRentalCost + totalFees;

    const handleImageClick = (image: string) => {
        setExpandedImage(image === expandedImage ? null : image);
    };

    const handleRentClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            router.push("/checkout");
        }, 1000);
    };

    return (
        <div className="mt-16 pb-24">
            {/* ส่วนหัว */}
            <div className="flex flex-col px-6 py-4 bg-white shadow-sm">
                {/* บรรทัดที่ 1: ปุ่มย้อนกลับ */}
                <div className="mb-3">
                    <Link
                        href="/SearchCars"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-1 text-base font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        ย้อนกลับ
                    </Link>
                </div>

                {/* บรรทัดที่ 2: ชื่อหน้าและชื่อรถ */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">รายละเอียดรถเช่า</h1>
                    <h2 className="text-xl font-semibold text-gray-800">
                        <span className="text-blue-600">{brand}</span> {model}
                    </h2>
                </div>
            </div>

            {/* แกลเลอรี่รูปภาพ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative group flex justify-center items-center cursor-pointer"
                        onClick={() => handleImageClick(image)}
                    >
                        <div className="w-full h-full md:h-64 overflow-hidden flex justify-center items-center bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300">
                            <Image
                                src={image}
                                alt={`car-${index + 1}`}
                                width={400}
                                height={300}
                                className="w-full h-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-white font-medium text-sm">คลิกเพื่อดูภาพขนาดใหญ่</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* รูปภาพที่ขยายขึ้นเมื่อคลิก */}
            {expandedImage && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center cursor-pointer z-50 p-4"
                    onClick={() => setExpandedImage(null)}
                >
                    <div className="relative max-w-4xl w-full max-h-[90vh]">
                        <Image
                            src={expandedImage}
                            alt="expanded-car-view"
                            width={1200}
                            height={800}
                            className="rounded-lg object-contain w-full h-full"
                        />
                        <button
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm transition-colors duration-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedImage(null);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* รายละเอียดรถ */}
            <div className="grid md:grid-cols-3 gap-4 ">
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-m p-6 space-y-4 mb-20">
                    {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-4 py-3 px-4 items-center">
                            <div className="bg-blue-50 rounded-lg p-3 flex-shrink-0">
                                <Image
                                    src={spec.icon}
                                    alt={spec.label}
                                    width={24}
                                    height={24}
                                    className="text-blue-600"
                                />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm font-medium">{spec.label}</p>
                                <p className="text-gray-900 font-semibold">
                                    {spec.value}
                                    {index === 0 && (
                                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                                            {status}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* คำนวณราคา */}
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 mb-20">
                    <h3 className="font-semibold text-gray-900 text-lg border-b pb-3">รายละเอียดการจอง</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-600 text-sm">
                                    ราคาต่อวัน {rentalPrice.toLocaleString()} × {days} วัน
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="days" className="text-gray-600 text-sm">
                                    จำนวนวัน:
                                </label>
                                <input
                                    type="number"
                                    id="days"
                                    value={days}
                                    min="1"
                                    max="31"
                                    onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 font-medium">ค่าเช่ารถ {days} วัน</p>
                            <p className="font-semibold text-blue-600">
                                ฿{(days * rentalPrice).toLocaleString()}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-3">
                            <p className="text-gray-700 font-medium mb-2">ค่ารับ - ค่าส่ง</p>
                            <div className="flex justify-between items-center text-sm">
                                <p className="text-gray-500">
                                    ค่าส่งรถ {deliveryFee}, ค่ารับรถ {pickupFee}
                                </p>
                                <p className="font-semibold text-blue-600">
                                    ฿{(deliveryFee + pickupFee).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-3">
                            <p className="text-gray-700 font-medium mb-2">ค่ามัดจำ</p>
                            <div className="flex justify-between items-center text-sm">
                                <p className="text-gray-500">
                                    ค่ามัดจำในวันรับรถ (ได้คืนวันคืนรถ)
                                </p>
                                <p className="font-semibold text-blue-600">
                                    ฿{deposit.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-3 mt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-800 font-bold">รวมทั้งหมด</span>
                                <span className="text-xl font-bold text-blue-600">
                                    ฿{grandTotal.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <p className="text-red-500 text-center text-sm font-medium mt-2">
                            ราคานี้ยังไม่รวมส่วนลดและโปรโมชั่น
                        </p>
                    </div>
                </div>
            </div>

            {/* แถบราคาและปุ่มเช่า */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex justify-between items-center fixed bottom-0 left-0 w-full shadow-lg px-6">
                <div>
                    <p className="text-sm font-medium">ราคาทั้งหมด:</p>
                    <p className="text-xl font-bold">
                        ฿{grandTotal.toLocaleString()}
                    </p>
                </div>

                <button
                    className="bg-white hover:bg-gray-100 active:scale-95 text-blue-600 rounded-lg px-6 py-3 shadow-md transition-all font-bold flex items-center gap-2"
                    onClick={handleRentClick}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            กำลังประมวลผล...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3zM3 5h2v2H3V5zm4 0h2v2H7V5zm4 0h2v2h-2V5zm4 0h2v2h-2V5z" />
                            </svg>
                            เช่ารถคันนี้
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}