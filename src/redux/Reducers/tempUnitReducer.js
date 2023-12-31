// reducers/temperatureUnitReducer.js

import { SET_TEMPERATURE_UNIT } from "../Actions/actionType";

const initialState = {
  unit: '°C', // Default to Celsius
};

const temperatureUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMPERATURE_UNIT:
      return {
        ...state,
        unit: action.unit,
      };
    default:
      return state;
  }
};

export default temperatureUnitReducer;




// // reducers/temperatureUnitReducer.js
// const temperatureUnitReducer = (state = initialState, action) => {
//   console.log('Reducer called with action:', action); // Log the action
//   switch (action.type) {
//     case SET_TEMPERATURE_UNIT:
//       console.log('SET_TEMPERATURE_UNIT action received with unit:', action.unit);
//       return {
//         ...state,
//         unit: action.unit,
//       };
//     default:
//       return state;
//   }
// };
