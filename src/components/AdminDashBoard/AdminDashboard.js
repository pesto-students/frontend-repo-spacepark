import React from 'react';
import { useAtom } from 'jotai';
import UserTable from './UserTable';
import TicketsTable from './TicketsTable';
import Revenue from './Revenue';
import ParkingSpaceOwnersTable from './ParkingSpaceOwnersTable';
import ParkingSpacesTable from './ParkingSpacesTable';
import MenuComponent from './Menu';
import { Row, Col } from 'reactstrap';
import { menuIndexState } from '../../atom';
import TransactionsList from './TransactionsList';
import ServicesTable from './ServicesTable';

function AdminDashboard() {
  const [activeIndex, setActiveIndex] = useAtom(menuIndexState);

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <UserTable />;
      case 1:
        return <TicketsTable />;
      case 2:
        return <TransactionsList />;
        case 3:
          return <Revenue />;
      case 4:
        return <ParkingSpaceOwnersTable />;
      case 5:
        return <ParkingSpacesTable />;
        case 6:
          return <ServicesTable />;
      default:
        return <ParkingSpacesTable />;
    }
  };

  return (
    <>
      <h3 className='mt-4 text-center mb-80' >Welcome to admin dashboard</h3>
      <Row className='mx-0 px-0'>
        <Col className='' style={{cursor:'pointer'}}>
          <MenuComponent activeIndex={activeIndex} changeMenuIndex={setActiveIndex} options={['Users', 'Tickets', 'Transactions List', 'Total Revenue', 'Parking Space Owners', 'Parking Spaces', 'Services List']}/>
        </Col>
        <Col className='col-9'>
          {renderContent()}
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
