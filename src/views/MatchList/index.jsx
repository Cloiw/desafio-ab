import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { db } from '../../data/firebase';
import CreateMatch from '../../components/CreateMatch'
import Table from '../../components/Table'
import BasicBtn from '../../components/BasicBtn'
import './MatchList.css';


class MatchList extends React.Component {
  constructor(props){
    super(props);
    this.state = { matches:[], modalShow: false }
  }

  componentDidMount() {
    db.collection("matches").onSnapshot((querySnapshot) => {
      this.setState({
				matches: querySnapshot.docs.map(doc => {
					return doc.data()
				})
    })
  })
}

  render() {
  
    return (
      <div className="match-list-container">
        <Container>
          <Row bsPrefix="row row-title" md={3}>
            <h1>Listado de partidos</h1>
            <BasicBtn class="btn-create" name='Crear Partido' click={() => this.setState({ modalShow: true })}/>
          </Row>
          <CreateMatch show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })}/>
          <Row>
            <Col bsPrefix="col col-table">
              <Table data={this.state.matches}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MatchList;