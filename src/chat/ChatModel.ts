export interface Chat {
  id?: string;
  message: string;
  from: ChatSource;
  like?: boolean;
}

export enum ChatSource {
  SENDER,
  SERVER,
}
