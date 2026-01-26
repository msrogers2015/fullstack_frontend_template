import { jwtDecode } from "jwt-decode";
import { useNavigate} from "react-router-dom";

export function getUserData() {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
  return jwtDecode(token)
}

export function clearUserData() {
  localStorage.removeItem(process.env.REACT_APP_TOKEN)
}