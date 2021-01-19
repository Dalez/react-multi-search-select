import { ReactElement } from "react";
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
export declare const ReactMultiSearchSelect: (props: Props) => ReactElement;
export {};
