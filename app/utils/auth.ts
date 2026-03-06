
export interface User {
email: string;
name:string;
token:string;
role:string;
}

const USER_KEY = "auth_user";

export const loginUser = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
// console.log("user",user)
};
export const getUser = (): User | null => {
      if (typeof window === "undefined") return null;
    const data = localStorage?.getItem(USER_KEY)
//  console.log("data",data)
    return data ? JSON.parse(data) : null;
   
};

export const logoutUser = () => {
    localStorage.removeItem(USER_KEY)
};
// console.log("data",getUser())






// import React, { useState } from "react";
// import Data from "../Data.js";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     email: "",
//     password: "",
//     fullname: "",
//     isUserLogin: false,
//     isAdminLogin: false,
//     isManagerLogin: false,
//   });

//   const { email, password } = state;
//   const handleChange = (event) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let isUserExist = Data.find((user) => {
//       return user.email === email;
//     });

//     if (isUserExist) {
//       if (password === isUserExist.password && isUserExist.role === "Admin") {
//         localStorage.setItem(
//           "AdminToken",
//           "AsiaToJapanAdminhbchsdbjfghkjgfbchsdbjcxjcbdshjoeuwyru"
//         );
//         setState({
//           isAdminLogin: true,
//           fullname: isUserExist.firstName + " " + isUserExist.lastName,
//         });
//         navigate("/admin");
//       } else if (
//         password === isUserExist.password &&
//         isUserExist.role === "User"
//       ) {
//         localStorage.setItem(
//           "UserToken",
//           "AsiaToJapanAdminhbchsdbjfghkjgfbchsdbjcxjcbdshjoeuwyru"
//         );
//         setState({
//           isUserLogin: true,
//           fullname: isUserExist.firstName + " " + isUserExist.lastName,
//         });
//         navigate("/user");
//       } else if (
//         password === isUserExist.password &&
//         isUserExist.role === "Manager"
//       ) {
//         localStorage.setItem(
//           "ManagerToken",
//           "AsiaToJapanAdminhbchsdbjfghkjgfbchsdbjcxjcbdshjoeuwyru"
//         );
//         setState({
//           isManagerLogin: true,
//           fullname: isUserExist.firstName + " " + isUserExist.lastName,
//         });
//         navigate("/manager");
//       } else alert("Wrong Password");
//     } else alert("User Not exist");
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             name="email"
//             value={email}
//             placeholder="Enter Email"
//             onChange={handleChange}
//           />
//         </div>
//         <br />
//         <div>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             placeholder="Enter Password"
//             onChange={handleChange}
//           />
//         </div>
//         <br />
//         <div>
//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;