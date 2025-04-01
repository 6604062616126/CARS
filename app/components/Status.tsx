// src/components/StatusManager.ts
import { ApprovalStatusFactory } from "./Approval";

// จำลอง Database Query
const db = {
  async query(query: string, values: (string | number)[]) {
    console.log(`Executing Query: ${query}, Values: ${values}`);
    return Promise.resolve();
  },
};

class StatusManager {
  async updateRentalStatus(rentalID: number, newStatus: string) {
    const query = `UPDATE Rental SET rentalStatus = ? WHERE rentalID = ?`;
    const values = [newStatus, rentalID];
    await db.query(query, values);

    // ใช้ Factory Pattern เพื่อสร้างสถานะ
    const statusInstance = ApprovalStatusFactory.createStatus(newStatus);
    statusInstance.handle();

    // ส่ง Notification ตามสถานะที่อัปเดตอิงตามuser token
    
  }

  async updatePaymentStatus(paymentID: number, newStatus: string) {
    const query = `UPDATE Payment SET paymentStatus = ? WHERE paymentID = ?`;
    const values = [newStatus, paymentID];
    await db.query(query, values);

    // ใช้ Factory Pattern เพื่อสร้างสถานะ
    const statusInstance = ApprovalStatusFactory.createStatus(newStatus);
    statusInstance.handle();

    // ส่ง Notification ตามสถานะที่อัปเดตอิงตาม usertoken
    
  }
}

export { StatusManager };
