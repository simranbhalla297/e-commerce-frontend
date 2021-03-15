import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer style={{ backgroundColor: "black" }}>
      <Container>
        <Row>
          <Col className="text-center py-3" style={{ color: "white" }}>
            Copyright &copy; ProShop
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
