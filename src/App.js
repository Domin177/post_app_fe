import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostPage from "./post/PostPage";
import {Col, Row} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Row>
                <Col md={12}>
                    <header className="App-header">
                        Post Application
                    </header>
                    <PostPage/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
