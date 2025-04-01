"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCar, FaIdCard, FaShieldAlt, FaMoneyBillWave, FaBan, FaExchangeAlt } from "react-icons/fa";

export default function RentalAgreement() {
  const router = useRouter();
  const [isAccepted, setIsAccepted] = useState(false);

  const handleSubmit = () => {
    if (isAccepted) {
      router.push("/paymentSuccess");
    }
  };

  const sections = [
    {
      title: "ข้อกำหนดและเงื่อนไข",
      icon: <FaCar className="text-blue-500" />,
      items: [
        "ผู้เช่าต้องมีใบขับขี่ที่ถูกต้อง",
        "ห้ามสูบบุหรี่หรือดื่มแอลกอฮอล์ในรถ",
        "หากคืนรถล่าช้าจะมีค่าปรับ"
      ]
    },
    {
      title: "คุณสมบัติผู้เช่า",
      icon: <FaIdCard className="text-green-500" />,
      items: [
        "อายุขั้นต่ำ: ผู้เช่าต้องมีอายุอย่างน้อย 21 ปี",
        "ใบขับขี่: ผู้เช่าต้องมีใบขับขี่ที่ถูกต้องและมีอายุมากกว่า 1 ปี",
        "เอกสารยืนยันตัวตน: เช่น บัตรประชาชนหรือพาสปอร์ตที่ยังไม่หมดอายุ"
      ]
    },
    {
      title: "ประกันภัยและความคุ้มครอง",
      icon: <FaShieldAlt className="text-purple-500" />,
      items: [
        "ผู้เช่าต้องทำประกันภัยรถยนต์ (อาจเป็นประกันภัยพื้นฐานหรือแบบครอบคลุม)",
        "ระบุความคุ้มครองในกรณีเกิดอุบัติเหตุ ความเสียหาย หรือการโจรกรรม"
      ]
    },
    {
      title: "เงินมัดจำและค่าใช้จ่าย",
      icon: <FaMoneyBillWave className="text-yellow-500" />,
      items: [
        "เงินมัดจำ: ผู้เช่าต้องชำระเงินมัดจำก่อนรับรถ",
        "เงื่อนไขการคืนเงินมัดจำ: เงินมัดจำจะคืนให้เมื่อรถถูกส่งคืนในสภาพดีและไม่มีความเสียหาย",
        "ค่าเช่า: ระบุค่าเช่าตามประเภทของรถและระยะเวลา"
      ]
    },
    {
      title: "ข้อจำกัดในการใช้งาน",
      icon: <FaBan className="text-red-500" />,
      items: [
        "ห้ามนำรถออกนอกพื้นที่ที่ระบุไว้ในสัญญาโดยไม่ได้รับอนุญาต",
        "ห้ามใช้รถในกิจกรรมที่ผิดกฎหมายหรือกิจกรรมที่อาจทำให้รถเสียหาย",
        "ระบุจำนวนผู้ขับขี่: รถสามารถขับได้โดยผู้ที่ระบุในสัญญาเท่านั้น"
      ]
    },
    {
      title: "การยกเลิกหรือเปลี่ยนแปลงการเช่า",
      icon: <FaExchangeAlt className="text-orange-500" />,
      items: [
        "เวลาและสถานที่คืนรถ: ระบุเวลาที่ต้องคืนรถและสถานที่ที่กำหนด",
        "ค่าปรับการคืนรถล่าช้า: กำหนดค่าปรับหากผู้เช่าคืนรถล่าช้ากว่าที่ระบุในสัญญา",
        "การตรวจสอบสภาพรถ: ต้องตรวจสอบสภาพรถก่อนและหลังการเช่า",
        "เงื่อนไขการยกเลิก: ระบุค่าธรรมเนียมหรือกำหนดเวลาที่ต้องแจ้งล่วงหน้า",
        "การเปลี่ยนแปลง: เงื่อนไขการเปลี่ยนแปลงได้ภายใน 24 ชั่วโมง"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-16 mb-5">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">สัญญาการเช่ารถ</h1>
        <p className="text-gray-600">โปรดอ่านและทำความเข้าใจข้อตกลงทั้งหมดก่อนทำการยืนยัน</p>
      </div>

      {/* Agreement Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-center mb-4">
              <div className="mr-3 text-xl">
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <ul className="space-y-3 ml-10">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Acceptance Section */}
      <div className="mt-10 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="agreement-checkbox"
            checked={isAccepted}
            onChange={() => setIsAccepted(!isAccepted)}
            className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="agreement-checkbox" className="ml-3 block text-gray-700">
            <span className="font-medium">ฉันยอมรับเงื่อนไขการเช่ารถทั้งหมดที่ระบุไว้ข้างต้น</span>
            <p className="text-sm text-gray-500 mt-1">โดยการคลิกยืนยัน ฉันรับทราบว่าฉันได้อ่านและเข้าใจข้อตกลงทั้งหมดแล้ว</p>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isAccepted}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${isAccepted
              ? "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          ยืนยันการเช่า
        </button>
      </div>
    </div>
  );
}