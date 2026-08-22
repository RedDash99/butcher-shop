import { parseBody } from 'next-sanity/webhook'
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Вебхук из Sanity: сбрасывает кеш страниц сразу после правок в админке.
 * Настройка: sanity.io/manage → API → Webhooks, URL — https://<домен>/api/revalidate,
 * секрет должен совпадать с SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return new NextResponse('Не задан SANITY_REVALIDATE_SECRET', { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret)

    if (!isValidSignature) {
      return new NextResponse('Неверная подпись запроса', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('В запросе нет типа документа', { status: 400 })
    }

    revalidateTag(body._type, { expire: 0 })

    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (error) {
    console.error('Не удалось обработать вебхук Sanity', error)
    return new NextResponse('Не удалось обновить кеш', { status: 500 })
  }
}
