import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseUtils"; 
export const handleLogout = async (navigate) => {
 
    try {
      await signOut(auth);
      await navigate("/");
      return true;
      
    } catch (error) {
      return false;
    }
  };