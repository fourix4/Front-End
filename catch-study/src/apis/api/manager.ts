import { API_ADDRESS } from '../../config/api';
import { ErrorResponseTypes, ResponseTypes } from '../../types/interfaces';
import { FormDataTypes } from '../../types/management';
import instance from '../utils/axios';

export interface DataTypes {
  [key: string]: any;
}

const createFormData = (data: FormDataTypes): FormData => {
  const formData = new FormData();

  // JSON 데이터를 Blob으로 변환하여 FormData에 추가
  const json = JSON.stringify(data);

  formData.append('data', new Blob([json], { type: 'application/json' }));

  // 파일 데이터를 FormData에 추가
  Object.entries(data).forEach(([key, value]) => {
    if (
      value instanceof File ||
      (Array.isArray(value) && value[0] instanceof File)
    ) {
      if (Array.isArray(value)) {
        value.forEach((file, index) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else {
        formData.append(key, value);
      }
    }
  });

  return formData;
};

// const createFormData = (data: DataTypes): FormData => {
//   const formData = new FormData();

//   for (const key in data) {
//     if (key in data && data[key] !== null) {
//       formData.append(key, data[key]);
//     }
//   }

//   return formData;
// };

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
    const { data } = await instance.get(API_ADDRESS.MANAGER_INFO_URI);

    return data;
  } catch (error) {
    console.log('에러', error);

    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
