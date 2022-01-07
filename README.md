# React Multi Search Select

A fully tested Typescript React component that shows a multi select searchable dropdown.

## Installation
```
yarn add react-multi-search-select
```
```
npm install react-multi-search-select
```
----

## Usage
```ts
import React, { FC, ReactElement } from 'react';
import { ReactMultiSearchSelect } from 'react-multi-search-select';
import "~react-multi-search-select/dist/index.css";

export const Component: FC = (): ReactElement => {
  const onChange = (selectedOptions: SelectedOption[]): void => {
    console.log(selectedOptions);
  };
  
  return (
    <>
      <ReactMultiSearchSelect options={["test", "test2", "test3"]} onChange={onChange} />

      <ReactMultiSearchSelect
        options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
        optionsObject={{key: "id", value: "name"}}
        onChange={onChange}
      />
    </>
  );
}

```

----

## Ref

React Multi Search Select has its own internal state. If you wish to update this internal state to match your own state,
you can pass through a ref and call the setOptions() function.

```ts
import React, { FC, ReactElement } from 'react';
import { ReactMultiSearchSelect } from 'react-multi-search-select';
import "~react-multi-search-select/dist/index.css";

export const Component: FC = (): ReactElement => {
  const ref = useRef<ReactMultiSearchSelectRef>();

  const clear = (): void => ref.current.setOptions([]);

  return (
    <>
      <button onClick={clear}>Clear All Options</button>
      <ReactMultiSearchSelect
        options={["test", "test2", "test3"]}
        defaultValues={["test", "test2", "test3"]}
        ref={ref}
      />
    </>
  );
}

```

----

## Props

| Prop  | Type  | Default | Description |
|:--------- | :---- | :----   |:----  |
| `options` | `array (string or key value pair)` | Required | Can either be an array of strings: `["test", "test2"]` or an array of objects: `[{ id: 1, name: "test}, { id: 2, name: "test2}]`|
| `defaultValues` | `number[] or string[]` | `null` | Default options when first loaded. This is either an array of strings or numbers that matches the key if using optionsObject|
| `optionsObject` | `object` | `null` | The key and value to show when using an array of objects for options. For example: `{key: "id", value: "name"}`|
| `onChange` | `function` | `null` | Function to call when the selected options are changed. Returns an array of either string or number defined by `key` if using `optionsObject`|
| `disabled` | `boolean` | `false` | Disables search input|
| `loading` | `boolean` | `false` | Disables search input and shows loading spinner|
| `selectionLimit` | `number` | `null` | The amount of selected options before the search input is disabled and no more can be selected|
| `placeholderText` | `string` | `Select` | Place holder text|
| `noOptionsText` | `string` | `There are no options` | No options text|
| `caseSensitiveSearch` | `boolean` | `false` | Sets if search is case sensitive|
| `ref` | `ReactMultiSearchSelectRef` | `null` | Allows calling some functions to update the internal state|

----

## Styling 

You can override each class as needed. The names are "name spaced" so that they do not affect any of your styling. These are all the classes and what they do:

| Class | Description|
|:--------- | :----|
| `react-multi-search-select-container` | Container for the whole component|
| `react-multi-search-select-search-wrapper` | Wrapper for the search input|
| `react-multi-search-select-loading` | Container for loading elements|
| `react-multi-search-select-loading > span` | Loading text|
| `react-multi-search-select-container input` | Search input|
| `react-multi-search-select-container input:focus` | Search input focus|
| `react-multi-search-select-selected-option` | Selected options next to the search input|
| `react-multi-search-select-selected-option:hover` | Selected options hover|
| `react-multi-search-select-options-container` | List for options to select|
| `react-multi-search-select-options-container.hide` | List when its inactive|
| `react-multi-search-select-options-container li` | Option to select|
| `react-multi-search-select-options-container li:not(.no-hover):hover` | No options text (for no hover effect)|

----

## Licence
MIT
