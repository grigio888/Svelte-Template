.PHONY: help


help: ## Display this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install the Frontend dependencies
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Installing dependencies..."
	@echo "# ----------------------------------------------------------------------- #"

	npm install

build: ## Build the Frontend
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Building the Frontend image: (no-cache = $(if $(no-cache),true,false))"
	@echo "# ----------------------------------------------------------------------- #"

	docker compose -f env/$(if $(strip $(env)),$(env)/,dev/)compose.yml build

up: ## Run the Frontend
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Running the Frontend container:"
	@echo "# ----------------------------------------------------------------------- #"

	docker compose -f env/$(if $(strip $(env)),$(env)/,dev/)compose.yml up -d

down: ## Run the Frontend
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Stopping the Frontend container:"
	@echo "# ----------------------------------------------------------------------- #"

	docker compose -f env/$(if $(strip $(env)),$(env)/,dev/)compose.yml down

logs: ## Attach the terminal to the Frontend container
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Showing the Frontend container logs:"
	@echo "# ----------------------------------------------------------------------- #"

	docker compose -f env/$(if $(strip $(env)),$(env)/,dev/)compose.yml logs -f frontend

attach: ## Attach the terminal to the Frontend container
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Attaching to the Frontend container"
	@echo "» To exit, use Ctrl + C"
	@echo "# ----------------------------------------------------------------------- #"

	docker compose -f env/$(if $(strip $(env)),$(env)/,dev/)compose.yml attach frontend

exec: ## Execute a command in the Frontend container
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Running command in the Frontend container: $(if $(command),$(command),bash)"
	@echo "# ----------------------------------------------------------------------- #"

	docker compose -f env/$(if $(strip $(env)),$(env)/,dev/)compose.yml exec -it $(if $(cont),$(cont),frontend) $(if $(command),$(command),sh)

lint:  ## Run the linter
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Running linter..."
	@echo "# ----------------------------------------------------------------------- #"

	npm run lint

format:  ## Run the formater
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Running formater..."
	@echo "# ----------------------------------------------------------------------- #"

	npm run format

recreate-dev: ## Recreate dev ambient
	make build env=dev && make up env=dev cont="backend database"

translate-tokens: ## Sync translation tokens
	@echo "# ----------------------------------------------------------------------- #"
	@echo "» Syncing translation tokens..."
	@echo "# ----------------------------------------------------------------------- #"

	node src/i18n/syncTokens.js
