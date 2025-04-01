// src/components/ApprovalStatus.ts
interface ApprovalStatus {
    handle(): void;
  }
  
  class PendingStatus implements ApprovalStatus {
    handle(): void {
      console.log("กำลังรอการอนุมัติ...");
    }
  }
  
  class ApprovedStatus implements ApprovalStatus {
    handle(): void {
      console.log("สถานะได้รับการอนุมัติแล้ว");
    }
  }
  
  class RejectedStatus implements ApprovalStatus {
    handle(): void {
      console.log("สถานะถูกปฏิเสธ");
    }
  }
  
  // Factory Pattern สำหรับสร้างสถานะตามชื่อที่ได้รับ
  class ApprovalStatusFactory {
    static createStatus(status: string): ApprovalStatus {
      switch (status) {
        case "pending":
          return new PendingStatus();
        case "approved":
          return new ApprovedStatus();
        case "rejected":
          return new RejectedStatus();
        default:
          throw new Error("สถานะไม่ถูกต้อง");
      }
    }
  }
  
  export { ApprovalStatusFactory };
  
  