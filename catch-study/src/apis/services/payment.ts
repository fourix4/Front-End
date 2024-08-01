import { STATUS } from '../../config/api';
import {
  ErrorResponseTypes,
  PaymentKakaoResponseTypes,
} from '../../types/interfaces';

const getRedirectPCURL = (
  rawData: PaymentKakaoResponseTypes | ErrorResponseTypes,
): { success: boolean; data: string } => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return { success: true, data: rawData.data.result.next_redirect_pc_url };
  }

  return { success: false, data: rawData.message };
};

export default getRedirectPCURL;
