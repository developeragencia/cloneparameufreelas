'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Send } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
  sender: { id: string; name: string; image?: string }
}

interface Conversation {
  id: string
  sender: { id: string; name: string; image?: string }
  receiver: { id: string; name: string; image?: string }
  content: string
  createdAt: string
  senderId: string
  receiverId: string
}

export default function MessagesView() {
  const { data: session } = useSession()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeUserId, setActiveUserId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/messages').then(r => r.json()).then(setConversations)
  }, [])

  useEffect(() => {
    if (!activeUserId) return
    fetch(`/api/messages?with=${activeUserId}`).then(r => r.json()).then(setMessages)
  }, [activeUserId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getOtherUser = (conv: Conversation) => {
    return conv.senderId === session?.user?.id ? conv.receiver : conv.sender
  }

  const uniqueConversations = conversations.reduce((acc: { [key: string]: Conversation }, conv) => {
    const otherId = conv.senderId === session?.user?.id ? conv.receiverId : conv.senderId
    if (!acc[otherId] || new Date(conv.createdAt) > new Date(acc[otherId].createdAt)) {
      acc[otherId] = conv
    }
    return acc
  }, {})

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeUserId || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: activeUserId, content: newMessage }),
      })
      const msg = await res.json()
      setMessages(prev => [...prev, msg])
      setNewMessage('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-10rem)]">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-72 border-r flex flex-col flex-shrink-0">
          <div className="p-4 border-b">
            <h2 className="font-bold text-gray-800">Mensagens</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {Object.values(uniqueConversations).length === 0 ? (
              <div className="p-4 text-center text-gray-400 text-sm mt-4">Nenhuma conversa ainda</div>
            ) : (
              Object.values(uniqueConversations).map((conv) => {
                const other = getOtherUser(conv)
                const isActive = activeUserId === other.id
                return (
                  <button
                    key={other.id}
                    onClick={() => setActiveUserId(other.id)}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b ${isActive ? 'bg-blue-50 border-l-2 border-l-[#00aeef]' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00aeef] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {other.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{other.name}</p>
                      <p className="text-xs text-gray-400 truncate">{conv.content}</p>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {!activeUserId ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Selecione uma conversa para visualizar as mensagens
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => {
                  const isMe = msg.senderId === session?.user?.id
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-[#00aeef] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                        <p>{msg.content}</p>
                        <p className={`text-xs mt-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>{formatRelativeTime(new Date(msg.createdAt))}</p>
                      </div>
                    </div>
                  )
                })}
                <div ref={bottomRef} />
              </div>
              <div className="p-4 border-t flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !newMessage.trim()}
                  className="bg-[#00aeef] hover:bg-[#0099d4] text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
