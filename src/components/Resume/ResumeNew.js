import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/HousamKaissarCV.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row className="resume">
          <Document 
            file={pdf} 
            className="d-flex flex-column align-items-center"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(
              new Array(numPages || 1),
              
              (el, index) => (
                console.log(`Rendering page ${index + 1}`),
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={width > 786 ? 1.4 : 0.6}
                  className="mb-5"
                />
              )
            )}
          </Document>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
