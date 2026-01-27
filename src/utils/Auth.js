import { jwtDecode } from "jwt-decode";

/**
 * Decodes token containing user data and returns as an object to prevent information
 * from being easily visible with inspect tools.
 * @returns {object}
 */
export function getUserData() {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN)
  return jwtDecode(token)
}


/**
 * Removes token from localStorage.
 */
export function clearUserData() {
  localStorage.removeItem(process.env.REACT_APP_TOKEN)
}