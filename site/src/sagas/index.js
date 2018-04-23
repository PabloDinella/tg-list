import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import types from 'actions/types'
import {firestore} from 'api/firebase'

function* fetchTags(action) {
  console.log('intercepted');
  try {
    const {startAt, endAt} = action.payload
    const ref = firestore.collection('tags').orderBy('label').startAt(startAt).endAt(endAt)
    const tags = yield call([ref, ref.get]);
    yield put({
      type: types.FIRESTORE_FETCH_TAGS_SUCCEEDED,
      payload: {[startAt]: tags.docs.map(doc => doc.data().label)}
    });
  } catch (e) {
    console.warn('saga erro', e);
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* mySaga() {
  yield takeLatest(types.FIRESTORE_FETCH_TAGS, fetchTags);
}

export default mySaga;
