// (C) 2007-2023 GoodData Corporation
import cx from "classnames";
import { colors2Object, ISeparators, numberFormat } from "@gooddata/numberjs";
import { DataValue } from "@gooddata/sdk-model";
import { CellStyle } from "@ag-grid-community/all-modules";

export interface ITableCellStyle {
    backgroundColor?: string;
    color?: string;
    fontWeight?: React.CSSProperties["fontWeight"];
}

// TODO: see if we can use existing / common function for this
function getFormattedNumber(value: DataValue, format: string, separators: ISeparators | undefined): string {
    const parsedNumber: string | number =
        value === null ? "" : typeof value === "string" ? parseFloat(value) : value;

    return numberFormat(parsedNumber, format, undefined, separators);
}

// TODO: move to cell class; refactor tests
export function getCellClassNames(rowIndex: number, columnIndex: number, isDrillable: boolean): string {
    return cx(
        {
            "gd-cell-drillable": isDrillable,
        },
        "gd-cell",
        `s-cell-${rowIndex}-${columnIndex}`,
        "s-table-cell",
    );
}

export function getMeasureCellFormattedValue(
    value: DataValue,
    format: string,
    separators: ISeparators | undefined,
): string {
    const formattedNumber = getFormattedNumber(value, format, separators);
    const { label } = colors2Object(formattedNumber);

    return label === "" ? "–" : label;
}

export function getMeasureCellStyle(
    value: DataValue,
    format: string,
    separators: ISeparators | undefined,
    applyColor: boolean,
): CellStyle {
    const formattedNumber = getFormattedNumber(value, format, separators);
    const { backgroundColor, color, label } = colors2Object(formattedNumber);
    const measureCellDefault = {
        textAlign: "right",
    };

    if (label === "") {
        return {
            ...measureCellDefault,
            color: "var(--gd-table-nullValueColor, var(--gd-palette-complementary-6, #94a1ad))",
            fontWeight: "bold",
        };
    }

    if (!applyColor) {
        return {
            ...measureCellDefault,
        };
    }

    return {
        ...measureCellDefault,
        ...(color && { color }),
        ...(backgroundColor && { backgroundColor }),
    };
}
