from pathlib import Path

import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / ".." / "README.md").read_text()

setuptools.setup(
    name="streamlit-free-text-select",
    version="0.3.0",
    author="Sander Hummerich",
    author_email="sander.hummerich@gmx.de",
    description="A Streamlit component that allows you to select from a list of options or enter a custom value.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=[
        "streamlit >= 0.63",
    ],
    extras_require={
        "devel": [
            "wheel",
            "pytest==7.4.0",
            "playwright==1.39.0",
            "requests==2.31.0",
            "pytest-playwright-snapshot==1.0",
            "pytest-rerunfailures==12.0",
        ]
    },
)
