
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Add token if available
  },
});

export default instance;


// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://weeblecode.com/eshopper/public/api", // Replace with your actual API base URL
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Add token if available
//   },
// });

// export default instance;

