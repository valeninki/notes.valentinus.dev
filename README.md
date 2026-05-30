# notes.valentinus.dev

Personal knowledge base and digital garden built with [Quartz](https://quartz.jzhao.xyz/).

## Development

```bash
nix-shell
npx quartz build --serve
```

## Build

```bash
npx quartz build
```

Output goes to `public/`.

## Deploy

Push to `v5` branch -> GitHub Actions builds and deploys to GitHub Pages automatically.
