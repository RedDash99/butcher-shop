import type { SchemaTypeDefinition } from 'sanity'
import { imageWithAltType } from './objects/imageWithAlt'
import { recipeIngredientType } from './objects/recipeIngredient'
import { recipeStepType } from './objects/recipeStep'
import { productType } from './product'
import { recipeType } from './recipe'

export const schemaTypes: SchemaTypeDefinition[] = [
  productType,
  recipeType,
  imageWithAltType,
  recipeIngredientType,
  recipeStepType,
]
