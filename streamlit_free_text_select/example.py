import streamlit as st

from streamlit_free_text_select import st_free_text_select

options = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"]

value = st_free_text_select(
    label="Free text select",
    options=options,
    format_func=lambda x: x.lower(),
    placeholder="enter question",
    disabled=False,
    delay=300,
)
st.write("Free text select value:", value)
