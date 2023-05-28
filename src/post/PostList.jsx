import {Button, Card, Col, Modal} from "react-bootstrap";
import {useState} from "react";
import Form from "react-bootstrap/Form";

export default function PostList({data, onDelete, onUpdate}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({title: "", body: "", id: 0, index: 0});

    const showUpdateModal = (data, index) => {
        setEditData({...data, "index": index});
        setShowEditModal(true);
    }

    const handleUpdate = () => {
        onUpdate(editData.id, {title: editData.title, body: editData.body}, editData.index)
        setShowEditModal(false);
    }

    const setValue = (key, value) => {
        setEditData({...editData, [key]: value})
    }

    return (
        <>
            {data && data.map((e, index) => renderOnePost(index, e, onDelete, showUpdateModal))}
            {data && data.length === 0 ?
                <Card>
                    <Card.Body>
                        <Card.Text className="text-start">
                            No records found
                        </Card.Text>
                    </Card.Body>
                </Card> : ""}

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Edit</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Col md={12} className="d-flex justify-content-center mt-2">
                        <Form.Control
                            type="text"
                            id="postTitle"
                            className="post-text-area"
                            placeholder={"Post title"}
                            value={editData.title}
                            onChange={e => setValue("title", e.currentTarget.value)}
                        />
                    </Col>
                    <Col md={12} className="d-flex justify-content-center mt-2">
                        <Form.Control
                            type="text"
                            as="textarea"
                            rows={3}
                            id="postText"
                            placeholder={"Post text"}
                            className="post-text-area"
                            value={editData.body}
                            onChange={e => setValue("body", e.currentTarget.value)}
                        />
                    </Col>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const renderOnePost = (index, data, onDelete, onUpdate) => {
    let externalApiID = data.externalId ? ` | External ID: ${data.externalId}`: '';
    return (
        <Card key={index} className={"mb-2"}>
            <Card.Body className="text-end">
                <Card.Text className="text-start">
                    {`#${data.id}${externalApiID} | User ID: ${data.userId}`}
                </Card.Text>
                <Card.Title className="text-start">{data.title}</Card.Title>
                <Card.Text className="text-start">
                    {data.body}
                </Card.Text>
                <Button variant="secondary" className="me-2" onClick={() => onDelete(data.id, index)}>Delete</Button>
                <Button variant="primary" onClick={() => onUpdate(data, index)}>Edit</Button>
            </Card.Body>
        </Card>
    )
}