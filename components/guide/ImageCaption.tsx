import Image from 'next/image'

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
  return (
    <figure className="my-4">
      <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: 'var(--border-default)', maxHeight: '300px' }}>
        <Image src={src} alt={alt} width={width} height={height} className="w-full object-cover" style={{ maxHeight: '300px', objectFit: 'cover' }} />
      </div>
      {caption && (
        <figcaption className="text-center text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
