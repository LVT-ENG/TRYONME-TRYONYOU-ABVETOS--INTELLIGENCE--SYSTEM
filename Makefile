dev:
	npm run dev
build:
	npm run build
lint:
	npx eslint js/ --fix
test:
	npx vitest run
clean:
	rm -rf dist