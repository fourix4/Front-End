export interface ResponseTypes {
  code: number;
  message: string;
  data?: {
    result: any;
  };
}

export interface LoginResponseTypes extends ResponseTypes {
  data: {
    result: {
      accessToken: string;
    };
  };
}

export interface StudyCafeListTypes {
  cafe_id: number;
  cafe_name: string;
  address: string;
  cafe_image: string;
}

export interface StudyCafeListResponseTypes extends ResponseTypes {
  data: {
    result: StudyCafeListTypes[];
  };
}

export interface CityFilterTypes {
  city: string;
  country: string;
  town: string;
}
