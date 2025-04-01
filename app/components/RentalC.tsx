// /components/RentalC.tsx
import { mysqlPool } from "@/utils/db";
class Rental {

    rentalStatus: string;
    rentalPrice: number;
    startDate: Date;
    endDate: Date;
    location: string;
    carID: number;
    customerID: number;
    staffID: number;
  
    constructor(
      rentalPrice: number,
      startDate: Date,
      endDate: Date,
      location: string,
      carID: number,
      customerID: number,
      staffID: number
  ) {
      this.rentalPrice = rentalPrice;
      this.startDate = startDate; // ✅ แปลงเป็น DATETIME
      this.endDate = startDate;
      this.location = location;
      this.carID = carID;
      this.customerID = customerID;
      this.staffID = staffID;
      this.rentalStatus = "Pending";
  }
  
    // ฟังก์ชันที่ใช้เพื่อบันทึกข้อมูลลงฐานข้อมูล
    async saveToDatabase() {
      // คำสั่ง SQL สำหรับบันทึกข้อมูลการเช่าในตาราง Rental
      const query = `
        INSERT INTO Rental (rentalStatus, rentalPrice, startDate, endDate, location, CarID, CustomerID, staffID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [this.rentalStatus, this.rentalPrice, this.startDate, this.endDate, this.location, this.carID, this.customerID, this.staffID];
      await mysqlPool.query(query, values);
    }
  }
  export { Rental};