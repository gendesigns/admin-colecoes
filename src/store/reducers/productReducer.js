const initState = {};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT':
      console.log('created product', action.product);
      window.Materialize.toast(`${action.product.title.toUpperCase()} ${action.product.reference.toUpperCase()} cadastrado com sucesso!`, 5000)
      return state;
    case 'CREATE_PRODUCT_ERROR':
      console.log('create product error', action.err);
      return state;
    case 'EDIT_PRODUCT':
      console.log('edited product', action.product);
      return state;
    case 'EDIT_PRODUCT_ERROR':
      console.log('edit product error', action.err);
      return state;
    case 'DELETE_PRODUCT':
      window.Materialize.toast(`Produto ${action.product.title.toUpperCase()} deletado com sucesso!`, 5000)
      return state;
    case 'DELETE_PRODUCT_ERROR':
      console.log('delete product error', action.err);
      return state;
    case 'STATUS_PRODUCT':
      window.Materialize.toast(`Produto ${action.product.title.toUpperCase()} ${action.product.status}!`, 5000)
      return state;

      default:
      return state;
  }
};

export default productReducer;
