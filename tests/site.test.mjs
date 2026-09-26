import assert from 'node:assert/strict'
import test from 'node:test'
import { assetPath, ensureBasePathUrl, siteUrl } from '../lib/site.ts'

test('assetPath prefixes the /asisten-medis base path', () => {
  assert.equal(assetPath('/logo.png'), '/asisten-medis/logo.png')
  assert.equal(assetPath('logo.png'), '/asisten-medis/logo.png')
  assert.equal(assetPath('/'), '/asisten-medis/')
})

test('siteUrl builds canonical sentrahai.com URLs under the base path', () => {
  assert.equal(siteUrl(), 'https://sentrahai.com/asisten-medis')
  assert.equal(siteUrl('/wiki'), 'https://sentrahai.com/asisten-medis/wiki')
})

test('ensureBasePathUrl appends the base path exactly once', () => {
  assert.equal(ensureBasePathUrl('https://example.test'), 'https://example.test/asisten-medis')
  assert.equal(ensureBasePathUrl('https://example.test/'), 'https://example.test/asisten-medis')
  assert.equal(ensureBasePathUrl('https://example.test/asisten-medis'), 'https://example.test/asisten-medis')
})
