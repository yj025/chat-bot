
export interface Conversation {
    id:string;
    markStatus:boolean;
    question: string;
    answer: string;
    createdAt: number;
  }


export interface ChatRequest {
    role:string;
    prompt:string;
  }


export interface ChatRespond {
    id:string;
    response: string;
}