import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WardOverview = () => {
    const [wards, setWards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9090/api/wards")
            .then(res => setWards(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleWardClick = (wardId) => {
        navigate(`/wards/${wardId}/rooms`);
    };

    return (
        <Container className="mt-4">
            <h3 className="text-center mb-4">Ward Overview</h3>
            <Row>
                {wards.map((ward) => (
                    <Col xs={6} md={3} key={ward.id} className="mb-4">
                        <Card
                            bg={ward.status === "Available" ? "success" : "danger"}
                            text="white"
                            className="text-center"
                            onClick={() => handleWardClick(ward.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Body>
                                <Card.Title>Ward {ward.id}</Card.Title>
                                <Card.Text>{ward.status}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default WardOverview;
