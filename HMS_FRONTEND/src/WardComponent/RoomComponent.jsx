// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Form, Button, Card, Table, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const RoomComponent = () => {
//   const [rooms, setRooms] = useState([]);
//   const [roomDto, setRoomDto] = useState({ number: "", capacity: "", wardId: "" });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const fetchRooms = async () => {
//     const res = await axios.get("http://localhost:9090/api/rooms");
//     setRooms(res.data);
//   };

//   const handleChange = (e) => {
//     setRoomDto({ ...roomDto, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:9090/api/rooms/${editingId}`, roomDto);
//       } else {
//         await axios.post("http://localhost:9090/api/rooms", roomDto);
//       }
//       setRoomDto({ number: "", capacity: "", wardId: "" });
//       setEditingId(null);
//       fetchRooms();
//     } catch (err) {
//       alert("Error saving room: " + err.message);
//     }
//   };

//   const handleEdit = (room) => {
//     setRoomDto({
//       number: room.number,
//       capacity: room.capacity,
//       wardId: room.wardId,
//     });
//     setEditingId(room.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:9090/api/rooms/${id}`);
//     fetchRooms();
//   };

//   return (
//     <div className="container mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card className="shadow-lg p-4 rounded">
//             <Card.Title className="text-center mb-4">
//               {editingId ? "Update Room" : "Add New Room"}
//             </Card.Title>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Room Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="number"
//                   value={roomDto.number}
//                   onChange={handleChange}
//                   placeholder="Enter Room Number"
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Capacity</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="capacity"
//                   value={roomDto.capacity}
//                   onChange={handleChange}
//                   placeholder="Enter Capacity"
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Ward ID</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="wardId"
//                   value={roomDto.wardId}
//                   onChange={handleChange}
//                   placeholder="Enter Ward ID"
//                   required
//                 />
//               </Form.Group>
//               <Button variant={editingId ? "warning" : "primary"} type="submit" className="w-100">
//                 {editingId ? "Update Room" : "Add Room"}
//               </Button>
//             </Form>
//           </Card>
//         </Col>
//       </Row>

//       <h4 className="text-center mt-5">Room List</h4>
//       <Table striped bordered hover responsive className="mt-3">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Room No</th>
//             <th>Capacity</th>
//             <th>Ward ID</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room) => (
//             <tr key={room.id}>
//               <td>{room.id}</td>
//               <td>{room.number}</td>
//               <td>{room.capacity}</td>
//               <td>{room.wardId}</td>
//               <td>
//                 <Button variant="info" size="sm" onClick={() => handleEdit(room)} className="me-2">
//                   Edit
//                 </Button>
//                 <Button variant="danger" size="sm" onClick={() => handleDelete(room.id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default RoomComponent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Table, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomComponent = () => {
    const [rooms, setRooms] = useState([]);
    const [wards, setWards] = useState([]);
    const [roomDto, setRoomDto] = useState({ number: "", capacity: "", wardId: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchRooms();
        fetchWards();
    }, []);

    const fetchRooms = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/rooms");
            setRooms(res.data);
        } catch (err) {
            alert("Error fetching rooms");
        }
    };

    const fetchWards = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/wards");
            setWards(res.data);
        } catch (err) {
            alert("Error fetching wards");
        }
    };

    const handleChange = (e) => {
        setRoomDto({ ...roomDto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:9090/api/rooms/${editingId}`, roomDto);
            } else {
                await axios.post("http://localhost:9090/api/rooms", roomDto);
            }
            setRoomDto({ number: "", capacity: "", wardId: "" });
            setEditingId(null);
            fetchRooms();
        } catch (err) {
            alert("Error saving room: " + err.message);
        }
    };

    const handleEdit = (room) => {
        setRoomDto({
            number: room.number,
            capacity: room.capacity,
            wardId: room.wardId,
        });
        setEditingId(room.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:9090/api/rooms/${id}`);
        fetchRooms();
    };

    return (
        <div className="container mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg p-4 rounded">
                        <Card.Title className="text-center mb-4">
                            {editingId ? "Update Room" : "Add New Room"}
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Room Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="number"
                                    value={roomDto.number}
                                    onChange={handleChange}
                                    placeholder="Enter Room Number"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Capacity</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="capacity"
                                    value={roomDto.capacity}
                                    onChange={handleChange}
                                    placeholder="Enter Capacity"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Ward</Form.Label>
                                <Form.Select
                                    name="wardId"
                                    value={roomDto.wardId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Select Ward --</option>
                                    {wards.map((ward) => (
                                        <option key={ward.id} value={ward.id}>
                                            {ward.name} ({ward.type})
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button variant={editingId ? "warning" : "primary"} type="submit" className="w-100">
                                {editingId ? "Update Room" : "Add Room"}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>

            <h4 className="text-center mt-5">Room List</h4>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Room No</th>
                        <th>Capacity</th>
                        <th>Ward ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.number}</td>
                            <td>{room.capacity}</td>
                            <td>{room.wardId}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() => handleEdit(room)}
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(room.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default RoomComponent;
