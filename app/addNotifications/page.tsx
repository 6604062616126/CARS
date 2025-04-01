"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddNotificationForm = () => {
  const [sendDate, setSendDate] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [CustomerID, setCustomerID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter(); // สำหรับนำทางหลังจากเพิ่มการแจ้งเตือนสำเร็จ

  // ฟังก์ชันเพิ่มการแจ้งเตือน
  const addNotification = async () => {
    setIsLoading(true);
    setResponseMessage(""); // ลบข้อความก่อนหน้านี้

    try {
      const response = await fetch("/api/addNotifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sendDate,
          message,
          recipient,
          CustomerID,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`❌ API Error: ${errorText}`);
      }

      const data = await response.json();
      setResponseMessage(data.message || "✅ เพิ่มการแจ้งเตือนสำเร็จ!");

      // หากสำเร็จ จะนำทางไปหน้าจอการแจ้งเตือน
      setTimeout(() => {
        router.push("/notification");
      }, 2000);
    } catch (error) {
      console.error("❌ Error:", error);
      setResponseMessage("เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false); // หยุดการโหลด
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4">แบบฟอร์มแจ้งเตือน</h1>

      {/* ช่องสำหรับ Send Date */}
      <input
        type="date"
        placeholder="กรอกวันที่"
        value={sendDate}
        onChange={(e) => setSendDate(e.target.value)}
        className="border border-gray-300 p-2 mt-4 rounded"
      />

      {/* ช่องสำหรับ Recipient */}
      <input
        type="text"
        placeholder="กรอกชื่อผู้รับ"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border border-gray-300 p-2 mt-4 rounded"
      />

      {/* ช่องสำหรับ Message */}
      <textarea
        placeholder="กรอกข้อความ"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 p-2 mt-4 rounded"
      />

      {/* ช่องสำหรับ CustomerID */}
      <input
        type="number"
        placeholder="กรอก CustomerID"
        value={CustomerID}
        onChange={(e) => setCustomerID(Number(e.target.value))}
        className="border border-gray-300 p-2 mt-4 rounded"
      />

      <button
        onClick={addNotification}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "กำลังส่ง..." : "ส่งคำขอ"}
      </button>

      {responseMessage && (
        <p className="mt-2 text-center text-red-600">{responseMessage}</p>
      )}

      <Link href="/notification" className="mt-4 text-blue-600">
        กลับสู่หน้าการแจ้งเตือน
      </Link>
    </div>
  );
};

export default AddNotificationForm;
