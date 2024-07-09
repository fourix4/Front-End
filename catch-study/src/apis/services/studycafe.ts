import {
  ResponseTypes,
  StudyCafeListResponseTypes,
  StudyCafeListTypes,
} from '../../types/interfaces';

const getStudycafeListData = (
  rawData: StudyCafeListResponseTypes | ResponseTypes,
): StudyCafeListTypes[] => {
  if (rawData.data) {
    return rawData.data.result;
  }
  return Array(20).fill([
    {
      cafe_id: 2,
      cafe_name: '하드 스터디 카페',
      address: '서울 강남구 강남동 xx번지',
      cafe_image: '썸네일_주소',
    },
  ]);
};

export default getStudycafeListData;
