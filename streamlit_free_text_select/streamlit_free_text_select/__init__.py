import os
from typing import Optional, Literal

import streamlit.components.v1 as components

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "st_free_text_select",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component(
        "st_free_text_select", path=build_dir
    )


def st_free_text_select(
    label: str,
    options: list,
    index: Optional[int] = None,
    format_func: Optional[callable] = None,
    placeholder: Optional[str] = None,
    disabled: bool = False,
    delay: int = 300,
    key=None,
    label_visibility: Literal["visible", "hidden", "collapsed"] = "visible",
):
    r"""Display a free text select input widget.

    Parameters
    ----------
    label : str
        A short label explaining to the user what this input is for.
    options : list
        A list of predefined options to choose from.
    index : int
        The index of the preselected option on first render. If None, will initialize
        empty and return None until the user selects an option. Defaults to None.
    format_func : callable
        A callable function to format the options, defaults to None.
    placeholder : str
        A string to display when the input is empty, defaults to None.
    disabled : bool
        Whether the input is disabled, defaults to False.
    delay : int
        The time in milliseconds to wait before updating the component, defaults to 300.
    key : str
        An optional string to use as the unique key for the widget, defaults to None.
    label_visibility : Literal["visible", "hidden", "collapsed"]
        The visibility of the label. If "hidden", the label doesn't show but there is
        still empty space for it above the widget (equivalent to label=""). If
        "collapsed", both the label and the space are removed. Default is "visible".

    Returns
    -------
    str or None
        The value of the free text select input.

    Example
    -------
    >>> import streamlit as st
    >>> from streamlit_free_text_select import st_free_text_select
    >>> options = ['Option 1', 'Option 2', 'Option 3']
    >>> value = st_free_text_select(
    ...     label='Free text select',
    ...     options=options,
    ...     format_func=lambda x: x.lower(),
    ...     placeholder='enter question',
    ...     disabled=False,
    ...     delay=300,
    ... )
    >>> st.write('Free text select value:', value)
    """

    if format_func is not None:
        options = [format_func(option) for option in options]

    if index is not None:
        assert index >= 0 and index < len(options), \
            "index must be within the range of options"

    assert label_visibility in ["visible", "hidden", "collapsed"], \
        "label_visibility must be one of 'visible', 'hidden', 'collapsed'"

    component_value = _component_func(
        label=label,
        options=options,
        index=index,
        placeholder=placeholder,
        disabled=disabled,
        delay=delay,
        key=key,
        label_visibility=label_visibility,
    )

    return component_value
