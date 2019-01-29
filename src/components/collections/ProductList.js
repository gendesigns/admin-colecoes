import React from 'react';
import ProductSummary from './ProductSummary';

const ProductList = ({products, deleteIdProduct, changeStatus}) => {
  return (
    <div className="product-list section">
      { products && products.map((product) => {
          return(
            <ProductSummary
              key={product.id}
              product={product}
              deleteIdProduct={deleteIdProduct}
              changeStatus={changeStatus}
            />
          );
        })
      }
    </div>
  )
}

export default ProductList;
