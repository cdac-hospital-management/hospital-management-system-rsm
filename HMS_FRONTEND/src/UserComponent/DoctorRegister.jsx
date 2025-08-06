import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorRegister = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [genders, setGenders] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/api/user/gender").then((res) => setGenders(res.data.genders || []));
    axios.get("http://localhost:9090/api/doctor/specialist/all").then((res) => setSpecialists(res.data || []));
  }, []);

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
      specialist: "",
      experience: "",
      role: "doctor",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      emailId: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      contact: Yup.string().matches(/^\d{10}$/, "Contact must be 10 digits").required("Contact is required"),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      pincode: Yup.string().matches(/^\d{6}$/, "Pincode must be 6 digits").required("Pincode is required"),
      age: Yup.number().min(18, "Age must be at least 18").required("Age is required"),
      sex: Yup.string().required("Gender is required"),
      specialist: Yup.string().required("Specialist is required"),
      experience: Yup.number().min(0, "Experience must be positive").required("Experience is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      if (selectedImage) formData.append("image", selectedImage);

      try {
        const result = await axios.post("http://localhost:9090/api/doctor/register", formData);
        toast.success("Doctor Registered Successfully!", { position: "top-center" });
      } catch (error) {
        toast.error("Doctor Registration Failed!", { position: "top-center" });
      }
    },
  });

  return (
    <div className="mt-2 d-flex justify-content-center ms-2 me-2 mb-5">
      <div className="card form-card border-color" style={{ width: "50rem" }}>
        <div className="card-header text-center text-white" style={{ backgroundColor: "#3282b8" }}>
          <h5 className="card-title">Register Doctor</h5>
        </div>
        <div className="card-body">
          <form className="row g-3" onSubmit={formik.handleSubmit} encType="multipart/form-data">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email Id", name: "emailId", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Contact No", name: "contact", type: "text" },
              { label: "Age", name: "age", type: "number" },
              { label: "Experience", name: "experience", type: "number" },
              { label: "Street", name: "street", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "Pincode", name: "pincode", type: "text" },
            ].map(({ label, name, type }) => (
              <div className="col-md-6 mb-3" key={name}>
                <label className="form-label"><b>{label}</b></label>
                <input
                  type={type}
                  className={`form-control ${formik.touched[name] && formik.errors[name] ? "is-invalid" : ""}`}
                  {...formik.getFieldProps(name)}
                />
                <div className="invalid-feedback">{formik.errors[name]}</div>
              </div>
            ))}

            {/* Gender Select */}
            <div className="col-md-6 mb-3">
              <label className="form-label"><b>User Gender</b></label>
              <select
                className={`form-control ${formik.touched.sex && formik.errors.sex ? "is-invalid" : ""}`}
                {...formik.getFieldProps("sex")}
              >
                <option value="">Select Gender</option>
                {genders.map((g, idx) => <option key={idx} value={g}>{g}</option>)}
              </select>
              <div className="invalid-feedback">{formik.errors.sex}</div>
            </div>

            {/* Specialist Select */}
            <div className="col-md-6 mb-3">
              <label className="form-label"><b>Specialist</b></label>
              <select
                className={`form-control ${formik.touched.specialist && formik.errors.specialist ? "is-invalid" : ""}`}
                {...formik.getFieldProps("specialist")}
              >
                <option value="">Select Specialist</option>
                {specialists.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
              </select>
              <div className="invalid-feedback">{formik.errors.specialist}</div>
            </div>

            {/* Image Upload */}
            <div className="col-md-6 mb-3">
              <label className="form-label"><b>Select Doctor Image</b></label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success">Register Doctor</button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;