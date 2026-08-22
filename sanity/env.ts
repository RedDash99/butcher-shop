export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-08-22'

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Не задана переменная окружения NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Не задана переменная окружения NEXT_PUBLIC_SANITY_DATASET'
)

function assertValue(value: string | undefined, message: string): string {
  if (!value) {
    throw new Error(message)
  }

  return value
}
