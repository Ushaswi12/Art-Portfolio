const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const token = process.env.GITHUB_TOKEN;
const branch = process.env.GITHUB_BRANCH || 'main';

/**
 * Commits a file (either text content or a binary buffer) directly to the GitHub repository.
 * Bypasses the read-only serverless filesystem block on Vercel.
 */
export async function commitToGitHub(filePath: string, content: string | Buffer, message: string) {
  if (!token || !owner || !repo) {
    throw new Error('GitHub credentials are missing from server environment variables (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)');
  }

  // Normalize path format for GitHub API (must use forward slashes)
  const normalizedPath = filePath.replace(/\\/g, '/');
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${normalizedPath}`;

  const base64Content = typeof content === 'string'
    ? Buffer.from(content).toString('base64')
    : content.toString('base64');

  // 1. Check if the file already exists in the repository to retrieve its current SHA
  let sha: string | undefined;
  try {
    const res = await fetch(`${url}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      sha = data.sha;
    }
  } catch (err) {
    console.warn(`[GitHub API] Warning fetching SHA for ${normalizedPath}:`, err);
  }

  // 2. Put file contents back into the repository
  const body = {
    message,
    content: base64Content,
    branch,
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub API commit failed for ${normalizedPath}: ${res.statusText} (${errorText})`);
  }
}
