import React from 'react';
import BasicBtn from '../BasicBtn';


class PlayersTable extends React.Component {
  createTableData() {
    const { players } = this.props;
    return players.map((e, index) => (
      <tr key={index}>
        <td>{e.email}</td>
        <td>{e.status === 0 ? 'PENDIENTE' : e.status === 1 ? 'ACEPTADO' : 'RECHAZADO'}</td>
        <td>
          <div className="td-btn">
            <BasicBtn name="Eliminar" addClass="btn-table" />
          </div>
        </td>
      </tr>
    ));
  }

  createBlankCells() {
    const { players, total } = this.props;
    if (players.length !== total) {
      const cells = [];
      for (let i = players.length; i < total; i++) {
        cells.push(
          <tr key={`${i}_pending`}>
            <td>PENDIENTE</td>
            <td>PENDIENTE</td>
            <td />
          </tr>,
        );
      }
      return cells;
    }
    return [];
  }

  render() {
    return (
      <div>
        <table className="matches-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.createTableData()}
            {this.createBlankCells()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlayersTable;
