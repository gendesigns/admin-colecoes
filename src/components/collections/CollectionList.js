import React from 'react';
import CollectionSummary from './CollectionSummary';

const CollectionList = ({collections, deleteIdCollection, changeStatus}) => {

  return (
    <div className="collection-list section">
      { collections && collections.map((collection, index) => (
        <CollectionSummary
          key={index}
          collection={collection}
          deleteIdCollection={deleteIdCollection}
          changeStatus={changeStatus}/>
      ))}
    </div>
  )
}

export default CollectionList;
