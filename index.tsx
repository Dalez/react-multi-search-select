import React from 'react';
import ReactDOM from 'react-dom';
import {ReactMultiSearchSelect, SelectedOption} from "./src";

ReactDOM.render(
  <ReactMultiSearchSelect
    options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
    optionsObject={{key: "id", value: "name"}}
  />,
  document.getElementById("object-anchor")
);

ReactDOM.render(
  <ReactMultiSearchSelect options={["test", "test2", "test3"]} />,
  document.getElementById("string-anchor")
);

ReactDOM.render(
  <ReactMultiSearchSelect
    options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
    optionsObject={{key: "id", value: "name"}}
    defaultValues={[1]}
  />,
  document.getElementById("default-object-values-anchor")
);

ReactDOM.render(
  <ReactMultiSearchSelect options={["test", "test2", "test3"]} defaultValues={["test"]} />,
  document.getElementById("default-string-values-anchor")
);
