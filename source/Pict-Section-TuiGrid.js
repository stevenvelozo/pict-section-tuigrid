const libPictViewClass = require('pict-view');

class PictSectionTuiGrid extends libPictViewClass
{
	constructor(pFable, pOptions, pServiceHash)
	{
		let tmpOptions = Object.assign({}, require('./Pict-Section-TuiGrid-DefaultConfiguration.json'), pOptions);

		super(pFable, tmpOptions, pServiceHash);

		this._tuiGridPrototype = false;

		this.tuiGrid = false;
	}

	// Overload the connectTuiGrid() function to use the inline version of the TuiGrid
	connectTuiGridPrototype(pTuiGridPrototype)
	{
		if (typeof (pTuiGridPrototype) != undefined)
		{
			this._tuiGridPrototype = pTuiGridPrototype;
		}
		else
		{
			this.log.trace(`PICT-TuiGrid No TuiGrid Prototype defined or explicitly set; looking for it in the window object.`);
			if (typeof (window) != 'undefined')
			{
				if (typeof (window.tuiGrid) != 'undefined')
				{
					this.log.trace(`PICT-TuiGrid Found TuiGrid Prototype in window.tuiGrid.`);
					this.connectTuiGridPrototype(window.tuiGrid);
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
			}
			else
			{
				this.options.GridData = JSON.parse(JSON.stringify(tmpAddressedData));
			}
		}

		let tmpTargetElement = this.defaultServices.ContentAssignment.getElement(this.options.TargetElementAddress);

		// Setup the solver
		for (let i = 0; i < this.options.TuiColumnSchema.length; i++)
		{
			let tmpColumn = this.options.TuiColumnSchema[i];
			if (tmpColumn.PictTriggerSolveOnChange)
			{
				this.options.ColumnsToSolveOnChange[tmpColumn.name] = tmpColumn;
			}
		}

		if (!this._tuiGridPrototype)
		{
			this.log.warn(`TuiGrid Prototype not defined; cannot initialize TuiGrid at ${this.options.TargetElementAddress}.`)
		}
		else
		{
			let libTuiGrid = this._tuiGridPrototype;
			this.tuiGrid = new libTuiGrid(
				{
					el: tmpTargetElement,
					usageStatistics: false,
					scrollY: false,
					columns: this.options.TuiColumnSchema,
					data: this.options.GridData,
					columnOptions:
					{
						resizable: true
					}
				});
			this.tuiGrid.on('afterChange', (pChangeData) => { this.changeHandler(pChangeData); });
		}
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

// Custom column header classes
module.exports.CustomColumnHeaderNone = require('./Pict-Section-TuiGrid-CustomHeaderNone.js');

// Custom editor classes
module.exports.CustomEditorNumber = require('./Pict-Section-TuiGrid-CustomNumberEditor.js');

// Custom formatting functions
module.exports.FormatterTwoDigitNumber = require('./Pict-TuiGrid-Formatters.js').FormatterTwoDigitNumber;
module.exports.FormatterCurrencyNumber = require('./Pict-TuiGrid-Formatters.js').FormatterCurrencyNumber;

module.exports.default_configuration = require('./Pict-Section-TuiGrid-DefaultConfiguration.json');