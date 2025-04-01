"use client";
import { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, googleProvider, facebookProvider } from "../../utils/firebaseConfig";
import { signInWithPopup, getRedirectResult } from "firebase/auth";
import "./globals.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"Google" | "Facebook" | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone.trim() || !password.trim()) {
      setError("กรุณากรอกเบอร์โทรศัพท์และรหัสผ่านให้ครบถ้วน");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "เกิดข้อผิดพลาดในการล็อกอิน");
        alert(data.message);
      }
  
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("CustomerID", data.id);
      sessionStorage.setItem("name", data.name);
      
      router.push(data.role === "admin" ? "/admin/" : data.role === "staff" ? "/staff/" : "/");
      alert(data.message);
    


    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "Google" | "Facebook") => {
    if (socialLoading) return;
    try {
      setSocialLoading(provider);
  
      const providerObj = provider === "Google" ? googleProvider : facebookProvider;
      const result = await signInWithPopup(auth, providerObj);
  
      // รับข้อมูล user และ token
    const token = await result.user.getIdToken();
    const userName = result.user.displayName || "ผู้ใช้";  // ใช้ชื่อจาก Google หรือ Facebook

    // เซ็ตค่าใน sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("name", userName);  // เก็บชื่อผู้ใช้
  
      router.push("/");
    } catch (err) {
      console.error("Social login error:", err);
      setError(
        `ล็อกอินด้วย ${provider} ไม่สำเร็จ: ${err instanceof Error ? err.message : "เกิดข้อผิดพลาด"}`
      );
    } finally {
      setSocialLoading(null);
    }
  };
  
  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const token = await result.user.getIdToken();
        sessionStorage.setItem("token", token);
        router.push("/");
      }
    } catch (error) {
      console.error("Error getting redirect result:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  useEffect(() => {
    handleRedirectResult();
  }, []);

  return (
    <div className="full-screen-background">
      <div className="rounded-xl p-4 max-w-sm w-full text-center mt-20">
        <div className="text-left">
          <img src="/logo.png" alt="Logo" className="h-30 mb-2 ml-[-20px]" />
          <h2 className="text-xl font-bold mb-2">ยินดีต้อนรับกลับมา !</h2>
          <p className="text-500 mb-2">สถานที่เช่ารถที่ดีที่สุดสำหรับคุณ</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            className="text-center w-full p-2 border-b border-gray-400 placeholder-gray-500 bg-transparent mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            className="text-center w-full p-2 border-b border-gray-400 placeholder-gray-500 bg-transparent mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`block mx-auto w-[35%] bg-[#0D3489] hover:bg-[#092C5D] btn-shadow text-white py-2 rounded-2xl mb-4 text-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="text-black-250 text-sm mb-4">หรือ</p>

        <button
          onClick={() => handleSocialLogin("Google")}
          disabled={socialLoading === "Google"}
          className={`w-full bg-white hover:bg-gray-200 text-black py-2 rounded-lg btn-shadow mb-4 flex items-center justify-center gap-2 border border-gray-300 ${socialLoading === "Google" ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {socialLoading === "Google" ? (
            <span>กำลังดำเนินการ...</span>
          ) : (
            <>
              <img src="/google.svg" alt="Google" className="h-5 w-5" />
              เข้าสู่ระบบ Google
            </>
          )}
        </button>

        <button
          onClick={() => handleSocialLogin("Facebook")}
          disabled={socialLoading === "Facebook"}
          className={`w-full bg-white hover:bg-gray-200 text-black py-2 rounded-lg mb-6 btn-shadow flex items-center justify-center gap-2 ${socialLoading === "Facebook" ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {socialLoading === "Facebook" ? (
            <span>กำลังดำเนินการ...</span>
          ) : (
            <>
              <FaFacebook className="text-blue-600 h-5 w-5" />
              เข้าสู่ระบบ Facebook
            </>
          )}
        </button>

        <p className="mt-4 text-black ml-2">
          หรือ{" "}
          <Link href="/signin" className="text-[#004FFA] underline">
            สมัครสมาชิก
          </Link>{" "}
          กับเรา
        </p>
      </div>
    </div>
  );
};

export default Login;
