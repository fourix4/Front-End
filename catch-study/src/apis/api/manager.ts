import { API_ADDRESS } from '../../config/api';
import { ErrorResponseTypes, ResponseTypes } from '../../types/interfaces';

import { FormDataTypes } from '../../types/management';
import instance from '../utils/axios';

export const postManagementInfo = async (formData: FormDataTypes) => {
  try {
    const { data } = await instance.post<ResponseTypes>(
      API_ADDRESS.MANAGER_INFO_URI,
      formData,
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
    const { data } = await instance.patch<ResponseTypes>(
      API_ADDRESS.MANAGER_INFO_URI,
      editFormData,
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

    console.log('조회 데이터', data);

    return data;
  } catch (error) {
    console.log('에러', error);

    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
