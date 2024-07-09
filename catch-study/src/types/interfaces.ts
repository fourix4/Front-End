export interface ResponseTypes {
  code: number;
  message: string;
  data?: {
    result: {
      [key: string]: string | number;
    };
  };
}

export interface LoginResponseTypes extends ResponseTypes {
  data: {
    result: {
      accessToken: string;
    };
  };
}
