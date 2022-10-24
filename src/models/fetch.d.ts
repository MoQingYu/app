import { MenuModel } from "./user";

export type ResponseModel<T> = {
  status?: number | string;
  message?: string;
  data?: T;
  menu?: MenuModel[]
}

export type ParamsModel = FormData | string;

export type FetchMethodModel = "POST" | "GET";
