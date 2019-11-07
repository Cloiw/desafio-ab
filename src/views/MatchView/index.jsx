import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../../data/firebase';
import BasicBtn from '../../components/BasicBtn';
import './MatchView.css';
import PlayersTable from '../../components/PlayersTable/indexj';
import InvitePlayers from '../../components/InvitePlayers';
import InfoMatch from '../../components/InfoMatch';


class MatchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match_data: {
        match_name: '', match_players: 0, match_date: '', match_time: '', sport_venue: { nombre: '' }, players: [],
      },
    };
  }

  componentDidMount() {
    const { matchId } = this.props.match.params;
    db.collection('matches').doc(matchId).onSnapshot((querySnapshot) => {
      this.setState({
        match_data: querySnapshot.data(),
      });
    });
  }

  render() {
    const {
      match_name, match_type, match_id, match_date, match_time, sport_venue, match_players, players,
    } = this.state.match_data;
    const addressString = `${sport_venue.calle} ${sport_venue.numero} ${sport_venue.comuna}`;
    const address = encodeURIComponent(addressString);
    const map = `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
      <div>
        <Container>
          <Row bsPrefix="row row-match-name">
            <h1>{match_name}</h1>
          </Row>
          <Row bsPrefix="row row-match-info">
            <Col md={7} xs={12}>
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
                  venueName={sport_venue.nombre}
                  venuePhone={sport_venue.TELÉFONO}
                  venueStreet={sport_venue.calle}
                  venueNumber={sport_venue.numero}
                  venueCommune={sport_venue.comuna}
                  mapUrl={map}
                  margin_top_bot
                />
              </div>
              <Link to="/">
                <BasicBtn name="Volver" addClass="back" />
              </Link>
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
        </Container>
      </div>
    );
  }
}

export default MatchView;
