import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../../data/firebase';
import BasicBtn from '../../components/BasicBtn'
import './MatchView.css';


class MatchView extends React.Component {
  constructor(props){
    super(props);
    this.state = { match_data: {match_name: "", match_players: 0, match_date: "", match_time: "", sport_venue: { nombre: ""}, players: []}}
  }

  componentDidMount() {
    db.collection("matches").doc(this.props.match.params.matchId).onSnapshot((querySnapshot) => {
      this.setState({
				match_data: querySnapshot.data()
      })
    })
  }
  
  render() {
    const { match_name, match_type, match_date, match_time, sport_venue, match_players, players } = this.state.match_data;
    let addressString = `${sport_venue.calle} ${sport_venue.numero} ${sport_venue.comuna}`;
    let address = encodeURIComponent(addressString);
    let map = `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
      <div>
        <Container>
          <Row bsPrefix="row row-match-name">
            <h1>{match_name}</h1>
          </Row>
          <Row>
            <Col md={7} bsPrefix="col-info col">
              <div>
                <h4>Información del partido</h4>
                <div className="div-match">
                  <p>Fecha y hora : {`${match_date.split('-').join('/')}\xa0\xa0\xa0${match_time} hrs`}</p>
                  <p>Tipo de partido : {match_type}</p>
                </div>
              </div>
              <div className="div-container-sport">
                <h4>Información del recinto deportivo</h4>
                  <Row bsPrefix="row row-address">
                    <Col md={6}>
                      <p>Nombre del recinto : {sport_venue.nombre}</p>
                      <p>Telefono : {sport_venue.TELÉFONO}</p>
                      <p>Calle : {sport_venue.calle} {sport_venue.numero}</p>
                      <p>Comuna : {sport_venue.comuna}</p>
                    </Col>
                    <Col md={6} bsPrefix="col-map col">
                      {map === undefined ? null : 
                      <iframe title="map" className="map-iframe" src={map} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />}
                    </Col>
                  </Row>
              </div>
              <Link to={"/"}>
                <BasicBtn name="Volver" class={"btn-table"}/>
              </Link>
            </Col>
            <Col md={5}>
              <h4>Jugadores</h4>
              <h4>{`Faltan ${match_players - players.length} de ${match_players} jugadores`}</h4>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MatchView