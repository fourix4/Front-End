import {
  PaymentKakaoResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';

const getRedirectPCURL = (
  rawData: PaymentKakaoResponseTypes | ResponseTypes,
): string | false => {
  if (rawData.data) {
    return rawData.data.result;
  }
  return false;
};

export default getRedirectPCURL;
