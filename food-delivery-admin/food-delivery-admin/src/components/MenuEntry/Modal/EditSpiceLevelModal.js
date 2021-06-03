import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CInput,
  CFormGroup,
  CLabel,
  CSwitch,
} from "@coreui/react";
import {getSpiceLevelRequestById} from '../../../actions';

const EditSpiceLevelModal = (props) => {
  const [spiceLevel, setSpiceLevel] = useState({
    name: "",
    is_deleted: false,
    spice_id:"",
  });

  useEffect(() => {
    setSpiceLevel({
        name: "",
        is_deleted: false,
        spice_id:"",
    });
    if (props.isShow === true) {
      props.getSpiceLevelRequestById({  spice_id: props.spice_id});
    }
  }, [props.isShow]);

 useEffect(() => {
    const { dataById } = props.SpiceLevelReducerData;
    setSpiceLevel({
      name: dataById && dataById.name ? dataById.name : "",
      is_deleted: dataById && dataById.is_deleted ? dataById.is_deleted : "",
      spice_id: dataById && dataById._id ? dataById._id : "",
    });
  }, [props.SpiceLevelReducerData.dataById]);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value, checked } = target;
    if (name === "is_deleted") {
        setSpiceLevel({ ...spiceLevel, [name]: checked });
    } else {
        setSpiceLevel({ ...spiceLevel, [name]: value });
    }
  };
  
  const handelUpdated = async (event) => {
    event.preventDefault();
    props.onUpdateSpiceLevel({ ...spiceLevel, spice_id:props.spice_id });
  };

  return (
    <>
      <CModal
        show={props.isShow}
        onClose={() => props.onClose()}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>Add New</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel>name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="text"
                  name="name"
                  value={spiceLevel.name}
                  placeholder="name..."
                  autoComplete="name"
                  onChange={(e) => handleChange(e)}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-password">Select Status</CLabel>
              </CCol>
              <CCol md="9">
                <CSwitch
                  className={"mx-1"}
                  variant={"3d"}
                  color={"primary"}
                  // value = {spiceLevel.is_deleted}
                  name="is_deleted"
                  onChange={(e) => handleChange(e)}
                />
              </CCol>
            </CFormGroup>

            <CRow>
              <CCol xs="6">
                <CButton
                  color="primary"
                  className="px-4"
                  onClick={(e) => {
                    handelUpdated(e);
                  }}
                >
                  Update
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => props.onClose()}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

const mapStateToProps = (state) => ({
    SpiceLevelReducerData: state.SpiceLevelReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getSpiceLevelRequestById: (data) => {
      dispatch(getSpiceLevelRequestById(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSpiceLevelModal);
