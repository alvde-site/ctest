import type { TData } from "../app/reducers/beanSlice";

type TDataHeader = {
  "Content-Type": string;
  "x-api-key": string;
};

type TDataApi = {
  baseUrl: string;
  headers: TDataHeader;
};

class DataApi {
  _baseUrl: string;
  _headers: TDataHeader;
  constructor({ baseUrl, headers }: TDataApi) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getData(pageIndex: number, pageSize: number): Promise<TData> {
    const res = await fetch(
      `${this._baseUrl}&limit=${pageSize}&page=${pageIndex}`,
      {
        headers: this._headers,
      },
    );
    return this._checkResponse(res);
  }

  _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }
}

export const fetchData = new DataApi({
  baseUrl: "https://api.thecatapi.com/v1/images/search?order=asc",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":
      "live_Rhfpoda89rzs0mybgTf1yv2RFbglmja8Uk7PIkWCQd8FjkgjGWUlfeoamZphmWDD",
  },
});
