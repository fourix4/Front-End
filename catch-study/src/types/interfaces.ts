export interface ResponseTypes {
  code: number;
  message: string;
  data?: {
    [key: string]: string | number;
  };
}
