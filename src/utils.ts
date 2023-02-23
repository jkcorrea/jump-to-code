export const GH_FILEPATH_RE = /^\/(?:.*?)\/(?:.*?)\/blob\/(?:.*?)\/(.*)/

const GH_REPO_KEY_RE = /github\.com\/([^/]+)\/([^/]+)/
export function getRepoKeyFromUrl(url: string): string | null {
  const matches = url.match(GH_REPO_KEY_RE)
  if (!matches) return null
  return `${matches[1]}/${matches[2]}`.toLowerCase()
}
