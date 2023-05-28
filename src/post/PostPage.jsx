import {useState} from 'react'
import {Button, Card, Col, Row, ToastContainer} from "react-bootstrap";
import {getPostApi, getPostByUserIdApi, createPostApi, updatePostApi, deletePostApi} from "../api/ApiCalls";
import AddPostComponent from "./AddPostComponent";
import PostList from "./PostList";
import Form from "react-bootstrap/Form";
import InformationToast from "./InformationToast";

export default function PostPage() {
    const [posts, setPosts] = useState([])
    const [toastData, setToastData] = useState({show: false, title: "", message: "", type: ""});

    const loadPostsByUserId = (userId) => {
        getPostByUserIdApi(userId)
            .then(res => {
                setPosts(res.data)
            }).catch(err => showToastError(err, "Find post by User ID"))
    }

    const loadPostById = (postId) => {
        getPostApi(postId)
            .then(res => {
                setPosts([res.data])
            }).catch(err => showToastError(err, "Find post by ID"))
    }

    const save = (data) => {
        createPostApi(data)
            .then(res => {
                setPosts([res.data.data])
                showToastSuccess("Post creation", res.data.message);
            }).catch(err => showToastError(err, "Post creation"))
    }

    const deletePost = (id, index) => {
        deletePostApi(id)
            .then(res => {
                posts.splice(index, 1);
                setPosts(posts);
                showToastSuccess("Delete post", res.data.message);
            }).catch(err => showToastError(err, "Delete post"))
    }

    const updatePost = (id, data, index) => {
        updatePostApi(id, data)
            .then(res => {
                let post = posts[index];
                post.title = res.data.data.title;
                post.body = res.data.data.body;

                let newPosts = posts;
                newPosts[index] = post;
                setPosts(newPosts);

                showToastSuccess("Update post", res.data.message);
            }).catch(err => showToastError(err, "Update post"))
    }

    const showToastError = (err, title) => {
        setToastData({
            show: true,
            title: title,
            message: err.response.data,
            type: "danger"
        })
    }

    const showToastSuccess = (title, message) => {
        setToastData({
            show: true,
            title: title,
            message: message,
            type: "success"
        })
    }

    return (
        <div className="p-5">
            <Row>
                <Col xl={6} xxl={6} md={6} sm={6}>
                    <Card>
                        <Card.Body>
                            <PostById loadPostById={loadPostById}/>
                            <hr className="mb-5 mt-5"/>
                            <PostByUserId loadPostsByUserId={loadPostsByUserId}/>
                            <hr className="mb-5 mt-5"/>
                            <AddPostComponent onSave={save}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6} xxl={6} md={6} xs={6} sm={6}>
                    <PostList onDelete={deletePost} onUpdate={updatePost} data={posts}/>
                </Col>
            </Row>
            <div>
                <ToastContainer position="top-end" className="p-3">
                    <InformationToast
                        data={toastData}
                        onClose={() => setToastData({...toastData, "show": false})}
                    />
                </ToastContainer>
            </div>
        </div>
    )
}

const PostByUserId = ({loadPostsByUserId}) => {
    const [userId, setUserId] = useState(0);

    return (
        <Row className="w-100 text-center">
            <Col md={12} className="d-flex justify-content-start">
                <h4>Find post by user ID</h4>
            </Col>
            <Col md={12} className="d-flex justify-content-center">
                <Form.Control
                    type="text"
                    id="userId"
                    placeholder={"User ID"}
                    onChange={e => setUserId(e.currentTarget.value)}
                />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
                <Button
                    variant="primary"
                    onClick={() => loadPostsByUserId(userId)}
                >
                    Find Post
                </Button>
            </Col>
        </Row>
    )
}

const PostById = ({loadPostById}) => {
    const [postId, setPostId] = useState(0);

    return (
        <Row className="w-100 text-center">
            <Col md={12} className="d-flex justify-content-start">
                <h4>Find post by post ID</h4>
            </Col>
            <Col md={12} className="d-flex justify-content-center">
                <Form.Control
                    type="text"
                    id="postId"
                    placeholder={"Post ID"}
                    onChange={e => setPostId(e.currentTarget.value)}
                />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
                <Button
                    variant="primary"
                    onClick={() => loadPostById(postId)}
                >
                    Find Post
                </Button>
            </Col>
        </Row>
    )
}