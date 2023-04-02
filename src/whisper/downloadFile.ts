  export const downloadFile = async (
    url: string,
    onProgress: (progress: number) => void,
  ) => {
    const response = await fetch(url);

    if (!response.body) {
      return;
    }

    const reader = response.body.getReader();
    const contentLength = Number(response.headers.get("Content-Length"));

    let receivedLength = 0; 
    const chunks = []; 
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
      
      const progress = receivedLength/contentLength      
      onProgress(progress)
    }

    return new Blob(chunks);
  };
