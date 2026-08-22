import { RECIPE_TAG, sanityFetch } from '@/sanity/lib/fetch'
import { type RawImage, resolveImage, type SiteImage } from '@/sanity/lib/image'
import { allRecipesQuery, recipeBySlugQuery, recipeSlugsQuery } from '@/sanity/lib/queries'

export interface RecipeCard {
  slug: string
  title: string
  description: string
  publishedAt?: string
  preview: SiteImage | null
}

export interface RecipeIngredient {
  key: string
  name: string
  amount?: string
}

export interface RecipeStep {
  key: string
  title?: string
  text: string
  image: SiteImage | null
}

export interface Recipe extends RecipeCard {
  intro?: string
  cookingTime?: number
  servings?: number
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
}

interface RawRecipeCard {
  slug: string
  title: string
  description: string
  publishedAt?: string | null
  preview: RawImage | null
}

interface RawRecipe extends RawRecipeCard {
  intro?: string | null
  cookingTime?: number | null
  servings?: number | null
  ingredients?: { _key: string; name: string; amount?: string | null }[] | null
  steps?: { _key: string; title?: string | null; text: string; image?: RawImage | null }[] | null
}

function toRecipeCard(raw: RawRecipeCard): RecipeCard {
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    publishedAt: raw.publishedAt ?? undefined,
    preview: resolveImage(raw.preview, raw.title),
  }
}

export async function getRecipeSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>(recipeSlugsQuery, RECIPE_TAG)
}

export async function getAllRecipes(): Promise<RecipeCard[]> {
  const recipes = await sanityFetch<RawRecipeCard[]>(allRecipesQuery, RECIPE_TAG)

  return recipes.map(toRecipeCard)
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipe = await sanityFetch<RawRecipe | null>(recipeBySlugQuery, RECIPE_TAG, { slug })

  if (!recipe) {
    return null
  }

  return {
    ...toRecipeCard(recipe),
    intro: recipe.intro?.trim() || undefined,
    cookingTime: recipe.cookingTime ?? undefined,
    servings: recipe.servings ?? undefined,
    ingredients: (recipe.ingredients ?? []).map((ingredient) => ({
      key: ingredient._key,
      name: ingredient.name,
      amount: ingredient.amount?.trim() || undefined,
    })),
    steps: (recipe.steps ?? []).map((step, index) => ({
      key: step._key,
      title: step.title?.trim() || undefined,
      text: step.text,
      image: resolveImage(step.image, step.title?.trim() || `Шаг ${index + 1}`),
    })),
  }
}
