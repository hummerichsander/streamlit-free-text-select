import React from "react";
import {
  CSSObjectWithLabel,
  ControlProps,
  OptionProps,
  StylesConfig,
} from "react-select";

import { ReactComponent as Dropdown } from "./icons/st-arrow.svg";
import { ReactComponent as Clear } from "./icons/st-clear.svg";


// Original code taken from https://github.com/m-wrzr/streamlit-searchbox/blob/main/streamlit_searchbox/frontend/src/Searchbox.tsx
// Updated to latest streamlit-1.45.0 style

class FreeTextSelectStyle {
  theme: any;
  wrapper: any;
  label: any;
  select: StylesConfig;

  constructor(theme: any) {
    this.theme = theme;
    this.wrapper = {
      overflow: "visible",
    };

    this.select = {
      menu: (styles: any) => ({
        ...styles,
        backgroundColor: theme.backgroundColor,
        borderRadius: "0.5rem",
        borderWidth: "0px",
        margin: "1px",
        marginTop: "0px",
        position: 'absolute',
        bottom: '0px',
        left: '0px',
      }),
      menuPortal: (styles: any) => ({
        ...styles,
        zIndex: 9999,
      }),
      menuList: (styles: any) => ({
        ...styles,
        backgroundColor: theme.backgroundColor,
        borderRadius: "0.5rem",
        paddingTop: "-0.5rem",
        paddingBottom: "-0.5rem",
        borderWidth: "0px",
      }),
      input: (styles: any) => ({
        ...styles,
        color: theme.textColor,
      }),
      singleValue: (styles: any, { isDisabled }: any) => ({
        ...styles,
        color: isDisabled ? this.theme.fadedText40 : theme.textColor,
      }),
      placeholder: (styles: any, { isDisabled }: any) => ({
        ...styles,
        color: isDisabled ? "#bbb" : theme.fadedText60,
      }),
      control: (
        styles: CSSObjectWithLabel, 
        { isFocused, isDisabled }: ControlProps
      ) => {
        const baseBorder = isFocused
          ? "1px solid " + theme.primaryColor
          : "1px solid transparent";

        return {
          ...styles,
          borderRadius: "0.5rem",
          backgroundColor: isDisabled
            ? this.theme.darkenedBgMix15
            : this.theme.secondaryBackgroundColor,
          color: isDisabled ? this.theme.fadedText40 : this.theme.textColor,
          border: baseBorder,
          boxShadow: "none",
          cursor: isDisabled ? "not-allowed" : "default",
          "&:hover": {
            border: baseBorder,
          },
          margin: "1px",
        };
      },
      option: (
        styles: CSSObjectWithLabel,
        { isDisabled, isFocused }: OptionProps
      ) => ({
        ...styles,
        backgroundColor: isDisabled
          ? theme.backgroundColor
          : isFocused
          ? theme.secondaryBackgroundColor
          : theme.backgroundColor,
        color: isDisabled ? this.theme.fadedText40 : theme.textColor,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }),
    };
  }

  iconDropdown(menu: boolean, isDisabled: boolean = false) {

    const fillColor = isDisabled
      ? this.theme.fadedText40
      : this.theme.textColor;

    return (
      <div>
        <Dropdown
          width={24}
          height={24}
          fill={fillColor}
          style={{
            marginRight: "7px",
            marginBottom: "0px",
          }}
        />
      </div>
    );
  }

  getLabelStyle(disabled: boolean) {
    return {
      color: disabled ? this.theme.fadedText40 : this.theme.textColor, 
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "'Source Sans Pro', sans-serif",
      marginBottom: "0.25rem",
    };
  }

  clearIndicator(props: any) {
    const {
      innerProps: { ref, ...restInnerProps },
      selectProps,
    } = props;

    // Don't show clear icon if disabled
    if (selectProps.isDisabled) return null;

    return (
      <Clear
        {...restInnerProps}
        ref={ref}
        fill={this.theme.fadedText60}
        // streamlit has fixed icon sizes at 15x15
        width={36}
        height={22.5}
      />
    );
  }
}

export default FreeTextSelectStyle;