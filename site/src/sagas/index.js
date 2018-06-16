import { call, put, takeLatest } from 'redux-saga/effects'
import { types } from '../actions'
import { firestore } from '../api/firebase'

function* fetchChatsByTags(action) {
  try {
    const { startAt, endAt } = action.payload
    const ref = firestore.collection('tags').orderBy('label').startAt(startAt).endAt(endAt)
    const tags = yield call([ref, ref.get])
    // eslint-disable-next-line no-restricted-syntax
    for (const doc of tags.docs) {
      const tagRef = firestore.collection('tags').doc(doc.id).collection('chats')
      const chats = yield call([tagRef, tagRef.get])
      yield put({
        type: types.FIRESTORE_FETCH_CHATS_SUCCEEDED,
        payload: { [doc.id]: chats.docs.map(chatDoc => chatDoc.data()) },
      })
    }
    yield put({
      type: types.FIRESTORE_FETCH_CHATS_BY_TAGS_SUCCEEDED,
      payload: { [startAt]: tags.docs.map(doc => doc.data().label) },
    })
  } catch (e) {
    // console.warn('saga erro', e)
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* fetchTags() {
  try {
    const ref = firestore.collection('tags')
    const tags = yield call([ref, ref.get])
    // for (let doc of tags.docs) {
    //   const tagRef = firestore.collection('tags').doc(doc.id).collection('chats')
    //   const chats = yield call([tagRef, tagRef.get])
    //   yield put({
    //     type: types.FIRESTORE_FETCH_CHATS_SUCCEEDED,
    //     payload: {[doc.id]: chats.docs.map(doc => doc.data())},
    //   })
    // }
    yield put({
      type: types.FIRESTORE_FETCH_TAGS_SUCCEEDED,
      payload: { tags: tags.docs.map(doc => ({ label: doc.data().label })) },
    })
  } catch (e) {
    // console.warn('saga erro', e)
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* mySaga() {
  yield takeLatest(types.FIRESTORE_FETCH_CHATS_BY_TAGS, fetchChatsByTags)
  yield takeLatest(types.FIRESTORE_FETCH_TAGS, fetchTags)
}

export default mySaga
