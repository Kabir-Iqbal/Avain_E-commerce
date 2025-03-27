import { type SchemaTypeDefinition } from 'sanity'

// Import your schemas
import { product } from './products'
import { Category } from './category'
import { order } from './order'

// Add them to the types array
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Category,product, order],
}
