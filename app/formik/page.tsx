"use client";
import { useFormik } from "formik";
import { FormValue } from "../interface/interface";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { getUser, loginUser} from "../utils/auth";
import { useEffect } from "react";


export default function FormikForm() {
  const router = useRouter();
    useEffect (()=>{
         const loggedUser=getUser();
         console.log(loggedUser)
         if(!loggedUser)
          return
        console.log("dededed")
          if(loggedUser){
             router.push("/dashboard") 
             return;
          }else{
             router.push("/formik")
             return ;
          }
      },[router])
  
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
    const name=values.name;
    const token="wwppwpwpwpwpwoeoeoe32kd"
     if (values.email === "kuljeet.pixlerlab@gmail.com" && values.password === "123") {
     loginUser({email,name,token})
     router.push("/dashboard")
      }else{
        alert("Invalid credentials")
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
