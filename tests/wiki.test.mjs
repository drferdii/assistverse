import assert from 'node:assert/strict'
import test from 'node:test'
import { getAllWikiPaths, getWikiPage, getWikiSidebarItems } from '../lib/wiki.ts'

test('every page listed in the wiki metadata resolves to real content', () => {
  const paths = getAllWikiPaths()
  assert.ok(paths.length > 0)
  for (const slug of paths) {
    const page = getWikiPage(slug)
    assert.ok(page, `missing wiki page for ${slug.join('/')}`)
    assert.ok(page.content.length > 0)
  }
})

test('nested pages are grouped under their section in the sidebar', () => {
  const overview = getWikiSidebarItems().find((item) => item.slug === 'overview')
  assert.ok(overview?.children?.some((child) => child.slug === 'overview/architecture'))
})

test('unknown slugs return null instead of throwing', () => {
  assert.equal(getWikiPage(['does-not-exist']), null)
})
