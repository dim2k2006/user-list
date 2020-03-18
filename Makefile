install: install-deps

install-deps:
	npm install

develop:
	npm start

build:
	rm -rf build
	npm run build

deploy:
	npm run deploy

lint:
	npx eslint . --ext js,jsx

.PHONY: test
