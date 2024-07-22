import { STATUS } from '../../config/api';
import {
  ErrorResponseTypes,
  PaymentKakaoResponseTypes,
} from '../../types/interfaces';

const getRedirectPCURL = (
  rawData: PaymentKakaoResponseTypes | ErrorResponseTypes,
): string | false => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result.next_redirct_pc_url;
  }
  return false;
};

export default getRedirectPCURL;
