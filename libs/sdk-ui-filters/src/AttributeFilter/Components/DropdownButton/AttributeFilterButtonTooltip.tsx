// (C) 2023 GoodData Corporation

import React from "react";
import { Bubble, BubbleHoverTrigger, IAlignPoint } from "@gooddata/sdk-ui-kit";

const bubbleAlignPoints: IAlignPoint[] = [{ align: "cr cl", offset: { x: 0, y: 50 } }];

/**
 * Tooltip details for the AttributeFilterDropdownButton.
 *
 * @remarks
 * It displays AttributeFilterDropdownButton tooltip details in the GoodData look and feel.
 * It displays the default title, custom title and data set title of the related attribute filter.
 *
 * @beta
 */
export const AttributeFilterButtonToolip: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <span className="gd-list-item-tooltip">
            <BubbleHoverTrigger>
                <span className="gd-icon-circle-question gd-list-item-tooltip-icon s-attribute-filter-tooltip-icon" />
                <Bubble
                    className="gd-attribute-filter-details s-attribute-filter-details-bubble"
                    alignPoints={bubbleAlignPoints}
                    arrowStyle={{ display: "none" }}
                >
                    {children}
                </Bubble>
            </BubbleHoverTrigger>
        </span>
    );
};
