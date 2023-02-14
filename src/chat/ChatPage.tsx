import { FC, useEffect, useState } from 'react'
import { Chat, Chats, ChatSource } from './Chats'
import { InputBox } from './InputBox'
import style from './ChatPage.module.css'

interface Conversation {
  conversationId: string
  messageId: string
}

export const ChatPage: FC = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const [conversation, setConversation] = useState<Conversation>()
  const addChat = (chat: Chat) => {
    setChats((prevState) => [...prevState, chat])
  }
  useEffect(() => {
    setChats([
      { from: ChatSource.SERVER, message: 'hello' },
      { from: ChatSource.SENDER, message: 'hello there' },
    ])
  }, [])

  const onSubmit = (message: string) => {
    if (message) {
      addChat({ from: ChatSource.SENDER, message })
      fetch('/api/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationId: conversation?.conversationId,
          parentMessageId: conversation?.messageId,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          addChat({ from: ChatSource.SERVER, message: result.result.text })
          setConversation({
            conversationId: result.result.conversationId,
            messageId: result.result.messageId,
          })
        })
    }
  }

  return (
    <div className={style.chatContainer}>
      <Chats chats={chats} />
      <InputBox onSubmit={onSubmit} />
    </div>
  )
}
