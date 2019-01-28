import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createProduct } from '../../store/actions/productActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';

import { Row, Col, Input } from 'react-materialize';

class CreateProduct extends Component {

  state = {
    status:'ativo',
    reference: '',
    category: '',
    collectionTitle: '',
    details: '',
    image1: '',
    image2: '',
    uploadValue: 0
  }

  componentDidMount(){
    console.log("Didimount")
  }

  fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    const fileId = e.target.id;
    const storageRef = firebase.storage().ref(`products/${file.lastModified}_${file.name}`)
    const task = storageRef.put(file)
    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      this.setState({
        message: `Ocorreu um erro: ${error.message}`
      })
    }, () => {
      task.snapshot.ref.getDownloadURL().then((urlImage)=> {
        switch(fileId){
          case 'image1':
            return (
              this.setState({
                image1: urlImage
              })
            );
          case 'image2':
            return (
              this.setState({
                image2: urlImage
              })
            );
          default:
            return null
        }
      })
    })
  }

  // deleteFile = () => {
  //   const storageRef = firebase.storage().child(`products/${file.lastModified}_${file.name}`)
  //   var desertRef = storageRef.child('images/desert.jpg');

  //   desertRef.delete().then(function() {

  //   }).catch(function(error) {

  //   });

  // }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProduct(this.state);
    document.getElementById('form').reset();
  }
  render() {
    const { auth, collections } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="create">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white" id="form">
            <h5 className="grey-text text-darken-3">Novo Produto</h5>
            <div className="input-field">
              <label htmlFor="title">Título: (Brinco, Brinco quadrado, Brinco vazado e etc...)</label>
              <input type="text" id="title" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="reference">Referência</label>
              <input type="text" id="reference" onChange={this.handleChange} />
            </div>

            <Row>
              <Input s={12}
                type='select'
                id="category"
                label="Categoria"
                defaultValue='0'
                onChange={this.handleChange}
              >
                <option value='0'>Selecione uma Categoria</option>
                <option value='Alianças'>Alianças</option>
                <option value='Anéis'>Anéis</option>
                <option value='Brincos'>Brincos</option>
                <option value='Colares e Correntes'>Colares e Correntes</option>
                <option value='Pingentes'>Pingentes</option>
                <option value='Pulseiras'>Pulseiras</option>
                <option value='Solitários'>Solitários</option>
              </Input>
            </Row>
            <Row>
              <Input s={12}
                  type='select'
                  id="collectionTitle"
                  label="Coleção"
                  defaultValue='0'
                  onChange={this.handleChange}
                >
            { collections && collections.map(collection => {
              return (
                <option value={collection.title} key={collection.id}>{collection.title}</option>
              )
            })}
              </Input>
            </Row>

            <Row>
              <Input s={12}
                  type='select'
                  id="family"
                  label="Familia"
                  defaultValue='0'
                  onChange={this.handleChange}
                >
                <option value='0'>Selecione uma familia</option>
                <option value='Aço'>Aço</option>
                <option value='Prata 925'>Prata 925</option>
                <option value='Folheado a Ouro 18k'>Folheado a Ouro 18k</option>
                <option value='Folheado a Rhodium'>Folheado a Rhodium</option>
                <option value='Folheado a Rhodium Negro'>Folheado a Rhodium Negro</option>
              </Input>
            </Row>
            <div className="input-field">
              <label htmlFor="details">Detalhes: (Cristais, Zircônias e etc...)</label>
              <textarea id="details" cols="30" rows="10" className="materialize-textarea" onChange={this.handleChange}>
              </textarea>
            </div>

              <Row>
                {this.state.uploadValue === 0 || this.state.uploadValue===100 ? null :
                  <div className="col s12">
                    <span>Carregando arquivo...</span>
                    <div className="progress">
                      <div className="determinate" style={{width: this.state.uploadValue+"%"}}></div>
                    </div>
                  </div>
                }
              </Row>
              <Row>
              <Col s={6}>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Image do produto</span>
                    <input type="file" id="image1" onChange={this.fileSelectedHandler}/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Imagem do produto"/>
                  </div>
                </div>
              </Col>
              <Col s={6}>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Image de uso</span>
                    <input type="file" id="image2" onChange={this.fileSelectedHandler}/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Imagem de uso"/>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col s={6}>
                <div className="file-field input-field">
                  {
                    this.state.image1 ? <img className="responsive-img" src={this.state.image1} alt="" />
                    :<img className="responsive-img" src={this.state.image1} alt="" />
                  }
                </div>
              </Col>
              <Col s={6}>
                <div className="file-field input-field">
                  {
                    this.state.image2 ? <img className="responsive-img" src={this.state.image2} alt="" />
                    :<img className="responsive-img" src={this.state.image2} alt="" />
                  }
                </div>
              </Col>
            </Row>

            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    collections: state.firestore.ordered.collections
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(createProduct(product))
  }
}

export default
compose(
  firestoreConnect([
    { collection: 'collections' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateProduct);

