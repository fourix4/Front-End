export const MANAGEMENT_INFO_ERROR = {
  CAFE_NAME_ERROR: '스터디 카페 이름을 입력해주세요.',
  SEATS_ERROR: '이용 가능 좌석의 수를 입력해주세요.',
  OPENING_HOURS_ERROR: '영업시간을 입력해주세요.',
  CLOSED_HOURS_ERROR: '마감시간을 입력해주세요.',
} as const;

export type ManagementErrorTypes = keyof typeof MANAGEMENT_INFO_ERROR;
