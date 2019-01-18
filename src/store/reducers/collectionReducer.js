const initState = {};

const collectionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_COLLECTION':
      console.log('created collection', action.collection);
      return state;
    case 'CREATE_COLLECTION_ERROR':
      console.log('create collection error', action.err);
      return state;
    case 'EDIT_COLLECTION':
      console.log('edited collection', action.collection);
      return state;
    case 'EDIT_COLLECTION_ERROR':
      console.log('edit collection error', action.err);
      return state;
    case 'DELETE_COLLECTION':
      window.Materialize.toast(`Coleção ${action.collection.title.toUpperCase()} deletada com sucesso!`, 5000)
      return state;
    case 'DELETE_COLLECTION_ERROR':
      console.log('delete collection error', action.err);
      return state;
    case 'STATUS_COLLECTION':
      window.Materialize.toast(`Coleção ${action.collection.title.toUpperCase()} ${action.collection.status}!`, 5000)
      return state;

      default:
      return state;
  }
};

export default collectionReducer;
