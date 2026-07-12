import * as migration_20260712_113452_initial from './20260712_113452_initial';

export const migrations = [
  {
    up: migration_20260712_113452_initial.up,
    down: migration_20260712_113452_initial.down,
    name: '20260712_113452_initial'
  },
];
