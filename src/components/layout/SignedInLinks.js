import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  return (
    <ul className="right">
      <li><NavLink to='/collections'>Coleções</NavLink></li>
      <li><NavLink to='/products'>Produtos</NavLink></li>
      <li><NavLink to='/createCollection'>Nova Coleção</NavLink></li>
      <li><NavLink to='/createProduct'>Novo Produto</NavLink></li>
      <li><div onClick={props.signOut}>Log Out</div></li>
      <li><NavLink to='/' className='btn btn-floating cyan lighten-1'>{props.profile.initials}</NavLink></li>
    </ul>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
