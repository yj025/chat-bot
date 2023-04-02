import { openDB } from "idb";

const DB_NAME = "chat-bot";
const STORE_NAME = "stt-model";
const KEY = "whisper";

export const useDbTtsModel = () => {

  const saveModel = async (blob: Blob) => {
    const db = await getDB();
    await db.put(STORE_NAME, blob, KEY);
  };
  
  const getModel = async () => {
    const db = await getDB();
    return await db.get(STORE_NAME, KEY);
  };

  const getDB = async ()=>{
    return openDB(DB_NAME,1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME);
          }, 
    });
  }

  return { saveModel, getModel}

};
