import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { commitToGitHub } from '@/lib/github';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename: replace spaces with hyphens, remove special characters
    const cleanFilename = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-');

    const uniqueFilename = `${Date.now()}-${cleanFilename}`;
    const localUploadDir = join(process.cwd(), 'public', 'uploads');
    const localFilePath = join(localUploadDir, uniqueFilename);

    // 1. Try to save file locally (fallback for local development)
    try {
      await mkdir(localUploadDir, { recursive: true });
      await writeFile(localFilePath, buffer);
      console.log(`[Upload API] Saved locally to ${localFilePath}`);
    } catch (err) {
      console.warn('[Upload API] Local upload skipped (normal for read-only Vercel serverless environment):', err);
    }

    // 2. Commit file directly to the GitHub repository if credentials are set
    const repoRelativePath = `public/uploads/${uniqueFilename}`;
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      try {
        await commitToGitHub(repoRelativePath, buffer, `Upload artwork asset: ${uniqueFilename}`);
        console.log(`[Upload API] Committed ${repoRelativePath} successfully to GitHub.`);
      } catch (err) {
        console.error(`[Upload API] GitHub commit failed for ${repoRelativePath}:`, err);
        return NextResponse.json({ error: 'Failed to commit asset to repository' }, { status: 500 });
      }
    }

    // Return the relative URL of the uploaded image
    const fileUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (err: any) {
    console.error('[Upload API] Server Error:', err);
    return NextResponse.json({ error: err.message || 'File upload failed' }, { status: 500 });
  }
}
