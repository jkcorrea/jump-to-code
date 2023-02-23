const storage = new Storage()

interface RepoData {
  [x: string]: string
}

const REPO_DATA_KEY = 'REPO_DATA'

const getRepoData = async (): Promise<RepoData> => {
  const repoData = await storage.get(REPO_DATA_KEY)
  if (!repoData) {
    await storage.set(REPO_DATA_KEY, {})
    return {} as RepoData
  }
  return repoData as RepoData
}

export const getPathForRepo = async (repoKey: string): Promise<string> => {
  const repoData = await getRepoData()
  return repoData[repoKey]
}

export const setPathForRepo = async (repoKey: string, repoPath: string): Promise<void> => {
  const repoData = await getRepoData()
  repoData[repoKey] = repoPath
  await storage.set(REPO_DATA_KEY, repoData)
}
