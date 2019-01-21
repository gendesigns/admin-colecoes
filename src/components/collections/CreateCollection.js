import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createCollection } from '../../store/actions/collectionActions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Button, Row, Col } from 'react-materialize';

class CreateCollection extends Component {
  state = {
    status:'inativo',
    title: '',
    description: '',
    pdf:'',
    image1: '',
    image2: '',
    uploadValue: 0
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
    console.log(this.state);
    this.props.createCollection(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />

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
          <h5 className="grey-text text-darken-3">Nova Coleção</h5>
          <div className="input-field">
            <label htmlFor="title">Titulo</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="description">Descrição</label>
            <textarea id="description" cols="30" rows="10" className="materialize-textarea" onChange={this.handleChange}>
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
                {this.state.pdf ?<Button waves='light' className="info right" node='a' href={this.state.pdf}> Ver PDF </Button>:null}
              </Col>
            </Row>

            <Row>
              <Col s={6}>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Capa 1</span>
                    <input type="file" id="image1" onChange={this.fileSelectedHandler}/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Imagem da Capa 1"/>
                  </div>
                </div>
              </Col>
              <Col s={6}>
                <div className="file-field input-field">
                    <div className="btn">
                      <span>Capa 2</span>
                      <input type="file" id="image2" onChange={this.fileSelectedHandler}/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" placeholder="Imagem da Capa 2"/>
                    </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col s={6}>
                <div className="file-field input-field">
                  <img className="responsive-img" src={this.state.image1} alt="" />
                </div>
              </Col>
              <Col s={6}>
                <div className="file-field input-field">
                  <img className="responsive-img" src={this.state.image2} alt="" />
                </div>
              </Col>
            </Row>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Salvar</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCollection: (collection) => dispatch(createCollection(collection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection);
