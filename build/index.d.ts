import { ReactElement } from "react";
import "./style.css";
export declare type Option = string | {
    [key: string]: any;
};
interface Props {
    options: Option[];
    optionKey?: string;
    onChange?: (selectedOptions: Option[]) => void;
    disabled?: boolean;
    loading?: boolean;
    selectionLimit?: number;
    placeholderText?: string;
    noOptionsText?: string;
    caseSensitiveSearch?: boolean;
}
export declare const ReactMultiSearchSelect: (props: Props) => ReactElement;
export {};
