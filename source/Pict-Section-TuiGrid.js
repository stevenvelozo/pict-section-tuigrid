const libPictViewClass = require('pict').PictViewClass
const libTuiGrid = require('tui-grid');

class PictSectionTuiGrid extends libPictViewClass
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.tuiGrid = false;
		if (this.AppData.Interactive)
		{
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
		// This is where we wire up and initialize the tuigrid control
		if (this.tuiGrid)
		{
			// The grid is already initialized.
			this.log.error(`TuiGrid going to ${this.options.TargetElementAddress} is already initialized!`);
			return false;
		}

		if (this.options.GridDataAddress)
		{
			let tmpAddressedData = this.manifest.getValueByHash(this.AppData, this.options.GridDataAddress);
			if (typeof(tmpAddressedData) != 'object')
			{
				this.log.error(`Address for GridData [${this.options.GridDataAddress}] did not return an object; it was a ${typeof(tmpAddressedData)}.`);
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
		this.tuiGrid.on('afterChange', ( pChangeData ) => { this.changeHandler(pChangeData); });
	}

	SetGridValue(pCellColumnToBeSet, pCellValueToSet, pLookupValue, pLookupColumn)
	{
		if (typeof (pLookupValue) == 'undefined')
		{
			console.log(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by [${pLookupColumn}]::[${pLookupValue}].  No valid lookup value!`);
			return false;
		}

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

	SetGridValueByRowKey(pCellColumnToBeSet, pCellValueToSet, pRowKey)
	{
		if (typeof (pRowKey) == 'undefined')
		{
			this.log.error(`Could not set grid value [${pCellColumnToBeSet}] = [${pCellValueToSet}] looked up by row key [${pRowKey}].  No valid row key!`);
			return false;
		}

		this.tuiGrid.setValue(pRowKey, pCellColumnToBeSet, pCellValueToSet);
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

module.exports.default_configuration = (
	{
		RenderOnLoad: true,

		DefaultRenderable: "TuiGrid-Wrap",
		DefaultDestinationAddress: "#TuiGrid-Container-Div",
		Templates: [
			{
				Hash: "TuiGrid-Container",
				Template: /*html*/`<!-- TuiGrid-Container Rendering Soon -->`
			}],
		Renderables: [
			{
				RenderableHash: "TuiGrid-Wrap",
				TemplateHash: "TuiGrid-Container",
				DestinationAddress: "#TuiGrid-Container-Div"
			}
		],

		TargetElementAddress: '#TuiGrid-Container-Div',

		GridDataAddress: false,
		GridData: [
			{ idrecord: 1, entity: 'SampleEntity', name: 'Record name 1', description: 'description 1' },
			{ idrecord: 2, entity: 'SampleEntity', name: 'Record name 2', description: 'description 2' },
			{ idrecord: 3, entity: 'SampleEntity', name: 'Record name 3', description: 'description 3' },
			{ idrecord: 4, entity: 'SampleEntity', name: 'Record name 4', description: 'description 4' },
			{ idrecord: 5, entity: 'SampleEntity', name: 'Record name 5', description: 'description 5' },
			{ idrecord: 6, entity: 'SampleEntity', name: 'Record name 6', description: 'description 6' },
			{ idrecord: 7, entity: 'SampleEntity', name: 'Record name 7', description: 'description 7' },
			{ idrecord: 8, entity: 'SampleEntity', name: 'Record name 8', description: 'description 8' },
			{ idrecord: 9, entity: 'SampleEntity', name: 'Record name 9', description: 'description 9' }
		],

		ColumnsToSolveOnChange: {},

		TuiColumnSchema: [
			{
				header: 'IDRecord',
				name: 'idrecord',
				PictTriggerSolveOnChange: true
			},
			{
				header: 'Entity',
				name: 'entity',
				PictTriggerSolveOnChange: true
			},
			{
				header: 'Name',
				name: 'name',
				editor: 'text'
			},
			{
				header: 'Description',
				name: 'description',
				editor: 'text'
			}
		]
	});