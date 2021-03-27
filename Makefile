SHELL :=/bin/bash

build: # run file processors to build the website
	@echo Building project...
	haml ./index.haml index.html
	@echo Done!

publish:
	git checkout main
	-git branch -D gh-pages
	git branch gh-pages
	git checkout gh-pages
	rm README.md index.haml .gitignore LICENSE
	git commit -a -m "Remove unnecessary files."
	git push --set-upstream origin gh-pages