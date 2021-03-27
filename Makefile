SHELL :=/bin/bash
.DEFAULT_GOAL := help 

help: ## Show this help
	@echo Dependencies: git haml
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Run file processors to build the website
	@echo Building project...
	@haml ./index.haml index.html
	@echo Done!

publish: ## Publish the website to GitHub pages
	git checkout main
	-git branch -D gh-pages
	git branch gh-pages
	git checkout gh-pages
	@make build
	-rm README.md index.haml .gitignore LICENSE
	git add index.html
	git commit -a -m "Remove unnecessary files"
	git push --set-upstream origin gh-pages -f
	git checkout main