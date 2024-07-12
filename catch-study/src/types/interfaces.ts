export interface ResponseTypes {
  code: number;
  message: string;
  data?: {
    [key: string]: string | number;
  };
}

export interface LoginResponseTypes extends ResponseTypes {
  data: {
    accessToken: string;
  };
}

// export interface ManagementResponseTypes extends ResponseTypes {
//   data: {
//     result: FormDataTypes
//   }
// }
