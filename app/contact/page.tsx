"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Contact: React.FC = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage("ข้อความของคุณถูกส่งเรียบร้อยแล้ว!");
            setUsername("");
            setMessage("");
        }, 1500);
    };

    return (
        <div className="bg-blue-700 p-8 md:p-16">
            {/* Header Section */}
            <div className="flex flex-col items-center p-4 md:p-8 space-y-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white tracking-tight">
                    ติดต่อเรา
                </h1>
                <p className="text-lg md:text-xl text-center text-white/90 max-w-2xl">
                    เรายินดีรับฟังความคิดเห็นและข้อสงสัยจากคุณ
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Contact Form */}
                <div className="bg-white p-6 md:p-9 rounded-3xl shadow-xl space-y-6 transition-all hover:shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-700">ส่งข้อความถึงเรา</h2>
                        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                        <div className="space-y-1">
                            <label htmlFor="username" className="text-sm font-medium text-gray-600">
                                ชื่อผู้ใช้
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="กรุณากรอกชื่อผู้ใช้"
                                className="border-2 border-gray-200 p-3 md:p-4 rounded-xl w-full focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="text-sm font-medium text-gray-600">
                                ข้อความ
                            </label>
                            <textarea
                                id="message"
                                placeholder="ระบุปัญหาของท่าน"
                                className="border-2 border-gray-200 p-3 md:p-4 rounded-xl w-full h-32 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-300 font-medium flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    กำลังส่ง...
                                </>
                            ) : "ส่งข้อความ"}
                        </button>
                    </form>

                    {successMessage && (
                        <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center animate-fade-in">
                            {successMessage}
                        </div>
                    )}
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 md:p-9 rounded-3xl shadow-xl space-y-5 transition-all hover:shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-700">ช่องทางการติดต่ออื่นๆ</h2>
                        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        <a
                            href="mailto:ClubCars999@gmail.com"
                            className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
                        >
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Image
                                    src="/images/email-icon.png"
                                    alt="Email Icon"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                            </div>
                            <span className="text-blue-700 font-medium ml-4">ClubCars999@gmail.com</span>
                        </a>

                        <a
                            href="https://instagram.com/ClubCarsofficial_"
                            className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Image
                                    src="/images/instagram-icon.png"
                                    alt="Instagram Icon"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                            </div>
                            <span className="text-blue-700 font-medium ml-4">@ClubCarsofficial_</span>
                        </a>

                        <a
                            href="https://facebook.com/ClubCarsThailand"
                            className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Image
                                    src="/images/facebook-icon.png"
                                    alt="Facebook Icon"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                            </div>
                            <span className="text-blue-700 font-medium ml-4">ClubCars Thailand</span>
                        </a>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h3 className="font-medium text-gray-600 mb-2">เวลาทำการ</h3>
                        <p className="text-gray-600">จันทร์-ศุกร์ 9.00-18.00 น.</p>
                    </div>
                </div>
            </div>

            {/* Footer Message */}
            <div className="text-white text-center w-full mt-12 max-w-4xl mx-auto">
                <p className="text-lg md:text-xl font-light"> ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด </p>
            </div>
        </div>
    );
};

export default Contact;