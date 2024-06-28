import React, { ReactNode } from "react";
import Select from "react-select";
import {
  ComponentProps,
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection
} from "streamlit-component-lib";
import FreeTextSelectStyle from "./styling";


interface State {
  isFocused: boolean
  extended: boolean;
  options: OptionType[];
  selectedOption: OptionType | null;
  inputOption: String | null;
}


interface OptionType {
  label: String | null;
  value: String | null;
}


class FreeTextSelect extends StreamlitComponentBase<State> {
  private style = new FreeTextSelectStyle(this.props.theme!);

  constructor(props: ComponentProps) {
    super(props);
    const options = this.props.args.options.map((option: string) => {
      return { label: option, value: option };
    })
    this.state = {
      isFocused: false,
      extended: false,
      options: options,
      selectedOption: props.args.index ? options[props.args.index] : null,
      inputOption: null,
    }
    if (this.state.selectedOption) {
      console.log("updating component")
      this._updateComponent(this.state.selectedOption);
    }

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._updateComponent = this._updateComponent.bind(this);
    this._updateInputOption = this._updateInputOption.bind(this);
    this._debounce = this._debounce.bind(this);
  }

  public render = (): ReactNode => {
    const debouncedInputChange = this._debounce(this._handleInputChange, this.props.args.delay);

    return (
      <div style={this.style.wrapper}>
        {this.props.args.label_visibility !== "collapsed" && (
          <div style={{visibility: this.props.args.label_visibility}}>
            <label style={this.style.label}>
              {this.props.args.label}
            </label>
          </div>
        )}
        <Select
          id={this.props.args.key ? this.props.args.key : "free-text-selectbox"}
          value={this.state.selectedOption}
          placeholder={this.props.args.placeholder}
          options={this._getOptions()}
          styles={this.style.select}
          components={{
            ClearIndicator: (props) => this.style.clearIndicator(props),
            DropdownIndicator: () => this.style.iconDropdown(this.state.extended),
            IndicatorSeparator: () => <div></div>,
          }}
          onChange={(event: any) => { this._handleOnChange(event) }}
          onInputChange={
            (event: any, action: any) => {
              if (action.action === "input-change") {
                debouncedInputChange(event);
              }
            }
          }
          isClearable={true}
          isSearchable={true}
          onMenuOpen={() => this.setState({ extended: true })}
          onMenuClose={() => this.setState({ extended: false })}
          menuIsOpen={this.state.extended}
          isDisabled={this.props.args.disabled}
          //menuPortalTarget={document.body}
          menuPlacement="auto"
        />
      </div>
    );
  };

  private _getOptions(): OptionType[] {
    let options: OptionType[] = [...this.state.options];
    if (this.state.inputOption !== null) {
      options.unshift({ label: this.state.inputOption, value: this.state.inputOption });
    }
    return options;
  }

  private _handleOnChange(option: OptionType | null): void {
    if (option === null) {
      option = { label: null, value: null };
      this._updateInputOption(option);
      this.setState({ selectedOption: null });
      this._updateComponent(option)
    } else {
      this._updateComponent(option);
      this.setState({ selectedOption: option });
    }
  }

  private _handleInputChange(value: String): void {
    let option: OptionType = { label: value, value: value };
    this._updateComponent(option);
    this._updateInputOption(option);
    this.setState({ selectedOption: option });
  }

  private _updateComponent(option: OptionType): void {
    if (option.value === null || option.value === "" || option.value === undefined) {
      Streamlit.setComponentValue(null);
    } else {
      Streamlit.setComponentValue(option.value);
    }
  }

  private _updateInputOption(option: OptionType): void {
    if (option.value === null || option.value === "" || option.value === undefined) {
      this.setState({ inputOption: null });
    } else {
      this.setState({ inputOption: option.value });
    }
  }

  private _debounce(func: (...args: any[]) => void, timeout: number = 300) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  private _onFocus = (): void => {
    this.setState({ isFocused: true })
  }

  /** Blur handler for our "Click Me!" button. */
  private _onBlur = (): void => {
    this.setState({ isFocused: false })
  }
}


export default withStreamlitConnection(FreeTextSelect)
