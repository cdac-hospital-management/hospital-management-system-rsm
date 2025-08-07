import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WardComponent = () => {
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState({
        name: "",
        totalRooms: "",
        status: "",
        type: "",
    });
    const [editingId, setEditingId] = useState(null);

    const api = "http://localhost:9090/api/wards";

    const fetchWards = async () => {
        try {
            const res = await axios.get(api);
            setWards(res.data);
        } catch (err) {
            toast.error("Failed to fetch wards");
        }
    };

    useEffect(() => {
        fetchWards();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${api}/${editingId}`, ward);
                toast.success("Ward updated successfully");
            } else {
                await axios.post(api, ward);
                toast.success("Ward added successfully");
            }
            fetchWards();
            setWard({ name: "", totalRooms: "", status: "", type: "" });
            setEditingId(null);
        } catch (err) {
            toast.error("Error while saving ward");
        }
    };

    const handleEdit = (ward) => {
        setWard({
            name: ward.name,
            totalRooms: ward.totalRooms,
            status: ward.status,
            type: ward.type || "",
        });
        setEditingId(ward.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this ward?")) {
            try {
                await axios.delete(`${api}/${id}`);
                toast.success("Ward deleted successfully");
                fetchWards();
            } catch (err) {
                toast.error("Failed to delete ward");
            }
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow border-0">
                        <Card.Body>
                            <Card.Title className="text-center mb-4 fw-bold fs-4">
                                {editingId ? "Update Ward" : "Add New Ward"}
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ward Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ward.name}
                                        onChange={(e) => setWard({ ...ward, name: e.target.value })}
                                        placeholder="Enter ward name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Total Rooms</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={ward.totalRooms}
                                        onChange={(e) => setWard({ ...ward, totalRooms: e.target.value })}
                                        placeholder="Enter total rooms"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        value={ward.status}
                                        onChange={(e) => setWard({ ...ward, status: e.target.value })}
                                        required
                                    >
                                        <option value="">Select status</option>
                                        <option value="Available">Available</option>
                                        <option value="Closed">Closed</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Ward Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ward.type}
                                        onChange={(e) => setWard({ ...ward, type: e.target.value })}
                                        placeholder="Enter ward type (e.g. ICU, General)"
                                    />
                                </Form.Group>

                                <div className="text-center">
                                    <Button variant="primary" type="submit" className="px-4">
                                        {editingId ? "Update Ward" : "Add Ward"}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h4 className="text-center mb-4 fw-bold">Ward Records</h4>
                    <Table striped bordered hover responsive className="shadow-sm">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Total Rooms</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {wards.map((w) => (
                                <tr key={w.id}>
                                    <td>{w.id}</td>
                                    <td>{w.name}</td>
                                    <td>{w.totalRooms}</td>
                                    <td>{w.status}</td>
                                    <td>{w.type || "—"}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleEdit(w)}
                                            className="me-2"
                                        >
                                            ✏️ Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(w.id)}
                                        >
                                            🗑️ Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {wards.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">
                                        No wards found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default WardComponent;
