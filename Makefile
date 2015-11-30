env:
	virtualenv env
	env/bin/pip install -r requirements.txt
	npm --prefix ./react install ./react

run: env
	env/bin/python site.py & npm --prefix ./react start

build:
	npm --prefix ./react run build

clean:
	rm -rf env
	rm -rf node_modules
