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
        padding: '20px',
        position: 'relative',
      }}
    >
      <h1
        className="tangerine-title"
        style={{
          fontSize: 'clamp(2.8rem, 9vw, 6rem)',
          lineHeight: '0.8',
          textAlign: 'center',
          color: '#BD1947',
        }}
      >
        Kiss The
        <br />
        Miss Goodbye
      </h1>

      <button
        style={{
          marginTop: '20px',
          border: '2px solid #BD1947',
          background: 'transparent',
          color: '#BD1947',
          padding: '12px 40px',
          borderRadius: '8px',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          cursor: 'pointer',
        }}
      >
        OPEN
      </button>

      <div
        style={{
          position: 'fixed',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#888',
          textAlign: 'center',
          fontFamily: 'Times New Roman, serif',
          fontSize: 'clamp(10px, 2vw, 12px)',
        }}
      >
        <div>Created by Ida Slunjski</div>
        <div>June 2026</div>
      </div>
    </div>
  )
}