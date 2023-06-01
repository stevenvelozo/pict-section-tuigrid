const libPictViewClass = require('pict-view');

class PictSectionTuiGrid extends libPictViewClass
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, require('./Pict-Section-TuiGrid-DefaultConfiguration.json'), pOptions);

		super(pFable, tmpOptions, pServiceHash);

		this._tuiGridPrototype = false;

		this.tuiGrid = false;

		this.customHeaders = require('./Pict-TuiGrid-Headers.js');
		this.customEditors = require('./Pict-TuiGrid-Editors.js');
		this.customFormatters = require('./Pict-TuiGrid-Formatters.js');

		this.columnSchema = false;
		this.targetElementAddress = false;
		this.gridData = false;
	}

	// Overload the connectTuiGrid() function to use the inline version of the TuiGrid
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

	changeHandler(pChangeData)
	{
		let tmpSolverNecessary = false;

		for (let i = 0; i < pChangeData.changes.length; i++)
		{
			let tmpEntity = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'entity');
			let tmpIDRecord = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'idrecord');

			this.log.trace(`Generic Change Handler for TuiGrid Fired, Entity ${tmpEntity} IDRecord ${tmpIDRecord} setting Column [${pChangeData.changes[i].value}] to new Value [${pChangeData.changes[i].value}]`);

			//if (pChangeData.changes[i].columnName == 'some_important_column')
			//{
			//if (pChangeData.changes[i].value > some_important_threshold)
			//{
			// Do something
			//}
			//}
			if (this.options.ColumnsToSolveOnChange.hasOwnProperty(pChangeData.changes[i].columnName))
			{
				tmpSolverNecessary = true;
			}
		}

		if (tmpSolverNecessary)
		{
			this.defaultServices.PictApplication.solve();
		}
	}

	postInitialRenderInitialize()
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
				this.log.error(`Address for GridData [${this.options.GridDataAddress}] did not return an object; it was a ${typeof(tmpAddressedData)}.`);
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

		this.targetElement = this.defaultServices.ContentAssignment.getElement(this.options.TargetElementAddress);

		// TODO: Guard on element not matching?  What's best pattern when this isn't always interactive.
		if (this.targetElement.length < 1)
		{
			this.log.error(`Could not find target element [${this.options.TargetElementAddress}] for TuiGrid!  Rendering won't function properly.`);
			this.targetElement = false;
			return false;
		}
		else
		{
			// If it matches more than one element, it's still going to write to the first.  What do you expect!
			this.targetElement = this.targetElement[0];
		}

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
			// Look to see if there is an internal editor that matches the type
			if ((tmpColumn.hasOwnProperty('editor')) && (tmpColumn.editor.hasOwnProperty('type')) && (this.customEditors.hasOwnProperty(tmpColumn.editor.type)))
			{
				// Assign our special editor to the column.
				tmpColumn.editor.type = this.customEditors[tmpColumn.editor.type];
			}
		}

		let libTuiGrid = this._tuiGridPrototype;
		this.tuiGrid = new libTuiGrid(
			{
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
			});
		this.tuiGrid.on('afterChange', ( pChangeData ) => { this.changeHandler(pChangeData); });
	}

	SetGridValue(pCellColumnToBeSet, pCellValueToSet, pLookupValue, pLookupColumn)
	{
		if (typeof (pLookupValue) == 'undefined')
		{
			console.log(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by [${pLookupColumn}]::[${pLookupValue}].  No valid lookup value!`);
			return false;
		}

		if (this.tuiGrid)
		{
			let tmpData = this.tuiGrid.getData();

			for (let i = 0; i < tmpData.length; i++)
			{
				let tmpRecord = tmpData[i];

				if (tmpRecord[pLookupColumn] == pLookupValue)
				{
					this.tuiGrid.setValue(i, pCellColumnToBeSet, pCellValueToSet);
				}
			}
		}
		else
		{
			this.log.warn(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by [${pLookupColumn}]::[${pLookupValue}].  No valid grid!`);
		}
	}

	SetGridValueByRowKey(pCellColumnToBeSet, pCellValueToSet, pRowKey)
	{
		if (typeof (pRowKey) == 'undefined')
		{
			this.log.error(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by row key [${pRowKey}].  No valid row key!`);
			return false;
		}


		if (this.tuiGrid)
		{
			this.tuiGrid.setValue(pRowKey, pCellColumnToBeSet, pCellValueToSet);
		}
		else
		{
			this.log.warn(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by [${pLookupColumn}]::[${pLookupValue}].  No valid grid!`);
		}
	}
}

module.exports = PictSectionTuiGrid;

module.exports.default_configuration = require('./Pict-Section-TuiGrid-DefaultConfiguration.json');