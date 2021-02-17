import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect, useImperativeHandle,
  useState
} from "react";
import "./style.css";

export type Option = string | { [key: string]: any };

export type SelectedOption = string | number;

interface Props {
  options: Option[];
  defaultValues?: SelectedOption[];
  optionsObject?: { key: string; value: string };
  onChange?: (selectedOptions: SelectedOption[]) => void;
  disabled?: boolean;
  loading?: boolean;
  selectionLimit?: number;
  placeholderText?: string;
  noOptionsText?: string;
  caseSensitiveSearch?: boolean;
}

export interface ReactMultiSearchSelectRef {
  setOptions: (options: SelectedOption[]) => void;
}

export const ReactMultiSearchSelect = forwardRef<ReactMultiSearchSelectRef, Props>((props: Props, ref: ForwardedRef<ReactMultiSearchSelectRef>): ReactElement => {
  const [showOptions, setShowOptions] = useState<boolean>();
  const [search, setSearch] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(props.defaultValues || []);

  useEffect((): void => props.onChange && props.onChange(selectedOptions), [selectedOptions]);

  useImperativeHandle(ref, (): { setOptions: (options: SelectedOption[]) => void; } => ({
    setOptions: (options: SelectedOption[]): void => setSelectedOptions(options)
  }));

  const getOption = (option: Option, index = "value"): SelectedOption => {
    return props.optionsObject ? option[props.optionsObject[index]] : option;
  };

  const toggleOptions = (): void => setShowOptions(!showOptions);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => setSearch(event.target.value);

  const selectOption = (option: Option): void => {
    setSelectedOptions([...selectedOptions, getOption(option, "key")]);
    setSearch("");
  };

  const removeOption = (value: SelectedOption): void => {
    setSelectedOptions(selectedOptions.filter((option: SelectedOption) => option !== value));
  };

  const filter = (option: Option): boolean => {
    const key = getOption(option, "key");
    const value = getOption(option);

    if (props.caseSensitiveSearch) {
      return !selectedOptions.includes(key) && value.toString().includes(search);
    }

    return !selectedOptions.includes(key) && value.toString().toLowerCase().includes(search.toLowerCase());
  };

  const renderLoading = (): ReactNode => {
    return (
      <div className="react-multi-search-select-loading">
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
    return selectedOptions.map((selectedOption: SelectedOption, index: number) => {
      const option = props.optionsObject ?
        props.options.find((option: Option) => option[props.optionsObject.key] === selectedOption)[props.optionsObject.value] :
        selectedOption;

      return (
        <button key={index} className="react-multi-search-select-selected-option" onClick={() => removeOption(selectedOption)}>
          {option}
        </button>
      );
    });
  };

  const renderOptions = (): ReactNode => {
    const options: Option[] = props.options.filter(filter);

    return (
      <ul className={"react-multi-search-select-options-container" + (showOptions ? "" : " hide")}>
        {options.length === 0 && <li className="no-hover">{props.noOptionsText || "There are no options"}</li>}

        {options.map((option: Option, index: number) => (
          <li key={"option-" + index} onClick={() => selectOption(option)}>
            {getOption(option)}
          </li>
        ))}
      </ul>
    );
  };

  const selectionLimitReached: boolean = selectedOptions.length >= props.selectionLimit;

  return (
    <div className="react-multi-search-select-container">
      <div className="react-multi-search-select-search-wrapper">
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

      {renderOptions()}
    </div>
  );
});
