import React, { useEffect } from "react";
import { useAtom } from "jotai";
import ParkingSpacesTable from "../AdminDashBoard/ParkingSpacesTable";
import MenuComponent from "../../components/AdminDashBoard/Menu";
import { Row, Col } from "reactstrap";
import { menuIndexState } from "../../atom";
import ParkingSpacesForm from "../AdminDashBoard/FormComponents/ParkingSpacesForm";

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
      default:
        return <></>;
    }
  };

  return (
    <>
      <h3 className="mt-4 text-center mb-80">
      </h3>
      <Row className="mx-0 px-0">
        <Col className="" style={{ cursor: "pointer" }}>
          <MenuComponent
            activeIndex={activeIndex}
            changeMenuIndex={setActiveIndex}
            options={["Add Parking Space", "Parking Spaces List"]}
          />
        </Col>
        <Col className="col-9">{renderContent()}</Col>
      </Row>
    </>
  );
}

export default ParkAdmin;
