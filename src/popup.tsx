import { useRef } from 'react'
import { useStorage } from '@plasmohq/storage/hook'

import { getRepoKeyFromUrl } from '~utils'

import './tailwind.css'

let repoKey: string | null = ''
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0]
  if (tab?.url) repoKey = getRepoKeyFromUrl(tab.url)
})

function IndexPopup() {
  const [data, _, { setStoreValue, setRenderValue }] = useStorage(repoKey!, '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!repoKey)
    return (
      <div className="w-80 p-3">
        <h1 className="text-base font-semibold">Jump to Code</h1>
        <p className="mt-1 text-xs text-gray-700">
          Hey you. I only work inside a GitHub repo just FYI.
          <br />
          Try opening this popup again once you&apos;re in a repo.
        </p>
      </div>
    )

  return (
    <div className="w-80 p-3">
      <h1 className="text-lg font-bold">Jump to Code</h1>

      <form className="flex flex-col gap-y-2">
        <input ref={fileInputRef} type="file" className="hidden" />

        <div className="form-control w-full max-w-xs">
          <label htmlFor="repoKey" className="label">
            <span className="label-text text-xs">Repo</span>
          </label>

          <input disabled id="repoKey" className="input input-sm input-bordered" value={repoKey} />
        </div>

        <div className="form-control w-full max-w-xs">
          <label htmlFor="userPath" className="label">
            <span className="label-text text-xs">Local Path</span>
          </label>

          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            id="userPath"
            className="input input-sm input-bordered"
            onChange={(e) => setRenderValue(e.target.value)}
            value={data}
            placeholder="/absolute/path/to/this/repo"
          />
        </div>

        <button type="button" className="btn btn-sm btn-primary mt-3 ml-auto" onClick={() => setStoreValue(data)}>
          Save
        </button>
      </form>
    </div>
  )
}

export default IndexPopup
