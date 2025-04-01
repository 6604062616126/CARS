"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Rental {
    id: string;
    carName: string;
    location: string;
    pickupDate: string;
    returnDate: string;
    duration: string;
    status: string;
    imageUrl: string;
}

const rentals: Rental[] = [
    {
        id: "21360",
        carName: "Toyota Camry 2023",
        location: "สนามบินสุวรรณภูมิ",
        pickupDate: "02/04/2025 09:00 น.",
        returnDate: "04/04/2025 15:00 น.",
        duration: "3",
        status: "ยืนยันการเช่า",
        imageUrl: "/benz1.png",
    },
    {
        id: "21357",
        carName: "Toyota Corolla 2023",
        location: "สนามบินสุวรรณภูมิ",
        pickupDate: "01/04/2025 10:00 น.",
        returnDate: "04/04/2025 14:00 น.",
        duration: "4",
        status: "รอการยืนยัน",
        imageUrl: "/car1.png",
    },
    {
        id: "21358",
        carName: "Mazda 3 2024",
        location: "ห้างเซ็นทรัลลาดพร้าว",
        pickupDate: "05/04/2025 09:00 น.",
        returnDate: "07/04/2025 16:00 น.",
        duration: "2",
        status: "ยกเลิกการเช่า",
        imageUrl: "/car1.png",
    },
];

const Rental = () => {
    const router = useRouter();

    return (
        <div className="mt-20">
            <h1 className=" text-blue-900 text-3xl font-bold mb-6">การจองของฉัน</h1>
            <div className="space-y-6">
                {rentals.map((rental) => (
                    <div key={rental.id} className="bg-[#F2F2F2] rounded-lg py-1 px-8 flex flex-col items-center  ">
                        <div className="flex w-full items-center">
                            
                            {/* Column 1 */}
                            <div className="w-full sm:w-1/3 flex flex-col items-start space-y-3 relative">
                                <h2 className="text-xl font-bold text-gray-900 text-start p-3 rounded-lg">
                                    {rental.carName}
                                </h2>
                                <div className="w-72 sm:w-72 h-72 max-w-full">
                                    <Image
                                        src={rental.imageUrl}
                                        alt={rental.carName}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            </div>


                            {/* Column 2: Booking Details */}
                            <div className="w-full sm:w-1/3 px-11 flex flex-col ">
                                <p className="text-gray-500 text-l font-medium py-1">
                                    หมายเลขการเช่า </p>
                                <span className="text-black text-xl font-semibold py-1 ">{rental.id}</span>

                                <div className="mt-4 py-6">
                                    <div className="flex space-x-2 mt-1 ">
                                        <Image src="/location.png" alt="Location Icon" width={20} height={20} />
                                        <p className="text-gray-500 text-sm font-medium  ">จุดรับรถ-คืนรถ</p>
                                    </div>
                                    <p className="text-black text-xl font-semibold py-2">{rental.location}</p>

                                </div>

                                {/* ปุ่มยกเลิกการจอง */}
                                <button className="mt-5 text-gray-500 text-sm font-semibold underline" >
                                    ยกเลิกการเช่า
                                </button>
                            </div>

                            {/* Column 3: Rental Dates & Status */}
                            <div className="w-full sm:w-1/3  flex flex-col items-center  rounded-lg">
                                {/* Pickup Date */}
                                <div className="flex flex-col items-center py-3"> 
                                    <div className="flex items-center space-x-2">
                                        <Image src="/calendar.png" alt="Calendar Icon" width={18} height={18} />
                                        <p className="text-gray-500 text-xs font-medium">วัน-เวลารับรถ</p>
                                    </div>
                                    <p className="text-black text-xs font-semibold font-medium mt-1">{rental.pickupDate}</p> 
                                </div>

                                {/* Duration */}
                                <div className="bg-white px-3 py-1 rounded-full text-gray-700 text-xs">
                                    {rental.duration} วัน
                                </div>

                                {/* Return Date */}
                                <div className="flex flex-col items-center py-3"> 
                                    <div className="flex items-center space-x-2">
                                        <Image src="/calendar.png" alt="Calendar Icon" width={18} height={18} />
                                        <p className="text-gray-500 text-xs font-medium">วัน-เวลาคืนรถ</p>
                                    </div>
                                    <p className="text-black text-xs font-semibold font-medium mt-1">{rental.returnDate}</p> 
                                </div>

                                {/* Booking Status */}
                                <p className="text-gray-500 text-sm text-center py-1">สถานะการจอง</p>
                                <div
                                    className={`text-center ${rental.status === 'ยืนยันการเช่า' ? 'text-blue-500' : rental.status === 'ยกเลิกการเช่า' ? 'text-red-500' : rental.status === 'รอการยืนยัน' ? 'text-green-500' : ''} font-bold text-2xl`}
                                >
                                    {rental.status}
                                </div>

                                <button
                                    className="bg-gray-200 text-gray-500 w-full px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 mt-4 text-center"
                                    onClick={() => router.push(`/rental/${rental.id}`)}
                                >
                                    ดูรายละเอียด
                                </button>

                            </div>



                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rental;
