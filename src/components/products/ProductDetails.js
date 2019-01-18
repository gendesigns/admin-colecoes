import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ProductDetails = (props) => {
  const { product, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' />

  if (product) {
    return (
      <div className="container section product-details">
        <div className="card z-depth-0">
        { product.status==="inativo" ?
            <nav>
              <div className="nav-wrapper">
                <h4 className="center">Este produto está inativo</h4>
              </div>
            </nav>
            :
            <div></div>
          }
          <div className="card-content">
            <div className="row">
              <span className="card-title">Título: {product.title}</span>
            </div>
            <div className="row">
              <span className="card-title">Referência: {product.reference}</span>
            </div>
            <div className="row">
              <span className="card-title">Categoria: {product.category}</span>
            </div>
            <div className="row">
              <span className="card-title">Coleção: {product.collectionTitle}</span>
            </div>
            <div className="row">
              <span className="card-title">Familia: {product.family}</span>
            </div>
            <div className="row">
              <span className="card-title">Detalhes: {product.details}</span>
            </div>
            <div className="row card-action lighten-4">
              <div className="col s6">
                <span className="card-title">Imagem do produto</span>
                <img className="responsive-img" src={product.image1} alt="" />
              </div>
              <div className="col s6">
                <span className="card-title">Iagem de uso</span>
                <img className="responsive-img" src={product.image2} alt="" />
              </div>
            </div>
          </div>
          <div className="card-action lighten-4 grey-text">
            <div>Cadastrado por {product.authorFirstName} {product.authorLastName}</div>
            <div>{moment(product.createdAt.toDate().toString()).format('D/MM/YYYY - H:mm')}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading product...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null;
  return {
    product: product,
    auth: state.firebase.auth
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'products' }
  ])
)(ProductDetails);

