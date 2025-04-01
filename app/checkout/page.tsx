"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FiUpload, FiX } from "react-icons/fi";
import Image from "next/image";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "", //สอบถามเพิ่มเติม
  });

  const [file, setFile] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !file) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น รวมถึงอัปโหลดไฟล์สลิป");
      return;
    }
    router.push('/rental-agreement');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center p-6 pt-24">
        <div className="flex w-full max-w-6xl gap-8 flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">กรอกข้อมูลผู้เช่า</h3>
              <div className="h-[2px] bg-gradient-to-r from-blue-500 to-transparent w-24"></div>
            </div>

            <div className="space-y-5">
              {["firstName", "lastName", "email", "phone", "address"].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === "firstName" ? "ชื่อจริง" : field === "lastName" ? "นามสกุล" : field === "email" ? "อีเมล" : field === "phone" ? "เบอร์โทร" : "ที่อยู่"}
                  </label>
                  <input
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={`* ${field === "firstName" ? "ชื่อจริง" : field === "lastName" ? "นามสกุล" : field === "email" ? "อีเมล" : field === "phone" ? "เบอร์โทร" : "ที่อยู่"}`}
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สอบถามเพิ่มเติม (ถ้ามี)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none h-24"
                />
              </div>

              <button
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg 
                ${!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !file ? "bg-gray-300 cursor-not-allowed" : ""}`}
                onClick={handleSubmit}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !file}
              >
                ยืนยันข้อมูล
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[40%] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">สรุปข้อมูลการเช่ารถ</h3>
              <div className="h-[2px] bg-gradient-to-r from-blue-500 to-transparent w-24"></div>
            </div>

            <div className="space-y-6">
              <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
                <Image src="/benz1.png" alt="Car" className="w-full h-full object-cover" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">Mercedes-AMG C 43 Coupe</h4>
                <div className="h-[1px] bg-gray-200 my-3"></div>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-800 text-sm">29/03/2025 - 11:30 น.</p>
                <p className="text-sm text-blue-600 font-semibold">3 วัน</p>
                <p className="text-gray-800 text-sm">31/03/2025 - 12:00 น.</p>
              </div>

              <div className="flex flex-col items-center pt-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
                  <Image src="/QR.png" alt="QR Code" />
                </div>
                <p className="text-xs text-red-500 font-medium">* ชำระเงินภายใน 24 ชั่วโมง</p>
              </div>

              <div>
                <label className="relative w-full h-20 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group">
                  {file ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={file}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <FiX className="text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUpload className=" text-gray-400 group-hover:text-blue-500" />
                      <span className="text-gray-600 font-medium group-hover:text-blue-500">แนบไฟล์</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, PDF</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, application/pdf"
                      />
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
