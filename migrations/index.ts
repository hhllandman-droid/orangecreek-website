import * as migration_20260712_113452_initial from './20260712_113452_initial';
import * as migration_20260712_115132_schema_update from './20260712_115132_schema_update';
import * as migration_20260712_120255_portfolio_cms_sync from './20260712_120255_portfolio_cms_sync';
import * as migration_20260712_122800_production_schema_repair from './20260712_122800_production_schema_repair';

export const migrations = [
  {
    up: migration_20260712_113452_initial.up,
    down: migration_20260712_113452_initial.down,
    name: '20260712_113452_initial',
  },
  {
    up: migration_20260712_115132_schema_update.up,
    down: migration_20260712_115132_schema_update.down,
    name: '20260712_115132_schema_update',
  },
  {
    up: migration_20260712_120255_portfolio_cms_sync.up,
    down: migration_20260712_120255_portfolio_cms_sync.down,
    name: '20260712_120255_portfolio_cms_sync'
  },
  {
    up: migration_20260712_122800_production_schema_repair.up,
    down: migration_20260712_122800_production_schema_repair.down,
    name: '20260712_122800_production_schema_repair',
  },
];
