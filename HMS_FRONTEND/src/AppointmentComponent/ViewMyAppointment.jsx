// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ViewMyAppointment = () => {
//   let navigate = useNavigate();
//   const [allAppointments, setAllAppointments] = useState([]);

//   const patient = JSON.parse(sessionStorage.getItem("active-patient"));

//   useEffect(() => {
//     const getAllAppointments = async () => {
//       const allAppointments = await retrieveAllAppointments();
//       if (allAppointments) {
//         setAllAppointments(allAppointments);
//       }
//     };

//     getAllAppointments();
//   }, []);

//   const retrieveAllAppointments = async () => {
//     const response = await axios.get(
//       "http://localhost:9090/api/appointment/patient/id?patientId=" + patient.id
//     );
//     console.log(response.data);
//     return response.data;
//   };

//   const cancelAppointment = (appointmentId) => {
//     console.log(appointmentId);
//     console.log("ghittinh api ** ");
//     fetch("http://localhost:9090/api/appointment/patient/update", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         appointmentId: appointmentId,
//         status: "Cancel",
//       }),
//     }).then((result) => {
//       console.log(result);
//       result.json().then((res) => {
//         console.log(res);
//         navigate("/patient/appointments");
//         console.log(res);
//         toast.success(res, {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//     });

//     window.location.reload(true);
//   };

//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
//         style={{
//           height: "45rem",
//         }}
//       >
//         <div className="card-header custom-bg-text text-center " style={{backgroundColor:"#3282b8"}}>
//           <h2>All Appointments</h2>
//         </div>
//         <div
//           className="card-body"
//           style={{
//             overflowY: "auto",
//           }}
//         >
//           <div className="table-responsive">
//             <table className="table table-hover text-color text-center">
//               <thead className="table-bordered border-color bg-color custom-bg-text">
//                 <tr>
//                   <th scope="col">Patient Name</th>
//                   <th scope="col">Patient Contact</th>
//                   <th scope="col">Problem</th>
//                   <th scope="col">Doctor Name</th>
//                   <th scope="col">Precription</th>
//                   <th scope="col">Appointment Take Date</th>
//                   <th scope="col">Appointment Date</th>
//                   <th scope="col">Appointment Status</th>
//                   <th scope="col">Appointment Price</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allAppointments.map((a) => {
//                   return (
//                     <tr>
//                       <td>
//                         <b>{a.patientName}</b>
//                       </td>

//                       <td>
//                         <b>{a.patientContact}</b>
//                       </td>
//                       <td>
//                         <b>{a.problem}</b>
//                       </td>
//                       <td>
//                         <b>{a.doctorName}</b>
//                       </td>
//                       <td>
//                         <b>{a.prescription}</b>
//                       </td>
//                       <td>
//                         <b>{a.date}</b>
//                       </td>
//                       <td>
//                         <b>{a.appointmentDate}</b>
//                       </td>
//                       <td>
//                         <b>{a.status}</b>
//                       </td>
//                       <td>
//                         <b>{a.price}</b>
//                       </td>
//                       <td>
//                         {(() => {
//                           if (a.status === "Not Assigned to Doctor") {
//                             return (
//                               <button
//                                 onClick={() => cancelAppointment(a.id)}
//                                 className="btn btn-sm bg-color custom-bg-text"
//                               >
//                                 Cancel
//                               </button>
//                             );
//                           }
//                         })()}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMyAppointment;


import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewMyAppointment = () => {
  let navigate = useNavigate();
  const [allAppointments, setAllAppointments] = useState([]);

  const patient = JSON.parse(sessionStorage.getItem("active-patient"));

  useEffect(() => {
    const getAllAppointments = async () => {
      const allAppointments = await retrieveAllAppointments();
      if (allAppointments) {
        setAllAppointments(allAppointments);
      }
    };

    getAllAppointments();
  }, []);

  const retrieveAllAppointments = async () => {
    const response = await axios.get(
      `http://localhost:9090/api/appointment/patient/id?patientId=${patient.id}`
    );
    console.log(response.data);
    return response.data;
  };

  const cancelAppointment = (appointmentId) => {
    fetch("http://localhost:9090/api/appointment/patient/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: appointmentId,
        status: "Cancel",
      }),
    }).then((result) => {
      result.json().then((res) => {
        toast.success("Appointment Cancelled Successfully", {
          position: "top-center",
          autoClose: 1000,
        });
        navigate("/patient/appointments");
        window.location.reload();
      });
    });
  };

  // const handlePayment = (appointment) => {
  //   const options = {
  //     key: "rzp_test_9C5DF9gbJINYTA", // Replace with your Razorpay Key
  //     amount: appointment.price * 100, // Convert to smallest currency unit
  //     currency: "INR",
  //     name: "MedEase Payment",
  //     description: `Payment for Appointment ID: ${appointment.id}`,
  //     handler: (response) => {
  //       // Update status to "Paid" after successful payment
  //       const updatedAppointments = allAppointments.map((a) => {
  //         if (a.id === appointment.id) {
  //           return { ...a, status: "Paid" };
  //         }
  //         return a;
  //       });
  //       setAllAppointments(updatedAppointments);
  //       toast.success("Payment Successful!", {
  //         position: "top-center",
  //         autoClose: 1000,
  //       });
  //     },
  //     prefill: {
  //       name: patient.name,
  //       email: patient.email,
  //       contact: patient.contact,
  //     },
  //     theme: {
  //       color: "#3282b8",
  //     },
  //   };

  //   const razorpay = new window.Razorpay(options);
  //   razorpay.open();
  // };
  const handlePayment = (appointment) => {
    const options = {
      key: "rzp_test_Tt4SYnPDGTt6XU", // Replace with your Razorpay Key
      amount: appointment.price * 100, // Convert to smallest currency unit
      currency: "INR",
      name: "MedEase Payment",
      description: `Payment for Appointment ID: ${appointment.id}`,
      handler: async (response) => {
        try {
          // API call to update the status to "Paid"
          const result = await axios.post(
            "http://localhost:9090/api/appointment/patient/update",
            {
              appointmentId: appointment.id,
              status: "Paid",
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (result.status === 200) {
            // Update UI with the new status
            const updatedAppointments = allAppointments.map((a) => {
              if (a.id === appointment.id) {
                return { ...a, status: "Paid" };
              }
              return a;
            });
            setAllAppointments(updatedAppointments);

            // Show success notification
            toast.success("Payment Successful!", {
              position: "top-center",
              autoClose: 1000,
            });
          } else {
            toast.error("Failed to update payment status!", {
              position: "top-center",
              autoClose: 1000,
            });
          }
        } catch (error) {
          console.error("Error updating payment status:", error);
          toast.error("An error occurred during payment!", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      },
      prefill: {
        name: patient.name,
        email: patient.email,
        contact: patient.contact,
      },
      theme: {
        color: "#3282b8",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };


  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{ height: "45rem" }}
      >
        <div
          className="card-header custom-bg-text text-center"
          style={{ backgroundColor: "#3282b8" }}
        >
          <h2>All Appointments</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Patient Contact</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Doctor Name</th>
                  <th scope="col">Prescription</th>
                  <th scope="col">Appointment Take Date</th>
                  <th scope="col">Appointment Date</th>
                  <th scope="col">Appointment Status</th>
                  <th scope="col">Appointment Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allAppointments.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <b>{a.patientName}</b>
                    </td>
                    <td>
                      <b>{a.patientContact}</b>
                    </td>
                    <td>
                      <b>{a.problem}</b>
                    </td>
                    <td>
                      <b>{a.doctorName}</b>
                    </td>
                    <td>
                      <b>{a.prescription}</b>
                    </td>
                    <td>
                      <b>{a.date}</b>
                    </td>
                    <td>
                      <b>{a.appointmentDate}</b>
                    </td>
                    <td>
                      <b>{a.status}</b>
                    </td>
                    <td>
                      <b>{a.status === "Paid" ? 0 : a.price}</b>
                    </td>
                    <td>
                      {a.status === "Not Assigned to Doctor" && (
                        <button
                          onClick={() => cancelAppointment(a.id)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          Cancel
                        </button>
                      )}
                      {a.status === "Treatment Done" && (
                        <button
                          onClick={() => handlePayment(a)}
                          className="btn btn-sm bg-success text-white"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewMyAppointment;
