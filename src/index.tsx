import React, {ChangeEvent, ReactElement, ReactNode, useEffect, useState} from "react";
import "./style.css";

export type Option = string | {[key: string]: any};

interface Props {
  options: Option[];
  optionKey?: string;
  onChange?: (selectedOptions: Option[]) => void;
  disabled?: boolean;
  loading?: boolean;
  selectionLimit?: number;
  placeholderText?: string;
  noOptionsText?: string;
  caseSensitiveSearch?: boolean;
}

export const ReactMultiSelect = (props: Props): ReactElement => {
  const [showOptions, setShowOptions] = useState<boolean>();
  const [search, setSearch] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  useEffect((): void => props.onChange && props.onChange(selectedOptions), [selectedOptions]);

  const toggleOptions = (): void => setShowOptions(!showOptions);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => setSearch(event.target.value);

  const selectOption = (value: Option): void => {
    setSelectedOptions([...selectedOptions, value]);
    setSearch("");
  }

  const removeOption = (value: Option): void => setSelectedOptions(selectedOptions.filter((option: Option) => option !== value));

  const filter = (option: Option): boolean => {
    const value = props.optionKey ? option[props.optionKey] : option;

    if (props.caseSensitiveSearch) {
      return !selectedOptions.includes(option) && value.toString().includes(search)
    }

    return !selectedOptions.includes(option) && value.toString().toLowerCase().includes(search.toLowerCase())
  };

  const renderLoading = (): ReactNode => {
    return (
      <div className="react-multi-select-loading">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 38 38" stroke="#fff">
          <g fill="none">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle cx="18" cy="18" r="18" strokeOpacity="0.5" />
              <path d="M36 18c0-9.9-8.1-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>

        <span>Loading...</span>
      </div>
    );
  };

  const renderSelectedOptions = (): ReactNode => {
    return selectedOptions.map((option: Option, index: number) => (
      <button key={index} className="react-multi-select-selected-option" onClick={() => removeOption(option)}>
        {props.optionKey ? option[props.optionKey] : option}
      </button>
    ));
  }

  const renderOptions = (): ReactNode => {
    const options: Option[] = props.options.filter(filter);

    return (
      <ul>
        {options.length === 0 && <li className="no-hover">{props.noOptionsText || "There are no options"}</li>}

        {options.map((option: Option, index: number) => (
          <li key={"option-" + index} onClick={() => selectOption(option)}>
            {props.optionKey ? option[props.optionKey] : option}
          </li>
        ))}
      </ul>
    );
  }

  const selectionLimitReached: boolean = selectedOptions.length >= props.selectionLimit;

  return (
    <div className="react-multi-select-container">
      <div className="react-multi-select-search-wrapper">
        {props.loading && renderLoading()}

        {renderSelectedOptions()}

        {!props.loading && !selectionLimitReached && <input
          type="text"
          className="searchBox"
          onChange={handleSearch}
          value={search}
          onFocus={toggleOptions}
          onBlur={() => setTimeout(toggleOptions, 200)}
          placeholder={props.placeholderText || "Select"}
          autoComplete="off"
          disabled={props.disabled}
        />}
      </div>

      <div className={"react-multi-select-options-container" + (showOptions ? " active" : "")} aria-hidden={!showOptions}>
        {renderOptions()}
      </div>
    </div>
  );
};
