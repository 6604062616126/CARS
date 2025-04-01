"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddCarPage: React.FC = () => {
    const [formData, setFormData] = useState({
        LPlate: "",
        model: "",
        brand: "",
        carType: "Sedan",
        status: "พร้อมให้เช่า",
        rentalPrice: "",
        carImg: null as File | null
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({
                ...prev,
                carImg: file
            }));

            // สร้าง preview ภาพ
            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("LPlate", formData.LPlate);
            formDataToSend.append("model", formData.model);
            formDataToSend.append("brand", formData.brand);
            formDataToSend.append("carType", formData.carType);
            formDataToSend.append("status", formData.status);
            formDataToSend.append("rentalPrice", formData.rentalPrice);

            if (formData.carImg) {
                formDataToSend.append("carImg", formData.carImg);
            }

            const response = await fetch("/api/addcar", {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "ไม่สามารถเพิ่มรถได้");
            }

            alert("เพิ่มรถสำเร็จ!");
            router.push("/admin/car-management");
        } catch (error) {
            console.error("Error:", error);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen p-6 flex items-center justify-center bg-gray-50">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">เพิ่มรถใหม่</h1>
                    <Link href="/admin/car-management">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                            ย้อนกลับ
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ทะเบียนรถ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ทะเบียนรถ *</label>
                            <input
                                type="text"
                                name="LPlate"
                                value={formData.LPlate}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* ยี่ห้อ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ยี่ห้อ *</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* รุ่น */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">รุ่น *</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* ประเภท */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ประเภท *</label>
                            <select
                                name="carType"
                                value={formData.carType}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Pickup">Pickup</option>
                                <option value="Van">Van</option>
                            </select>
                        </div>

                        {/* สถานะ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ *</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="พร้อมให้เช่า">พร้อมให้เช่า</option>
                                <option value="กำลังเช่า">กำลังเช่า</option>
                                <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
                            </select>
                        </div>

                        {/* ราคาเช่า */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ราคาเช่า (บาท/วัน) *</label>
                            <input
                                type="number"
                                name="rentalPrice"
                                value={formData.rentalPrice}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                                min="0"
                            />
                        </div>

                        {/* รูปภาพรถ */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">รูปภาพรถ *</label>
                            <input
                                type="file"
                                name="carImg"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                required
                            />
                            {previewImage && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                                    <Image
                                        src= "/car1.png"
                                        alt="Preview"
                                        className="h-48 w-full object-contain rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                        <Link href="/admin/car-management">
                            <button
                                type="button"
                                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-colors"
                            >
                                ยกเลิก
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCarPage;