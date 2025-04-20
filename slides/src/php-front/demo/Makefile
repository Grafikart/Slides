.PHONY: dev migrate

dev:
	parallel -j 2 --line-buffer ::: "symfony serve" "bun run dev"

migrate:
	php bin/console doctrine:migration:migrate
	php bin/console doctrine:fixtures:load
