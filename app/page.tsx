'use client'

import React from 'react'
import { supabase } from './supabase'

type Module = {
  title: string
  emoji: string
  color: string
  description: string
  tasks: string[]
}

type Photo = {
  url: string
  name: string
}

type Message = {
  id: number
  text: string
}

export default function BrideExe() {
  const [booted, setBooted] = React.useState(false)

  const [selectedModule, setSelectedModule] =
    React.useState<Module | null>(null)

  const [selectedPhoto, setSelectedPhoto] =
    React.useState<Photo | null>(null)

  const [task, setTask] = React.useState('')

  const [photos, setPhotos] = React.useState<
    Photo[]
  >([])

  const [messages, setMessages] = React.useState<
    Message[]
  >([])

  const [messageInput, setMessageInput] =
    React.useState('')

  const fileInputRef =
    React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    fetchPhotos()
    fetchMessages()

    const interval = setInterval(() => {
      fetchPhotos()
      fetchMessages()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const savedModule =
      localStorage.getItem(
        'selectedModule'
      )

    if (savedModule) {
      setSelectedModule(
        JSON.parse(savedModule)
      )
    }
  }, [])

  React.useEffect(() => {
    const handlePopState = () => {
      setSelectedModule(null)
      setSelectedPhoto(null)

      localStorage.removeItem(
        'selectedModule'
      )
    }

    window.addEventListener(
      'popstate',
      handlePopState
    )

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      )
    }
  }, [])

  const modules: Module[] = [
    {
      title: 'PHOTOBOOTH',
      emoji: '📸',
      color: 'bg-[#FDFBF7]',
      description:
        'Capture memories together.',
      tasks: ['Take cute party photos.'],
    },

    {
      title: 'CONFESSIONS',
      emoji: '💌',
      color: 'bg-[#FDFBF7]',
      description:
        'Leave anonymous messages.',
      tasks: ['Share anonymous confessions.'],
    },

    {
      title: 'SHOT ROULETTE',
      emoji: '🥂',
      color: 'bg-[#FDFBF7]',
      description:
        'Random drinking challenges.',
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
      ],
    },
  ]

  const fetchPhotos = async () => {
    const { data, error } = await supabase.storage
      .from('photos')
      .list('', {
        limit: 100,
        sortBy: {
          column: 'created_at',
          order: 'desc',
        },
      })

    if (error || !data) {
      console.log(error)
      return
    }

    const photoUrls = data.map((file) => {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from('photos')
        .getPublicUrl(file.name)

      return {
        url: publicUrl,
        name: file.name,
      }
    })

    setPhotos(photoUrls)
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('id', {
        ascending: false,
      })

    if (error || !data) {
      console.log(error)
      return
    }

    setMessages(data)
  }

  const openModule = (module: Module) => {
    window.history.pushState({}, '')

    setSelectedModule(module)

    localStorage.setItem(
      'selectedModule',
      JSON.stringify(module)
    )

    const randomTask =
      module.tasks[
        Math.floor(Math.random() * module.tasks.length)
      ]

    setTask(randomTask)
  }

  const generateTask = () => {
    if (!selectedModule) return

    const randomTask =
      selectedModule.tasks[
        Math.floor(
          Math.random() *
            selectedModule.tasks.length
        )
      ]

    setTask(randomTask)
  }

  const addMessage = async () => {
    if (!messageInput.trim()) return

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          text: messageInput,
        },
      ])

    console.log(error)

    setMessageInput('')

    await fetchMessages()
  }

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files

    if (!files) return

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`

      const response = await supabase.storage
        .from('photos')
        .upload(fileName, file)

      console.log(response)
    }

    await fetchPhotos()
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1C1C]">
      {!booted ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="text-8xl mb-8">💋</div>

          <h1 className="text-6xl sm:text-7xl font-black mb-4 tracking-wide">
            BRIDE.EXE
          </h1>

          <p className="uppercase tracking-[0.4em] text-zinc-500 text-sm mb-10">
            SYSTEM READY
          </p>

          <button
            onClick={() => setBooted(true)}
            className="rounded-full bg-[#800020] px-10 py-5 text-white text-xl font-semibold hover:opacity-90 transition-all"
          >
            ENTER
          </button>

          <p className="absolute bottom-6 text-zinc-500 text-sm">
            Created by Ida Slunjski
          </p>
        </div>
      ) : selectedModule ? (
        <div className="min-h-screen p-6 sm:p-10">
          {selectedModule.title === 'PHOTOBOOTH' ? (
            <div className="max-w-6xl mx-auto text-center">
              <div className="text-7xl mb-8">📸</div>

              <h2 className="text-5xl sm:text-6xl font-black mb-4">
                PHOTOBOOTH
              </h2>

              <p className="text-zinc-500 text-lg mb-10">
                Capture memories from the party.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="rounded-full bg-[#800020] px-8 py-4 text-white text-lg font-semibold hover:opacity-90 transition-all mb-10"
              >
                OPEN CAMERA
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {photos.map((photoData, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setSelectedPhoto(photoData)
                    }
                    className="rounded-[2rem] overflow-hidden border border-[#800020]/10 cursor-pointer bg-white"
                  >
                    <img
                      src={photoData.url}
                      alt="party"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>

              {selectedPhoto && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
                  <div className="relative max-w-4xl w-full">
                    <button
                      onClick={() =>
                        setSelectedPhoto(null)
                      }
                      className="absolute -top-14 right-0 text-white text-4xl font-black"
                    >
                      ✕
                    </button>

                    <img
                      src={selectedPhoto.url}
                      alt="full"
                      className="w-full max-h-[80vh] object-contain rounded-[2rem]"
                    />

                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={async () => {
                          const { error } =
                            await supabase.storage
                              .from('photos')
                              .remove([
                                selectedPhoto.name,
                              ])

                          console.log(error)

                          setSelectedPhoto(null)

                          await fetchPhotos()
                        }}
                        className="flex-1 rounded-full bg-[#800020] py-4 text-white text-lg font-semibold hover:opacity-90 transition-all"
                      >
                        DELETE
                      </button>

                      <a
                        href={selectedPhoto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-full border border-[#800020] py-4 text-[#1C1C1C] text-lg font-semibold text-center flex items-center justify-center hover:bg-[#800020]/5 transition-all"
                      >
                        DOWNLOAD
                      </a>

                      <button
                        onClick={async () => {
                          if (navigator.share) {
                            await navigator.share({
                              title: 'Bride.EXE',
                              url: selectedPhoto.url,
                            })
                          } else {
                            await navigator.clipboard.writeText(
                              selectedPhoto.url
                            )

                            alert('Link copied 😄')
                          }
                        }}
                        className="flex-1 rounded-full border border-[#800020] py-4 text-[#1C1C1C] text-lg font-semibold hover:bg-[#800020]/5 transition-all"
                      >
                        SHARE
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : selectedModule.title ===
            'CONFESSIONS' ? (
            <div className="max-w-6xl mx-auto text-center">
              <div className="text-7xl mb-8">💌</div>

              <h2 className="text-5xl sm:text-6xl font-black mb-4">
                CONFESSIONS
              </h2>

              <p className="text-zinc-500 text-lg mb-10">
                Leave anonymous messages.
              </p>

              <div className="bg-white p-6 rounded-[2rem] border border-[#800020]/10 mb-10">
                <textarea
                  value={messageInput}
                  rows={1}
                  onChange={(e) =>
                    setMessageInput(
                      e.target.value
                    )
                  }
                  placeholder="Type anonymous message..."
                  className="w-full min-h-[60px] max-h-[300px] rounded-2xl p-4 border border-[#800020]/10 outline-none resize-none text-[#1C1C1C]"
                />

                <button
                  onClick={addMessage}
                  className="mt-4 rounded-full bg-[#800020] px-8 py-4 text-white text-lg font-semibold hover:opacity-90 transition-all"
                >
                  SEND MESSAGE
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="bg-white border border-[#800020]/10 rounded-[2rem] p-6 shadow-sm h-fit"
                  >
                    <p className="text-[#1C1C1C] text-xl leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-7xl mb-8">
                {selectedModule.emoji}
              </div>

              <h2 className="text-5xl sm:text-6xl font-black mb-8">
                {selectedModule.title}
              </h2>

              <div className="bg-white border border-[#800020]/10 rounded-[2rem] p-10 mb-10">
                <p className="uppercase tracking-[0.3em] text-zinc-400 text-sm mb-6">
                  YOUR CHALLENGE
                </p>

                <p className="text-3xl sm:text-5xl leading-tight">
                  {task}
                </p>
              </div>

              <button
                onClick={generateTask}
                className="rounded-full bg-[#800020] px-8 py-5 text-white text-lg font-semibold hover:opacity-90 transition-all"
              >
                NEW CHALLENGE
              </button>
            </div>
          )}

          <p className="text-center text-zinc-400 text-sm mt-16">
            Created by Ida Slunjski
          </p>
        </div>
      ) : (
        <div className="min-h-screen p-6 sm:p-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-black mb-4 tracking-wide">
              BRIDE.EXE
            </h1>

            <p className="text-zinc-500">
              Select a module
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {modules.map((module, index) => (
              <button
                key={index}
                onClick={() => openModule(module)}
                className="rounded-[2rem] bg-white border border-[#800020]/10 p-8 min-h-[260px] flex flex-col justify-between text-left hover:border-[#800020]/30 transition-all"
              >
                <div>
                  <div className="text-5xl mb-6">
                    {module.emoji}
                  </div>

                  <h2 className="text-3xl font-black mb-3">
                    {module.title}
                  </h2>

                  <p className="text-zinc-500 text-lg">
                    {module.description}
                  </p>
                </div>

                <div className="mt-8 uppercase tracking-[0.3em] text-sm text-zinc-400">
                  OPEN
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-zinc-400 text-sm mt-16">
            Created by Ida Slunjski
          </p>
        </div>
      )}
    </div>
  )
}