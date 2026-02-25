"use client";
import { useFormik } from "formik";
import { FormValue } from "../interface/interface";
import * as Yup from "yup";
import {  useRouter } from "next/navigation";
import {  loginUser} from "../utils/auth";
// import { useEffect } from "react";
import Data from "../Data";


export default function FormikForm() {
  const router = useRouter();
  // const pathname = usePathname();
  //   useEffect (()=>{
      
  //        const loggedUser=getUser();
  //        console.log("loggedUser",loggedUser)
  //        if(!loggedUser)
  //         return
  //       console.log("dededed")
  //         if(loggedUser.role==="Admin"){
  //  router.replace("/admine");
  //            return;
  //         }else if (loggedUser.role==="User"){
  //          router.replace("/user");
  //         }else if (loggedUser.role==="Manager"){
  //          router.replace("/manager");
  //         }
  //     },[pathname,router])
  
  const formik = useFormik<FormValue>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      // console.log(values);

   handleSubmit(values)
      
    },
  });

  const handleSubmit=(values:FormValue)=>{
    const email=values.email;
    const name=values.name
    const password= values.password

    const isUserExist=Data.find((user)=>{
      // console.log(user.email)
      return user.email === email;
    })
     if(isUserExist){
     if (email === isUserExist.email && password === isUserExist.password && isUserExist.role==="Admin") {
    const token="Admin-wwppwpwpwpwpwoeoeoe32kd"
    const role="Admin"
      loginUser({email,name,token,role})
     router.push("/admin")
      }else if (email === isUserExist.email && password === isUserExist.password && isUserExist.role==="User") {
    const token="User-wwppwpwpwpwpwoeoeoe32kd"
    const role="User"
      loginUser({email,name,token,role})
     router.push("/user")
      }else if (email === isUserExist.email && password === isUserExist.password && isUserExist.role==="Manager") {
    const token="Manager-wwppwpwpwpwpwoeoeoe32kd"
    const role="Manager"
      loginUser({email,name,token,role})
     router.push("/manager")
      }
      
      
      else{
        alert("Invalid credentials")
      }
    }
     else{
        alert(" User not found ")
      }
      

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Login Form
        </h2>

        {/* NAME */}
        <div>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {/* {  submit ? ("submit"):("submited...")} */}
          Submit
        </button>
      </form>
    </div>
  );
}
