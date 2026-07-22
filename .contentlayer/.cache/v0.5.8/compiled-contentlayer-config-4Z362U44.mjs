// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    number: { type: "number", required: true },
    slug: { type: "string", required: true },
    level: { type: "enum", options: ["beginner", "intermediate", "pro"], required: true },
    title_th: { type: "string", required: true },
    title_en: { type: "string", required: true },
    description_th: { type: "string", required: true },
    description_en: { type: "string", required: true },
    estimated_time: { type: "string", required: true },
    prerequisites: { type: "list", of: { type: "string" }, default: [] }
  },
  computedFields: {
    locale: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Guide]
});
export {
  Guide,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-4Z362U44.mjs.map
