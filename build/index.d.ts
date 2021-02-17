import React from "react";
import "../src/style.css";
export declare type Option = string | {
    [key: string]: any;
};
export declare type SelectedOption = string | number;
interface Props {
    options: Option[];
    defaultValues?: SelectedOption[];
    optionsObject?: {
        key: string;
        value: string;
    };
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
export declare const ReactMultiSearchSelect: React.ForwardRefExoticComponent<Props & React.RefAttributes<ReactMultiSearchSelectRef>>;
export {};
