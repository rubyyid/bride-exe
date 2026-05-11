'use client'

import React from 'react'

export default function BrideExe() {
  const [booted, setBooted] = React.useState(false)
  const [selectedModule, setSelectedModule] = React.useState<any>(null)

  const modules = [
    {
      title: 'CHAOS',
      emoji: '🎲',
      color: 'from-pink-500 to-red-500',
      description: 'Generate random chaos tasks.',
      tasks: [
        'Everyone switch seats.',
        'Take a dramatic group selfie.',
        'Speak in accents for 2 minutes.',
        'Dance battle activated.',
        'Freeze for 10 seconds.',
      ],
    },
    {
      title: 'AI SCAN',
      emoji: '🤖',
      color: 'from-purple-500 to-pink-500',
      description: 'Scan your party energy.',
      tasks: [
        '94% likely to survive tonight.',
        'Certified chaos queen detected.',
        'Dangerously overdressed.',
        'Main character energy unlocked.',
        'Flirting levels critical.',
      ],
    },
    {
      title: 'ROULETTE',
      emoji: '🎰',
      color: 'from-fuchsia-500 to-violet-500',
      description: 'Spin the chaos wheel.',
      tasks: [
        'SHOT TIME',
        'BRIDE CHOICE',
        'DOUBLE CHAOS',
        'SAFE MODE',
        'EVERYONE DRINKS',
      ],
    },
    {
      title: 'DRINKING GAMES',
      emoji: '🍸',
      color: 'from-rose-500 to-orange-400',
      description: 'Party drinking challenges.',
      tasks: [
        'Tallest person drinks.',
        'Everyone with black clothes drinks.',
        'Take a sip if you use TikTok daily.',
        'Pass your drink left.',
        'Bride drinks twice.',
      ],
    },
    {
      title: 'TIMER BATTLE',
      emoji: '⏳',
      color: 'from-red-500 to-pink-600',
      description: 'Fast challenge mode.',
      tasks: [
        'You have 15 seconds to make a pyramid.',
        'Group pose in 10 seconds.',
        'Find something pink NOW.',
        'Create a runway walk.',
        'Hide someone’s phone.',
      ],
    },
    {
      title: 'TEAM MODE',
      emoji: '👯',
      color: 'from-pink-400 to-purple-600',
      description: 'Group party challenges.',
      tasks: [
        'Recreate Titanic pose.',
        'Best synchronized dance wins.',
        'Create wedding movie poster.',
        'Fastest team selfie wins.',
        'Make a fake engagement scene.',
      ],
    },
  ]

  const getRandomTask = (tasks: string[]) => {
    return tasks[Math.floor(Math.random() * tasks.length)]
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-purple-900/20" />

      {/* Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

      {!booted ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="text-8xl mb-8">💋</div>

          <h1 className="text-7xl font-black bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text mb-4">
            BRIDE.EXE
          </h1>

          <p className="uppercase tracking-[0.5em] text-zinc-400 text-sm mb-12">
            SYSTEM READY
          </p>

          <button
            onClick={() => setBooted(true)}
            className="rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 px-12 py-6 text-2xl font-black shadow-2xl shadow-pink-500/40 hover:scale-105 transition-all duration-300"
          >
            INITIALIZE PARTY
          </button>
        </div>
      ) : (
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                PARTY CONTROL PANEL
              </h1>

              <p className="text-zinc-400 mt-2">
                Select a game module
              </p>
            </div>

            <div className="rounded-full border border-pink-500/30 bg-white/5 px-5 py-2 backdrop-blur-xl">
              SYSTEM ACTIVE
            </div>
          </div>

          {/* Main layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* MENU */}
            <div className="lg:col-span-1 space-y-4">
              {modules.map((module, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full rounded-[2rem] bg-gradient-to-br ${module.color} p-6 text-left shadow-2xl hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className="text-5xl mb-4">{module.emoji}</div>

                  <h2 className="text-2xl font-black mb-2">
                    {module.title}
                  </h2>

                  <p className="text-white/80">
                    {module.description}
                  </p>
                </button>
              ))}
            </div>

            {/* MODULE SCREEN */}
            <div className="lg:col-span-2">
              {!selectedModule ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl min-h-[700px] flex flex-col items-center justify-center text-center p-10">
                  <div className="text-8xl mb-8">✨</div>

                  <h2 className="text-5xl font-black mb-4">
                    SELECT A MODULE
                  </h2>

                  <p className="text-zinc-400 max-w-md">
                    Choose a party mode from the control panel to begin the chaos.
                  </p>
                </div>
              ) : (
                <div
                  className={`rounded-[2rem] bg-gradient-to-br ${selectedModule.color} min-h-[700px] p-10 shadow-2xl`}
                >
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <div className="text-7xl mb-4">
                        {selectedModule.emoji}
                      </div>

                      <h2 className="text-6xl font-black">
                        {selectedModule.title}
                      </h2>
                    </div>

                    <button
                      onClick={() => setSelectedModule(null)}
                      className="rounded-2xl bg-black/20 px-6 py-3 font-bold backdrop-blur-xl hover:bg-black/30 transition-all"
                    >
                      CLOSE
                    </button>
                  </div>

                  <div className="rounded-[2rem] bg-black/20 backdrop-blur-xl p-10 mb-8">
                    <h3 className="uppercase tracking-[0.3em] text-sm mb-6 opacity-70">
                      GENERATED TASK
                    </h3>

                    <p className="text-4xl font-black leading-tight">
                      {getRandomTask(selectedModule.tasks)}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setSelectedModule({
                        ...selectedModule,
                      })
                    }
                    className="w-full rounded-3xl bg-black/30 py-6 text-2xl font-black hover:bg-black/40 transition-all duration-300"
                  >
                    GENERATE NEW TASK
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}