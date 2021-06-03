import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/Constants";
import {
  showLoader,
  hideLoader,
  subCategoriesActions,
  getSubCategoriesSuccess,
  getSubCategoriesRequest,
  modalCloseRequest,
  getSubCategoriesSuccessById,
} from "../actions";
let toastId = null;

/**
 *  CRUD Categories
 */
const addSubCategoriesLogic = createLogic({
  type: subCategoriesActions.ADD_SUBCATEGORIE_REQUEST,
  cancelType: subCategoriesActions.ADD_SUBCATEGORIE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/sub-category",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      toastId = toast.success("Add Success!");
      dispatch(getSubCategoriesRequest());
      dispatch(modalCloseRequest({addSubCategoryModalOpen:false}))
      dispatch(hideLoader());
      done();
    }
  },
});

// getList
const getSubCategoriesLogic = createLogic({
  type: subCategoriesActions.GET_SUBCATEGORIE_REQUEST,
  cancelType: subCategoriesActions.GET_SUBCATEGORIE_FAILED,
  async process({ action }, dispatch, done) {
    
    dispatch(getSubCategoriesSuccess({ isLoading: true }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/sub-category",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getSubCategoriesSuccess({ isLoading: false }));
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getSubCategoriesSuccess({ data: result.data, isLoading: false })
      );
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

const getSubCategoriesByIdLogic = createLogic({
  type: subCategoriesActions.GET_SUBCATEGORIE_REQUEST_BY_ID,
  cancelType: subCategoriesActions.GET_SUBCATEGORIE_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    console.log("action",action.payload);
    let sub_category_id = action.payload.sub_category_id;
    delete action.payload.sub_category_id;
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/sub-category/" + sub_category_id],
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      dispatch(getSubCategoriesSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateSubCategoriesLogic = createLogic({
  type: subCategoriesActions.UPDATE_SUBCATEGORIE_REQUEST,
  cancelType: subCategoriesActions.UPDATE_SUBCATEGORIE_FAILED,
  async process({ action }, dispatch, done) {
    let sub_category_id = action.payload.sub_category_id;
    delete action.payload.sub_category_id;
    delete action.payload.cId;
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/sub-category/" + sub_category_id],
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      toastId = toast.success("Updated Category Success!");
      dispatch(
        modalCloseRequest({
          editSubCategoryModalOpen: false,
        })
      );
      dispatch(getSubCategoriesSuccessById({ dataById: {} }));
      dispatch(getSubCategoriesRequest());
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

export const SubCategoriesLogic = [
  addSubCategoriesLogic,
  getSubCategoriesLogic,
  updateSubCategoriesLogic,getSubCategoriesByIdLogic
];
