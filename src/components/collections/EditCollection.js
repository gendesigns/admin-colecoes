import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { editCollection } from '../../store/actions/collectionActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Row, Col, Preloader } from 'react-materialize';

class EditCollection extends Component {
  state = {
    status:'',
    title: '',
    description: '',
    pdf: '',
    image1: '',
    image2: '',
    uploadValue: 0
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('collections').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const collection = doc.data();
        this.setState({
          id: this.props.match.params.id,
          status: collection.status,
          title: collection.title,
          description: collection.description,
          pdf: collection.pdf,
          image1: collection.image1,
          image2: collection.image2,
          uploadValue: 0
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    const fileId = e.target.id;
    const storageRef = firebase.storage().ref(`covers/${file.lastModified}_${file.name}`)
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
      task.snapshot.ref.getDownloadURL().then((urlfile)=> {
        switch(fileId){
          case 'pdf':
            return (
              this.setState({
                pdf: urlfile
              })
            );
          case 'image1':
            return (
              this.setState({
                image1: urlfile
              })
            );
          case 'image2':
            return (
              this.setState({
                image2: urlfile
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
    this.props.editCollection(this.state);
    this.props.history.push('/collections');
  }
  render() {

    const { auth } = this.props;
    const { title, description, image1, image2 } = this.state;

    if (!auth.uid) return <Redirect to='/signin' />
    // console.log("Fora do if: ",collection);
    if (title) {
      // console.log("Dentro do if: ",collection);
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            {this.state.uploadValue === 0 || this.state.uploadValue===100 ? null :
              <div>
              <span>Carregando arquivo...</span>
                <div className="progress">
                  <div className="determinate" style={{width: this.state.uploadValue+"%"}}></div>
                </div>
              </div>
            }

            <h5 className="grey-text text-darken-3">Editar Coleção</h5>
            <div className="input-field">
              {title ? null : <label htmlFor="title">Titulo</label>}
              <input type="text" id="title" value={title} onChange={this.handleChange} />
            </div>
            <div className="input-field">
              {description ? null : <label htmlFor="description">Descrição</label>}
              <textarea id="description" cols="30" rows="10" className="materialize-textarea" value={description} onChange={this.handleChange}>
              </textarea>
            </div>

            <Row>
              <Col s={9}>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>PDF</span>
                    <input type="file" id="pdf" onChange={this.fileSelectedHandler}/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" defaultValue={this.state.pdf} placeholder="PDF da Coleção"/>
                  </div>
                </div>
              </Col>
              <Col s={3}>
                {this.state.pdf ?<a className="btn info right" href={this.state.pdf} target="_blank" rel="noopener noreferrer"> Ver PDF </a>:null}
              </Col>
            </Row>

            <Row>
              <div className="file-field input-field">
                <Col s={6}>
                  <div className="btn">
                    <span>Capa 1</span>
                    <input type="file" id="image1" onChange={this.fileSelectedHandler}/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" defaultValue={image1} placeholder="Imagem da Capa 1"/>
                  </div>
                </Col>
                <Col s={6}>
                <div className="btn">
                  <span>Capa 2</span>
                  <input type="file" id="image2" onChange={this.fileSelectedHandler}/>
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" defaultValue={image2} placeholder="Imagem da Capa 2"/>
                </div>
                </Col>
              </div>
            </Row>

            <Row>
              <div className="file-field input-field images">
                <Col s={6}>
                  <div>
                    {
                      image1 ? <img className="responsive-img" src={image1} alt="" />
                      :<img className="responsive-img" src={image1} alt="" />
                    }
                  </div>
                </Col>
                <Col s={6}>
                <div>
                  {
                    image2 ? <img className="responsive-img" src={image2} alt="" />
                    :<img className="responsive-img" src={image2} alt="" />
                  }
                  </div>
                </Col>
              </div>
            </Row>

            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Salvar</button>
            </div>
          </form>
        </div>
      )
    }else{
      return (
        <div className="container center">
          <p><Preloader color="yellow" size='small'/></p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const collections = state.firestore.data.collections;
  const collection = collections ? collections[id] : null;

  return {
    idCollection: id,
    collection: collection,
    auth: state.firebase.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    editCollection: (collection) => dispatch(editCollection(collection))
  }
}

export default compose(
  firestoreConnect([
    { collection: 'collections' }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(EditCollection);
