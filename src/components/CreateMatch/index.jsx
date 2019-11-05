import React from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import './CreateMatch.css';
import data from '../../data/data.json'


class CreateMatch extends React.Component {
  constructor(props){
    super(props);
  }
  

  createSelectItems(data) {
    let getData = data[Object.keys(data)]
    let items = [];
    for (let i = 0; i < getData.length; i++) {
      items.push(<option value={getData[i].nombre}>{getData[i].nombre}</option>);   
    }
    return items;
  }
  
  render(){
  return(
  <Modal
    {...this.props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title>
        Crear un evento
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container>
        <Row className="show-grid">
          <Col md={4}>
            <p>Nombre del partido</p>
            <p>Tipo de partido</p>
            <p>Recinto Deportivo</p>
            <p>Fecha del evento</p>
          </Col>
          <Col md={8}>
            <input className='input-modal' type="text"/>
            <input className='input-modal' type="select" />
            <select className='input-modal' type="select">
              {this.createSelectItems(data)}
            </select>
            <input className='input-modal' type="text"  />
          </Col>
        </Row>
      </Container>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="clasic" onClick={this.props.onHide} size="lg" block>Cancelar</Button>
    </Modal.Footer>
  </Modal>
);
  }
}
export default CreateMatch