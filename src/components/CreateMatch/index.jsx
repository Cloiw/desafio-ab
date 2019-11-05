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
    this.state = { options: []}
  }
  

  createSelectItems(data) {
    let getData = data[Object.keys(data)]
    let items = [];
    for (let i = 0; i <= getData.length; i++) {
      let data = getData[i];
      console.log(data.nombre)
    }
    return
  }
  render(){
    this.createSelectItems(data)
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
                {this.state.options}
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