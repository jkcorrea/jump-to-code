import { Storage } from '@plasmohq/storage'
import type { PlasmoCSConfig } from 'plasmo'

import { getRepoKeyFromUrl, GH_FILEPATH_RE } from '~utils'

export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*/blob/*'],
  run_at: 'document_idle',
}

async function main() {
  // get current url
  const url = new URL(window.location.href)
  // parse out the file & repo paths into the filesystem path
  const filePath = url.pathname.match(GH_FILEPATH_RE)?.[1]
  const repoKey = getRepoKeyFromUrl(url.href)
  if (!repoKey || !filePath) return

  const storage = new Storage()
  const repoPath = await storage.get(repoKey)
  console.log(repoPath)

  let lineNumber: number | null = null
  if (url.hash) {
    const num = url.hash.replace('#L', '')
    try {
      lineNumber = parseInt(num, 10)
    } catch {
      lineNumber = null
    }
  }

  let jumpToUrl = `vscode://file${repoPath}/${filePath}`
  if (lineNumber) jumpToUrl += `:${lineNumber}`

  // Create a list item to nest
  const li = document.createElement('li')
  // Create an anchor
  const a = document.createElement('a')
  a.id = 'js-jump-to-code'
  a.role = 'menuitem'
  a.className = 'dropdown-item'
  a.href = jumpToUrl
  // set the text content
  a.textContent = 'Jump to code'
  if (lineNumber) a.textContent += ` (at line ${lineNumber})`

  // Append the anchor to the list item
  li.appendChild(a)

  // Append the list item to the container
  const container = document.querySelector('.BlobToolbar-dropdown')
  if (container) container.appendChild(li)
}

main()
