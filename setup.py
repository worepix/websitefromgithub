from setuptools import setup


setup(
	name="websitefromgithub",
	version="1.0",
	py_modules=["websitefromgithub",
    "wfg",],
	install_requires=[
		"Requests",
		"Click",
        "requests",
	],
	entry_points='''
		[console_scripts]
		websitefromgithub=app:cli
	'''
)