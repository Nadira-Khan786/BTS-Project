import { push } from "react-router-redux";
import { createLogic } from "redux-logic";

import { AuthLogic } from "./auth";
import { CategoriesLogic } from "./categories";
import {SubCategoriesLogic} from './listSubCategories';
import {AllerryLogic} from './Allergy';
import {SpiceLevelLogic} from './SpiceLevel';
import {CalorieLogic} from './Calorie';
import {FoodTypesLogic} from './FoodType';
import {FilterTypeLogic} from './FilterType';
export const redirectToLogic = createLogic({
  type: "REDIRET_TO",
  async process({ action }, dispatch, done) {
    dispatch(push(action.payload.path));
    done();
  },
});

export default [
  ...AuthLogic,
  ...CategoriesLogic,
  ...SubCategoriesLogic,
  ...AllerryLogic,
  ...SpiceLevelLogic,
  ...CalorieLogic,
  ...FoodTypesLogic,
  ...FilterTypeLogic,
  redirectToLogic,
];
