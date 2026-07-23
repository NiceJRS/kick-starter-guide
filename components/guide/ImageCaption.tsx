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
      <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: 'var(--border-default)' }}>
        <Image src={src} alt={alt} width={width} height={height} className="block mx-auto" style={{ maxHeight: '400px', width: 'auto', maxWidth: '100%', height: 'auto' }} />
      </div>
      {caption && (
        <figcaption className="text-center text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
