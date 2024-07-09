import { API_ADDRESS, STATUS } from '../../config/api';
import {
  CityFilterTypes,
  StudyCafeListResponseTypes,
} from '../../types/interfaces';
import instance from '../utils/axios';

const getStudycafeList = async ({ city, country, town }: CityFilterTypes) => {
  const params = { city, country, town };

  try {
    const { data } = await instance.get<StudyCafeListResponseTypes>(
      API_ADDRESS.STUDYCAFE_SEARCH_URI,
      {
        params,
      },
    );

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};

export default getStudycafeList;
