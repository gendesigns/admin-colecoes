import React, { Component } from 'react';
import ProductList from './ProductList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-materialize';

import { deleteProduct, statusProduct } from '../../store/actions/productActions'

class Products extends Component {

  deleteIdProduct = (idProduct) => {
    this.props.deleteProduct(idProduct)
  }

  changeStatus = (product) => {
    if(product.status==="ativo"){
      this.setState({
        status: 'inativo',
        id: product.id,
        title: product.title,
      })
    }else{
      this.setState({
        status: 'ativo',
        id: product.id,
        title: product.title,
      })
    }
    setTimeout(() => { this.updateStatus() },100);
  }

  updateStatus = () => {
    this.props.statusProduct(this.state)
  }


  render() {
    const { products, auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <Container className="dashboard">
        <Row>
          <Col s={12}>
            <ProductList
              products={products}
              deleteIdProduct={this.deleteIdProduct}
              changeStatus={this.changeStatus}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (collection) => dispatch(deleteProduct(collection)),
    statusProduct: (collection) => dispatch(statusProduct(collection)),
  }
}

export default compose(
  firestoreConnect([
    { collection: 'products' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Products);
