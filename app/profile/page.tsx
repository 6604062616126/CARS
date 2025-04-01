"use client";
import { useState, useEffect } from "react";
import  Rental  from "../rental/page"; 
import { config } from "@/config"; // ดึง secretkey
import { useRouter } from 'next/navigation'; // แก้จาก next/router เป็น next/navigation


interface Notification {
  notificationID: number;
  sendDate: string;
  message: string;
  recipient: string;
  CustomerID: number;
};

export function NotificationSettings() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [expandedNotification, setExpandedNotification] = useState<number | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/getNotifications");

        console.log("📥 Raw response:", response);

        if (!response.ok) {
          const text = await response.text();
          console.error(`❌ Fetch failed: ${response.status} - ${text}`);
          throw new Error(`HTTP ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        console.log("🧾 Content-Type:", contentType);

        if (contentType && contentType.includes("application/json")) {
          const text = await response.text();
          console.log("📦 Raw text from API:", text);

          if (!text) {
            console.warn("⚠️ API responded with empty body!");
            throw new Error("Empty JSON response");
          }

          const data = JSON.parse(text);
          console.log("✅ Parsed JSON:", data);

          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            console.warn("⚠️ API returned non-array JSON:", data);
            setNotifications([]);
          }
        } else {
          throw new Error("Invalid content-type, not JSON");
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6 min-w-2xl mx-auto border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-1">การแจ้งเตือน</h2>
      <p className="text-sm text-gray-300 mb-4">
        ____________________________________________________________________________________________________________________________________________
      </p>
      <p className="text-sm text-gray-500 mb-4">การแจ้งเตือนจากระบบ</p>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.notificationID} className="bg-gray-100 p-4 rounded-lg">
            <div
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() =>
                setExpandedNotification(
                  expandedNotification === notification.notificationID
                    ? null
                    : notification.notificationID
                )
              }
            >
              <p className="text-sm font-semibold">{notification.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(notification.sendDate).toLocaleString()}
              </p>
            </div>

            {expandedNotification === notification.notificationID && (
              <div className="mt-2 p-4 bg-white border rounded-lg shadow-sm">
                <p className="text-sm whitespace-pre-line">{notification.message}</p>
                <p className="text-xs text-gray-500">ผู้รับ: {notification.recipient}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function rentalFilter() {
  /*รอใส่ตัวกรองสถานะถึงข้อมุลประวัติรถ */
}


export default function Pro() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [userName, setUserName] = useState("");  // เริ่มต้นเป็น string ว่าง
  const [phoneNumber, setPhoneNumber] = useState("");  // เริ่มต้นเป็น string ว่าง
  const [oldPassword, setOldPassword] = useState(""); // รหัสผ่านเก่า
  const [newPassword, setNewPassword] = useState(""); // รหัสผ่านใหม่
  const router = useRouter();
  const customerID = "" ;
  useEffect(() => {
    // ดึง userName จาก localStorage หากมี
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);  // ถ้ามีค่า userName ใน localStorage ให้ตั้งค่า
    }
  }, []);  // แค่รันครั้งเดียวเมื่อ component โหลด
 
  const menuItems = [
    { id: "profile", label: "จัดการบัญชีโปรไฟล์" },
    { id: "password", label: "เปลี่ยนรหัสผ่าน" },
    { id: "notification", label: "การแจ้งเตือน" },
    { id: "contact", label: "ติดต่อ" },
  ];
  interface DataToSend {
    userName?: string;
    phoneNumber?: string;
  }
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const customerID = sessionStorage.getItem("CustomerID"); // ดึง CustomerID จาก sessionStorage

  // ตรวจสอบว่า CustomerID มีค่า
  if (!customerID) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return;
  }
    // กำหนดค่าของ userName และ phoneNumber ที่ได้รับจาก input
    const updatedUserName = userName.trim(); // ค่า userName ที่ผู้ใช้กรอก
    const updatedPhoneNumber = phoneNumber.trim(); // ค่า phoneNumber ที่ผู้ใช้กรอก
  
    // สร้าง object ที่จะส่งไปใน request
    const dataToSend: DataToSend = {}; 
  
    // เช็คว่าผู้ใช้ได้กรอก userName หรือไม่
    if (updatedUserName) {
      dataToSend.userName = updatedUserName;
    }
  
    // เช็คว่าผู้ใช้ได้กรอก phoneNumber หรือไม่
    if (updatedPhoneNumber) {
      dataToSend.phoneNumber = updatedPhoneNumber;
    }
  
    // ถ้ามีค่าใน dataToSend ให้ทำการส่งข้อมูล
    if (Object.keys(dataToSend).length > 0) {
      const response = await fetch("/api/manageUsername", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...dataToSend,
          customerID: customerID  // ส่ง CustomerID ไป API
        }),
      });
      const result = await response.json(); // ดึงข้อความจาก API
  
      // เช็คผลลัพธ์จาก API
      if (response.ok) {
        // ถ้าเรียบร้อยแสดงผลลัพธ์หรือข้อความสำเร็จ
        alert(result.message);
      } else {
        // ถ้าเกิดข้อผิดพลาด
        alert(result.error);
      }
    } else {
      // ถ้าไม่มีข้อมูลให้ส่งไป
      alert("กรุณาข้อมูลที่ต้องการเปลี่ยนแปลง");
    }
    
  };

  const handleSubmitPasswordChange = async () => {
    const token = localStorage.getItem("token");
    const customerID = sessionStorage.getItem("CustomerID"); // ดึง CustomerID จาก sessionStorage
     console.log("CustomerID:", customerID);

      if (!customerID) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        return;
      }
        

    const response = await fetch("/api/changePW", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,  // ส่ง oldPassword
        newPassword,  // ส่ง newPassword
        customerID    // ส่ง customerID
      }),
    });
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message)
    } else {
      alert(result.error);
    }
  };
  const handleLogout = async () => {
    const name = sessionStorage.getItem("name");
    if (!name) {
      return;
    }
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    sessionStorage.removeItem("CustomerID");
    sessionStorage.removeItem("name");

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();
      alert(result.message); // ออกจากระบบสำเร็จ
  
      // ลบ Token ออกจาก LocalStorage
      localStorage.removeItem("token");
  
      console.log("Token หลัง Logout:", localStorage.getItem("token")); // ควรเป็น null
      if (!token) {
        console.log("❌ ไม่มี Token อยู่แล้ว");
        //alert("ออกจากระบบสำเร็จ ✅");
        router.push("/");
        return;
      }
       // ทำการนำทางหลังจากออกจากระบบ
    } catch (error) {
      console.error("❌ Error logging out:", error);
    }
  }
};

  
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="p-6 min-w-2xl mx-auto ">
            <h2 className="text-xl font-semibold mb-4">จัดการบัญชีโปรไฟล์</h2>
            <form className="flex flex-col space-y-4 " onSubmit={(e) => e.preventDefault() }>
              <label>
                username:
                <input type="text" value={userName}
                 onChange={(e) => setUserName(e.target.value)} className="border p-2 rounded-lg w-full" />
              </label>
              <label>
                phone number:
                <input type="phone" value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}className="border p-2 rounded-lg w-full" />
              </label>
              <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                บันทึกการเปลี่ยนแปลง
              </button>
            </form>
          </div>
        );
        case "password":
          return (
            <div className="p-6 min-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">เปลี่ยนรหัสผ่าน</h2>
              <form className="flex flex-col space-y-4">
                <label>
                  รหัสผ่านเดิม:
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />
                </label>
                <label>
                  รหัสผ่านใหม่:
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSubmitPasswordChange}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
              </form>
            </div>
          );
      case "notification":
        return <NotificationSettings />;
      case "contact":
        return (
          <div className="p-6 min-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">ติดต่อเรา</h2>
            <p>Email: support@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        );
      case "history":
        return (
          <div className=" min-w-2xl mx-auto">
            <div className="grid place-items-center w-full h-full relative">
              <div className="absolute top-0 left-0 w-full text-center text-white bg-white bg-opacity-100 p-5 ">
                <h2 className="text-black text-left text-2xl font-bold ">การจองของฉัน</h2>
                <div className="mt-4 border">
                </div>
                <p className="py-3 px-20 text-gray-800 text-right">สถานะการเช่ารถของฉัน : </p>
              </div>
              <Rental/>
            </div>
          </div>
        );
      default:
        return <div className="p-6 min-w-2xl mx-auto">เลือกเมนูจากแถบด้านซ้าย</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-72 space-y-4 ml-10">
        <div className="flex flex-col items-center mb-10 mt-10">
          <h2 className="text-xl font-semibold mb-4 mt-20">โปรไฟล์</h2>
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">👤</div>
          <div className="mt-4 text-center">
          {/* <p className="text-blue-600 cursor-pointer mt-4">แก้ไข</p> */}
            <p className="text-xl text-blue-600 font-semibold">{userName}</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("history")}
          className={`w-full text-left py-2 px-4 rounded-lg transition-all bg-white ${activeTab === "history" ? "bg-gray-200" : "hover:bg-gray-200"}`}
        >
          การจองของฉัน
        </button>

        <div className="bg-white shadow-lg rounded-lg p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left py-2 px-4 rounded-lg transition-all ${activeTab === item.id ? "bg-gray-200" : "hover:bg-gray-200"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setActiveTab("logout");
            handleLogout();
          }}
          className={`w-full text-left py-2 px-4 rounded-lg transition-all bg-white ${activeTab === "logout" ? "bg-gray-200" : "hover:bg-gray-200"}`}
        >
          ออกจากระบบ
        </button>
      </div>
      <div className="flex-1 p-10 mt-20">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
}
