import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaTimes,
  FaRegTimesCircle,
} from "react-icons/fa";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
function ImageZoom({ handleClose, show, productdetail }) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Row>
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={1}
            defaultPositionY={1}
          >
            {({ zoomIn, zoomOut, ...rest }) => (
              <>
                <TransformComponent>
                  <Col>
                    <div className="zoom_img">
                      <img
                        src={productdetail.image}
                        alt={productdetail.image}
                        className="Zoom_image"
                      />
                    </div>
                  </Col>
                </TransformComponent>
                <Col>
                  <div className="close_icon">
                    <FaRegTimesCircle size="25px" onClick={handleClose} />
                  </div>
                  <div className="Zoom-btn">
                    <FaSearchPlus
                      size="20px"
                      color="#6c757d"
                      onClick={zoomIn}
                      style={{ marginRight: "20px", cursor: "pointer" }}
                    />
                    <FaSearchMinus
                      size="20px"
                      color="#6c757d"
                      onClick={zoomOut}
                      style={{ marginRight: "20px", cursor: "pointer" }}
                    />
                  </div>
                </Col>
              </>
            )}
          </TransformWrapper>
        </Row>
      </Modal>
    </div>
  );
}

export default ImageZoom;
