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
  
  CSelect,
} from "@coreui/react";
import { getSubCategoriesRequestById } from "../../../actions";
const EditSubCategoryModal = (props) => {
  const [categories, setCategories] = useState({
    name: "",
    description: "",
    is_deleted: false,
    category_id: "",
    sub_category_id: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setCategories({
      name: "",
      description: "",
      is_deleted: false,
      category_id: "",
      sub_category_id: "",
    });
    setErrors({});
    if (props.isShow === true) {
      props.getSubCategoriesRequestById({ sub_category_id: props.sub_category_id});
    }
  }, [props.isShow]);
  useEffect(() => {
    const { dataById } = props.SubCategorieReducerData;
    setCategories({
      name: dataById && dataById.name ? dataById.name : "",
      description: dataById && dataById.description ? dataById.description : "",
      is_deleted: dataById && dataById.is_deleted ? dataById.is_deleted : false,
      category_id: dataById && dataById.category_id ? dataById.category_id : "",
      sub_category_id: dataById && dataById._id ? dataById._id : "",
    });
  }, [props.SubCategorieReducerData.dataById]);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value, checked } = target;
    if (name === "is_deleted") {
      setCategories({ ...categories, [name]: checked });
    } else {
      setCategories({ ...categories, [name]: value });
    }
    setErrors({ ...errors, [name]: null });
  };
  const handelUpdated = async (event) => {
    event.preventDefault();
    props.onUpdateCategories(categories);
  };
  return (
    <>
      <CModal
        show={props.isShow}
        onClose={() => props.onClose()}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>Edit Categories</CModalTitle>
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
                  value={categories.name}
                  placeholder="name..."
                  autoComplete="name"
                  onChange={(e) => handleChange(e)}
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel>Select Categorie</CLabel>
              </CCol>
              <CCol xs="12" md="9" size="lg">
                <CSelect
                  custom
                  size="lg"
                  name="category_id"
                  value={categories.category_id}
                  onChange={(e) => handleChange(e)}
                >
                  {props.categorieReducerData && props.categorieReducerData.data
                    ? props.categorieReducerData.data.map((item, index) => {
                        return <option value={item._id}>{item.name}</option>;
                      })
                    : null}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Description</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="text"
                  name="description"
                  value={categories.description}
                  placeholder="description..."
                  autoComplete="description"
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
  SubCategorieReducerData: state.SubCategorieReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getSubCategoriesRequestById: (data) => {
      dispatch(getSubCategoriesRequestById(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubCategoryModal);
