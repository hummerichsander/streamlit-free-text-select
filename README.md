# Streamlit free text select
This component implements a selectbox that allows free text input. It is based on React-Select's 'Select'
component.

## Installation
```bash
pip install streamlit-free-text-select
```

## Usage
```python
import streamlit as st

from streamlit_free_text_select import st_free_text_select

options = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"]

value = st_free_text_select(
    label="Free text select",
    options=options,
    format_func=lambda x: x.lower(),
    placeholder="Select or enter a fruit",
    disabled=False,
    delay=300,
)
st.write("Free text select value:", value)
```

![demo](https://github.com/hummerichsander/streamlit-freetextselect/blob/master/streamlit-free-text-demo.gif)


## Docs
Parameters
- `label` : str
    A short label explaining to the user what this input is for.
- `options` : list
    A list of predefined options to choose from.
- `format_func` : callable
    A callable function to format the options, defaults to None.
- `placeholder` : str
    A string to display when the input is empty, defaults to None.
- `disabled` : bool
    Whether the input is disabled, defaults to False.
- `delay` : int
    The time in milliseconds to wait before updating the component, defaults to 300.
- `key` : str
    An optional string to use as the unique key for the widget, defaults to None.

Returns
str or None
    The value of the free text select input.
