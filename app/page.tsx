'use client'

export default function Home() {
  return (
    <div
      style={{
        background: "#F6E8EE",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        className="sofia-title"
        style={{
          fontSize: "120px",
          color: "#BD1947",
        }}
      >
        Kiss The
        <br />
        Miss Goodbye
      </h1>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 40px",
          border: "2px solid #BD1947",
          background: "transparent",
          color: "#BD1947",
        }}
      >
        OPEN
      </button>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "gray",
          fontSize: "12px",
        }}
      >
        <div>Created by Ida Slunjski</div>
      </div>
    </div>
  )
}