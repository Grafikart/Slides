.PHONY: preview
preview:
	pnpm run build
	caddy fmt --overwrite
	caddy run --watch
