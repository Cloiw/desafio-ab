import React from 'react';
import {
  Modal,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { db } from '../../data/firebase';
import './CreateMatch.css';
import data from '../../data/data.json';
import BasicBtn from '../BasicBtn';


class CreateMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchName: '', matchType: '', sportVenue: '', matchDate: '', matchTime: '', loading: false, errorMsg: false,
    };
    this.saveMatch = this.saveMatch.bind(this);
    this.createSelectOptions = this.createSelectOptions.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this.setState({
        matchName: '',
        matchType: '',
        sportVenue: '',
        matchDate: '',
        matchTime: '',
        errorMsg: false,
      });
    }
  }

  handleChange = (event) => { // obtener datos de los campos
    this.setState({ [event.target.id]: event.target.value });
  }

  createSelectOptions(dataOption) {
    const options = [];
    for (let i = 0; i < dataOption.length; i++) {
      options.push(<option key={dataOption[i].ID} value={JSON.stringify(dataOption[i])}>{dataOption[i].nombre}</option>);
    }
    return options;
  }

  saveMatch() {
    const {
      matchName, matchType, matchDate, matchTime, sportVenue,
    } = this.state;
    const { onHide } = this.props;
    if (matchName === '' || matchType === '' || matchDate === '' || matchTime === '') {
      this.setState({
        errorMsg: true,
      });
      return;
    }
    this.setState({
      loading: true,
      errorMsg: false,
    });

    let matchPlayers = '';

    if (matchType === 'Futbol') {
      matchPlayers = 22;
    }
    if (matchType === 'Futbolito') {
      matchPlayers = 14;
    }
    if (matchType === 'Baby Futbol') {
      matchPlayers = 10;
    }

    const idMatch = matchName + Date.now();
    const dataToSave = {
      match_id: idMatch,
      match_players: matchPlayers,
      match_name: matchName,
      match_type: matchType,
      sport_venue: JSON.parse(sportVenue),
      match_date: matchDate,
      match_time: matchTime,
      players: [],
    };
    db.collection('matches').doc(idMatch).set(dataToSave)
      .then(() => {
        this.setState({
          loading: false,
        });
        onHide();
      });
  }

  render() {
    const { loading, errorMsg } = this.state;
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>
            Crear un evento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container bsPrefix="container modal-container">
            <Row bsPrefix="row modal-error">
              {errorMsg ? <p>Rellena todos los campos</p> : <p />}
            </Row>
            <Row>
              <label htmlFor="matchName" className="modal-label">Nombre del partido:</label>
              <input onChange={this.handleChange} id="matchName" className="modal-input" type="text" />

              <label htmlFor="matchType" className="modal-label">Tipo de partido:</label>
              <select defaultValue="" onChange={this.handleChange} id="matchType" className="modal-input" type="select">
                <option disabled value="">Selecciona el tipo de partido</option>
                <option value="Futbol">Fútbol</option>
                <option value="Futbolito">Futbolito</option>
                <option value="Baby Futbol">Baby Fútbol</option>
              </select>

              <label htmlFor="sportVenue" className="modal-label">Recinto deportivo:</label>
              <select defaultValue="" onChange={this.handleChange} id="sportVenue" className="modal-input" type="select">
                <option disabled value="">Selecciona un recinto</option>
                {this.createSelectOptions(data[Object.keys(data)])}
              </select>

              <label htmlFor="matchDate" className="modal-label-date">Fecha del evento:</label>
              <div className="modal-div-date">
                <input onChange={this.handleChange} id="matchDate" type="date" />
                <span role="img" aria-label="calendar">📅</span>
              </div>

              <label htmlFor="matchTime" className="modal-label-time">Hora del evento:</label>
              <input onChange={this.handleChange} id="matchTime" className="modal-input-time" type="time" />
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="col-btn-create">
                {loading ? <p>Creando partido . . .</p>
                  : <BasicBtn addClass="btn-create" click={this.saveMatch} name="Crear" />}
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateMatch;
