import React, {
  ChangeEvent,
  KeyboardEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect, useImperativeHandle,
  useState
} from "react";
import "./style.css";

export type Option = string | number | { [key: string]: any };

export type SelectedOption = string | number;

export interface ReactMultiSearchSelectRef {
  setOptions: (options: SelectedOption[]) => void;
}

interface Props {
  options: Option[];
  defaultValues?: SelectedOption[];
  optionsObject?: { key: string; value: string };
  disabled?: boolean;
  loading?: boolean;
  selectionLimit?: number;
  placeholderText?: string;
  noOptionsText?: string;
  caseSensitiveSearch?: boolean;
  onChange?: (selectedOptions: SelectedOption[]) => void;
}

export const ReactMultiSearchSelect = forwardRef<ReactMultiSearchSelectRef, Props>((props: Props, ref: ForwardedRef<ReactMultiSearchSelectRef>): ReactElement => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(props.defaultValues || []);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect((): void => {
    props.onChange && props.onChange(selectedOptions);

    selectedOptions.length >= props.selectionLimit && setShowOptions(false);
  }, [selectedOptions]);

  useEffect((): void => !showOptions && setCurrentIndex(-1), [showOptions]);

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
    setSelectedOptions(selectedOptions.filter((option: SelectedOption): boolean => option !== value));
  };


  const filter = (option: Option): boolean => {
    const key = getOption(option, "key");
    const value = getOption(option);

    if (props.caseSensitiveSearch) {
      return !selectedOptions.includes(key) && value.toString().includes(search);
    }

    return !selectedOptions.includes(key) && value.toString().toLowerCase().includes(search.toLowerCase());
  };

  const options: Option[] = props.options.filter(filter);
  const selectedIndex = currentIndex > options.length - 1 ? 0 : currentIndex;

  const handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "ArrowUp":
        setCurrentIndex(selectedIndex < 1 ? 0 : currentIndex - 1);
        break;
      case "ArrowDown":
        setCurrentIndex(options.length - 1 === currentIndex ? currentIndex : selectedIndex + 1);
        break;
      case "Enter":
        currentIndex > -1 && selectOption(options[selectedIndex]);
        break;
      case "Backspace":
        if (selectedOptions.length > 0 && search === "") {
          removeOption(selectedOptions[selectedOptions.length - 1]);
        }
        break;
    }
  };

  const renderLoading = (): ReactNode => (
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

  const getSelectedOptions = (): SelectedOption[] => {
    return selectedOptions.filter((selectedOption: SelectedOption): boolean => {
      if (props.optionsObject) {
        return props.options.findIndex((option: Option) => option[props.optionsObject.key] === selectedOption) > -1;
      }

      return props.options.includes(selectedOption);
    });
  }

  const renderSelectedOptions = (): ReactNode => {
    return getSelectedOptions().map((selectedOption: SelectedOption, index: number): ReactNode => {
      const option = props.optionsObject ?
        props.options.find((option: Option) => option[props.optionsObject.key] === selectedOption)[props.optionsObject.value] :
        selectedOption;

      return (
        <button key={index} type="button" className="react-multi-search-select-selected-option" onClick={(): void => removeOption(selectedOption)}>
          {option}
        </button>
      );
    });
  };

  const renderOptions = (): ReactNode => (
    <ul className={"react-multi-search-select-options-container" + (showOptions ? "" : " hide")}>
      {options.length === 0 && <li className="no-hover">{props.noOptionsText || "There are no options"}</li>}

      {options.map((option: Option, index: number): ReactNode => (
        <li key={"option-" + index} className={selectedIndex === index ? "active" : ""} onClick={(): void => selectOption(option)}>
          {getOption(option)}
        </li>
      ))}
    </ul>
  );

  const selectionLimitReached: boolean = selectedOptions.length >= props.selectionLimit;

  return (
    <div className="react-multi-search-select-container">
      <div className="react-multi-search-select-search-wrapper">
        {props.loading && renderLoading()}

        {renderSelectedOptions()}

        {!props.loading && !selectionLimitReached && <input
          type="text"
          className="searchBox"
          value={search}
          placeholder={props.placeholderText || "Select"}
          autoComplete="off"
          disabled={props.disabled}
          onFocus={toggleOptions}
          onBlur={(): void => void setTimeout(toggleOptions, 200)}
          onKeyDown={handleKeyDown}
          onChange={handleSearch}
        />}
      </div>

      {renderOptions()}
    </div>
  );
});
