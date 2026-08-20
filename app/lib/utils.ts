import { SITE_NAME } from './const'

const formatPrice = (price: number | string | null | undefined): string => {
  if (price === null || price === undefined || price === '') {
    return '0'
  }

  // If it's a string, try to parse it, or return as-is
  if (typeof price === 'string') {
    const parsed = parseFloat(price)
    if (Number.isNaN(parsed)) {
      return price
    }
    price = parsed
  }

  if (typeof price !== 'number' || Number.isNaN(price)) {
    return '0'
  }

  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return formattedPrice.format(price)
}

const buildPageTitle = (pageTitle: string): string => `${pageTitle} | ${SITE_NAME}`

export { formatPrice, buildPageTitle }
