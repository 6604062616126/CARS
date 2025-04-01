"use client";
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

// Interface for Car data matching your Prisma model
interface Car {
  carID: number;
  LPlate?: string | null;
  model?: string | null;
  brand?: string | null;
  carType?: string | null;
  rentalPrice?: number | null;
  status?: string | null;
  carImg?: string | null;
}

// Interface for Checkout data
interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  additionalInfo: string;
}

// Main Booking Data interface
interface BookingData {
  customerID: string;
  pickupDate: string;
  pickupLocation: string;
  returnDate: string;
  Days: string;
  amount: string;
  selectedCar: Car | null;
  checkoutData: CheckoutData;
  file: string | null;
}

// Context type that includes both booking data and setter function
interface BookingContextType extends BookingData {
  setBooking: (data: Partial<BookingData>) => void;
}

// Create Context with proper typing
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Default values for booking state
const defaultBookingState: BookingData = {
  customerID: "",
  pickupDate: "",
  pickupLocation: "",
  returnDate: "",
  Days: "",
  amount: "",
  selectedCar: null,
  checkoutData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
  },
  file: null,
};

// Provider component
export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingData>(defaultBookingState);

  // Memoized setBooking function to prevent unnecessary re-renders
  const setBooking = useCallback((data: Partial<BookingData>) => {
    setBookingState(prev => {
      const updatedBooking = { ...prev, ...data };
      console.log("Updated Booking Data:", updatedBooking);
      return updatedBooking;
    });
  }, []);

  // Test data - remove in production
  useEffect(() => {
    setBooking({
      customerID: "1",
      pickupDate: "2024-04-10T10:00:00",
      returnDate: "2024-04-15T18:00:00",
      pickupLocation: "Bangkok",
      selectedCar: {
        carID: 1,
        LPlate: "กข1234",
        model: "Camry",
        brand: "Toyota",
        carType: "Sedan",
        rentalPrice: 1500,
        status: "Available",
        carImg: "/cars/toyota-camry.jpg"
      },
      checkoutData: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "0812345678",
        address: "123 Bangkok Street",
        additionalInfo: "Test booking",
      },
      file: "https://example.com/receipt.jpg",
    });
  }, [setBooking]);

  // Combine state and setter function for context value
  const contextValue: BookingContextType = {
    ...booking,
    setBooking,
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook for using booking context
export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }

  return context;
}