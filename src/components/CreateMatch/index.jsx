import React from 'react';
import { db } from '../../data/firebase';
import {
  Modal,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import './CreateMatch.css';
import data from '../../data/data.json'
import BasicBtn from '../BasicBtn';


class CreateMatch extends React.Component {
  constructor(props){
    super(props);
    this.state = {match_name : "", match_type: "", sport_venue: "", match_date: "", match_time: "", loading: false, errorMsg: false}
    this.saveMatch = this.saveMatch.bind(this)
  }
  

  createSelectOptions(data) {
    let options = [];
    for (let i = 0; i < data.length; i++) {
      options.push(<option key={data[i].ID} value={JSON.stringify(data[i])}>{data[i].nombre}</option>);   
    }
    return options;
  }

  saveMatch() { // guardar la informacion en firebase
    if(this.state.match_name === "" || this.state.match_type === "" || this.state.match_date === "" 
    || this.state.match_time === "") {
      this.setState({
        errorMsg: true
      }) 
      return 
    }
    this.setState({
      loading:true,
      errorMsg:false
    })
    const idMatch = this.state.match_name + Date.now();
    const data =
    {
      match_id: idMatch,
      match_name: this.state.match_name,
      match_type: this.state.match_type,
      sport_venue: JSON.parse(this.state.sport_venue),
      match_date: this.state.match_date,
      match_time: this.state.match_time 
    }
    db.collection('matches').doc(idMatch).set(data)
    .then(() => {
      this.setState({
        loading:false,
      })
      this.props.onHide()
    })
  }
      
  handleChange = (event) => { //obtener datos de los campos
    this.setState({ [event.target.id]: event.target.value });
  }

  componentDidUpdate(prevProps) { //limpiar campos al cerrar modal
    if (this.props.show !== prevProps.show) {
      this.setState({
        match_name: "",
        match_type: "",
        sport_venue: "",
        match_date: "",
        match_time: "",
        errorMsg: false
      })
    }
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
          <Container bsPrefix="container modal-container">
            <Row bsPrefix="row modal-error">
              {this.state.errorMsg ? <p>Rellena todos los campos</p> : <p></p>}
            </Row>
            <Row>
              <label htmlFor="match_name" className="modal-label">Nombre del partido:</label>
              <input onChange={this.handleChange} id="match_name" className="modal-input" type="text"/>

              <label htmlFor="match_type"className="modal-label">Tipo de partido:</label>
              <select defaultValue={""} onChange={this.handleChange} id="match_type" className="modal-input" type="select">
                <option disabled value="">Selecciona el tipo de partido</option>
                <option value="Futbol">Fútbol</option>
                <option value="Futbolito">Futbolito</option>
                <option value="Baby Futbol">Baby Fútbol</option>
              </select>

              <label htmlFor="sport_venue" className="modal-label">Recinto deportivo:</label>
              <select defaultValue={""} onChange={this.handleChange} id="sport_venue" className="modal-input" type="select">
                <option disabled value="">Selecciona un recinto</option>
                {this.createSelectOptions(data[Object.keys(data)])}
              </select>

              <label htmlFor="match_date" className="modal-label-date">Fecha del evento:</label>
              <div className="modal-div-date">
                <input onChange={this.handleChange} id="match_date" type="date"/>
                <span role="img" aria-label="calendar">📅</span>
              </div>

              <label htmlFor="match_time" className="modal-label-time">Hora del evento:</label>
              <input onChange={this.handleChange} id="match_time" className="modal-input-time" type="time"/>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="col-btn-create">
              {this.state.loading ? <p>Creando partido . . .</p> :
              <BasicBtn  class={"btn-create"} click={this.saveMatch} name="Crear" />
              }
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CreateMatch
