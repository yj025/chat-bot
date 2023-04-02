importScripts("libwhisper.js");

const Lib = {
  locateFile: (file) => `${file}`,
  onRuntimeInitialized: () => {
    // The STT Module is ready. Tell the web page.
    postMessage({ name: "stt-initialized" });
  },
  print: (text) => {
    console.log(text);
    const match = /\[.*\]/.test(text)
    if(match){
        const result = text.replaceAll(/\[.*\]/ig,"").trim();
        postMessage({
            name: "stt-done",
            params: {
              transcription: result,
            },
          });
    }
  },
  mainScriptUrlOrBlob: "libwhisper.js",
};

let whisper;
whisper_factory(Lib).then((module) => {
  whisper = module;
});

function loadModel(modelData) {
  whisper.FS_createDataFile("/", "whisper.bin", modelData, true, true);

  // activeModel = new whisper.Model(modelData)
  // const modelSampleRate = activeModel.getSampleRate()
  // console.log(`Model sample rate: ${modelSampleRate}`)
  var ret = whisper.init("whisper.bin");

  console.log("model init", ret);

  postMessage({
    name: "stt-model-loaded",
    params: {
      modelSampleRate: 16000,
    },
  });
}

function processAudio(audioBuffer) {
  const ret = whisper.full_default(audioBuffer, "en", false);
  console.log("full_default ret=", ret);

}

function processWorkerRequests(event) {
  if (
    !event ||
    event.type != "message" ||
    !event.data ||
    !("name" in event.data)
  ) {
    console.error(`Malformed event submitted to worker ${event}`);
    return;
  }

  switch (event.data.name) {
    case "load-model":
      loadModel(event.data.params.modelData);
      break;
    case "load-scorer":
      loadScorer(event.data.params.scorerData);
      break;
    case "process-audio":
      processAudio(event.data.params.audioBuffer);
      break;
  }
}

onmessage = (e) => processWorkerRequests(e);
