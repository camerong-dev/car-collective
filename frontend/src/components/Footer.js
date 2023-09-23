import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as brands from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="py-3 my-4">
            <Container>
                <Row className="justify-content-center border-bottom pb-3 mb-3">
                    <Col xs="auto" className="nav-item">
                        <Nav.Link
                            href="https://www.facebook.com"
                            className="nav-link px-2 text-body-secondary"
                            aria-label="Visit our Facebook page"
                            target="_blank"
                            rel="noopener"
                        >
                            <FontAwesomeIcon icon="fa-brands fa-square-facebook" size="xl" />
                        </Nav.Link>
                    </Col>
                    <Col xs="auto" className="nav-item">
                        <Nav.Link
                            href="https://www.instagram.com"
                            className="nav-link px-2 text-body-secondary"
                            aria-label="Visit our Instagram page"
                            target="_blank"
                            rel="noopener"
                        >
                            <FontAwesomeIcon icon="fa-brands fa-square-instagram" size="xl" />
                        </Nav.Link>
                    </Col>
                    <Col xs="auto" className="nav-item">
                        <Nav.Link
                            href="https://www.reddit.com"
                            className="nav-link px-2 text-body-secondary"
                            aria-label="Visit our Reddit page"
                            target="_blank"
                            rel="noopener"
                        >
                            <FontAwesomeIcon icon="fa-brands fa-square-reddit" size="xl" />
                        </Nav.Link>
                    </Col>
                    <Col xs="auto" className="nav-item">
                        <Nav.Link
                            href="https://www.twitter.com"
                            className="nav-link px-2 text-body-secondary"
                            aria-label="Visit our Twitter page"
                            target="_blank"
                            rel="noopener"
                        >
                            <FontAwesomeIcon icon="fa-brands fa-square-x-twitter" size="xl" />
                        </Nav.Link>
                    </Col>
                </Row>
                <Row className="text-center nav-item text-body-secondary">
                    <Col>
                        <a href="https://github.com/camerong-dev">
                            camerong-dev <FontAwesomeIcon icon="fa-brands fa-square-github" />
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
