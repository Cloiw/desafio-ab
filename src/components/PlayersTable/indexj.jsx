import React from 'react';
import BasicBtn from '../BasicBtn';


class PlayersTable extends React.Component {

  createTableData() {
    return this.props.players.map((e, index) => {
      return  (
        <tr key={index}>
          <td>{e.email}</td>
          <td>{e.status === 0 ? "PENDIENTE" : e.status === 1 ? "ACEPTADO" : "RECHAZADO"}</td>
          <td>
            <div className="td-btn">
              <BasicBtn name="Eliminar" class={"btn-table"}/>
            </div>
          </td>
        </tr>
      )
    })
  }

  createBlankCells() {
    if (this.props.players.length !== this.props.total){
      let cells= []
      for(let i = this.props.players.length; i < this.props.total; i++){
        cells.push(
        <tr key={`${i}_pending`}>
          <td>PENDIENTE</td>
          <td>PENDIENTE</td>
          <td></td>
        </tr>
        )
      }
      return cells
    }
  }

  render(){
    return(
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
    )
  }
}

export default PlayersTable;