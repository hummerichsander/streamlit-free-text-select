import streamlit as st

from streamlit_free_text_select import st_free_text_select

options = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"]

value = st_free_text_select(
    label="Free text select",
    options=options,
    index=2,
    format_func=lambda x: x.lower(),
    placeholder="Select or enter a fruit",
    disabled=False,
    delay=300,
    label_visibility="visible",
)
st.write("Free text select value:", value)
