'use client'

export default function Home() {
  return (
    <div
      style={{
        background: '#F6E8EE',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1
        className="tangerine-title"
        style={{
          fontSize: '180px',
          lineHeight: '0.8',
          textAlign: 'center',
        }}
      >
        Kiss The
        <br />
        Miss Goodbye
      </h1>

      <button
        style={{
          border: '2px solid #BD1947',
          background: 'transparent',
          color: '#BD1947',
          padding: '12px 40px',
          borderRadius: '8px',
        }}
      >
        OPEN
      </button>
    </div>
  )
}