import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'

/** Ширина, до которой Sanity CDN уменьшает исходник перед отдачей в next/image. */
const MAX_WIDTH = 1200

export interface SiteImage {
  url: string
  alt: string
  lqip?: string
  width?: number
  height?: number
}

export interface RawImage {
  alt?: string | null
  hotspot?: { x: number; y: number; width: number; height: number } | null
  crop?: { top: number; bottom: number; left: number; right: number } | null
  asset?: {
    _id: string
    metadata?: {
      lqip?: string | null
      dimensions?: { width?: number; height?: number } | null
    } | null
  } | null
}

const builder = createImageUrlBuilder({ projectId, dataset })

export function resolveImage(
  raw: RawImage | null | undefined,
  fallbackAlt: string
): SiteImage | null {
  if (!raw?.asset?._id) {
    return null
  }

  const source: SanityImageSource = {
    asset: { _id: raw.asset._id },
    crop: raw.crop ?? undefined,
    hotspot: raw.hotspot ?? undefined,
  }
  const dimensions = raw.asset.metadata?.dimensions

  return {
    url: builder.image(source).width(MAX_WIDTH).quality(80).auto('format').url(),
    alt: raw.alt?.trim() || fallbackAlt,
    lqip: raw.asset.metadata?.lqip ?? undefined,
    width: dimensions?.width,
    height: dimensions?.height,
  }
}
