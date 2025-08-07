import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const BedOverview = () => {
    const [beds, setBeds] = useState([]);
    const { roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9090/api/beds/room/${roomId}`)
            .then(res => setBeds(res.data))
            .catch(err => console.error(err));
    }, [roomId]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Available": return "success";
            case "Occupied": return "primary";
            case "Maintenance": return "warning";
            default: return "secondary";
        }
    };

    return (
        <Container className="mt-4">
            <h4 className="text-center mb-4">Beds in Room {roomId}</h4>
            <Row>
                {beds.map((bed) => (
                    <Col xs={4} md={2} key={bed.id} className="mb-3">
                        <Card bg={getStatusColor(bed.status)} text="white" className="text-center">
                            <Card.Body>
                                <Card.Text>Bed {bed.id}</Card.Text>
                                <Badge bg="dark">{bed.status}</Badge>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-3">
                <Button variant="secondary" onClick={() => navigate(-1)}>⬅ Back to Rooms</Button>
            </div>
        </Container>
    );
};

export default BedOverview;
