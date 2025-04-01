"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null); 
  const terms = [
    {
      title: "คุณสมบัติผู้เช่า",
      content: [
        "อายุขั้นต่ำ: ผู้เช่าต้องมีอายุอย่างน้อย 21 ปี",
        "ใบขับขี่: ผู้เช่าต้องมีใบขับขี่ที่ถูกต้องและมีอายุมากกว่า 1 ปีขึ้นไป",
        "เอกสารยืนยันตัวตน: เช่น บัตรประชาชนหรือพาสปอร์ตที่ยังไม่หมดอายุ",
      ],
    },
    {
      title: "ประกันภัยและความคุ้มครอง",
      content: [
        "ผู้เช่าต้องทำประกันภัยรถยนต์ (อาจเป็นประกันภัยพื้นฐานหรือแบบครอบคลุม)",
        "ระบุความคุ้มครองในกรณีเกิดอุบัติเหตุ ความเสียหาย หรือการโจรกรรม",
      ],
    },
    {
      title: "เงินมัดจำและค่าใช้จ่าย",
      content: [
        "เงินมัดจำ: ผู้เช่าต้องชำระเงินมัดจำก่อนรับรถ",
        "เงื่อนไขการคืนเงินมัดจำ: เงินมัดจำจะคืนให้เมื่อรถถูกส่งคืนในสภาพดีและไม่มีความเสียหาย",
        "ค่าเช่า: ระบุค่าเช่าตามประเภทของรถและระยะเวลา",
      ],
    },
    {
      title: "ข้อจำกัดในการใช้งาน",
      content: [
        "ห้ามนำรถออกนอกพื้นที่ที่ระบุไว้ในสัญญาโดยไม่ได้รับอนุญาต",
        "ห้ามใช้รถในกิจกรรมที่ผิดกฎหมายหรือกิจกรรมที่อาจทำให้รถเสียหาย",
        "ระบุจำนวนผู้ขับขี่: รถสามารถขับได้โดยผู้ที่ระบุในสัญญาเท่านั้น",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative rounded-lg w-full h-[400px] bg-gray-100 bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: "url('/driving.png')" }}
      >
        <h1 className="text-4xl text-shadow font-bold text-blue-600">ค้นหารถเช่ากับเราสิ!</h1>
        <Link href="/SearchDate">
          <button className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            จองเลย
          </button>
        </Link>
      </section>

      {/* Promotion Section */}
      <section className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-700 ">โปรโมชั่นและข่าวสาร</h2>
        <p className="text-gray-500 mb-6">รวมโปรโมชั่นและส่วนลดต่างๆ CLUBCARS</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-[200px] bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <Image src="/promotion1.png" alt="promotion 1" width={500} height={200} className="w-full object-cover" />
          </div>

          <div className="h-[200px] bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <Image src="/promotion2.png" alt="promotion 2" width={500} height={200} className="w-full object-cover" />
          </div>

          <div className="h-[200px] bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <Image src="/promotion3.png" alt="promotion 3" width={500} height={200} className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* condition */}
      <section className="container mx-auto p-5">
        <div className="rounded-lg col-span-3 mt-8">
        <h2 className="text-xl font-bold text-blue-700">เช่ารถกับคลับคาร์</h2>
        <p className="text-gray-500">เช่ารถกับเราดียังไง</p>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-lg  overflow-hidden">
            <img src="condition1.png" alt="cond1" className="w-full h-full object-cover" />
          </div>

          <div className=" bg-gray-100 rounded-lg overflow-hidden">
            <img src="condition2.png" alt="cond2" className="w-full h-full object-cover" />
          </div>

          <div className=" bg-gray-100 rounded-lg overflow-hidden">
            <img src="condition3.png" alt="cond3" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>
      </section>

      {/* Terms and Conditions Section */}
      <section className="container mx-auto p-8 rounded-lg ">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">เงื่อนไขเพิ่มเติมและข้อตกลงในการเช่ารถ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Left Column: Conditions */}
          <div className="space-y-8">
            {terms.map((term, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left bg-gray-100 p-4 rounded-xl"
                >
                  <h3 className="font-semibold text-lg">{term.title}</h3>
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-50 rounded-b-xl">
                    <ul className="text-gray-700 list-disc pl-6 space-y-2">
                      {term.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            <div>
              <h3 className="text-lg font-bold text-blue-700">การยกเลิกหรือเปลี่ยนแปลงการเช่า</h3>
              <ul className="text-gray-700 list-disc pl-6 space-y-2">
                <li><strong>เวลาและสถานที่คืนรถ:</strong> ระบุเวลาที่ต้องคืนรถและสถานที่ที่กำหนด</li>
                <li><strong>ค่าปรับการคืนรถล่าช้า:</strong> กำหนดค่าปรับหากผู้เช่าคืนรถล่าช้ากว่าที่ระบุในสัญญา</li>
                <li><strong>การตรวจสอบสภาพรถ:</strong> ต้องตรวจสอบสภาพรถก่อนและหลังการเช่า</li>
                <li><strong>เงื่อนไขการยกเลิก:</strong> ระบุค่าธรรมเนียมหรือกำหนดเวลาที่ต้องแจ้งล่วงหน้า</li>
                <li><strong>การเปลี่ยนแปลง:</strong> เงื่อนไขการเปลี่ยนแปลงได้ภายใน 24 ชั่วโมง</li>
              </ul>
            </div>

          </div>
          

          {/* Right Column: Documents */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">เอกสารในการเช่ารถ</h2>
              <ul className="text-gray-700 list-disc pl-6 space-y-3">
                <li><strong>บัตรประจำตัวประชาชน หรือ หนังสือเดินทาง</strong></li>
                <li><strong>ใบขับขี่รถยนต์:</strong> ใบขับขี่ที่ยังไม่หมดอายุ (สำหรับชาวต่างชาติ ใบขับขี่ต้องเป็น International Driving License หรือใบขับขี่ที่แปลเป็นภาษาอังกฤษ)</li>
                <li><strong>เอกสารยืนยันที่อยู่:</strong> เช่น สำเนาทะเบียนบ้าน หรือบิลค่าสาธารณูปโภคล่าสุด (ไม่เกิน 3 เดือน)</li>
              </ul>
            </div>

            {/* Exclusions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-red-600">ไม่รวมค่าบริการ</h3>
              <ul className="text-gray-700 space-y-2 list-disc pl-6">
                <li>❌ ค่าทางด่วน</li>
                <li>❌ ค่าน้ำมัน</li>
                <li>❌ ค่าจอดรถ</li>
                <li>❌ ค่าปรับจากความประมาทพนักงาน</li>
                <li>❌ ค่าปรับจากการจอดในที่ห้ามจอด</li>
                <li>❌ ค่าปรับไฟจราจร หรือผิดระเบียบจราจร</li>
                <li>❌ ค่าบริการเพิ่มเติมนอกเหนือจากเงื่อนไข</li>
                <li>❌ ค่ารับส่งนอกสถานที่</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "10px", fontSize: "14px", color: "#666" }}>
        © 2025 ClubCar. All rights reserved.
      </footer>

    </>
  );
}
