import * as migration_20261002_225919_initial from './20261002_225919_initial';

export const migrations = [
  {
    up: migration_20261002_225919_initial.up,
    down: migration_20261002_225919_initial.down,
    name: '20261002_225919_initial'
  },
];
