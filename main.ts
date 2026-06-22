import { serveDir, serveFile } from '@std/http/file-server'

const PORT = parseInt(Deno.env.get('PORT') ?? '8080', 10)
const HOSTNAME = Deno.env.get('HOSTNAME') ?? '::'

Deno.serve({ port: PORT, hostname: HOSTNAME }, async (req) => {
  const response = await serveDir(req, { fsRoot: 'public', quiet: true, enableIndex: true })

  if (response.status !== 404) {
    return response
  }

  const { pathname } = new URL(req.url)

  // resize is a single-page app, so unmatched paths fall back to its index.html.
  if (pathname.startsWith('/resize/')) {
    return serveFile(req, 'public/resize/index.html')
  }

  // state-sync is a single-page app, so unmatched paths fall back to its index.html.
  if (pathname.startsWith('/state-sync/')) {
    return serveFile(req, 'public/state-sync/index.html')
  }

  // reasonable is a single-page app, so unmatched paths fall back to its index.html.
  if (pathname.startsWith('/reasonable/')) {
    return serveFile(req, 'public/reasonable/index.html')
  }

  // valorant-blog is a single-page app, so unmatched paths fall back to its index.html.
  if (pathname.startsWith('/valorant-blog/')) {
    return serveFile(req, 'public/valorant-blog/index.html')
  }

  // clickmart is a single-page app, so unmatched paths fall back to its index.html.
  if (pathname.startsWith('/clickmart/')) {
    return serveFile(req, 'public/clickmart/index.html')
  }

  // discord-queue is a single-page app, so unmatched paths fall back to its index.html.
  if (pathname.startsWith('/discord-queue/')) {
    return serveFile(req, 'public/discord-queue/index.html')
  }

  // onclick-notes is a single-page app, so unmatched paths fall back to its index.html.
  if (pathname.startsWith('/onclick-notes/')) {
    return serveFile(req, 'public/onclick-notes/index.html')
  }

  return response
})
