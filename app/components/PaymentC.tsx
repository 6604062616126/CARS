import { mysqlPool } from "@/utils/db";

interface PaymentData {
  paymentID?: number;
  amount: number;
  receipt: string;
  paymentDate: string; // รับเป็น string
  customerID: number;
  rentalID: number;
}

class Payment {
  paymentID: number;
  amount: number;
  receipt: string;
  paymentDate: string; // รับเป็น string ก่อน
  customerID: number;
  rentalID: number;

  constructor(data: PaymentData) {
    this.paymentID = data.paymentID || 0;
    this.amount = data.amount || 0.0;
    this.receipt = data.receipt;
    this.paymentDate = data.paymentDate;
    this.customerID = data.customerID;
    this.rentalID = data.rentalID;
  }

  getFormattedDate(): string {
    const date = new Date(this.paymentDate);
    return date.toISOString().slice(0, 19).replace("T", " ");
  }

  async saveToDatabase() {
    const query = `
      INSERT INTO Payments (amount, receipt, paymentDate, customerID, rentalID)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [
      this.amount,
      this.receipt,
      this.getFormattedDate(),
      this.customerID,
      this.rentalID,
    ];

    await mysqlPool.query(query, values);
  }
}

export { Payment };
