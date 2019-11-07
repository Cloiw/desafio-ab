import React from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import BasicBtn from '../BasicBtn';
import { db } from '../../data/firebase';

class Table extends React.Component {
  
  deleteMatch(id) {
    db.collection("matches").doc(id).delete()
    .then(res => {
      console.log("Borrado")
    }).catch(error => {
      console.error("Error removing document: ", error);
    });
  }

  createTableData() {
    if (this.props.data.length === 0){
      return
    }
    
    return this.props.data.map((e, index) => {
      return  (
        <tr key={index}>
          <td>
            {`${e.match_date.split('-').join('/')}\xa0\xa0\xa0\xa0\xa0\xa0\xa0${e.match_time} hrs`}
          </td>
          <td>{e.match_name}</td>
          <td>{e.match_type}</td>
          <td>
            <div className="td-btn">
              <Link to={`/match/${e.match_id}`}>
                <BasicBtn name="Ver" class={"btn-table"}/>
              </Link>
              <BasicBtn name="Eliminar" click={() => this.deleteMatch(e.match_id)} class={"btn-table"}/>
            </div>
          </td>
        </tr>
      )
    })
  }

  render(){
    return(
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
    )
  }
}

export default Table;