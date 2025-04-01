"use client";

import React from 'react';
import Link from "next/link";

const Car = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">รายละเอียดรถ</h1>
            <p>This is the SearchCars page.</p>

            <Link href="/payment" className="text-blue-600 hover:underline">
            <button className="w-1/2 mx-auto py-2 bg-[#0D3489] text-white rounded-md hover:bg-[#092C5D] transition flex justify-center items-center">
                เช่ารถคันนี้
            </button>
            </Link>
        </div>
    );
};

export default Car;
