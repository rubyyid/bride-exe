'use client'

import React from 'react'
import { supabase } from './supabase'

type Photo = {
  url: string
  name: string
}

export default function Home() {
  const [photos, setPhotos] = React.useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] =
    React.useState<Photo | null>(null)

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

      const { error } =
        await supabase.storage
          .from('photos')
          .upload(fileName, file)

      if (error) {
        console.log(error)
      }
    }

    await fetchPhotos()
  }

  const downloadPhoto = (
    photoUrl: string
  ) => {
    const link =
      document.createElement('a')

    link.href = photoUrl
    link.download = 'photo.jpg'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const deletePhoto = async (
    fileName: string
  ) => {
    const confirmed =
      window.confirm(
        'Delete photo?'
      )

    if (!confirmed) return

    const { error } =
      await supabase.storage
        .from('photos')
        .remove([fileName])

    if (error) {
      console.log(error)
      return
    }

    setSelectedPhoto(null)

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
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        <h1
          className="tangerine-title"
          style={{
            fontSize:
              'clamp(2.8rem, 9vw, 6rem)',
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
            marginBottom: '25px',
          }}
        >
         Share your memories
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          style={{
            display: 'none',
          }}
        />

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          style={{
            border:
              '2px solid #BD1947',
            color: '#BD1947',
            background: 'transparent',
            padding: '14px 40px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          UPLOAD PHOTO
        </button>
      </div>

      <div className="masonry-gallery">
        {photos.map(
          (photo, index) => (
            <div
              key={index}
              className="masonry-item"
            >
              <img
                src={photo.url}
                alt="memory"
                onClick={() =>
                  setSelectedPhoto(photo)
                }
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: '18px',
                  cursor: 'pointer',
                }}
              />
            </div>
          )
        )}
      </div>

      {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'rgba(0,0,0,0.95)',
            zIndex: 9999,

            display: 'flex',
            flexDirection: 'column',
            justifyContent:
              'center',
            alignItems: 'center',

            padding: '20px',
          }}
        >
          <button
            onClick={() =>
              setSelectedPhoto(null)
            }
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',

              background: 'none',
              border: 'none',

              color: 'white',

              fontSize: '32px',

              cursor: 'pointer',
            }}
          >
            ✕
          </button>

          <img
            src={selectedPhoto.url}
            alt=""
            style={{
              maxWidth: '90%',
              maxHeight: '75vh',
              borderRadius: '20px',
              objectFit: 'contain',
            }}
          />

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
            }}
          >
            <button
              onClick={() =>
                downloadPhoto(
                  selectedPhoto.url
                )
              }
              style={{
                padding:
                  '12px 20px',
                borderRadius:
                  '10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Download
            </button>

            <button
              onClick={() =>
                deletePhoto(
                  selectedPhoto.name
                )
              }
              style={{
                padding:
                  '12px 20px',
                borderRadius:
                  '10px',
                border: 'none',
                cursor: 'pointer',
                background:
                  '#BD1947',
                color: 'white',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div
  style={{
    textAlign: 'center',
    marginTop: '40px',
    paddingBottom: '20px',
    color: '#888',
    fontSize: '12px',
    fontFamily: 'Times New Roman, serif',
  }}
>
  Created by Ida Slunjski
</div>
    </div>
  )
}