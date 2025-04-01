import { config } from "@/config";
const jwt = require("jsonwebtoken");
import { mysqlPool } from "@/utils/db"; 

interface UserData {
  phoneNumber?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}

class TokenManager {
  private static instance: TokenManager;
  private secret: string;

  private constructor() {
    this.secret = config.JWT_SECRET; // JWT Secret key
  }

 //singleton pattern 
  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  // Sign JWT token
  public signToken(payload: object, expiresIn: string = "1h"): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  // Verify JWT token
  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  public async updateToken(userId: number, newData: UserData): Promise<string> {
    try {   
      const updatedUser = await updateUser(userId, newData);
 
      const newToken = this.signToken({
        id: updatedUser.CustomerID,
        phone: updatedUser.phoneNumber,
        role: updatedUser.role,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userName: updatedUser.userName,
      });

      return newToken; 
    } catch (error) {
      throw new Error("Failed to update user or generate token");
    }
  }
}


async function updateUser(userId: number, newData: UserData): Promise<any> {
  try {
  
    const query = `UPDATE Customer SET ? WHERE CustomerID = ?`;
    const [result] = await mysqlPool.promise().query(query, [newData, userId]);

    
     const affectedRows = (result as any)[0]?.affectedRows;

     
     if (!affectedRows || affectedRows === 0) {
       throw new Error("User not found or no changes made");
     }

   
    return {
      CustomerID: userId,
      phoneNumber: newData.phoneNumber , 
      role: newData.role || 'user',            
      firstName: newData.firstName ,
      lastName: newData.lastName ,
      userName: newData.userName ,
    };
  } catch (error) {
    const e = error as Error;
    throw new Error("Database update failed: " + e.message);
  }
}

export default TokenManager; 
