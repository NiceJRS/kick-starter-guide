'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IconX, IconZoomIn } from '@tabler/icons-react'

export default function ImageCaption({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <figure className="my-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full rounded-xl overflow-hidden border shadow-sm cursor-zoom-in"
          style={{ borderColor: 'var(--border-default)' }}
          aria-label={alt}
        >
          <Image src={src} alt={alt} width={width} height={height} className="block mx-auto" style={{ maxHeight: '400px', width: 'auto', maxWidth: '100%', height: 'auto' }} />
          <span
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(0,0,0,0.35)' }}
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>
              <IconZoomIn size={18} />
            </span>
          </span>
        </button>
        {caption && (
          <figcaption className="text-center text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
            {caption}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-[101]"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
            aria-label="Close"
          >
            <IconX size={20} />
          </button>
          <div className="max-w-[95vw] max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] w-auto h-auto rounded-lg object-contain"
            />
            {caption && (
              <p className="text-center text-sm mt-3 px-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
