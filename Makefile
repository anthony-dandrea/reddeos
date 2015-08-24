env:
	virtualenv env
	env/bin/pip install -r requirements.txt

run: env
	env/bin/python site.py

clean:
	rm -rf env
