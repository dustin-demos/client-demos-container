# client-demos-container

Single-container deploy for a set of old client-side demos.
Bundles each demo as a git submodule and serves them all behind one Fly app, static, under a path prefix.

## History

These are small browser-only apps from years ago, revived in 2026 as one Fly deploy.
Each ran in some long-dead spot (Netlify, GitHub Pages, a local file) and is served here unmodified except for the minimum needed to run again.

- **reasonable** — a visual node editor for building workflows, started **October 2023** and worked on into 2024. It was a proof of concept and never fully finished; the workflow run is simulated client-side for the demo. Vue 3 + vite-ssg, built with `--base=/reasonable/`, with client-side routes handled by an SPA fallback in `main.ts`. The original repo has a real backend, but it does nothing the demo needs, so only the client is served here. The full history lives in `reasonable-backup`.
- **currency exchange** — a currency converter I built as a job-application code challenge in **May 2021**. I didn't get the job, but I liked the demo enough to keep it on my site for years as an example. Vue 3 + Vite; built here with `--base=/currency/` so it serves under its path.
- **state sync** — a proof of concept from **February 2021** for syncing state across differently-sized frames over a `BroadcastChannel`. The same page loads in three differently-sized iframes; type or scroll in one and the others follow, synced locally with no server. Built on pocket + Superfine. Two changes to serve it under a subpath: route the pages under `/state-sync/` and point the iframes at the same-origin `/state-sync/demo`. Its client-side routes are handled by an SPA fallback in `main.ts`.
- **resize** — an aspect-ratio calculator I built for myself in **February 2021**: cropping art for my Instagram at odd canvas sizes, then resizing to a square or 8x10, meant doing the math by hand, so I made a tool to do it. Superfine + an esbuild/sass build. Three changes to revive it: pin `uglify-js` to `3.13.8` (newer 3.x can't minify it); pin `sass` to `1.34.1` (newer sass renders `lab()` colors as `rgb()`, which broke the SVG icon fills that expect a hex); and set the home route to `/resize/` so it matches the path it's served under.
- **valorant blog editor** — a flat-file, JSON-based CMS from **March 2021** for a friend's Valorant tips blog. I messed around with it mostly for fun, ended up spending all my time on the drag-and-drop editor, and never finished, so they never got the blog. Built on pocket + Superfine with an esbuild/sass build. Served under `/valorant-blog/`; `sass` is pinned to `1.32.8` for the icon fills and the routes carry the subpath, with an SPA fallback in `main.ts`.
- **dvd video** — a bouncing DVD-logo screensaver from **February 2019**. A Twitch streamer I watched wanted one and couldn't find a version that worked simply and consistently; I often helped smaller streamers I watched with quick things like this, so I made this quick animation. It is pure CSS, which makes it about as hard to break as a web page gets. It never had a repo, so it lives here directly under `orphans/`.
- **h8ball** — a Hyperapp magic eight-ball I first committed **February 2018**. A silly project: I wrote the code while showing my non-developer friend Kellyn how it's done, and Kellyn came up with most of the prompts and ideas (the `index.html` still credits "kellynheller and whaaaley"). Loads Hyperapp from a CDN; the only change here pins that CDN to `hyperapp@1.2.9` — the v1 release it was written against (the bare unpkg URL now resolves to an incompatible v2).
- **roguelike** — a Vue-powered web roguelike I first committed **October 2016**, built with my friends Brandon (`GrandonBroseph`) and Connor Hartley. It was a low-stakes "let's build a game together" thing: Brandon knew roguelikes, I knew Vue, Connor pitched in. Built with Vue 2.0.1 (loaded from a CDN, released just weeks earlier) and a gulp 3 + browserify toolchain — old enough that it only builds on Node 10 today. The last commit at the time left the game's init commented out; the only change here restores it.

## Layout

- `demos/<name>/` — each demo as a submodule, used as-is.
- `main.ts` — Deno static host serving `public/`.
- `index.html` — landing page linking to each demo.

## Ports

- `8080` — public Deno host (`PORT`).

## How it runs

CI (`.github/workflows/deploy.yaml`) checks out the submodules, builds any demo that needs a legacy toolchain (roguelike's gulp build on Node 10), assembles everything into `public/`, and deploys to Fly. The runtime image is Deno only.

## Deploy secrets

CI needs a `FLY_API_TOKEN` GitHub Actions secret. Set it from a local env file
instead of the GitHub UI:

```sh
scripts/github/mint-fly-token.sh                      # mints a deploy token into scripts/github/.env
scripts/github/update-secrets.sh                      # pushes it to the repo's Actions secret
```

## Local

```sh
git submodule update --init --recursive
deno task build:docker   # builds legacy demos (Node 10 via Docker) and assembles public/
deno task start          # serves public/; open http://localhost:8080
```

| Task | What it does |
| --- | --- |
| `build` | Build legacy demos directly (CI; needs legacy Node on PATH) and assemble `public/`. |
| `build:docker` | Same, but runs the legacy build in a Node 10 container (local convenience). |
| `assemble` | Copy the index page and each demo into `public/<name>/`. |
| `start` | Run the Deno static host (production entry). |
