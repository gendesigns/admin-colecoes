import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const CollectionDetails = (props) => {
  const { collection, auth } = props;

  if (!auth.uid) return <Redirect to='/signin' />

  if (collection) {
    return (
      <div className="container section collection-details">
        <div className="card z-depth-0">

          { collection.status==="inativo" ?
            <nav>
              <div className="nav-wrapper">
                <h4 className="center">Esta coleção está inativa</h4>
              </div>
            </nav>
            :
            <div></div>
          }
          <div className="card-content">
            <div className="row">
              <span className="card-title">{collection.title}</span>
              <p>{collection.description}</p>
            </div>
            <div className="row card-action lighten-4">
              <div className="col s6">
                <span className="card-title">Capa 1</span>
                <img className="responsive-img" src={collection.image1} alt="" />
              </div>
              <div className="col s6">
                <span className="card-title">Capa 2</span>
                <img className="responsive-img" src={collection.image2} alt="" />
              </div>
            </div>
          </div>
          <div className="card-action lighten-4 grey-text">
            <div>Cadastrado por {collection.authorFirstName} {collection.authorLastName}</div>
            <div>{moment(collection.createdAt.toDate().toString()).format('D/MM/YYYY - H:mm')}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading collection...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const collections = state.firestore.data.collections;
  const collection = collections ? collections[id] : null;
  return {
    collection: collection,
    auth: state.firebase.auth
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'collections' }
  ])
)(CollectionDetails);

