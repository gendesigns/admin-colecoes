import React, { Component } from 'react';
import CollectionList from './CollectionList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-materialize';

import { deleteCollection, statusCollection } from '../../store/actions/collectionActions';

class Collections extends Component {

  deleteIdCollection = (idCollection) => {
    this.props.deleteCollection(idCollection)
  }

  changeStatus = (collection) => {
    if(collection.status==="ativo"){
      this.setState({
        status: 'inativo',
        id: collection.id,
        title: collection.title,
      })
    }else{
      this.setState({
        status: 'ativo',
        id: collection.id,
        title: collection.title,
      })
    }
    setTimeout(() => { this.updateStatus() },100);
  }

  updateStatus = () => {
    this.props.statusCollection(this.state)
  }

  render() {
    const { collections, auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <Container className="dashboard">
        <Row>
          <Col s={12}>
            <CollectionList
              collections={collections}
              deleteIdCollection={this.deleteIdCollection}
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
    collections: state.firestore.ordered.collections,
    auth: state.firebase.auth
  };

}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCollection: (collection) => dispatch(deleteCollection(collection)),
    statusCollection: (collection) => dispatch(statusCollection(collection)),
  }
}

export default compose(
  firestoreConnect([
    { collection: 'collections' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Collections);
