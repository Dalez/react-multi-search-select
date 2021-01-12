import React from 'react';
import ReactDOM from 'react-dom';
import {ReactMultiSearchSelect} from "./src";

ReactDOM.render(
  <ReactMultiSearchSelect
    options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
    optionKey="name"
  />,
  document.getElementById("object-anchor")
);

ReactDOM.render(
  <ReactMultiSearchSelect options={["test", "test2", "test3"]} />,
  document.getElementById("string-anchor")
);
