import React from 'react';
import ReactDOM from 'react-dom';
import {ReactMultiSelect} from "./src";

ReactDOM.render(
  <ReactMultiSelect
    options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
    optionKey="name"
  />,
  document.getElementById("object-anchor")
);

ReactDOM.render(
  <ReactMultiSelect options={["test", "test2", "test3"]} />,
  document.getElementById("string-anchor")
);
