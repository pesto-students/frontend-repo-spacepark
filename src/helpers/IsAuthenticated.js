// auth.js
const isAuthenticated = () => {
  console.log(
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    localStorage.getItem("token") !== null
  );
  return !localStorage.getItem("token") !== null;
};

export default isAuthenticated;
