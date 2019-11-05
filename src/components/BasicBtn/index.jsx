import React from 'react';
import './BasicBtn.css';

const BasicBtn = (props) => (
  <button className='btn-basic' onClick={props.click}>{props.name}</button>
);

export default BasicBtn