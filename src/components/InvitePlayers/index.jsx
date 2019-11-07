import React from 'react';
import BasicBtn from '../BasicBtn';
import { db } from '../../data/firebase';
import './InvitePlayers.css';

class InvitePlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inviteEmail: '' };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  invitePlayer(id, players, email) {
    if (email === '') {
      return;
    }
    const newPlayer = [...players];
    newPlayer.push({ email, status: 0 });
    db.collection('matches').doc(id).update({
      players: newPlayer,
    });
  }

  render() {
    const { id, players } = this.props;
    const { inviteEmail } = this.state;
    return (
      <div className="container-invite-players">
        <input id="inviteEmail" onChange={this.handleChange} placeholder="correo@gmail.com" />
        <BasicBtn
          addClass="invite"
          click={() => this.invitePlayer(id, players, inviteEmail)}
          name="Invitar Jugador"
        />
      </div>
    );
  }
}

export default InvitePlayers;
