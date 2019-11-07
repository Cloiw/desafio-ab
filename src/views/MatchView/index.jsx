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
import PlayersTable from '../../components/PlayersTable/indexj';
import InvitePlayers from '../../components/InvitePlayers';
import InfoMatch from '../../components/InfoMatch';


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
    const { match_name, match_type, match_id, match_date, match_time, sport_venue, match_players, players } = this.state.match_data;
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
              <InfoMatch 
                title="Información del partido"
                date={match_date}
                time={match_time}
                type={match_type}
                margin_top_bot={false}
              />
              <div className="div-container-sport">
                <InfoMatch 
                  title="Información del recinto deportivo"
                  venue_name={sport_venue.nombre}
                  venue_phone={sport_venue.TELÉFONO}
                  venue_street={sport_venue.calle}
                  venue_number={sport_venue.numero}
                  venue_commune={sport_venue.comuna}
                  map_url={map}
                  margin_top_bot={true}
                />
              </div>
            </Col>
            <Col md={5}>
              <h4>Jugadores</h4>
              <div className="div-match-invite">
                <h6>{`Faltan ${match_players - players.length} de ${match_players} jugadores`}</h6>
                <InvitePlayers players={players} id={match_id} />
              </div>
              <div>
                <PlayersTable players={players} total={match_players} />
              </div>
            </Col>
          </Row>
          <Row>
            <Link to={"/"}>
              <BasicBtn name="Volver" class={"btn-table"}/>
            </Link>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MatchView