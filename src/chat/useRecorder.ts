import { useState } from 'react'

export const useRecorder = (onSuccess: (result: string) => void) => {
  const [recording, setRecording] = useState(false)
  const [recorder, setRecorder] = useState<MediaRecorder>()
  const startRecord = () => {
    let chunks: Blob[] = []
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      // 'then()' method returns a Promise
      .then((mediaStreamObj) => {
        setRecording(true)
        console.log('new mediaStreamObj', mediaStreamObj)

        const mediaRecorder = new MediaRecorder(mediaStreamObj)

        mediaRecorder.ondataavailable = function (ev) {
          console.log(chunks)
          chunks.push(ev.data)
        }

        mediaRecorder.onstop = () => {
          console.log('onStop')
          const audioData = new Blob(chunks, { type: 'audio/wav;' })
          console.log(audioData)
          const audioSrc = window.URL.createObjectURL(audioData)
          onSuccess(audioSrc)

          setRecording(false)
          setRecorder(undefined)
          chunks = []
        }
        setRecorder(mediaRecorder)
        mediaRecorder.start()
      })
  }
  const stopRecord = () => {
    recorder?.stop()
  }

  return [recording, startRecord, stopRecord] as const
}
