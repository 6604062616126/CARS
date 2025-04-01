"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaPlus, FaUser, FaTimes, FaPhone } from "react-icons/fa";

interface ScheduleItem {
    id: string;
    staffName: string;
    staffId: string;
    date: string;
}

interface StaffMember {
    staffID: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const StaffSchedule = () => {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [quickAddData, setQuickAddData] = useState<{ date: string, show: boolean }>({ date: "", show: false });
    const [selectedStaffId, setSelectedStaffId] = useState("");
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
    const [staffList, setStaffList] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch staff list from API
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await fetch('/api/getstaff');
                if (!response.ok) {
                    throw new Error('Failed to fetch staff');
                }
                const data = await response.json();
                setStaffList(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch staff:", error);
                setError("Failed to load staff data");
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleAddClick = (dateStr: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setQuickAddData({ date: dateStr, show: true });
        setSelectedStaffId("");
    };

    const handleAddSchedule = () => {
        if (selectedStaffId) {
            const selectedStaffMember = staffList.find(staff => staff.staffID === selectedStaffId);
            if (selectedStaffMember) {
                const newSchedule: ScheduleItem = {
                    id: Date.now().toString(),
                    staffName: `${selectedStaffMember.firstName} ${selectedStaffMember.lastName}`,
                    staffId: selectedStaffMember.staffID,
                    date: quickAddData.date
                };
                setSchedules([...schedules, newSchedule]);
            }
        }
        setQuickAddData({ date: "", show: false });
    };

    const handleDeleteSchedule = (id: string) => {
        setSchedules(schedules.filter(item => item.id !== id));
    };

    const getSchedulesForDay = (day: number) => {
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return schedules.filter(schedule => schedule.date === dateStr);
    };

    const monthName = new Date(year, month, 1).toLocaleDateString('th-TH', { month: 'long', year: 'numeric' });

    return (
        <main className=" px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-800">ตารางงานพนักงาน</h1>
                    <p className="text-gray-600 mt-2">ระบบจัดการตารางงานสำหรับพนักงาน</p>
                </div>
                <button
                    onClick={() => router.push("/staff")}
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FaChevronLeft />
                    ย้อนกลับ
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Calendar Section - Smaller Width */}
                <div className="lg:w-2/3">
                    {/* Calendar Controls */}
                    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
                        <button
                            onClick={handlePrevMonth}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <FaChevronLeft />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">{monthName}</h2>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Day Names Header */}
                        <div className="grid grid-cols-7 bg-blue-50">
                            {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                                <div key={day} className="p-2 text-center font-medium text-blue-700 text-sm">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-px bg-gray-200">
                            {Array(firstDayOfMonth).fill(0).map((_, i) => (
                                <div key={`empty-${i}`} className="bg-gray-50 min-h-16"></div>
                            ))}

                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                const daySchedules = getSchedulesForDay(day);
                                const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                                const isToday = new Date().toISOString().split('T')[0] === dateStr;
                                const isWeekend = [0, 6].includes(new Date(year, month, day).getDay());

                                return (
                                    <div
                                        key={day}
                                        className={`relative min-h-16 p-1 ${isToday ? 'bg-blue-50 border-t-2 border-blue-500' : isWeekend ? 'bg-gray-50' : 'bg-white'} transition-colors`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className={`text-xs font-medium ${isToday ? 'bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center' : ''}`}>
                                                {day}
                                            </span>
                                            <button
                                                onClick={(e) => handleAddClick(dateStr, e)}
                                                className="text-gray-400 hover:text-blue-500 text-xs p-0.5 rounded-full hover:bg-blue-100 transition-colors"
                                            >
                                                <FaPlus size={8} />
                                            </button>
                                        </div>
                                        <div className="mt-1 space-y-0.5 overflow-y-auto max-h-12">
                                            {daySchedules.map(schedule => {
                                                const staff = staffList.find(s => s.staffID === schedule.staffId);
                                                return (
                                                    <div
                                                        key={schedule.id}
                                                        className="group flex items-center justify-between bg-blue-100 rounded px-1 py-0.5 text-[10px] hover:bg-blue-200 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-1 truncate">
                                                            <FaUser className="text-blue-600" size={8} />
                                                            <span>
                                                                {staff ? `${staff.firstName} ${staff.lastName.charAt(0)}.` : schedule.staffName}
                                                            </span>
                                                        </div>
                                                        <button
                                                            className="text-red-400 hover:text-red-600 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteSchedule(schedule.id);
                                                            }}
                                                        >
                                                            <FaTimes size={8} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Staff List Section */}
                <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-4 h-fit">
                    <div className="flex items-center gap-2 mb-4">
                        <FaUser className="text-blue-500" />
                        <h2 className="text-xl font-semibold text-gray-800">รายชื่อพนักงาน</h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center py-4">{error}</div>
                    ) : (
                        <div className="space-y-3">
                            {staffList.map(staff => (
                                <div
                                    key={staff.staffID}
                                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors ${schedules.some(s => s.staffId === staff.staffID)
                                            ? 'bg-green-50 border border-green-200'
                                            : 'bg-gray-50'
                                        }`}
                                >
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            {staff.firstName} {staff.lastName}
                                            {schedules.some(s => s.staffId === staff.staffID) && (
                                                <span className="ml-2 text-xs text-green-600">(มีตารางงาน)</span>
                                            )}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <FaPhone size={10} />
                                            <span>{staff.phoneNumber}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        ID: {staff.staffID}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Add Modal */}
            {quickAddData.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            เพิ่มพนักงานสำหรับวันที่ {new Date(quickAddData.date).toLocaleDateString('th-TH')}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">เลือกพนักงาน</label>
                            <select
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={selectedStaffId}
                                onChange={(e) => setSelectedStaffId(e.target.value)}
                                autoFocus
                            >
                                <option value="">-- กรุณาเลือกพนักงาน --</option>
                                {staffList.map(staff => (
                                    <option
                                        key={staff.staffID}
                                        value={staff.staffID}
                                        disabled={schedules.some(s =>
                                            s.staffId === staff.staffID && s.date === quickAddData.date
                                        )}
                                    >
                                        {staff.firstName} {staff.lastName}
                                        {schedules.some(s =>
                                            s.staffId === staff.staffID && s.date === quickAddData.date
                                        ) && ' (มีงานแล้ว)'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setQuickAddData({ date: "", show: false })}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleAddSchedule}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                disabled={!selectedStaffId}
                            >
                                ตกลง
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default StaffSchedule; 