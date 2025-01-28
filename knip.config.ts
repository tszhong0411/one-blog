import { type KnipConfig } from 'knip'

const config: KnipConfig = {
  commitlint: {
    config: 'commitlint.config.ts'
  },
  ignoreBinaries: ['only-allow'],
  ignoreDependencies: ['prettier-plugin-*'],
  postcss: {
    config: 'postcss.config.mjs'
  }
}

export default config
