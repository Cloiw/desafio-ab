import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import CreateMatch from '../../components/CreateMatch'
import BasicBtn from '../../components/BasicBtn'
import './MatchList.css';


const MatchList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="match-list-container">
      <Container>
        <Row bsPrefix="row row-title" md={3}>
          <h1>Listado de partidos</h1>
          <BasicBtn name='Crear Partido' click={() => setModalShow(true)}/>
        </Row>
        <CreateMatch
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      </Container>
    </div>
  )
}

export default MatchList;
 
/* {Object.keys(data).map((name) => (
    <Link key={name} to={`/match/${name}`}>
      <BasicBtn name={'Ver'} />
    </Link> */