import "./App.css";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";
import UserRegister from "./UserComponent/UserRegister";
import UserLoginForm from "./UserComponent/UserLoginForm";
import AddAppointment from "./AppointmentComponent/AddAppointment";
import ViewMyAppointment from "./AppointmentComponent/ViewMyAppointment";
import ViewAllAppointment from "./AppointmentComponent/ViewAllAppointment";
import AssignAppointment from "./AppointmentComponent/AssignAppointment";
import ViewAllDoctor from "./UserComponent/ViewAllDoctor";
import ViewAllPatient from "./UserComponent/ViewAllPatient";
import ViewDoctorAppointment from "./AppointmentComponent/ViewDoctorAppointment";
import TreatAppointment from "./AppointmentComponent/TreatAppointment";
import DoctorRegister from "./UserComponent/DoctorRegister";
import WardComponent from "./WardComponent/WardComponent";
import RoomComponent from "./WardComponent/RoomComponent";
import BedComponent from "./WardComponent/BedComponent";
import StaffComponent from "./WardComponent/StaffComponent";
import HospitalStatusDashboard from "./WardComponent/HospitalStatusDashboard";
import WardOverview from "./WardComponent/WardOverview";
import RoomOverview from "./WardComponent/RoomOverview";
import BedOverview from "./WardComponent/BedOverview";
import SendPassword from "./WardComponent/SendPassword";
import ChangePassword from "./WardComponent/ChangePassword";
import FeedbackForm from "./WardComponent/FeedbackForm";
import FeedbackList from "./WardComponent/FeedbackList";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/hotel/location" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="user/doctor/register" element={<DoctorRegister />} />
        <Route path="user/patient/register" element={<UserRegister />} />
        <Route path="user/admin/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/patient/appointment/take" element={<AddAppointment />} />
        <Route path="/patient/appointments/" element={<ViewMyAppointment />} />
        <Route path="/user/doctor/all" element={<ViewAllDoctor />} />
        <Route path="/user/patient/all" element={<ViewAllPatient />} />
        <Route path="/patient/appointments/" element={<ViewMyAppointment />} />
        
        <Route path="/addward" element={<WardComponent />} />
        <Route path="/addRoom" element={<RoomComponent />} />
        <Route path="/addBed" element={<BedComponent />} />
        <Route path="/assignStaff" element={<StaffComponent />} />
        <Route path="/availability" element={<HospitalStatusDashboard />} />
        <Route path="/forgot-password" element={<SendPassword />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
        <Route path="/user/feedback-form" element={<FeedbackForm />} />
        <Route path="/admin/allfeedback" element={<FeedbackList />} />
        
       
        
        
        <Route
          path="/doctor/appointment/all"
          element={<ViewDoctorAppointment />}
        />
        <Route
          path="/admin/appointments/all"
          element={<ViewAllAppointment />}
        />
        <Route
          path="/admin/appointment/:appointmentId/assign"
          element={<AssignAppointment />}
        />
        <Route
          path="/doctor/appointment/:appointmentId/update"
          element={<TreatAppointment />}
        />
      </Routes>
      
    </div>
  );
}

export default App;

