let audioContext: any
let sttRuntimeWorker: any

export const useStt = (onSttSuccess: (result: string) => void) => {
  const processAudio = async (audioFileUrl: string) => {
    console.log(`Loading audio file`, audioFileUrl)

    return fetch(audioFileUrl)
      .then((r) => r.blob())
      .then(
        (blobFile) => new File([blobFile], 'audioFile', { type: 'audio/mp3' })
      )
      .then((audioFile) => readFile(audioFile))
      .then((result) => audioContext.decodeAudioData(result))
      .then((decodedAudio) => {
        const audioBuffer = decodedAudio.getChannelData(0)
        sttRuntimeWorker.postMessage(
          {
            name: 'process-audio',
            params: {
              audioBuffer,
            },
          },
          [audioBuffer.buffer]
        )
      })
  }

  function processWorkerResponses(event: any) {
    if (!event || !event.data || !('name' in event.data)) {
      console.log(`Ignoring malformed event`, event)
      return
    }

    switch (event.data.name) {
      case 'stt-initialized':
        {
          console.log('stt-initialized')
          loadFile()
        }
        break

      case 'stt-model-loaded':
        {
          console.log('stt-model-loaded')
          // Create an audio context for future processing.
          audioContext = new AudioContext({
            // Use the model's sample rate so that the decoder will resample for us.
            sampleRate: event.data.params.modelSampleRate,
          })
        }
        break

      case 'stt-done':
        {
          const result = event.data.params.transcription
          console.log('stt-done', result)
          onSttSuccess(result)
        }
        break
    }
  }

  function init() {
    sttRuntimeWorker = new Worker(new URL('worker.js', import.meta.url))
    sttRuntimeWorker.onmessage = (e: any) => processWorkerResponses(e)
  }

  return { init, processAudio }
}

async function loadFile() {
  return fetch('/model_quantized.tflite')
    .then((res) => res.blob())
    .then((blob) => blob.arrayBuffer())
    .then((buffer) => new Uint8Array(buffer))
    .then((modelData) => {
      sttRuntimeWorker.postMessage(
        {
          name: 'load-model',
          params: {
            modelData,
          },
        },
        [modelData.buffer]
      )
    })
    .catch((e) => console.log('zoz fetch error', e))
}

const readFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result)
    }
    fr.onerror = reject
    fr.readAsArrayBuffer(file)
  })
}
