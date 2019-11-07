import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import './InfoMatch.css';

const InfoMatch = ({
  title, mapUrl, date, time, type, venueName, venuePhone, venueStreet, venueNumber, venueCommune,
}) => (
  <div>
    <h4>{title}</h4>
    <Row bsPrefix={mapUrl ? 'row row-padding-y' : 'row-padding-top'}>
      <Col md={mapUrl ? 6 : 12}>
        {date && (
          <p>
            Fecha y hora :&nbsp;
            {`${date.split('-').join('/')}\xa0\xa0\xa0${time} hrs`}
          </p>
        )}
        {type && (
          <p>
            Tipo de partido :&nbsp;
            {type}
          </p>
        )}
        {venueName && (
          <p>
            Nombre del recinto :&nbsp;
            {venueName}
          </p>
        )}
        {venuePhone && (
          <p>
            Telefono :&nbsp;
            {venuePhone}
          </p>
        )}
        {venueStreet && (
          <p>
            Calle :&nbsp;
            {venueStreet}
            {' '}
            {venueNumber}
          </p>
        )}
        {venueCommune && (
          <p>
            Comuna :&nbsp;
            {venueCommune}
          </p>
        )}
      </Col>
      {mapUrl && (
        <Col md={6} bsPrefix="col-map col">
          <iframe title="map" className="map-iframe" src={mapUrl} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />
        </Col>
      )}
    </Row>
  </div>
);

export default InfoMatch;
