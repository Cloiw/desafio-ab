import React from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import BasicBtn from '../BasicBtn';
import { db } from '../../data/firebase';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMatch = this.deleteMatch.bind(this);
  }

  deleteMatch(id) {
    db.collection('matches').doc(id).delete()
      .then((res) => {
        console.log('Deleted', res);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  createTableData() {
    const { data } = this.props;
    if (data.length === 0) {
      return [];
    }

    return data.map((e, index) => (
      <tr key={index}>
        <td>
          {`${e.match_date.split('-').join('/')}\xa0\xa0\xa0\xa0\xa0\xa0\xa0${e.match_time} hrs`}
        </td>
        <td>{e.match_name}</td>
        <td>{e.match_type}</td>
        <td>
          <div className="td-btn">
            <Link to={`/match/${e.match_id}`}>
              <BasicBtn name="Ver" addClass="btn-table" />
            </Link>
            <BasicBtn name="Eliminar" click={() => this.deleteMatch(e.match_id)} addClass="btn-table" />
          </div>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <table className="matches-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre de Partido</th>
              <th>Tipo de Partido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.createTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
