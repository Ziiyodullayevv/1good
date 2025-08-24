import { useState } from 'react';

export default function ChatApp() {
  const users = [
    {
      id: 1,
      name: 'Sophia Carter',
      project: 'Website Redesign',
      meta: '2d',
      avatar: 'S',
      messages: [
        {
          from: 'Sophia',
          text: 'Hi Alex, I’ve reviewed the initial designs and they look great! I have a few tweaks for the homepage layout. Can we schedule a call?',
          side: 'incoming',
        },
        {
          from: 'Alex',
          text: 'Hi Sophia, thanks for the feedback! I’m glad you like the designs. Yes, tomorrow 2 PM works?',
          side: 'self',
        },
      ],
    },
    {
      id: 2,
      name: 'Ethan Harper',
      project: 'Mobile App Development',
      meta: '1w',
      avatar: 'E',
      messages: [
        {
          from: 'Ethan',
          text: 'Hey Alex, any update on the mobile app prototype?',
          side: 'incoming',
        },
      ],
    },
    {
      id: 3,
      name: 'Olivia Bennett',
      project: 'Marketing Campaign',
      meta: '2w',
      avatar: 'O',
      messages: [
        {
          from: 'Olivia',
          text: 'Ive shared the campaign draft with you. Waiting for feedback!',
          side: 'incoming',
        },
      ],
    },
  ];

  const [activeUserId, setActiveUserId] = useState(users[0].id);
  const [chatData, setChatData] = useState(users);
  const [newMessage, setNewMessage] = useState('');

  const activeUser = chatData.find((u) => u.id === activeUserId);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const updated = chatData.map((u) =>
      u.id === activeUserId
        ? {
            ...u,
            messages: [
              ...u.messages,
              { from: 'Alex', text: newMessage, side: 'self' },
            ],
          }
        : u
    );

    setChatData(updated);
    setNewMessage('');
  };

  return (
    <div className='section-container'>
      <div className='grid gap-5 my-5 h-[calc(100vh-100px)] grid-cols-1 lg:grid-cols-[280px_1fr]'>
        {/* Sidebar */}
        <aside className='flex flex-col rounded-xl overflow-hidden'>
          <div className='p-4'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-900'>
              All Messages
            </h2>
          </div>
          <nav className='flex-1 space-y-1 overflow-y-auto p-2'>
            {chatData.map((u) => (
              <button
                key={u.id}
                onClick={() => setActiveUserId(u.id)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl p-3 text-left hover:bg-slate-50 ${
                  u.id === activeUserId
                    ? 'bg-v2 border'
                    : 'border border-transparent'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div className='size-9 rounded-full bg-v2 grid place-items-center shrink-0 text-sm font-semibold'>
                    {u.avatar}
                  </div>
                  <div>
                    <div className='text-sm font-semibold'>{u.name}</div>
                    <div className='text-xs line-clamp-1 text-slate-500'>
                      Project: {u.project}
                    </div>
                  </div>
                </div>
                <div className='text-xs text-slate-400'>{u.meta}</div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Chat area */}
        <main className='border overflow-hidden rounded-xl flex flex-col'>
          {/* Header */}
          <header className='px-4 py-3 shadow-md/5 border-b'>
            <h1 className='text-lg font-medium tracking-tight'>
              {activeUser?.name}
            </h1>
            <p className='text-sm text-slate-500'>
              Project: {activeUser?.project}
            </p>
          </header>

          {/* Messages */}
          <section className='flex-1 p-4 space-y-4 overflow-y-auto'>
            {activeUser?.messages.map((m, i) =>
              m.side === 'incoming' ? (
                <MessageIncoming
                  key={i}
                  avatar={activeUser?.avatar}
                  text={m.text}
                />
              ) : (
                <MessageSelf key={i} avatar='A' text={m?.text} />
              )
            )}
          </section>

          {/* Input */}
          <footer className='bg-white'>
            <div className='flex items-center gap-3 border-t p-2'>
              <input
                type='text'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder='Type a message...'
                className='w-full rounded-md px-3 py-2 outline-none placeholder:text-slate-400'
              />
              <button
                onClick={handleSend}
                className='rounded-lg bg-v9 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
              >
                Send
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

/* -------- Message components ---------- */

function MessageIncoming({ avatar, text }: { avatar: string; text: string }) {
  return (
    <div className='flex shrink-0 items-start gap-3 max-w-[80ch]'>
      {/* Chap tomonda avatar */}
      <div className='size-8 rounded-full bg-v2 grid place-items-center shrink-0 text-xs font-semibold'>
        {avatar}
      </div>
      <div className='rounded-2xl border bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800'>
        {text}
      </div>
    </div>
  );
}

function MessageSelf({ avatar, text }: { avatar: string; text: string }) {
  return (
    <div className='flex shrind-0 items-start gap-3 max-w-[80ch] ml-auto justify-end'>
      {/* Xabar chapda, avatar ongda */}
      <div className='rounded-2xl shrink-0 bg-v9 px-4 py-3 text-sm leading-6 text-white'>
        {text}
      </div>
      <div className='size-8 shrink-0 rounded-full bg-v2 grid place-items-center text-xs font-semibold'>
        {avatar}
      </div>
    </div>
  );
}
