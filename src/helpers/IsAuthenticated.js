// auth.js
const isAuthenticated = () => {
  const role = localStorage.getItem("role");
  return role !== null && role !== undefined;
};

export const getUserRole = () => {
  return localStorage.getItem("role");
};

export default isAuthenticated;
