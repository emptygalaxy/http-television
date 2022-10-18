export interface LoggerInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: (...data: any) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (...data: any) => void;
}
