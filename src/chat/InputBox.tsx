import { FC, useEffect, useRef } from 'react'
import style from './InputBox.module.css'
import { useRecorder } from './useRecorder'
import { useStt } from '../stt/useSTT'

interface Props {
  onSubmit: (content: string) => void
}

export const InputBox: FC<Props> = ({ onSubmit }) => {
  const { init, processAudio } = useStt(onSubmit)
  useEffect(() => {
    init()
  }, [])
  const onRecordStop = async (audioUrl: string) => {
    processAudio(audioUrl)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const [recording, startRecord, stopRecord] = useRecorder(onRecordStop)

  return (
    <div className={style.inputBoxContainer}>
      <input ref={inputRef} className={style.input} />
      <button
        className={style.mic}
        onClick={recording ? stopRecord : startRecord}
      >
        mic
      </button>
      <button
        onClick={() => {
          const current = inputRef.current
          if (current) {
            onSubmit(current.value)
            current.value = ''
          }
        }}
        className={style.submit}
      >
        submit
      </button>
    </div>
  )
}
