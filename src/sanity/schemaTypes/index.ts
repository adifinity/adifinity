import { type SchemaTypeDefinition } from 'sanity'

import {testType} from './testType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testType],
}
