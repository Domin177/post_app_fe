import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";

export default function AddPostComponent({onSave}) {
    const [data, setData] = useState(empty_data)

    const setValue = (key, value) => {
        setData({...data, [key]: value})
    }

    return (
        <Row className="w-100 text-center">
            <Col md={12} className="d-flex justify-content-start">
                <h4>Add new post</h4>
            </Col>
            <Col md={12} className="d-flex justify-content-center">
                <Form.Control
                    type="text"
                    id="postUserId"
                    className="post-text-area"
                    placeholder={"User ID"}
                    value={data.userId}
                    onChange={e => setValue("userId", e.currentTarget.value)}
                />
            </Col>
            <Col md={12} className="d-flex justify-content-center mt-2">
                <Form.Control
                    type="text"
                    id="postTitle"
                    className="post-text-area"
                    placeholder={"Post title"}
                    value={data.title}
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
                    value={data.body}
                    onChange={e => setValue("body", e.currentTarget.value)}
                />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
                <Button
                    variant="primary"
                    onClick={() => onSave(data)}
                >
                    Add New Post
                </Button>
            </Col>
        </Row>
    )
}

const empty_data = {
    userId: 0,
    title: "",
    body: ""
}