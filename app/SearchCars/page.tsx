"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useBooking } from '../context/bookingcontext';
import { useRouter } from "next/navigation";

const SearchCars = () => {
  const searchParams = useSearchParams();
  const initialPickupDate = searchParams.get("pickupDate") || "";
  const initialPickupLocation = searchParams.get("pickupLocation") || "MRT_Pahonyothin";

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.replace(" ", "T");
  };

  const [pickupDate, setPickupDate] = useState(formatDate(initialPickupDate));
  const [pickupLocation, setPickupLocation] = useState(initialPickupLocation);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter fields
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [carType, setCarType] = useState("Sedan");

  // Use Context to save booking data
  const { setBooking } = useBooking();

  useEffect(() => {
    console.log("pickupDate from URL:", initialPickupDate);
    console.log("pickupLocation from URL:", initialPickupLocation);

    setPickupDate(formatDate(initialPickupDate));
    setPickupLocation(initialPickupLocation);

    const fetchCars = async () => {
      try {
        const res = await fetch("/api/getcar");
        const data = await res.json();
        if (res.ok) {
          setCars(data);
        } else {
          console.error("Error fetching cars data:", data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars data:", error);
        setLoading(false);
      }
    };
    fetchCars();
  }, [initialPickupDate, initialPickupLocation]);

  const handleSearch = async () => {
    setLoading(true);

    const body = {
      minPrice: minPrice ? Number(minPrice) : 1,
      maxPrice: maxPrice ? Number(maxPrice) : 9999999,
      carType,
      pickupLocation,
    };

    try {
      const response = await fetch("/api/SearchCars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setCars(data);
      } else {
        console.error("Error fetching cars:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }

    setLoading(false);
  };

  const router = useRouter();

  const handleDetails = (selectedCar: any) => {
    setBooking({
      pickupDate: pickupDate || "",
      pickupLocation: pickupLocation || "",
      selectedCar,
    });

    // รอสักครู่เพื่อให้ setBooking ทำงานก่อนเปลี่ยนหน้า
    setTimeout(() => {
      router.push(`/rentdetail`);
    }, 300);
  };

  if (loading) return <div>กำลังโหลด...</div>;

  return (
    <div className="container mx-auto mt-[2cm] w-[90%]">
      {/* Filters */}
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 md:col-span-1 h-[400px]">
          <h2 className="text-xl font-bold mb-4">ตัวกรองการค้นหา</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">ช่วงราคา</label>
            <div className="flex space-x-2">
              <input type="number" min="1" className="border p-2 w-full rounded-md" placeholder="ขั้นต่ำ" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <input type="number" min="1" className="border p-2 w-full rounded-md" placeholder="สูงสุด" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">ประเภทของรถ</label>
            <select className="border p-2 w-full rounded-md" value={carType} onChange={(e) => setCarType(e.target.value)}>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Pickup">Pickup</option>
              <option value="Van">Van</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">สถานที่รับ-คืนรถ</label>
            <select className="border p-2 w-full rounded-md" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
              <option>สนามบินดอนเมือง</option>
              <option>สนามบินสุวรรณภูมิ</option>
              <option>ตัวเมืองกรุงเทพ</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button className="bg-[#0D3489] text-white px-6 py-2 rounded-md hover:bg-[#092C5D] mt-3 transition" onClick={handleSearch}>
              ค้นหา
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-6">ผลการค้นหา : รถทั้งหมด</h1>
          <div className="grid grid-cols-1 gap-6">
            {Array.isArray(cars) && cars.length > 0 ? (
              cars.map((car, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row w-[95%]">
                  <div className="md:w-1/3">
                    <Image
                      src="/car1.png"
                      alt="Car Image"
                      width={320}
                      height={180}
                      className="rounded-lg object-cover w-full h-auto"
                    />
                  </div>
                  <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 font-medium">ป้ายทะเบียน</p>
                        <p className="text-lg font-semibold">{car.LPlate || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">ยี่ห้อ</p>
                        <p className="text-lg font-semibold">{car.brand || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">รุ่น</p>
                        <p className="text-lg font-semibold">{car.model || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">ประเภทรถ</p>
                        <p className="text-lg font-semibold">{car.carType || "-"}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500 font-medium">สถานะ</p>
                        <p className={`text-lg font-semibold ${car.status === 'available' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                          {car.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">ราคา</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {car.rentalPrice ? `${car.rentalPrice} บาท/วัน` : "-"}
                        </p>
                      </div>
                    </div>


                    <div className="mt-6 text-right">
                      <Link href={`/rentdetail`}>
                        <button
                          className="bg-[#0D3489] text-white px-6 py-2 rounded-md hover:bg-[#092C5D] transition"
                          onClick={() => handleDetails(car)}
                        >
                          รายละเอียดรถเช่า
                        </button>
                      </Link>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                ไม่พบข้อมูลรถในขณะนี้
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCars;