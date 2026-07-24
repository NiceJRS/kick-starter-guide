import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Guide = defineDocumentType(() => ({
  name: 'Guide',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    number:         { type: 'number',  required: true },
    slug:           { type: 'string',  required: true },
    level:          { type: 'enum', options: ['beginner', 'intermediate', 'pro'], required: true },
    title_th:       { type: 'string',  required: true },
    title_en:       { type: 'string',  required: true },
    description_th: { type: 'string',  required: true },
    description_en: { type: 'string',  required: true },
    estimated_time: { type: 'string',  required: true },
    prerequisites:  { type: 'list', of: { type: 'string' }, default: [] },
    show_on_streamer_path: { type: 'boolean', default: false },
    show_on_highlight:     { type: 'boolean', default: false },
    show_on_popular:       { type: 'boolean', default: false },
    streamer_path_order:   { type: 'number',  default: 999 },
    sidebar_category: {
      type: 'enum',
      options: ['getting-started', 'kick-features', 'chat-community', 'monetization', 'advanced'],
      required: true,
    },
  },
  computedFields: {
    locale: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileDir,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Guide],
})
