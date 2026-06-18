'use client'

import React from 'react'
import { supabase } from './supabase'

type Photo = {
  url: string
  name: string
}

export default function Home() {
  const [photos, setPhotos] = React.useState<
    Photo[]
  >([])

  const fileInputRef =
    React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    const { data, error } = await supabase.storage
      .from('photos')
      .list('', {
        limit: 1000,
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

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files

    if (!files) return

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`

      await supabase.storage
        .from('photos')
        .upload(fileName, file)
    }

    await fetchPhotos()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F6E8EE',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        <h1
          className="tangerine-title"
          style={{
            fontSize:
              'clamp(3rem, 10vw, 7rem)',
            color: '#BD1947',
            lineHeight: '0.9',
            marginBottom: '10px',
          }}
        >
          Kiss The
          <br />
          Miss Goodbye
        </h1>

        <p
          style={{
            color: '#666',
            marginBottom: '30px',
          }}
        >
          Upload and share memories from Martinina djevojačka
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
        />

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          style={{
            border: '2px solid #BD1947',
            color: '#BD1947',
            background: 'transparent',
            padding: '14px 40px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          UPLOAD PHOTO
        </button>
      </div>

      <div
        style={{
          marginTop: '50px',
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill,minmax(220px,1fr))',
          gap: '16px',
        }}
      >
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo.url}
            alt="memory"
            style={{
              width: '100%',
              borderRadius: '20px',
              objectFit: 'cover',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '50%',
          transform:
            'translateX(-50%)',
          color: '#888',
          fontSize: '12px',
          fontFamily:
            'Times New Roman, serif',
        }}
      >
        Created by Ida Slunjski
      </div>
    </div>
  )
}