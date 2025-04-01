"use client";
import { useBooking } from "../context/bookingcontext"; // นำเข้าคอนเท็กซ์
import { useState } from "react";

const BookingForm = () => {
  const { amount, pickupDate, pickupLocation, returnDate, selectedCar } = useBooking();
  const [file, setFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFile(fileUrl); // เก็บ URL ของไฟล์ที่อัพโหลด
    }
  };

  const handleBookingSubmit = async () => {
    if (!selectedCar) {
      console.error("No car selected!");
      return;
    }

    setLoading(true);

    const rentalData = {
      pickupDate,
      pickupLocation,
      returnDate,
      selectedCar,
      amount
    };

    const formData = {
      file,
      firstName,
      lastName,
      email,
      phone,
      address,
      additionalInfo,
    };

    const paymentData = {
      amount: selectedCar.rentalPrice, // สมมุติว่าเรามีการคำนวณราคาจาก selectedCar
      receipt:  file,
      pickupDate,

    };

    const body = { rentalData, paymentData, formData };
  // /app/api/RTdetailadd
    try {
      const response = await fetch("/api/RTdetailadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Booking Successful:", data);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error in booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Booking Form</h2>
      
      <label>
        First Name:
        <input 
          type="text" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          placeholder="Enter your first name" 
        />
      </label>
      <br />
      
      <label>
        Last Name:
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          placeholder="Enter your last name" 
        />
      </label>
      <br />
      
      <label>
        Email:
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
        />
      </label>
      <br />
      
      <label>
        Phone:
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Enter your phone number" 
        />
      </label>
      <br />
      
      <label>
        Address:
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter your address" 
        />
      </label>
      <br />
      
      <label>
        Additional Info:
        <textarea 
          value={additionalInfo} 
          onChange={(e) => setAdditionalInfo(e.target.value)} 
          placeholder="Enter any additional info" 
        />
      </label>
      <br />
      
      <label>
        Upload File:
        <input 
          type="file" 
          onChange={handleFileUpload} 
        />
      </label>
      <br />
      
      <button onClick={handleBookingSubmit} disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookingForm;
