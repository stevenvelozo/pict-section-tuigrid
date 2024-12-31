const libPictViewClass = require('pict-view');

/**
 * @typedef {typeof import('tui-grid').default} TuiGridClass
 * @typedef {import('tui-grid').default} TuiGrid
 */

class PictSectionTuiGrid extends libPictViewClass
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, require('./Pict-Section-TuiGrid-DefaultConfiguration.json'), pOptions);

		super(pFable, tmpOptions, pServiceHash);

		/** @type {{ [key: string]: any }} */
		this.services;
		this.dateFormatter = this.fable.instantiateServiceProviderWithoutRegistration('Dates');

		this.initialRenderComplete = false;

		this.customFormatters = {};
	}

	onBeforeInitialize()
	{
		super.onBeforeInitialize();

		/** @type {TuiGridClass} */
		this._tuiGridPrototype = null;

		/** @type {TuiGrid} */
		this.tuiGrid = null;

		this.customHeaders = require('./Pict-TuiGrid-Headers.js');
		this.customEditors = require('./Pict-TuiGrid-Editors.js');
		this.initializeCustomFormatters();

		this.columnSchema = false;
		this.targetElementAddress = false;
		/** @type {Array<any>} */
		this.gridData = null;

		return super.onBeforeInitialize();
	}

	initializeCustomFormatters()
	{
		this.customFormatters.FormatterTwoDigitNumber = (pCell) =>
			{
				let tmpCellValue = Number.parseFloat(pCell.value);
				let tmpPrecision = pCell?.decimalPrecision ?? 2;
				if (isNaN(tmpCellValue))
				{
					return '';
				}
				else
				{
					return this.fable.Math.roundPrecise(pCell.value, tmpPrecision);
				}
			};
		this.customFormatters.FormatterCurrencyNumber = (pCell) =>
			{
				let tmpPrecision = pCell?.decimalPrecision ?? 2;
				let tmpCellValue = this.fable.DataFormat.formatterDollars(pCell.value, tmpPrecision);
				return tmpCellValue;
			};

		this.customFormatters.FormatterRoundedNumber = (pCell) =>
			{
				let tmpCellValue = Number.parseFloat(pCell.value);
				let tmpPrecision = pCell?.decimalPrecision ?? 2;
				if (isNaN(tmpCellValue))
				{
					return '';
				}
				else
				{
					return this.fable.Math.roundPrecise(pCell.value, tmpPrecision);
				}
			};

		this.customFormatters.FormatterDate = (pCell) =>
			{
				let tmpDate = this.fable.Dates.dayJS.utc(pCell.value);
				if (pCell.dateformat)
				{
					return tmpDate.format(pCell.dateformat);
				}
				else
				{
					return tmpDate.format();
				}
			};
	}

	/**
	 * Construct a tuiGrid instance and connect it to the browser's dom object for the grid.  If the
	 * prototype is not passed in, try to find a window.tui (where the library puts itself) in the window
	 * object.
	 *
	 * @param {TuiGridClass} [pTuiGridPrototype] - The TuiGrid prototype class expected to be loaded in the browser
	 * @returns
	 */
	connectTuiGridPrototype(pTuiGridPrototype)
	{
		if (typeof (pTuiGridPrototype) != 'undefined')
		{
			this._tuiGridPrototype = pTuiGridPrototype;
		}
		else
		{
			this.log.trace(`PICT-TuiGrid No TuiGrid Prototype defined or explicitly set; looking for it in the window object.`);
			if (typeof (window) != 'undefined')
			{
				if ((typeof (window.tui) != 'undefined') && (typeof (window.tui.Grid) != 'undefined'))
				{
					this.log.trace(`PICT-TuiGrid Found TuiGrid Prototype in window.tuiGrid.`);
					this.connectTuiGridPrototype(window.tui.Grid);
				}
				else
				{
					this.log.error(`PICT-TuiGrid No TuiGrid Prototype found in window.tuiGrid.`);
					return false;
				}
			}
			else
			{
				this.log.error(`PICT-TuiGrid No TuiGrid Prototype found in window.tuiGrid -- window object unavailable.`);
				return false;
			}
		}
	}

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
	preChangeHandler(pChangeData)
	{
	}

	/**
	 * Interface method for handling changesets from the TuiGrid control. Invoked after the change has been applied to the affected cells.
	 *
	 * * Performs solver trigger for changes to any columns configured in "ColumnsToSolveOnChange" or with "PictTriggerSolveOnChange": true on a specific row.
	 * * The previous cell value is stored in prevValue while the next cell value is stored in value.
	 *
	 * @param {TUIGridChangeEvent} pChangeData - An event object containing an array of objects representing the changes to grid cell values.
	 */
	changeHandler(pChangeData)
	{
		let tmpSolverNecessary = false;

		for (let i = 0; i < pChangeData.changes.length; i++)
		{
			let tmpEntity = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'entity');
			let tmpIDRecord = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'idrecord');

			this.log.trace(`Generic Change Handler for TuiGrid Fired, Entity ${tmpEntity} IDRecord ${tmpIDRecord} setting Column [${pChangeData.changes[i].value}] to new Value [${pChangeData.changes[i].value}]`);

			if (this.options.ColumnsToSolveOnChange.hasOwnProperty(pChangeData.changes[i].columnName))
			{
				tmpSolverNecessary = true;
			}
		}

		if (tmpSolverNecessary)
		{
			this.services.PictApplication.solve();
		}
	}

	onAfterRender()
	{
		if (!this.initialRenderComplete)
		{
			this.onAfterInitialRender();
			this.initialRenderComplete = true;
		}
		return super.onAfterRender();
	}

	onAfterInitialRender()
	{
		// This is where we wire up and initialize the tuigrid control -- the initial render has put the placeholder content in place.
		// Check for a tuigrid prototype, and find it in the window object it if it doesn't exist
		if (!this._tuiGridPrototype)
		{
			this.connectTuiGridPrototype();
		}
		// This is where we wire up and initialize the tuigrid control
		if (this.tuiGrid)
		{
			// The grid is already initialized.
			this.log.error(`TuiGrid going to ${this.options.TargetElementAddress} is already initialized!`);
			return false;
		}

		if (this.options.GridDataAddress)
		{
			let tmpAddressedData = this.fable.manifest.getValueByHash(this.AppData, this.options.GridDataAddress);
			if (typeof (tmpAddressedData) != 'object')
			{
				this.log.error(`Address for GridData [${this.options.GridDataAddress}] did not return an object; it was a ${typeof (tmpAddressedData)}.`);
				this.gridData = [];
			}
			else
			{
				this.gridData = JSON.parse(JSON.stringify(tmpAddressedData));
			}
		}
		else
		{
			this.gridData = [];
		}

		let tmpTargetElementSet = this.services.ContentAssignment.getElement(this.options.TargetElementAddress);
		if (tmpTargetElementSet.length < 1)
		{
			this.log.error(`Could not find target element [${this.options.TargetElementAddress}] for TuiGrid!  Rendering won't function properly.`);
			this.targetElement = false;
			return false;
		}

		// Just go for the first one.
		this.targetElement = tmpTargetElementSet[0];

		// Check to see if there are any custom formatters.
		this.columnSchema = this.options.TuiColumnSchema;
		// Setup the solver and custom schema handlers.
		for (let i = 0; i < this.columnSchema.length; i++)
		{
			let tmpColumn = this.columnSchema[i];
			// If this bit is set on a column, the Form solver will trigger each time a change happens to that column.
			if (tmpColumn.PictTriggerSolveOnChange)
			{
				this.options.ColumnsToSolveOnChange[tmpColumn.name] = tmpColumn;
			}
			// Look to see if there is an internal formatter that matches the type
			if ((tmpColumn.hasOwnProperty('formatter')) && (this.customFormatters.hasOwnProperty(tmpColumn.formatter)))
			{
				// Assign our special formatter to the column.
				tmpColumn.formatter = this.customFormatters[tmpColumn.formatter];
			}
			// Look to see if there is an editor stanza
			if (tmpColumn.hasOwnProperty('editor'))
			{
				// Look to see if there is an internal editor that matches the type
				if ((tmpColumn.editor.hasOwnProperty('type'))
					&& (typeof (tmpColumn.editor.type) == 'string')
					&& (this.customEditors.hasOwnProperty(tmpColumn.editor.type)))
				{
					// Assign our special editor to the column.
					tmpColumn.editor.type = this.customEditors[tmpColumn.editor.type];
				}

				// Look to see if there is an internal editor that matches the type
				if ((tmpColumn.editor.hasOwnProperty('options'))
					&& (typeof (tmpColumn.editor.options) == 'object')
					&& (tmpColumn.editor.options.hasOwnProperty('listItems'))
					&& (typeof (tmpColumn.editor.options.listItems) == 'string'))
				{
					// Look for this address!  For the Record object, we will pass in the options.
					let tmpListItems = this.fable.manifest.getValueByHash({ AppData: this.AppData, Options: this.options }, tmpColumn.editor.options.listItems);
					if (typeof (tmpListItems) == 'object')
					{
						tmpColumn.editor.options.listItems = tmpListItems;
					}
					else
					{
						this.log.warn(`Pict TuiGrid for column [${tmpColumn.name}] had [${tmpColumn.editor.options.listItems}] as a listItems address, but it didn't return an object.  It was a [${typeof (tmpListItems)}].  Setting to empty list.`);
						tmpColumn.editor.options.listItems = [];
					}
				}
			}
		}

		this.gridSettings = {
				data: this.gridData,
				el: this.targetElement,
				columns: this.columnSchema,

				// This is no bueno, yo
				usageStatistics: false,

				scrollY: this.options.GridScrollY,

				columnOptions:
				{
					resizable: this.options.GridColumnWidthResizable
				}
			};

		this.customConfigureGridSettings();

		let libTuiGrid = this._tuiGridPrototype;
		this.tuiGrid = new libTuiGrid(this.gridSettings);
		this.tuiGrid.on('beforeChange', (pChangeData) =>
		{
			//TODO: the exported event type from tui-grid is incomplete so mask it here
			/** @type {any} */
			const tmpChangeData = pChangeData;
			this.preChangeHandler(tmpChangeData);
		});
		this.tuiGrid.on('afterChange', (pChangeData) =>
		{
			//TODO: the exported event type from tui-grid is incomplete so mask it here
			/** @type {any} */
			const tmpChangeData = pChangeData;
			this.changeHandler(tmpChangeData);
		});
	}

	/**
	 * This is expected to be overloaded with anything that needs to be added to the grid configuration
	 * before the Toast UI Grid component is initialized in the browser.
	 */
	customConfigureGridSettings ()
	{
		// This can be overloaded to tweak up the this.gridSettings
	}

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
	SetGridValue(pCellColumnToBeSet, pCellValueToSet, pLookupValue, pLookupColumn)
	{
		if (typeof (pLookupValue) == 'undefined')
		{
			console.log(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by [${pLookupColumn}]::[${pLookupValue}].  No valid lookup value!`);
			return;
		}

		if (!this.tuiGrid)
		{
			this.log.warn(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by [${pLookupColumn}]::[${pLookupValue}].  No valid grid!`);
			return;
		}

		const tmpData = this.tuiGrid.getData();

		for (let i = 0; i < tmpData.length; i++)
		{
			const tmpRecord = tmpData[i];

			if (tmpRecord[pLookupColumn] == pLookupValue)
			{
				this.tuiGrid.setValue(i, pCellColumnToBeSet, pCellValueToSet);
			}
		}
	}

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
	SetGridValueByRowKey(pCellColumnToBeSet, pCellValueToSet, pRowKey)
	{
		if (typeof (pRowKey) == 'undefined')
		{
			this.log.error(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by row key [${pRowKey}].  No valid row key!`);
			return false;
		}

		if (!this.tuiGrid)
		{
			this.log.warn(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by row key [${pRowKey}].  No valid grid!`);
			return false;
		}

		this.tuiGrid.setValue(pRowKey, pCellColumnToBeSet, pCellValueToSet);
		return true;
	}
}

module.exports = PictSectionTuiGrid;

module.exports.default_configuration = require('./Pict-Section-TuiGrid-DefaultConfiguration.json');
