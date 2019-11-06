import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { db } from '../../data/firebase';
import './MatchView.css';


class MatchView extends React.Component {
  constructor(props){
    super(props);
    this.state = { match_data: {match_name: "", match_date: "", match_time: "", sport_venue: { nombre: ""}}}
  }

  componentDidMount() {
    db.collection("matches").doc(this.props.match.params.matchId).onSnapshot((querySnapshot) => {
      this.setState({
				match_data: querySnapshot.data()
      })
      console.log(this.state.match_data)
    })
  }
  
  render() {
    const { match_name, match_type, match_date, match_time, sport_venue } = this.state.match_data;
    let cord = sport_venue["LATITUD, LONGITUD"];
    let addressString = `${sport_venue.calle} ${sport_venue.numero} ${sport_venue.comuna}`
    let address = encodeURIComponent(addressString)
    let map = `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    console.log(addressString, address)
    return (
      <div>
        <Container>
          <Row bsPrefix="row row-match-name">
            <h1>{match_name}</h1>
          </Row>
          <Row>
            <Col md={6} bsPrefix="col-info col">
              <div>
                <h4>Información del partido</h4>
                <div className="div-match">
                  <p>Fecha y hora : {`${match_date.split('-').join('/')}\xa0\xa0\xa0${match_time} hrs`}</p>
                  <p>Tipo de partido : {match_type}</p>
                </div>
              </div>
              <div className="div-container-sport">
                <h4>Información del recinto deportivo</h4>
                <div className="div-match">
                  <p>Nombre del recinto : {sport_venue.nombre}</p>
                  <p>Telefono : {sport_venue.TELÉFONO}</p>
                  <p>Calle : {sport_venue.calle} {sport_venue.numero}</p>
                  <p>Comuna : {sport_venue.comuna}</p>
                  {cord === undefined ? null : 
                  <iframe className="map-iframe" src={map} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />}
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MatchView