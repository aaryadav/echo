'use client';

import Image from 'next/image'
import { BotMsg } from '@/components/botmsg'


import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { SendHorizonal, Speech, Zap, User } from 'lucide-react'

import { useChat } from 'ai/react';

export default function Home() {

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();  // Prevents the default action (new line)
      handleSubmit(event);    // Call the form submit handler directly, if desired
    }
  };

  return (
    <>
      <div className="container ">
        <div className="navbar">
          <h3>echo</h3>
        </div>
        <div className="content-container">
          <div className="content space-y-10">
            <div className="chat">
              <ul>
                {messages.map((m, index) => (
                  <li key={index}>
                    {m.role === 'user' ? (
                      <div className="msg user-msg ">
                        <div className="avatar">
                          <User />
                        </div>
                        <div className="msg-content pt-2">{m.content}</div>
                      </div>
                    ) : (
                      <div className="msg bot-msg">
                        <div className="avatar">
                          <Zap />
                        </div>
                        <div className="msg-content pt-2">
                          <BotMsg message={m.content} />
                        </div>

                      </div>
                    )}
                  </li>
                ))}

              </ul>
            </div>
          </div >
        </div >
        <div className="footer relative">
          <form onSubmit={handleSubmit}>
            <Button className="speech rounded-full bg-zinc-800 w-fit py-8 px-5 absolute -left-24 top-10">
              <Speech />
            </Button>
            <Textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}  // Attach the keydown handler here
              className='input-box'
              placeholder='Type your message here.'
            />
            <Button className="absolute top-10 right-5 rounded py-7 px-4" style={{ background: "#FA6608" }}>
              <SendHorizonal />
            </Button>
          </form>
        </div>
      </div >

    </>

  )
}
