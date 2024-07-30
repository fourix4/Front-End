import { API_ADDRESS } from '../../config/api';
import {
  CafeInfoResponseTypes,
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
      API_ADDRESS.MANAGER_INFO_URI,
      dataForm,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const patchManagementInfo = async (editFormData: FormDataTypes) => {
  try {
    const dataForm = createFormData(editFormData);

    const { data } = await instance.patch<ResponseTypes>(
      API_ADDRESS.MANAGER_INFO_URI,
      dataForm,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getManagementInfo = async () => {
  try {
    const { data } = await instance.get<CafeInfoResponseTypes>(
      API_ADDRESS.MANAGER_INFO_URI,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
