import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Col } from 'react-materialize';

import ReactTooltip from 'react-tooltip'

const ProductSummary = ({product, deleteIdProduct, changeStatus}) => {
  return (
    <Col s={3}>
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <a href={`/product/${product.id}`}><img className="responsive-img" src={product.image1} alt="" /></a>
          <strong className="title-collection">Coleção {product.collectionTitle}</strong>
        </div>
        <div className="card-content">
          <p className="card-title activator grey-text text-darken-4">Título: {product.title?product.title: <span className="red-text">Sem título</span>}<i className="material-icons right">more_vert</i></p>
          <p>Ref: {product.reference}</p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">Ref: {product.reference}<i className="material-icons right">close</i></span>
          <div>
            <div className="card-content">
              <div className="switch center">
                <label>
                  Inativo
                  <input
                    type="checkbox"
                    defaultChecked={product.status==="ativo" ? true : false}
                    id="status"
                    value={product.status}
                    onChange={() => changeStatus(product)}
                  />
                  <span className="lever"></span>
                  Ativo
                </label>
              </div>
              <div className="card-action">
                <ReactTooltip id='ver' type='success' effect='solid'>{}</ReactTooltip>
                <a href={`/product/${product.id}`} data-tip='Ver Produto' data-for='ver'>
                  <Button
                    floating
                    small='true'
                    className='green'
                    waves='light'
                    icon='remove_red_eye'
                  />
                </a>
                <ReactTooltip id='editar' type='info' effect='solid'>{}</ReactTooltip>
                <Link to={`/editProduct/${product.id}`} data-tip='Editar Produto' data-for='editar'>
                  <Button
                    floating
                    small='true'
                    className='blue'
                    waves='light'
                    icon='mode_edit'
                  />
                </Link>
                <ReactTooltip id='deletar' type='error' effect='solid'>{}</ReactTooltip>
                <Button
                  floating
                  small='true'
                  data-tip='Deletar Produto' data-for='deletar'
                  className="red"
                  waves='light'
                  icon='delete'
                  onClick={() => deleteIdProduct(product)}
                />
              </div>
            </div>
            <div className="card-content">
              <p className="grey-text card-author">Cadastrado por {product.authorFirstName} {product.authorLastName}</p>
              <p className="grey-text card-date">{moment(product.createdAt.toDate().toString()).format('D/MM/YYYY - H:mm')}</p>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProductSummary;
