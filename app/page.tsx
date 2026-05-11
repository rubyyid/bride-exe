'use client'

import React from 'react'

export default function BrideExe() {
  const [booted, setBooted] = React.useState(false)
  const [selectedModule, setSelectedModule] = React.useState<any>(null)
  const [task, setTask] = React.useState('')

  const [photos, setPhotos] = React.useState<string[]>([])
  const [messages, setMessages] = React.useState<string[]>([])
  const [messageInput, setMessageInput] = React.useState('')

  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const modules = [
    {
      title: 'PHOTOBOOTH',
      emoji: '📸',
      color: 'from-rose-400 to-pink-500',
      description: 'Capture memories together.',
      tasks: ['Take cute party photos.'],
    },

    {
      title: 'CONFESSIONS',
      emoji: '💌',
      color: 'from-pink-400 to-rose-400',
      description: 'Leave anonymous messages.',
      tasks: ['Share anonymous confessions.'],
    },

    {
      title: 'SHOT ROULETTE',
      emoji: '🥂',
      color: 'from-red-400 to-pink-500',
      description: 'Random drinking challenges.',
      tasks: [
        'DOUBLE SHOTS 🍸🍸',
        'EVERYONE DRINKS 🥂',
        'SAFE CARD 🛡️',
        'PICK A VICTIM 😈',
        'WATER BREAK 💧',
        'BRIDE CHOOSES 👰',
        'SHOTGUN ROUND ⚠️',
        'TAKE 3 SIPS 🍷',
        'GIVE OUT 2 SHOTS 🎯',
        'NO PHONE FOR 5 MIN 📵',
        'DANCE BEFORE YOU DRINK 💃',
        'LAST PERSON TO STAND DRINKS ⏳',
        'TRUTH OR SHOT 🤐',
        'SWITCH DRINKS 🔄',
        'EVERYONE CHEERS 🍾',
        'MYSTERY PUNISHMENT 🎲',
        'FINISH YOUR DRINK 😭',
        'CHOOSE A DRINKING PARTNER 👯',
      ],
    },
  ]

  const openModule = (module: any) => {
    setSelectedModule(module)

    const randomTask =
      module.tasks[Math.floor(Math.random() * module.tasks.length)]

    setTask(randomTask)
  }

  const generateTask = () => {
    if (!selectedModule) return

    const randomTask =
      selectedModule.tasks[
        Math.floor(Math.random() * selectedModule.tasks.length)
      ]

    setTask(randomTask)
  }

  const addMessage = () => {
    if (!messageInput.trim()) return

    setMessages((prev) => [messageInput, ...prev])
    setMessageInput('')
  }

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files

    if (!files) return

    const newPhotos: string[] = []

    Array.from(files).forEach((file) => {
      const imageUrl = URL.createObjectURL(file)
      newPhotos.push(imageUrl)
    })

    setPhotos((prev) => [...newPhotos, ...prev])
  }

  const deletePhoto = (indexToDelete: number) => {
    setPhotos((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    )
  }

  return (
    <div className="min-h-screen text-zinc-900 overflow-hidden relative bg-gradient-to-br from-rose-100 via-pink-50 to-red-100">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />

      {!booted ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="text-8xl mb-8">💋</div>

          <h1 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-rose-500 to-pink-500 text-transparent bg-clip-text mb-4">
            BRIDE.EXE
          </h1>

          <p className="uppercase tracking-[0.4em] text-zinc-500 text-xs sm:text-sm mb-12">
            SYSTEM READY
          </p>

          <button
            onClick={() => setBooted(true)}
            className="rounded-3xl bg-gradient-to-r from-rose-400 to-pink-500 px-8 sm:px-12 py-5 text-lg sm:text-2xl text-white font-black shadow-2xl hover:scale-105 transition-all duration-300"
          >
            INITIALIZE PARTY
          </button>

          <p className="absolute bottom-6 text-zinc-500 text-sm">
            Created by Ida Slunjski
          </p>
        </div>
      ) : selectedModule ? (
        <div
          className={`relative z-10 min-h-screen flex flex-col justify-center p-6 sm:p-10 bg-gradient-to-br ${selectedModule.color}`}
        >
          <button
            onClick={() => setSelectedModule(null)}
            className="absolute top-6 left-6 rounded-2xl bg-white/40 backdrop-blur-2xl px-5 py-3 font-bold hover:bg-white/60 transition-all"
          >
            ← BACK
          </button>

          {selectedModule.title === 'PHOTOBOOTH' ? (
            <div className="text-center max-w-6xl mx-auto">
              <div className="text-7xl sm:text-9xl mb-8">📸</div>

              <h2 className="text-4xl sm:text-7xl font-black mb-6 text-white">
                PHOTOBOOTH
              </h2>

              <p className="text-white/80 mb-10 text-lg sm:text-2xl">
                Capture memories from the party.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-3xl bg-white/30 backdrop-blur-2xl px-8 py-5 text-lg sm:text-2xl text-white font-black hover:bg-white/40 transition-all duration-300 mb-10"
              >
                OPEN CAMERA
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative rounded-[2rem] overflow-hidden border border-white/20 bg-white/20 backdrop-blur-2xl"
                  >
                    <img
                      src={photo}
                      alt="party"
                      className="w-full h-48 object-cover"
                    />

                    <button
                      onClick={() => deletePhoto(index)}
                      className="absolute top-3 right-3 bg-white/80 rounded-full w-10 h-10 text-black font-black hover:bg-red-400 hover:text-white transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedModule.title === 'CONFESSIONS' ? (
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-7xl sm:text-9xl mb-8">💌</div>

              <h2 className="text-4xl sm:text-7xl font-black mb-6 text-white">
                CONFESSIONS
              </h2>

              <p className="text-white/80 mb-10 text-lg sm:text-2xl">
                Leave anonymous party messages.
              </p>

              <div className="rounded-[2rem] bg-white/20 backdrop-blur-2xl p-6 mb-8">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type anonymous message..."
                  className="w-full h-32 rounded-2xl bg-white/40 border border-white/20 p-4 text-zinc-900 placeholder:text-zinc-500 outline-none resize-none"
                />

                <button
                  onClick={addMessage}
                  className="mt-4 rounded-3xl bg-white/30 backdrop-blur-2xl px-8 py-4 text-lg text-white font-black hover:bg-white/40 transition-all duration-300"
                >
                  SEND MESSAGE
                </button>
              </div>

              <div className="space-y-4 text-left max-h-[400px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className="rounded-[2rem] bg-white/20 backdrop-blur-2xl p-6 border border-white/20"
                  >
                    <div className="text-white text-sm uppercase tracking-[0.3em] mb-3">
                      Anonymous
                    </div>

                    <p className="text-xl text-white leading-relaxed">
                      {message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-7xl sm:text-9xl mb-8">
                {selectedModule.emoji}
              </div>

              <h2 className="text-4xl sm:text-7xl font-black mb-6 text-white">
                {selectedModule.title}
              </h2>

              <div className="rounded-[2rem] bg-white/20 backdrop-blur-2xl p-6 sm:p-10 max-w-3xl mx-auto mb-8 border border-white/20">
                <p className="uppercase tracking-[0.3em] text-xs sm:text-sm mb-6 text-white/70">
                  YOUR CHALLENGE
                </p>

                <p className="text-2xl sm:text-5xl text-white font-black leading-tight">
                  {task}
                </p>
              </div>

              <button
                onClick={generateTask}
                className="rounded-3xl bg-white/30 backdrop-blur-2xl px-8 py-5 text-lg sm:text-2xl text-white font-black hover:bg-white/40 transition-all duration-300"
              >
                NEW CHALLENGE
              </button>
            </div>
          )}

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            Created by Ida Slunjski
          </p>
        </div>
      ) : (
        <div className="relative z-10 min-h-screen p-6 sm:p-10">
          <div className="mb-10 text-center">
            <h1 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-rose-500 to-pink-500 text-transparent bg-clip-text mb-4">
              PARTY CONTROL PANEL
            </h1>

            <p className="text-zinc-500">
              Select a game module
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {modules.map((module, index) => (
              <button
                key={index}
                onClick={() => openModule(module)}
                className={`rounded-[2rem] bg-gradient-to-br ${module.color} p-8 text-left shadow-2xl hover:scale-[1.03] transition-all duration-300 min-h-[260px] flex flex-col justify-between`}
              >
                <div>
                  <div className="text-6xl mb-6">
                    {module.emoji}
                  </div>

                  <h2 className="text-3xl text-white font-black mb-3">
                    {module.title}
                  </h2>

                  <p className="text-white/80 text-lg">
                    {module.description}
                  </p>
                </div>

                <div className="mt-8 uppercase tracking-[0.3em] text-sm text-white/70">
                  TAP TO OPEN
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-zinc-500 text-sm mt-10">
            Created by Ida Slunjski
          </p>
        </div>
      )}
    </div>
  )
}