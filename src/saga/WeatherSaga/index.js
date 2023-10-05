import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchWeatherData } from '../../helper/api';
import { fetchWeatherSuccess } from '../../redux/Actions';
import { fetchWeatherFailure } from '../../redux/Actions';

export function* fetchWeather(action) {
  try {
    const data = yield call(fetchWeatherData, action.payload.cityName);
    yield put(fetchWeatherSuccess({ weeklyData: data })); // Dispatch the success action with weeklyData payload
  } catch (error) {
    yield put(fetchWeatherFailure(error));
  }
}

export default function* watchFetchWeather() {
  yield takeLatest('FETCH_WEATHER_REQUEST', fetchWeather);
}
