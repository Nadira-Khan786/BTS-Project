import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/Constants";
import {
  showLoader,
  hideLoader,
  spiceLevelActions,
  getSpiceLevelRequest,
  getSpiceLevelSuccess,
  getSpiceLevelSuccessById,
  modalCloseRequest,
} from "../actions";
let toastId = null;

/**
 *  CRUD Categories
 */
const addSpiceLevelLogic = createLogic({
  type: spiceLevelActions.ADD_SPICELEVEL_REQUEST,
  cancelType: spiceLevelActions.ADD_SPICELEVEL_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/spice",
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
      toastId = toast.success("Add SpiceLevel Success!");
      dispatch(getSpiceLevelRequest());
      dispatch(modalCloseRequest({ addSpiceLevelModalOpen: false }));
      dispatch(hideLoader());
      done();
    }
  },
});

// getList
const getSpiceLevelLogic = createLogic({
  type: spiceLevelActions.GET_SPICELEVEL_REQUEST,
  cancelType: spiceLevelActions.GET_SPICELEVEL_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getSpiceLevelSuccess({ isLoading: true }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/spice",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getSpiceLevelSuccess({ isLoading: false }));
      done();
      return;
    } else {
      logger(result);
      dispatch(getSpiceLevelSuccess({ data: result.data, isLoading: false }));
      done();
      return;
    }
  },
});

// get data by id

const getSpiceLevelByIdLogic = createLogic({
  type: spiceLevelActions.GET_SPICELEVEL_REQUEST_BY_ID,
  cancelType: spiceLevelActions.GET_SPICELEVEL_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/spice/" + action.payload.spice_id],
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
      dispatch(getSpiceLevelSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateSpiceLevelLogic = createLogic({
  type: spiceLevelActions.UPDATE_SPICELEVEL_REQUEST,
  cancelType: spiceLevelActions.UPDATE_SPICELEVEL_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/spice/" + action.payload.spice_id],
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
      toastId = toast.success("Updated!");
      dispatch(modalCloseRequest({ editSpiceLevelModalOpen: false }));
      dispatch(getSpiceLevelRequest());
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

export const SpiceLevelLogic = [
  addSpiceLevelLogic,
  getSpiceLevelLogic,
  updateSpiceLevelLogic,
  getSpiceLevelByIdLogic,
];
