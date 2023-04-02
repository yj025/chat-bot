let audioContext: any;
let sttRuntimeWorker: any;
const resolvers: any = {};
let id = 0;

export const init = () => {
  sttRuntimeWorker = new Worker(new URL("worker.js", import.meta.url));
  sttRuntimeWorker.onmessage = (e: any) => processWorkerResponses(e);
};

export const processAudio = async (audioFileUrl: string) => {
  console.log(`Loading audio file`, audioFileUrl);
  //   const sttRuntimeWorker = new Worker(new URL('worker.js', import.meta.url))
  // sttRuntimeWorker.onmessage = (e: any) => processWorkerResponses(e)

  return await fetch(audioFileUrl)
    .then((r) => r.blob())
    .then(
      (blobFile) => new File([blobFile], "audioFile", { type: "audio/wav" })
    )
    .then((audioFile) => readFile(audioFile))
    .then((result) => audioContext.decodeAudioData(result))
    .then((decodedAudio) => {
      const audioBuffer = decodedAudio.getChannelData(0);
      sttRuntimeWorker.postMessage(
        {
          name: "process-audio",
          params: {
            audioBuffer,
          },
        },
        [audioBuffer.buffer]
      );
    })
    .then(
      () =>
        new Promise<string>((resolve) => {
          id = id + 1;
          resolvers[id] = resolve;
        })
    );
};

export const loadModel = async (blob: Blob) => {
  await blob
    .arrayBuffer()
    .then((buffer) => new Uint8Array(buffer))
    .then((modelData) => {
      sttRuntimeWorker.postMessage(
        {
          name: "load-model",
          params: {
            modelData,
          },
        },
        [modelData.buffer]
      );
    });
};

const processWorkerResponses = (event: any) => {
  if (!event || !event.data || !("name" in event.data)) {
    console.log(`Ignoring malformed event`, event);
    return;
  }

  switch (event.data.name) {
    case "stt-initialized":
      {
        console.log("stt-initialized");
      }
      break;

    case "stt-model-loaded":
      {
        console.log("stt-model-loaded");
        // Create an audio context for future processing.
        audioContext = new AudioContext({
          // Use the model's sample rate so that the decoder will resample for us.
          sampleRate: event.data.params.modelSampleRate,
        });
      }
      break;

    case "stt-done":
      {
        const result = event.data.params.transcription;
        console.log("stt-done", result);

        resolvers[id](result);
      }
      break;
  }
}

const readFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsArrayBuffer(file);
  });
};
