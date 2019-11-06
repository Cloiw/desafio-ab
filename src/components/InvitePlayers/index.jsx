import React from 'react';
import BasicBtn from '../BasicBtn';
import './InvitePlayers.css'

const InvitePlayers = (props) => {
  return(
  <div className="container-invite-players">
    <input placeholder="correo@gmail.com" />
    <BasicBtn class="invite" name="Invitar Jugadores" />
  </div>
  )
}

export default InvitePlayers