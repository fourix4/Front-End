import { API_ADDRESS, STATUS } from '../../config/api';
import { ResponseTypes } from '../../types/interfaces';

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
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
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
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};
