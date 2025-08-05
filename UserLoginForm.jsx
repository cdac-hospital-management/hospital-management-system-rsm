import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const UserLoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Role is required"),
      emailId: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await fetch("http://localhost:9090/api/user/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const res = await result.json();

        if (res.role === "admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
        } else if (res.role === "patient") {
          sessionStorage.setItem("active-patient", JSON.stringify(res));
        } else if (res.role === "doctor") {
          sessionStorage.setItem("active-doctor", JSON.stringify(res));
        }

        toast.success("Logged in successfully!", {
          position: "top-center",
          autoClose: 1000,
        });

        navigate("/home");
        window.location.reload(true);
      } catch (error) {
        console.error("Login failed", error);
        toast.error("Invalid credentials!", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    },
  });

  return (
    <div className="d-flex align-items-center justify-content-center mt-4">
      <div className="card form-card shadow" style={{ width: "25rem" }}>
        <div className="card-header text-center text-white" style={{ backgroundColor: "#3282b8" }}>
          <h4 className="card-title">User Login</h4>
        </div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label"><b>User Role</b></label>
              <select
                name="role"
                className={`form-control ${formik.touched.role && formik.errors.role ? "is-invalid" : ""}`}
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
              <div className="invalid-feedback">{formik.errors.role}</div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="emailId" className="form-label"><b>Email Id</b></label>
              <input
                type="email"
                name="emailId"
                className={`form-control ${formik.touched.emailId && formik.errors.emailId ? "is-invalid" : ""}`}
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="invalid-feedback">{formik.errors.emailId}</div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label"><b>Password</b></label>
              <input
                type="password"
                name="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="on"
              />
              <div className="invalid-feedback">{formik.errors.password}</div>
            </div>

            {/* Login Button */}
            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <Link to="/forgot-password" className="text-decoration-none">
                <b>Forgot Password?</b>
              </Link>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
