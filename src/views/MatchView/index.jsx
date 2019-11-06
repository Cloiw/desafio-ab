import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { db } from '../../data/firebase';


class MatchView extends React.Component {
  constructor(props){
    super(props);
    this.state = { match_data: {match_name: "", match_date: "", match_time: ""}}
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
    const { match_name, match_type, match_date, match_time, } = this.state.match_data;
    return (
      <div className="match-list-container">
        <Container>
          <Row bsPrefix="row row-title" md={3}>
            <h1>{match_name}</h1>
          </Row>
          <Row>
            <Col>
              <h4>Información del partido</h4>
              <div>
                <p>{`${match_date.split('-').join('/')}\xa0\xa0\xa0${match_time} hrs`}<br/>
                {match_type}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MatchView