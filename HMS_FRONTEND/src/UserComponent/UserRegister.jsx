import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const navigate = useNavigate();

  const [genders, setGenders] = useState([]);
  const [bloodGroup, setBloodGroup] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  const role =
    document.URL.indexOf("admin") !== -1
      ? "admin"
      : document.URL.indexOf("doctor") !== -1
      ? "doctor"
      : "patient";

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      contact: "",
      street: "",
      city: "",
      pincode: "",
      age: "",
      sex: "",
      bloodGroup: "",
      specialist: "",
      role: role,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      emailId: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password too short").required("Password is required"),
      contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact must be 10 digits")
        .required("Contact number is required"),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
      age: Yup.number().min(0).max(120).required("Age is required"),
      sex: Yup.string().required("Gender is required"),
      bloodGroup: Yup.string().required("Blood Group is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:9090/api/user/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          toast.success("Registered Successfully!", { position: "top-center", autoClose: 1500 });
          navigate("/user/login");
        } else {
          toast.error("Registration failed!", { position: "top-center", autoClose: 1500 });
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!", { position: "top-center", autoClose: 1500 });
      }
    },
  });

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:9090/api/user/gender");
    setGenders(response.data.genders);
  };

  const retrieveAllBloodGroups = async () => {
    const response = await axios.get("http://localhost:9090/api/patient/bloodgroup/all");
    setBloodGroup(response.data);
  };

  const retrieveAllSpecialist = async () => {
    const response = await axios.get("http://localhost:9090/api/doctor/specialist/all");
    setSpecialists(response.data);
  };

  useEffect(() => {
    retrieveAllGenders();
    retrieveAllBloodGroups();
    retrieveAllSpecialist();
  }, []);

  return (
    <div className="container mt-3 mb-5">
      <div className="card shadow border-0 p-4">
        <div className="card-header text-white text-center" style={{ backgroundColor: "#3282b8" }}>
          <h4>Register as {role}</h4>
        </div>
        <form className="row g-3 mt-3" onSubmit={formik.handleSubmit}>
          {/* First Name */}
          <div className="col-md-6">
            <label><b>First Name</b></label>
            <input
              name="firstName"
              type="text"
              className={`form-control ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.firstName}</div>
          </div>

          {/* Last Name */}
          <div className="col-md-6">
            <label><b>Last Name</b></label>
            <input
              name="lastName"
              type="text"
              className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.lastName}</div>
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label><b>Email</b></label>
            <input
              name="emailId"
              type="email"
              className={`form-control ${formik.touched.emailId && formik.errors.emailId ? "is-invalid" : ""}`}
              value={formik.values.emailId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.emailId}</div>
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label><b>Password</b></label>
            <input
              name="password"
              type="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.password}</div>
          </div>

          {/* Contact */}
          <div className="col-md-6">
            <label><b>Contact</b></label>
            <input
              name="contact"
              type="text"
              className={`form-control ${formik.touched.contact && formik.errors.contact ? "is-invalid" : ""}`}
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.contact}</div>
          </div>

          {/* Age */}
          <div className="col-md-6">
            <label><b>Age</b></label>
            <input
              name="age"
              type="number"
              className={`form-control ${formik.touched.age && formik.errors.age ? "is-invalid" : ""}`}
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.age}</div>
          </div>

          {/* Street */}
          <div className="col-md-6">
            <label><b>Street</b></label>
            <textarea
              name="street"
              className={`form-control ${formik.touched.street && formik.errors.street ? "is-invalid" : ""}`}
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.street}</div>
          </div>

          {/* City */}
          <div className="col-md-6">
            <label><b>City</b></label>
            <input
              name="city"
              className={`form-control ${formik.touched.city && formik.errors.city ? "is-invalid" : ""}`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.city}</div>
          </div>

          {/* Pincode */}
          <div className="col-md-6">
            <label><b>Pincode</b></label>
            <input
              name="pincode"
              type="text"
              className={`form-control ${formik.touched.pincode && formik.errors.pincode ? "is-invalid" : ""}`}
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.pincode}</div>
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label><b>Gender</b></label>
            <select
              name="sex"
              className={`form-control ${formik.touched.sex && formik.errors.sex ? "is-invalid" : ""}`}
              value={formik.values.sex}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Gender</option>
              {genders.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{formik.errors.sex}</div>
          </div>

          {/* Blood Group */}
          <div className="col-md-6">
            <label><b>Blood Group</b></label>
            <select
              name="bloodGroup"
              className={`form-control ${formik.touched.bloodGroup && formik.errors.bloodGroup ? "is-invalid" : ""}`}
              value={formik.values.bloodGroup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Blood Group</option>
              {bloodGroup.map((bg, index) => (
                <option key={index} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{formik.errors.bloodGroup}</div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-success px-5">
              Register
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserRegister;
