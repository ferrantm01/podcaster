import React from "react";
import { Link } from "react-router-dom";
import { useLoading } from "../../context/loading-context";
import { Col, Row } from "react-bootstrap";

export const Header: React.FC = () => {
  const { loading } = useLoading();

  return (
    <header style={{ position: "relative" }} className="w-100">
      <Row className="w-100">
        <Col xs={2} sm={2} md={2} xl={2} xxl={2}>
          <Link to={"/"} className="header-link">
            <h1>Podcaster</h1>
          </Link>
        </Col>
        <Col xxl={{ span: 9 }}>
          {loading && (
            <div className="loading-indicator">
              <div className="loading-circle"></div>
            </div>
          )}
        </Col>
      </Row>

    </header>
  );
};
