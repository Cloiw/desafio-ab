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
          <label for="match-name" className="modal-label">Nombre del partido:</label>
          <input id="match-name" className="modal-input" type="text"/>
          <label for="match-type"className="modal-label">Tipo de partido:</label>
          <select id="match-type" className="modal-input" type="select" />
          <label for="sport-venue" className="modal-label">Recinto deportivo:</label>
          <select id="sport-venue" className="modal-input" type="select">
            {this.createSelectItems(data)}
          </select>
          <label for="match-date" className="modal-label-date">Fecha del evento:</label>
          <div className="modal-div-date">
            <input id="match-date" type="date"/>
            <span>📅</span>
          </div>
          <label for="match-time" className="modal-label-time">Hora del evento:</label>
          <input id="match-time" className="modal-input-time" type="time"/>
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