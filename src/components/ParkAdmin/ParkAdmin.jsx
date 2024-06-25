import React, { useEffect } from "react";
import { useAtom } from "jotai";
import ParkingSpacesTable from "../AdminDashBoard/ParkingSpacesTable";
import MenuComponent from "../../components/AdminDashBoard/Menu";
import { Row, Col } from "reactstrap";
import { menuIndexState } from "../../atom";
import ParkingSpacesForm from "../AdminDashBoard/FormComponents/ParkingSpacesForm";
import QRCodeScanner from "../QRCodeScanner/QRCodeScanner";
import movingCar from "./../../assets/A Running Car.gif";
import "./ParkAdmin.scss";

function ParkAdmin() {
  const [activeIndex, setActiveIndex] = useAtom(menuIndexState);

  useEffect(() => {
    setActiveIndex(0);
  }, [setActiveIndex]);

  const renderContent = () => {
    switch (activeIndex) {
      case 1:
        return <ParkingSpacesTable />;
      case 0:
        return <ParkingSpacesForm />;
      case 2:
        return <QRCodeScanner />;
      default:
        return <></>;
    }
  };

  return (
    <div className="park-admin">
      <Row mx-0 px-0 row-heading>
        <Col></Col>
        <Col className="col-9 content-col heading">
          <h3 className="mt-4 text-center mb-80">
            Welcome to Parking Owner Dashboard!
          </h3>
        </Col>
      </Row>

      <Row className="mx-0 px-0">
        <Col className="menu-col" style={{ cursor: "pointer" }}>
          <MenuComponent
            activeIndex={activeIndex}
            changeMenuIndex={setActiveIndex}
            options={[
              "Add Parking Space",
              "Parking Spaces List",
              "Scan QR Code",
            ]}
          />
        </Col>
        <Col className="col-9 content-col">{renderContent()}</Col>
      </Row>
    </div>
  );
}

export default ParkAdmin;
