import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
// import UserTable from './UserTable';
// import TicketsTable from './TicketsTable';
// import Revenue from './Revenue';
// import ParkingSpaceOwnersTable from './ParkingSpaceOwnersTable';
import ParkingSpacesTable from '../AdminDashBoard/ParkingSpacesTable';
import MenuComponent from '../../components/AdminDashBoard/Menu';
import { Row, Col } from 'reactstrap';
import { menuIndexState } from '../../atom';
import ParkingSpacesForm from '../AdminDashBoard/FormComponents/ParkingSpacesForm';
// import TransactionsList from './TransactionsList';
// import ServicesTable from './ServicesTable';

function ParkAdmin() {
  const [activeIndex, setActiveIndex] = useAtom(menuIndexState);

  useEffect(() => {
    setActiveIndex(0);
  }, [])

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <ParkingSpacesTable />;
      case 1:
        return <ParkingSpacesForm />;
      // case 2:
      //   return <TransactionsList />;
      //   case 3:
      //     return <Revenue />;
      // case 4:
      //   return <ParkingSpaceOwnersTable />;
      // case 5:
      //   return <ParkingSpacesTable />;
      //   case 6:
      //     return <ServicesTable />;
      // default:
      //   return <ParkingSpacesTable />;
    }
  };

  return (
    <>
      <h3 className='mt-4 text-center mb-80' >Welcome to parking owner dashboard !</h3>
      <Row className='mx-0 px-0'>
        <Col className='' style={{cursor:'pointer'}}>
          <MenuComponent activeIndex={activeIndex} changeMenuIndex={setActiveIndex} options={['Add Parking Space', 'Parking Spaces List' ]} />
        </Col>
        <Col className='col-9'>
          {renderContent()}
        </Col>
      </Row>
    </>
  );
}

export default ParkAdmin;
