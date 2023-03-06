interface HttpResult<T = any> {
  code: number;
  success: boolean;
  data: T;
  msg: string;
}
