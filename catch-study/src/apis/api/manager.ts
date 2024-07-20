import { API_ADDRESS } from '../../config/api';
import { ErrorResponseTypes, ResponseTypes } from '../../types/interfaces';

import { FormDataTypes } from '../../types/management';
import instance from '../utils/axios';

export const postManagementInfo = async (formData: FormDataTypes) => {
  try {
    const { data } = await instance.post<ResponseTypes>(
      API_ADDRESS.MANAGER_INFO_URI,
      formData,
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
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
