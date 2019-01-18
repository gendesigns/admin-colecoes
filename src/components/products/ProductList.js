import React from 'react';
import ProductSummary from './ProductSummary';

const ProductList = ({products, deleteIdProduct, changeStatus}) => {
  return (
    <div className="product-list section">
      { products && products.map((product, index) => (
          <ProductSummary
            key={index}
            product={product}
            deleteIdProduct={deleteIdProduct}
            changeStatus={changeStatus}/>
        ))}
    </div>
  )
}

export default ProductList;
