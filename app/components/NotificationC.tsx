import  TokenManager  from "@/utils/tokenManager"; 
import { mysqlPool } from "@/utils/db";
import {Rental} from "./RentalC" ;
import {Payment} from "./PaymentC" ;
class Notification {
  message: string;
  recipient: string;
  userID: number;

  constructor(message: string, recipient: string, userID: number) {
    this.message = message;
    this.recipient = recipient;
    this.userID = userID;
  }

  // ฟังก์ชันสำหรับส่ง Notification
  async send() {
    const query = `
      INSERT INTO Notifications (message, recipient, CustomerID)
      VALUES (?, ?, ?)
    `;
    const values = [this.message, this.recipient, this.userID];
    await mysqlPool.query(query, values);
  }
}

class NotificationManager {
  private adminObservers: any[] = [];
  private userObservers: { [key: number]: any } = {};

  addAdminObserver(admin: any) {
    this.adminObservers.push(admin);
  }

  addUserObserver(userID: number, observer: any) {
    this.userObservers[userID] = observer;
  }

  removeUserObserver(userID: number) {
    delete this.userObservers[userID];
  }

  // 🔴 แจ้งเตือน "User ยกเลิกการจอง"
  notifyCancellation(rental: Rental) {
    const message = `
      ❌ ⛔ การจองถูกยกเลิก:
      - 🏠 การจองถูกยกเลิกโดยลูกค้า (customerID: ${rental.customerID})
    `;

    // 📨 ส่งให้ User ที่จอง
    if (this.userObservers[rental.customerID]) {
      this.userObservers[rental.customerID].update(message);
    }

    // 📨 ส่งให้ Admin
    this.adminObservers.forEach(admin => admin.update(message));
  }

  // ฟังก์ชันสำหรับตรวจสอบและส่งการแจ้งเตือนหลังการยืนยันการจอง
  async sendrentalNotification(token: string, rental: Rental, payment: Payment, formData: any) {
    const tokenManager = TokenManager.getInstance();
    try {
      const decoded = tokenManager.verifyToken(token);
  
      // หาก token ถูกต้อง, จะสามารถเข้าถึงข้อมูลผู้ใช้และส่งแจ้งเตือนได้
      const userID = decoded.id;
  
      const userMessage = `
        📅 การจองของคุณ:
        - 🏠 การจอง ID
        - 💰 การชำระเงิน: ${payment.amount} บาท
        - 📍 สถานะ: ${rental.rentalStatus}
        - 📝 ข้อมูลเพิ่มเติม: ${formData.details}  // ใช้ข้อมูลจาก formData
      `;
  
      const adminMessage = `
        📢 การจองใหม่:
        - 🏠 การจอง ID
        - 💰 การชำระเงิน: ${payment.amount} บาท
        - 📍 สถานะ: ${rental.rentalStatus}
        - 📝 ข้อมูลเพิ่มเติม: ${formData.details}  // ใช้ข้อมูลจาก formData
      `;
  
      // ส่งการแจ้งเตือนไปยังผู้ใช้
      const userNotification = new Notification(userMessage, `User ${userID}`, userID);
      await userNotification.send();
  
      // ส่งการแจ้งเตือนไปยังแอดมิน
      this.adminObservers.forEach(admin => {
        const adminNotification = new Notification(adminMessage, `Admin ${admin.id}`, admin.id);
        adminNotification.send();
      });
  
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการตรวจสอบ token หรือการส่งการแจ้งเตือน:", error);
    }
  }
}
  

export const notificationManager = new NotificationManager();

  