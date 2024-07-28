import { API_ADDRESS } from '../../config/api';
import { ErrorResponseTypes, ResponseTypes } from '../../types/interfaces';
import { FormDataTypes } from '../../types/management';
import instance from '../utils/axios';

export interface DataTypes {
  [key: string]: any;
}

const createFormData = (data: DataTypes): FormData => {
  const formData = new FormData();

  for (const key in data) {
    if (key in data && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

export const postManagementInfo = async (formData: FormDataTypes) => {
  try {
    const dataForm = createFormData(formData);

    const { data } = await instance.post<ResponseTypes>(
      API_ADDRESS.MANAGER_INFO_URI,
      dataForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
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
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getManagementInfo = async () => {
  try {
    const { data } = await instance.get(API_ADDRESS.MANAGER_INFO_URI);

    return data;
  } catch (error) {
    console.log('에러', error);

    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
