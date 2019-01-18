import React, { Component } from 'react';
import Notifications from './Notifications';
import ProductList from '../products/ProductList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const { products, auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProductList products={products}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.firestore.ordered.products);
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth
  };

}

export default compose(
  firestoreConnect([
    { collection: 'products' }
  ]),
  connect(mapStateToProps)
)(Dashboard);
