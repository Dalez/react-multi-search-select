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
import React, { ReactElement } from 'react';
import { ReactMultiSelect } from 'react-multi-search-select';

export const Component = (): ReactElement => {
  const onChange = (options: Option[]): void => {
    console.log(options);
  };
  
  return (
    <>
      <ReactMultiSelect options={["test", "test2", "test3"]} onChange={onChange} />

      <ReactMultiSelect
        options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
        optionKey="name"
        onChange={onChange}
      />
    </>
  );
}

```

----

## Props

| Prop  | Type  | Default | Description |
|:--------- | :---- | :----   |:----  |
| `options` | `array (string or key value pair)` | Required | Can either be an array of strings: `["test", "test2"]` or an array of objects: `[{ id: 1, name: "test}, { id: 2, name: "test2}]`
| `optionKey` | `string` | `null` | The value to show when using a key value pair for the options
| `onChange` | `function` | `null` | Function to call when the selected options are changed
| `disabled` | `boolean` | `false` | Disables search input
| `loading` | `boolean` | `false` | Disables search input and shows loading spinner
| `selectionLimit` | `number` | `null` | The amount of selected options before the search input is disabled and no more can be selected
| `placeholderText` | `string` | `Select` | Place holder text
| `noOptionsText` | `string` | `There are no options` | No options text
| `caseSensitiveSearch` | `boolean` | `false` | Sets if search is case sensitive

----

## Styling 

You can override each class as needed. The names are "name spaced" so that they do not affect any of your styling. These are all the classes and what they do:

| Class | Description
|:--------- | :----
| `react-multi-search-select-container` | Container for the whole component
| `react-multi-search-select-search-wrapper` | Wrapper for the search input
| `react-multi-search-select-loading` | Container for loading elements
| `react-multi-search-select-loading > span` | Loading text
| `react-multi-search-select-container input` | Search input
| `react-multi-search-select-container input:focus` | Search input focus
| `react-multi-search-select-selected-option` | Selected options next to the search input
| `react-multi-search-select-selected-option:hover` | Selected options hover
| `react-multi-search-select-options-container` | Container for options to select
| `react-multi-search-select-options-container.active` | Container when its active (showing)
| `react-multi-search-select-options-container ul` | List for options to select
| `react-multi-search-select-options-container li` | Option to select
| `react-multi-search-select-options-container li:not(.no-hover):hover` | No options text (for no hover effect)

----

## Licence
MIT
