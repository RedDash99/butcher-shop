import Image from 'next/image'
import type { SiteImage } from '@/sanity/lib/image'

interface CoverImageProps {
  image: SiteImage
  sizes: string
  className?: string
  priority?: boolean
}

/**
 * Картинка из Sanity, растянутая по родителю. Пока грузится оригинал,
 * показываем размытую превьюшку (lqip), которую отдаёт Sanity вместе с ассетом.
 */
export default function CoverImage({ image, sizes, className, priority }: CoverImageProps) {
  return (
    <Image
      src={image.url}
      alt={image.alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder={image.lqip ? 'blur' : 'empty'}
      blurDataURL={image.lqip}
    />
  )
}
