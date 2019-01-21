import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Col } from 'react-materialize';

import ReactTooltip from 'react-tooltip'


const CollectionSummary = ({collection, deleteIdCollection, changeStatus}) => {
  return (
    <Col s={4}>
      <div className={collection.status==="inativo"? "card inativo" : "card"}>
        <div className="card-image">
          <a href={`/collection/${collection.id}`}>
            <img src={collection.image1} alt="" />
            <span className="card-title">{collection.title}</span>
          </a>
        </div>
        <div className="card-content">
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
            <a class="btn-floating btn-small waves-effect waves-light yellow" href={collection.pdf} target="_blank" rel="noopener noreferrer">
              <i class="material-icons black-text">picture_as_pdf</i>
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
        </div>
      </div>
    </Col>
  )
}

export default CollectionSummary;
