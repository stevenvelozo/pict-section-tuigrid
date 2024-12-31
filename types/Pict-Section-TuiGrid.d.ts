export = PictSectionTuiGrid;
/**
 * @typedef {typeof import('tui-grid').default} TuiGridClass
 * @typedef {import('tui-grid').default} TuiGrid
 */
declare class PictSectionTuiGrid extends libPictViewClass {
    constructor(pFable: any, pOptions: any, pServiceHash: any);
    /** @type {{ [key: string]: any }} */
    services: {
        [key: string]: any;
    };
    dateFormatter: any;
    initialRenderComplete: boolean;
    customFormatters: {};
    /** @type {TuiGridClass} */
    _tuiGridPrototype: TuiGridClass;
    /** @type {TuiGrid} */
    tuiGrid: TuiGrid;
    customHeaders: {
        CustomColumnHeaderNone: {
            new (): {
                Element: HTMLInputElement;
                getElement(): HTMLInputElement;
                render(): void;
            };
        };
    };
    customEditors: {
        EditorNumber: typeof import("./Pict-TuiGrid-Editor-Number");
        EditorText: typeof import("./Pict-TuiGrid-Editor-Text");
    };
    columnSchema: any;
    targetElementAddress: boolean;
    /** @type {Array<any>} */
    gridData: Array<any>;
    initializeCustomFormatters(): void;
    /**
     * Construct a tuiGrid instance and connect it to the browser's dom object for the grid.  If the
     * prototype is not passed in, try to find a window.tui (where the library puts itself) in the window
     * object.
     *
     * @param {TuiGridClass} [pTuiGridPrototype] - The TuiGrid prototype class expected to be loaded in the browser
     * @returns
     */
    connectTuiGridPrototype(pTuiGridPrototype?: TuiGridClass): boolean;
    /**
     * @typedef {Object} TUIGridCellChange
     * @property {any} rowKey - The key of the row that changed.
     * @property {string} columnName - The name of the column that changed.
     * @property {any} value - The "current" value of the cell. Slightly different meaning in preChangeHandler vs changeHandler (before / after the change is applied).
     * @property {any} [nextValue] - The value that the cell will have after the change. Only populated in preChangeHandler (not changeHandler).
     * @property {any} [prevValue] - The value that the cell had before the change. Only populated in changeHandler (not preChangeHandler).
     */
    /**
     * @typedef {Object} TUIGridChangeEvent
     * @property {TuiGrid} instance - The TuiGrid instance that fired the event.
     * @property {TUIGridCellChange[]} changes - An array of objects representing the changes to grid cell values.
     */
    /**
     * Interface method for handling changesets from the TuiGrid control. Invoked before the change has been applied to the affected cells.
     *
     * * The pre-change cell value is stored in value while the new cell value is stored in nextValue.
     * * Any changes made to nextValue in this method will be reflected in the grid for that cell.
     *
     * @param {TUIGridChangeEvent} pChangeData - An event containing an array of objects representing the changes to grid cell values.
     */
    preChangeHandler(pChangeData: {
        /**
         * - The TuiGrid instance that fired the event.
         */
        instance: TuiGrid;
        /**
         * - An array of objects representing the changes to grid cell values.
         */
        changes: {
            /**
             * - The key of the row that changed.
             */
            rowKey: any;
            /**
             * - The name of the column that changed.
             */
            columnName: string;
            /**
             * - The "current" value of the cell. Slightly different meaning in preChangeHandler vs changeHandler (before / after the change is applied).
             */
            value: any;
            /**
             * - The value that the cell will have after the change. Only populated in preChangeHandler (not changeHandler).
             */
            nextValue?: any;
            /**
             * - The value that the cell had before the change. Only populated in changeHandler (not preChangeHandler).
             */
            prevValue?: any;
        }[];
    }): void;
    /**
     * Interface method for handling changesets from the TuiGrid control. Invoked after the change has been applied to the affected cells.
     *
     * * Performs solver trigger for changes to any columns configured in "ColumnsToSolveOnChange" or with "PictTriggerSolveOnChange": true on a specific row.
     * * The previous cell value is stored in prevValue while the next cell value is stored in value.
     *
     * @param {TUIGridChangeEvent} pChangeData - An event object containing an array of objects representing the changes to grid cell values.
     */
    changeHandler(pChangeData: {
        /**
         * - The TuiGrid instance that fired the event.
         */
        instance: TuiGrid;
        /**
         * - An array of objects representing the changes to grid cell values.
         */
        changes: {
            /**
             * - The key of the row that changed.
             */
            rowKey: any;
            /**
             * - The name of the column that changed.
             */
            columnName: string;
            /**
             * - The "current" value of the cell. Slightly different meaning in preChangeHandler vs changeHandler (before / after the change is applied).
             */
            value: any;
            /**
             * - The value that the cell will have after the change. Only populated in preChangeHandler (not changeHandler).
             */
            nextValue?: any;
            /**
             * - The value that the cell had before the change. Only populated in changeHandler (not preChangeHandler).
             */
            prevValue?: any;
        }[];
    }): void;
    onAfterRender(): boolean;
    onAfterInitialRender(): boolean;
    targetElement: any;
    gridSettings: {
        data: any[];
        el: any;
        columns: any;
        usageStatistics: boolean;
        scrollY: any;
        columnOptions: {
            resizable: any;
        };
    };
    /**
     * This is expected to be overloaded with anything that needs to be added to the grid configuration
     * before the Toast UI Grid component is initialized in the browser.
     */
    customConfigureGridSettings(): void;
    /**
     * Lookup a specific record in the toast ui grid data set by value and pull the value from the map into the browser.
     *
     * This function exists because if we mutate data in the map of plain javascript records tuigrid
     * manages, it doesn't automatically refresh the UI.  From reading the TUIGrid documentation, this
     * is because they don't want to refresh until all the data has changed.
     *
     * The best practice has been to have a hidden column behind the tuigrid that maps the correct entity
     * value set to the record in the map (e.g. IDRecord in one column and Entity in another).
     *
     * @param {string} pCellColumnToBeSet - the Column hash to set
     * @param {string} pCellValueToSet - Value to be set
     * @param {string} pLookupValue - the Value to look up in tuigrid
     * @param {string} pLookupColumn - the key of the column in the tuigrid record (which are plain javascript objects defined by the tuigrid config)
     * @return {void}
     */
    SetGridValue(pCellColumnToBeSet: string, pCellValueToSet: string, pLookupValue: string, pLookupColumn: string): void;
    /**
     * Lookup a specific record in the toast ui grid data set by row key and pull in a column.
     *
     * This function exists because if we mutate data in the map of plain javascript records tuigrid
     * manages, it doesn't automatically refresh the UI.  From reading the TUIGrid documentation, this
     * is because they don't want to refresh until all the data has changed.
     *
     *
     * @param {string} pCellColumnToBeSet - the Column hash to set
     * @param {string} pCellValueToSet - Value to be set
     * @param {string} pRowKey - the key of the row to be set
     * @return {boolean}
     */
    SetGridValueByRowKey(pCellColumnToBeSet: string, pCellValueToSet: string, pRowKey: string): boolean;
}
declare namespace PictSectionTuiGrid {
    export { default_configuration, TuiGridClass, TuiGrid };
}
import libPictViewClass = require("pict-view");
declare const default_configuration: {
    RenderOnLoad: boolean;
    GridWidth: string;
    GridRowHeight: number;
    GridBodyHeight: string;
    GridBodyMinHeight: number;
    GridColumnMinWidth: number;
    GridColumnWidthResizable: boolean;
    GridColumnHeightResizable: boolean;
    GridColumnFrozenCount: number;
    GridColumnFrozenBorderWidth: number;
    GridScrollX: boolean;
    GridScrollY: boolean;
    GridShowDummyRows: boolean;
    GridDraggableRows: boolean;
    GridSelectionUnit: string;
    DefaultRenderable: string;
    DefaultDestinationAddress: string;
    Templates: {
        Hash: string;
        Template: string;
    }[];
    Renderables: {
        RenderableHash: string;
        TemplateHash: string;
        DestinationAddress: string;
    }[];
    TargetElementAddress: string;
    GridDataAddress: boolean;
    GridData: {
        idrecord: number;
        entity: string;
        name: string;
        description: string;
    }[];
    ColumnsToSolveOnChange: {};
    TuiColumnSchema: ({
        header: string;
        name: string;
        PictTriggerSolveOnChange: boolean;
        editor?: undefined;
    } | {
        header: string;
        name: string;
        editor: string;
        PictTriggerSolveOnChange?: undefined;
    })[];
};
type TuiGridClass = typeof import("tui-grid").default;
type TuiGrid = import("tui-grid").default;
//# sourceMappingURL=Pict-Section-TuiGrid.d.ts.map