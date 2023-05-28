import {Toast} from "react-bootstrap";

export default function InformationToast({data, onClose}) {
    return (
        <Toast autohide delay={3000} show={data.show} onClose={onClose} bg={data.type}>
            <Toast.Header>
                <strong className="me-auto">{data.title}</strong>
            </Toast.Header>
            <Toast.Body>{data.message}</Toast.Body>
        </Toast>
    );
}