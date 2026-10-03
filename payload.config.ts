import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor, LinkFeature, HeadingFeature } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import { Users } from './collections/Users';
import { Articles } from './collections/Articles';
import { Authors } from './collections/Authors';
import { Categories } from './collections/Categories';
import { Tags } from './collections/Tags';
import { Media } from './collections/Media';
const dirname = path.dirname(fileURLToPath(import.meta.url));
export default buildConfig({
  admin: { user: 'users', importMap: { baseDir: dirname } },
  collections: [Users, Articles, Authors, Categories, Tags, Media],
  editor: lexicalEditor({ features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter(feature => !['link', 'heading', 'relationship', 'upload'].includes(feature.key)),
    LinkFeature({ enabledCollections: [] }),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
  ] }), sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || '' } }),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
});
