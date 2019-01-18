import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { editProduct } from '../../store/actions/productActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';

import { Row, Input } from 'react-materialize';

class EditProduct extends Component {
  state = {
    uploadValue: 0
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('products').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const product = doc.data();
        this.setState({
          id: this.props.match.params.id,
          category: product.category,
          status: product.status,
          title: product.title,
          collectionTitle: product.collectionTitle,
          reference: product.reference,
          family: product.family,
          details: product.details,
          image1: product.image1,
          image2: product.image2
        });
      } else {
        console.log("No such document!");
      }
    });
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

  handleChange = (e) => {
    // console.log(e.target.id);
    // console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editProduct(this.state);
    this.props.history.push('/products');
  }
  render() {

    const { auth, collections } = this.props;
    const { category, title, collectionTitle, reference, family, details, image1, image2 } = this.state;

    if (!auth.uid) return <Redirect to='/signin' />

    if (title) {

      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Editar Produto</h5>
            <div className="input-field">
              {title ? null : <label htmlFor="title">Titulo</label>}
              <input type="text" id="title" value={title} onChange={this.handleChange} />
            </div>
            <div className="input-field">
              {reference ? null : <label htmlFor="reference">Referência</label>}
              <input type="text" id="reference" value={reference} onChange={this.handleChange} />
            </div>
            <Row>
              <Input s={12}
                type='select'
                id="category"
                label="Categoria"
                defaultValue={category}
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
                  defaultValue={collectionTitle}
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
                  defaultValue={family}
                  onChange={this.handleChange}
                >
                <option value='0'>Selecione uma familia</option>
                <option value='Aço'>Aço</option>
                <option value='Folheado a Ouro 18k'>Folheado a Ouro 18k</option>
                <option value='Folheado a Rhodium'>Folheado a Rhodium</option>
                <option value='Folheado a Rhodium Negro'>Folheado a Rhodium Negro</option>
              </Input>
            </Row>
            <div className="input-field">
              {details ? null : <label htmlFor="details">Detalhes: (Cristais, Zircônias e etc...)</label>}
              <textarea id="details" cols="30" rows="10" className="materialize-textarea" value={details} onChange={this.handleChange}>
              </textarea>
            </div>

            <div className="file-field input-field">
              <div className="btn">
                <span>Image do produto</span>
                <input type="file" id="image1" onChange={this.fileSelectedHandler}/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" defaultValue={image1} placeholder="Imagem do produto"/>
              </div>
              <div>
                {
                  image1 ? <img className="responsive-img" src={image1} alt="" />
                  :<img className="responsive-img" src={this.state.image1} alt="" />
                }
              </div>
            </div>

            <div className="file-field input-field">
              <div className="btn">
                <span>Image de uso</span>
                <input type="file" id="image2" onChange={this.fileSelectedHandler}/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" defaultValue={image2} placeholder="Imagem de uso"/>
              </div>
              <div>
              {
                image2 ? <img className="responsive-img" src={image2} alt="" />
                :<img className="responsive-img" src={image2} alt="" />
              }
              </div>
            </div>
            <div className="progress">
              <div className="determinate" style={{width: this.state.uploadValue+"%"}}></div>
            </div>

            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Atualizar</button>
            </div>
          </form>

        </div>
      )
    }else{
      return (
        <div className="container center">
          <p>Loading product...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null;

  return {
    auth: state.firebase.auth,
    idProduct: id,
    product: product,
    collections: state.firestore.ordered.collections,

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (product) => dispatch(editProduct(product))
  }
}

export default compose(
  firestoreConnect([
    { collection: 'collections' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(EditProduct);
