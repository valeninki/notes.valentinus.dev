# notes.valentinus.dev

Personal knowledge base & notes — built with [Quartz](https://quartz.jzhao.xyz/) v4, hosted on GitHub Pages.

## Topics

- **Linux** — Arch, Fedora, Debian, systemd-boot
- **Networking** — OPNsense, GeoFilter, firewall, network design
- **Virtualization** — Proxmox, clustering, NFS sharing
- **Security** — SSH hardening, system lockdown
- **Homelab** — Nextcloud, CasaOS, Docker

## Stack

- [Quartz](https://quartz.jzhao.xyz/) v4.5.2 — static site generator
- GitHub Actions — automatic deploy on push to `v4`
- GitHub Pages — hosting

## Local Dev

```bash
nix-shell   # or have Node.js >= 22
npm install
npx quartz build --serve
```
