declare module '*.png';
declare module '*.jpg';

declare const enum HTTPCodeStatuses {
  BadRequest = 400,
  NotFount = 404,
  InternalError = 500,
  Unauthorized = 401,
  RequestConflict = 409,
}

declare type TestType = string;
