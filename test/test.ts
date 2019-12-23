import wpfs from '../src/index'
import path from 'path'
import assert from 'assert'
import { describe, it } from 'mocha'

describe('indexs', () => {
  it('default', () => {
    const buildList = wpfs(path.join(__dirname, './src'))

    assert.ok(JSON.stringify(buildList) === JSON.stringify({
      xxx: path.join(__dirname, './src/xxx/index.js'),
      yyy: path.join(__dirname, './src/yyy/index.ts')
    }))
  })

  it('change indexName', () => {
    const buildList = wpfs(path.join(__dirname, './src'), 'xxx')

    assert.ok(JSON.stringify(buildList) === JSON.stringify({
      zzz: path.join(__dirname, './src/zzz/xxx.ts')
    }))
  })
})
