import { MenuModel } from "./user";

export type ResponseModel = {
  status?: number | string;
  message?: string;
  data?: any;
  menu?: MenuModel[]
}

export type ParamsModel = FormData | string;

export type FetchMethodModel = "POST" | "GET";
