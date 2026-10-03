import * as migration_20261002_225919_initial from './20261002_225919_initial';
import * as migration_20261003_002041_media_blob_storage from './20261003_002041_media_blob_storage';

export const migrations = [
  {
    up: migration_20261002_225919_initial.up,
    down: migration_20261002_225919_initial.down,
    name: '20261002_225919_initial',
  },
  {
    up: migration_20261003_002041_media_blob_storage.up,
    down: migration_20261003_002041_media_blob_storage.down,
    name: '20261003_002041_media_blob_storage'
  },
];
