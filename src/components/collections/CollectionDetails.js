import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-materialize';

import ProductList from './ProductList';
import { deleteProduct, statusProduct } from '../../store/actions/productActions'
class CollectionDetails extends Component {

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

    const { collection, auth, products } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />
    if (collection) {
      return (
        <Container className="dashboard">
          <Row>
            <Col s={12}>
            <div className={collection.status==="inativo"? "card inativo medium" : "card medium"}>
              <div className="card-image">

                { collection.image1?
                  <img src={collection.image1} alt="" />:
                  <img src="https://firebasestorage.googleapis.com/v0/b/rommanel-colecoes-e6383.appspot.com/o/covers%2Fgeneric-cover-1024x600.jpg?alt=media&token=d0ba75f1-05b5-4b21-a7ca-c1cda829a8be" alt="" />
                }


              </div>
              <div className="card-content">
                <span className="card-title center">{collection.title}</span>
              </div>
              {/* <div className="card-content">
                <div className="switch center">
                  <label>
                    Inativa
                    <input
                      type="checkbox"
                      defaultChecked={collection.status==="ativo" ? true : false}
                      id="status"
                      value={collection.status}
                      onChange={() => changeStatus(collection)}
                    />
                    <span className="lever"></span>
                    Ativa
                  </label>
                </div>
              </div>
              <div className="card-content">
                <p className="grey-text card-author">Cadastrado por {collection.authorFirstName} {collection.authorLastName}</p>
                <p className="grey-text card-date">{moment(collection.createdAt.toDate().toString()).format('D/MM/YYYY - H:mm')}</p>
              </div>
              <div className="card-action">
                <ReactTooltip id='ver' type='success' effect='solid'>{}</ReactTooltip>
                <a href={`/collection/${collection.id}`}  data-tip='Ver Coleção' data-for='ver'>
                  <Button
                    floating
                    small='true'
                    className='green'
                    waves='light'
                    icon='remove_red_eye'
                  />
                </a>
                <ReactTooltip id='editar' type='info' effect='solid'>{}</ReactTooltip>
                <Link to={`editCollection/${collection.id}`} data-tip='Editar Coleção' data-for='editar'>
                  <Button
                    floating
                    small='true'
                    className='blue'
                    waves='light'
                    icon='mode_edit'
                  />
                </Link>
                { collection.pdf ?
                  <a className="btn-floating btn-small waves-effect waves-light yellow" href={collection.pdf} target="_blank" rel="noopener noreferrer">
                    <i className="material-icons black-text">picture_as_pdf</i>
                  </a>: null
                }
                <ReactTooltip id='deletar' type='error' effect='solid'>{}</ReactTooltip>
                <Button
                  floating
                  small='true'
                  data-tip='Deletar Coleção' data-for='deletar'
                  className="red right"
                  waves='light'
                  icon='delete'
                  onClick={() => deleteIdCollection(collection)}
                />
              </div> */}
            </div>
            </Col>
          </Row>
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
      )
    } else {
      return (
        <div className="container center">
          <p>Loading collection...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const collections = state.firestore.data.collections;
  const collection = collections ? collections[id] : null;
  // const collection = state.firestore.ordered.collections ? state.firestore.ordered.collections.map(c => c) : [];
  return {
    collection:  collection,
    products: state.firestore.ordered.products,
    auth: state.firebase.auth,
    uid: id,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    statusProduct: (product) => dispatch(statusProduct(product)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {

    if(!props.auth.uid) return []
    return [
      {
        collection: 'collections',
      },
      {
        collection: 'products',
        where: [
          ['collectionTitle', '==', `${props.collection?props.collection.title:""}`]
        ]
      }
    ];
  })
)(CollectionDetails);
