import { API_ADDRESS } from '../../config/api';
import {
  CafeInfoResponseTypes,
  CafeStatusReponseTypes,
  ErrorResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';
import { FormDataTypes } from '../../types/management';
import instance from '../utils/axios';

export interface DataTypes {
  [key: string]: any;
}

const createFormData = (data: FormDataTypes): FormData => {
  const formData = new FormData();

  const json = JSON.stringify(data);

  formData.append('data', new Blob([json], { type: 'application/json' }));

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach(file => {
        formData.append(key, file);
      });
    }
  });

  return formData;
};

export const postManagementInfo = async (formData: FormDataTypes) => {
  try {
    const dataForm = createFormData(formData);

    const { data } = await instance.post<ResponseTypes>(
      API_ADDRESS.MANAGER,
      dataForm,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const patchManagementInfo = async (
  editFormData: FormDataTypes,
  cafeId: string,
) => {
  try {
    const dataForm = createFormData(editFormData);

    const { data } = await instance.patch<ResponseTypes>(
      `${API_ADDRESS.MANAGER}/${cafeId}`,
      dataForm,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getManagementInfo = async (cafeId: string) => {
  try {
    const { data } = await instance.get<CafeInfoResponseTypes>(
      `${API_ADDRESS.MANAGER}/${cafeId}`,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getCafeStatus = async () => {
  try {
    const { data } = await instance.get<CafeStatusReponseTypes>(
      API_ADDRESS.MANAGER,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
