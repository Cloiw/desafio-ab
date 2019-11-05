import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { db } from '../../data/firebase';
import CreateMatch from '../../components/CreateMatch'
import BasicBtn from '../../components/BasicBtn'
import './MatchList.css';


class MatchList extends React.Component {
  constructor(props){
    super(props);
    this.state = { matches:[], modalShow: false }
  }

  componentDidMount() {
    db.collection("matches").onSnapshot((querySnapshot) => {
      console.log(querySnapshot.doc.data())
      this.setState({
        matches: querySnapshot.docs.map(doc => {
          return { data: doc.data() }
        })
      })
    })
    console.log(this.state.matches)
  }

  render() {
  
    return (
      <div className="match-list-container">
        <Container>
          <Row bsPrefix="row row-title" md={3}>
            <h1>Listado de partidos</h1>
            <BasicBtn name='Crear Partido' click={() => this.setState({ modalShow: true })}/>
          </Row>
          <CreateMatch show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })}/>
        </Container>
      </div>
    )
  }
}

export default MatchList;
 
/* {Object.keys(data).map((name) => (
    <Link key={name} to={`/match/${name}`}>
      <BasicBtn name={'Ver'} />
    </Link> */