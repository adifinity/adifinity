import { type SchemaTypeDefinition } from 'sanity'

import {capabilityType} from './documents/capabilityType'
import {currentUpdateType} from './documents/currentUpdateType'
import {experienceType} from './documents/experienceType'
import {fieldNoteType} from './documents/fieldNoteType'
import {noteType} from './documents/noteType'
import {readingEntryType} from './documents/readingEntryType'
import {siteSettingsType} from './documents/siteSettingsType'
import {workItemType} from './documents/workItemType'
import {blockContentType} from './objects/blockContentType'
import {dateRangeType} from './objects/dateRangeType'
import {externalLinkType} from './objects/externalLinkType'
import {fileDownloadType} from './objects/fileDownloadType'
import {imageWithMetadataType} from './objects/imageWithMetadataType'
import {metricType} from './objects/metricType'
import {seoType} from './objects/seoType'
import {testType} from './testType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    workItemType,
    noteType,
    fieldNoteType,
    experienceType,
    currentUpdateType,
    readingEntryType,
    capabilityType,
    siteSettingsType,

    // Reusable objects
    blockContentType,
    seoType,
    imageWithMetadataType,
    externalLinkType,
    fileDownloadType,
    metricType,
    dateRangeType,

    // Test / development
    testType,
  ],
}
