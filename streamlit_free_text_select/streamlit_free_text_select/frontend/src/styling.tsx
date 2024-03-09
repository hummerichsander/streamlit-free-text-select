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
// Adapted to latest streamlit-1.32.0 style

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

    this.label = {
      color: theme.textColor,
      fontSize: "12px",
      fontWeight: 400,
      font: theme.font,
      marginBottom: "0.25rem",
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
      //
      singleValue: (styles: any) => ({
        ...styles,
        color: theme.textColor,
      }),
      placeholder: (styles: any) => ({
        ...styles,
        color: theme.fadedText60,
      }),
      control: (styles: CSSObjectWithLabel, { isFocused }: ControlProps) => {
        return {
          ...styles,
          borderRadius: "0.5rem",
          backgroundColor: theme.secondaryBackgroundColor,
          color: theme.secondaryBackgroundColor,
          border: !isFocused
            ? "1px transparent"
            : "1px solid " + theme.primaryColor,
          boxShadow: "none",
          "&:hover": {
            border: !isFocused
              ? "1px transparent"
              : "1px solid " + theme.primaryColor,
          },
          margin: "1px",
        };
      },
      option: (
        styles: CSSObjectWithLabel,
        { isDisabled, isFocused, isSelected }: OptionProps
      ) => {
        return {
          ...styles,
          backgroundColor: isDisabled ? undefined
            : isFocused ? theme.secondaryBackgroundColor : theme.backgroundColor,
          color: theme.textColor,
          cursor: isDisabled ? "not-allowed" : "Search ...",
        };
      },
    };
  }

  iconDropdown(menu: boolean) {
    return (
      <div>
        <Dropdown
          width={24}
          height={24}
          fill={this.theme.textColor}
          style={{
            marginRight: "7px",
            marginBottom: "0px",
          }}
        />
      </div>
    );
  }

  clearIndicator(props: any) {
    const {
      innerProps: { ref, ...restInnerProps },
    } = props;

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