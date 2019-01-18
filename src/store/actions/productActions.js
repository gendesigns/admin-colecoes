export const createProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('products').add({
      ...product,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      console.log(product);
      dispatch({ type: 'CREATE_PRODUCT', product });
    }).catch((err) => {
      dispatch({ type: 'CREATE_PRODUCT_ERROR', err });
    });

  }
};

export const editProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('products').doc(product.id).update({
      ...product,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'EDIT_PRODUCT', product });
    }).catch((err) => {
      dispatch({ type: 'EDIT_PRODUCT_ERROR', err });
    });
  }
};

export const deleteProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('products').doc(product.id).delete()
    .then(() => {
      dispatch({ type: 'DELETE_PRODUCT', product });
    }).catch((err) => {
      dispatch({ type: 'DELETE_PRODUCT_ERROR', err });
    });
  }
};

export const statusProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('products').doc(product.id).update({
      status: product.status,
      title: product.title
    })
    .then(() => {
      dispatch({ type: 'STATUS_PRODUCT', product });
    })
  }
};
