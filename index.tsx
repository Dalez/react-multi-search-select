import React, { ReactElement, useRef } from 'react';
import { createRoot } from "react-dom/client";
import { ReactMultiSearchSelect, ReactMultiSearchSelectRef } from "./src";

createRoot(document.getElementById("object-anchor") as HTMLElement).render(
    <ReactMultiSearchSelect
        options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
        optionsObject={{key: "id", value: "name"}}
    />
);

createRoot(document.getElementById("string-anchor") as HTMLElement).render(
    <ReactMultiSearchSelect options={["test", "test2", "test3"]} />
);

createRoot(document.getElementById("default-object-values-anchor") as HTMLElement).render(
    <ReactMultiSearchSelect
        options={[{id: 1, name: "test"}, {id: 2, name: "test2"}, {id: 3, name: "test3"}]}
        optionsObject={{key: "id", value: "name"}}
        defaultValues={[1]}
    />
);

createRoot(document.getElementById("default-object-values-anchor-not-in-options") as HTMLElement).render(
    <ReactMultiSearchSelect
        options={[{id: 2, name: "test2"}, {id: 3, name: "test3"}]}
        optionsObject={{key: "id", value: "name"}}
        defaultValues={[1]}
    />
);

createRoot(document.getElementById("default-string-values-anchor") as HTMLElement).render(
    <ReactMultiSearchSelect options={["test", "test2", "test3"]} defaultValues={["test"]} />
);

createRoot(document.getElementById("default-string-values-anchor-not-in-options") as HTMLElement).render(
    <ReactMultiSearchSelect options={["test2", "test3"]} defaultValues={["test"]} />
);

const Ref = (): ReactElement => {
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
};

createRoot(document.getElementById("ref-anchor") as HTMLElement).render(
    <Ref />
);
