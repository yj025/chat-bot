import {FC, useRef} from "react";
import style from "./InputBox.module.css";

interface Props {
    onComplete: (content: string) => void
}

export const InputBox: FC<Props> = ({onComplete}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return <div className={style.inputBoxContainer}>
        <input ref={inputRef} className={style.input}/>
        <button onClick={() => {
            const current = inputRef.current
            if (current) {
                onComplete(current.value)
                current.value = ""
            }
        }} className={style.submit}>submit
        </button>
    </div>
}