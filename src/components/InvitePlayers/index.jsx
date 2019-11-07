import React from 'react';
import BasicBtn from '../BasicBtn';
import { db } from '../../data/firebase';
import './InvitePlayers.css';

class InvitePlayers extends React.Component {
  constructor(props){
    super(props);
    this.state = { invite_email: ""};
  }
  
  invitePlayer(id, players, email) {
    const newPlayer = [...players]
    newPlayer.push({email: email, status: 0})
    db.collection("matches").doc(id).update({
      players : newPlayer
    })
  }

  handleChange = (event) => { 
    this.setState({ [event.target.id]: event.target.value });
  }
  
  render(){
  return(
  <div className="container-invite-players">
    <input id="invite_email" onChange={this.handleChange} placeholder="correo@gmail.com" />
    <BasicBtn 
      class="invite" 
      click={() => this.invitePlayer(this.props.id, this.props.players, this.state.invite_email)} 
      name="Invitar Jugador"
    />
  </div>
  )
  }
}

export default InvitePlayers