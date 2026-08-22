const IMAGE_FRAGMENT = /* groq */ `{
    alt,
    hotspot,
    crop,
    asset->{
      _id,
      metadata { lqip, dimensions { width, height } }
    }
  }`

const PRODUCT_CARD_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  "description": coalesce(description, ""),
  "price": coalesce(price, 0),
  "weight": coalesce(weight, ""),
  preview ${IMAGE_FRAGMENT}
`

const RECIPE_CARD_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  "description": coalesce(description, ""),
  publishedAt,
  preview ${IMAGE_FRAGMENT}
`

export const productSlugsQuery = /* groq */ `
  *[_type == "product" && defined(slug.current)]{ "slug": slug.current }
`

export const allProductsQuery = /* groq */ `
  *[_type == "product" && defined(slug.current)] | order(price asc) {${PRODUCT_CARD_FIELDS}}
`

export const productBySlugQuery = /* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    ${PRODUCT_CARD_FIELDS},
    content,
    protein,
    fat,
    calories,
    caloriesKj
  }
`

export const recipeSlugsQuery = /* groq */ `
  *[_type == "recipe" && defined(slug.current)]{ "slug": slug.current }
`

export const allRecipesQuery = /* groq */ `
  *[_type == "recipe" && defined(slug.current)]
    | order(coalesce(publishedAt, _createdAt) desc) {${RECIPE_CARD_FIELDS}}
`

export const recipeBySlugQuery = /* groq */ `
  *[_type == "recipe" && slug.current == $slug][0] {
    ${RECIPE_CARD_FIELDS},
    intro,
    cookingTime,
    servings,
    ingredients[]{ _key, name, amount },
    steps[]{ _key, title, text, image ${IMAGE_FRAGMENT} }
  }
`
