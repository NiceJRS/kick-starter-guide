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
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto object-cover" />
      </div>
      {caption && (
        <figcaption className="text-center text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
