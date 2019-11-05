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
  

  createSelectOptions(data) {
    let options = [];
    for (let i = 0; i < data.length; i++) {
      options.push(<option key={data[i].ID} value={data[i].nombre}>{data[i].nombre}</option>);   
    }
    return options;
  }

  render(){
    return(
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>
            Crear un evento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <label htmlFor="match-name" className="modal-label">Nombre del partido:</label>
              <input id="match-name" className="modal-input" type="text"/>
              <label htmlFor="match-type"className="modal-label">Tipo de partido:</label>
              <select id="match-type" className="modal-input" type="select">
                <option value="futbol">Fútbol</option>
                <option value="futbol">Fútbolito</option>
                <option value="futbol">Baby Fútbol</option>
              </select>
              <label htmlFor="sport-venue" className="modal-label">Recinto deportivo:</label>
              <select id="sport-venue" className="modal-input" type="select">
                {this.createSelectOptions(data[Object.keys(data)])}
              </select>
              <label htmlFor="match-date" className="modal-label-date">Fecha del evento:</label>
              <div className="modal-div-date">
                <input id="match-date" type="date"/>
                <span role="img" aria-label="calendar">📅</span>
              </div>
              <label htmlFor="match-time" className="modal-label-time">Hora del evento:</label>
              <input id="match-time" className="modal-input-time" type="time"/>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="col-btn-create">
                <Button variant="create" onClick={this.props.onHide}>Crear</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CreateMatch
