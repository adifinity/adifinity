import BookIcon from '@sanity/icons/Book'
import BulbOutlineIcon from '@sanity/icons/BulbOutline'
import CaseIcon from '@sanity/icons/Case'
import ClockIcon from '@sanity/icons/Clock'
import CogIcon from '@sanity/icons/Cog'
import EditIcon from '@sanity/icons/Edit'
import MarkerIcon from '@sanity/icons/Marker'
import TimelineIcon from '@sanity/icons/Timeline'
import WrenchIcon from '@sanity/icons/Wrench'
import type {StructureResolver} from 'sanity/structure'

export const SINGLETON_TYPES = new Set(['siteSettings'])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('workItem').title('Work').icon(CaseIcon),
      S.documentTypeListItem('note').title('Notes').icon(EditIcon),
      S.documentTypeListItem('fieldNote').title('Field Notes').icon(MarkerIcon),
      S.documentTypeListItem('experience').title('Experiences').icon(TimelineIcon),
      S.documentTypeListItem('currentUpdate').title('Current Updates').icon(ClockIcon),
      S.documentTypeListItem('readingEntry').title('Reading').icon(BookIcon),
      S.documentTypeListItem('capability').title('Capabilities').icon(BulbOutlineIcon),
      S.divider(),
      S.listItem()
        .title('Test / Development')
        .icon(WrenchIcon)
        .child(
          S.list()
            .title('Test / Development')
            .items([S.documentTypeListItem('test').title('Test')]),
        ),
    ])
