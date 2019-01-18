export const createCollection = (collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('collections').add({
      ...collection,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_COLLECTION', collection });
    }).catch((err) => {
      dispatch({ type: 'CREATE_COLLECTION_ERROR', err });
    });

  }
};

export const editCollection = (collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('collections').doc(collection.id).update({
      ...collection,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'EDIT_COLLECTION', collection });
    }).catch((err) => {
      dispatch({ type: 'EDIT_COLLECTION_ERROR', err });
    });
  }
};

export const deleteCollection = (collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('collections').doc(collection.id).delete()
    .then(() => {
      dispatch({ type: 'DELETE_COLLECTION', collection });
    }).catch((err) => {
      dispatch({ type: 'DELETE_COLLECTION_ERROR', err });
    });
  }
};

export const statusCollection = (collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('collections').doc(collection.id).update({
      status: collection.status,
      title: collection.title
    })
    .then(() => {
      dispatch({ type: 'STATUS_COLLECTION', collection });
    })
  }
};
