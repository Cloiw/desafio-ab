import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import './InfoMatch.css';

const InfoMatch = (props) => {
  return (
    <div>
      <h4>{props.title}</h4>
        <Row bsPrefix={props.map_url ? "row row-padding-y" : "row-padding-top"}>
          <Col md={props.map_url ? 6 : 12}>
            {props.date && <p>Fecha y hora : {`${props.date.split('-').join('/')}\xa0\xa0\xa0${props.time} hrs`}</p>}
            {props.type && <p>Tipo de partido : {props.type}</p>}
            {props.venue_name && <p>Nombre del recinto : {props.venue_name}</p>}
            {props.venue_phone && <p>Telefono : {props.venue_phone}</p>}
            {props.venue_street && <p>Calle : {props.venue_street} {props.venue_number}</p>}
            {props.venue_commune && <p>Comuna : {props.venue_commune}</p>}
          </Col>
          {props.map_url &&
          <Col md={6} bsPrefix="col-map col">
            <iframe title="map" className="map-iframe" src={props.map_url} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />
          </Col>
          }
        </Row>
    </div>
  )
}
export default InfoMatch