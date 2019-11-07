import React from 'react';
import './BasicBtn.css';

const BasicBtn = ({ addClass, click, name }) => (
  <button type="button" className={`${addClass} btn-basic`} onClick={click}>{name}</button>
);

export default BasicBtn;
