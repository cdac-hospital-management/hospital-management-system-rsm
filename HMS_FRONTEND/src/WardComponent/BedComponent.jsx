// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

// const BedComponent = () => {
//   const [beds, setBeds] = useState([]);
//   const [bedDto, setBedDto] = useState({ id: 0, bedNumber: '', status: '', roomId: '' });
//   const [isEdit, setIsEdit] = useState(false);

//   const api = 'http://localhost:9090/api/beds';

//   useEffect(() => {
//     fetchBeds();
//   }, []);

//   const fetchBeds = async () => {
//     try {
//       const res = await axios.get(api);
//       setBeds(res.data);
//     } catch (err) {
//       toast.error('Error fetching beds');
//     }
//   };

//   const handleChange = (e) => {
//     setBedDto({ ...bedDto, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEdit) {
//         await axios.put(`${api}/${bedDto.id}`, bedDto);
//         toast.success('Bed updated');
//       } else {
//         await axios.post(api, bedDto);
//         toast.success('Bed added');
//       }
//       fetchBeds();
//       setBedDto({ id: 0, bedNumber: '', status: '', roomId: '' });
//       setIsEdit(false);
//     } catch (err) {
//       toast.error('Error saving bed');
//     }
//   };

//   const handleEdit = (bed) => {
//     setBedDto(bed);
//     setIsEdit(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${api}/${id}`);
//       toast.success('Bed deleted');
//       fetchBeds();
//     } catch (err) {
//       toast.error('Error deleting bed');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <ToastContainer />
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card shadow p-4">
//             <h4 className="text-center mb-4">{isEdit ? 'Update Bed' : 'Add New Bed'}</h4>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Bed Number</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="bedNumber"
//                   value={bedDto.bedNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Status</label>
//                 <select
//                   className="form-control"
//                   name="status"
//                   value={bedDto.status}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">-- Select Status --</option>
//                   <option value="Available">Available</option>
//                   <option value="Occupied">Occupied</option>
//                   <option value="Maintenance">Maintenance</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Room ID</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   name="roomId"
//                   value={bedDto.roomId}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="d-grid">
//                 <button className="btn btn-primary" type="submit">
//                   {isEdit ? 'Update' : 'Add Bed'}
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="mt-5">
//             <h4 className="text-center mb-3">All Beds</h4>
//             <div className="table-responsive">
//               <table className="table table-striped table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>ID</th>
//                     <th>Bed Number</th>
//                     <th>Status</th>
//                     <th>Room ID</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {beds.map((bed) => (
//                     <tr key={bed.id}>
//                       <td>{bed.id}</td>
//                       <td>{bed.bedNumber}</td>
//                       <td>{bed.status}</td>
//                       <td>{bed.roomId}</td>
//                       <td>
//                         <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(bed)}>
//                           Edit
//                         </button>
//                         <button className="btn btn-danger btn-sm" onClick={() => handleDelete(bed.id)}>
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {beds.length === 0 && (
//                     <tr>
//                       <td colSpan="5" className="text-center">No beds found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BedComponent;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const BedComponent = () => {
    const [beds, setBeds] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [bedDto, setBedDto] = useState({
        id: 0,
        bedNumber: '',
        status: '',
        roomId: ''
    });
    const [isEdit, setIsEdit] = useState(false);

    const bedApi = 'http://localhost:9090/api/beds';
    const roomApi = 'http://localhost:9090/api/rooms';

    useEffect(() => {
        fetchBeds();
        fetchRooms();
    }, []);

    const fetchBeds = async () => {
        try {
            const res = await axios.get(bedApi);
            setBeds(res.data);
        } catch (err) {
            toast.error('Error fetching beds');
        }
    };

    const fetchRooms = async () => {
        try {
            const res = await axios.get(roomApi);
            setRooms(res.data);
        } catch (err) {
            toast.error('Error fetching rooms');
        }
    };

    const handleChange = (e) => {
        setBedDto({ ...bedDto, [e.target.name]: e.target.value });
    };

    const handleRoomChange = (e) => {
        const selectedRoomId = e.target.value;
        setBedDto({ ...bedDto, roomId: selectedRoomId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`${bedApi}/${bedDto.id}`, bedDto);
                toast.success('Bed updated');
            } else {
                await axios.post(bedApi, bedDto);
                toast.success('Bed added');
            }
            fetchBeds();
            setBedDto({ id: 0, bedNumber: '', status: '', roomId: '' });
            setIsEdit(false);
        } catch (err) {
            toast.error('Error saving bed');
        }
    };

    const handleEdit = (bed) => {
        setBedDto(bed);
        setIsEdit(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${bedApi}/${id}`);
            toast.success('Bed deleted');
            fetchBeds();
        } catch (err) {
            toast.error('Error deleting bed');
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow p-4">
                        <h4 className="text-center mb-4">{isEdit ? 'Update Bed' : 'Add New Bed'}</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Bed Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bedNumber"
                                    value={bedDto.bedNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={bedDto.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Select Status --</option>
                                    <option value="Available">Available</option>
                                    <option value="Occupied">Occupied</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Room Number</label>
                                <select
                                    className="form-control"
                                    name="roomId"
                                    value={bedDto.roomId}
                                    onChange={handleRoomChange}
                                    required
                                >
                                    <option value="">-- Select Room --</option>
                                    {rooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.number}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary" type="submit">
                                    {isEdit ? 'Update' : 'Add Bed'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-5">
                        <h4 className="text-center mb-3">All Beds</h4>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Bed Number</th>
                                        <th>Status</th>
                                        <th>Room Number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {beds.map((bed) => {
                                        const room = rooms.find((r) => r.id === bed.roomId);
                                        return (
                                            <tr key={bed.id}>
                                                <td>{bed.id}</td>
                                                <td>{bed.bedNumber}</td>
                                                <td>{bed.status}</td>
                                                <td>{room ? room.number : 'N/A'}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => handleEdit(bed)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(bed.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {beds.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                No beds found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BedComponent;
