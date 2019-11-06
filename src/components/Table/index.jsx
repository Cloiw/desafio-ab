import React from 'react';
import './Table.css'
import BasicBtn from '../BasicBtn'

class Table extends React.Component {
  
  createTableData() {
    return this.props.data.map((e, index) => {
      return  (
        <tr key={index}>
          <td key={`${index}_date`}>
            {`${e.match_date.split('-').join('/')}\xa0\xa0\xa0\xa0\xa0\xa0\xa0${e.match_time} hrs`}
          </td>
          <td key={`${index}_name`}>{e.match_name}</td>
          <td key={`${index}_type`}>{e.match_type}</td>
          <td className="td-btn" key={`${index}_btns`}>
            <BasicBtn name="Ver" class={"btn-table"} />
            <BasicBtn name="Eliminar" class={"btn-table"}/>
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