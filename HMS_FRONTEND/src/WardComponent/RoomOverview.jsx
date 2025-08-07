// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Card, Container, Row, Col, Button } from "react-bootstrap";
// // import { useParams, useNavigate } from "react-router-dom";

// // const RoomOverview = () => {
// //   const [rooms, setRooms] = useState([]);
// //   const { wardId } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     axios.get(`http://localhost:9090/api/rooms/ward/${wardId}`)
// //       .then(res => setRooms(res.data))
// //       .catch(err => console.error(err));
// //   }, [wardId]);

// //   const handleRoomClick = (roomId) => {
// //     navigate(`/rooms/${roomId}/beds`);
// //   };

// //   return (
// //     <Container className="mt-4">
// //       <h4 className="text-center mb-3">Rooms in Ward {wardId}</h4>
// //       <Row>
// //         {rooms.map((room) => (
// //           <Col xs={6} md={3} key={room.id} className="mb-4">
// //             <Card
// //               border="primary"
// //               className="text-center"
// //               onClick={() => handleRoomClick(room.id)}
// //               style={{ cursor: "pointer" }}
// //             >
// //               <Card.Body>
// //                 <Card.Title>Room {room.id}</Card.Title>
// //                 <Card.Text>Ward {room.wardId}</Card.Text>
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>
// //       <div className="text-center mt-3">
// //         <Button variant="secondary" onClick={() => navigate("/wards")}>⬅ Back to Wards</Button>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default RoomOverview;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Container, Row, Col, Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";

// const RoomOverview = () => {
//   const [rooms, setRooms] = useState([]);
//   const { wardId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:9090/api/rooms/ward/${wardId}`)
//       .then(res => setRooms(res.data))
//       .catch(err => console.error(err));
//   }, [wardId]);

//   const handleRoomClick = (roomId) => {
//     navigate(`/rooms/${roomId}/beds`);
//   };

//   return (
//     <Container className="mt-4">
//       <h4 className="text-center mb-3">Rooms in Ward {wardId}</h4>
//       <Row>
//         {rooms.map((room) => (
//           <Col xs={6} md={3} key={room.id} className="mb-4">
//             <Card
//               border="primary"
//               className="text-center"
//               onClick={() => handleRoomClick(room.id)}
//               style={{ cursor: "pointer" }}
//             >
//               <Card.Body>
//                 <Card.Title>Room {room.id}</Card.Title>
//                 <Card.Text>Ward {room.wardId}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <div className="text-center mt-3">
//         <Button variant="secondary" onClick={() => navigate("/wards")}>⬅ Back to Wards</Button>
//       </div>
//     </Container>
//   );
// };

// export default RoomOverview;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const RoomOverview = () => {
    const [rooms, setRooms] = useState([]);
    const { wardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9090/api/rooms/ward/${wardId}`)
            .then(response => {
                const responseData = response.data;

                // ✅ Ensure response is an array before setting
                if (Array.isArray(responseData)) {
                    setRooms(responseData);
                } else {
                    console.warn("Expected an array but got:", responseData);
                    setRooms([]); // fallback to empty
                }
            })
            .catch(error => {
                console.error("Failed to fetch rooms:", error);
                setRooms([]); // fallback to empty
            });
    }, [wardId]);

    const handleRoomClick = (roomId) => {
        navigate(`/rooms/${roomId}/beds`);
    };

    return (
        <Container className="mt-4">
            <h4 className="text-center mb-4">Rooms in Ward {wardId}</h4>

            {rooms.length === 0 ? (
                <p className="text-center text-danger">No rooms found in this ward.</p>
            ) : (
                rooms.map((room) => (
                    <Card key={room.id} className="mb-4 shadow">
                        <Card.Header className="bg-primary text-white text-center">
                            <h5>Room {room.id} (Capacity: {room.capacity})</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {Array.from({ length: room.capacity }, (_, i) => (
                                    <Col
                                        xs={3}
                                        sm={2}
                                        md={1}
                                        key={i}
                                        className="mb-3 d-flex justify-content-center"
                                    >
                                        <div
                                            className="border border-success rounded text-center"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                lineHeight: "40px",
                                                backgroundColor: "#e6ffe6",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <div className="text-center mt-3">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => handleRoomClick(room.id)}
                                >
                                    View Room Details
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}

            <div className="text-center mt-4">
                <Button variant="secondary" onClick={() => navigate("/wards")}>
                    ⬅ Back to Wards
                </Button>
            </div>
        </Container>
    );
};

export default RoomOverview;
