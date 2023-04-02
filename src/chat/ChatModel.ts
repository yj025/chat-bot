export interface Chat {
  message: string;
  from: ChatSource;
}

export enum ChatSource {
  SENDER,
  SERVER,
}