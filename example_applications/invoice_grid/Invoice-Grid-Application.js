/**
 * Invoice Grid Example
 *
 * Demonstrates overloading the data marshaling methods to do something fancy:
 *
 *  - preChangeHandler() intercepts edits before they're applied to clamp
 *    negative quantities to zero and round unit prices to two decimals.
 *
 *  - changeHandler() recomputes a "Line Total" column whenever Quantity or
 *    Unit Price changes, applies a discount percentage when line totals
 *    cross a threshold, and updates a running invoice total in the DOM
 *    outside the grid.
 *
 *  - initializeCustomFormatters() adds a custom "FormatterPercentage"
 *    formatter to display discount values with a percent sign.
 *
 *  - customConfigureGridSettings() injects row numbers and summary row
 *    configuration into the Toast UI Grid settings before instantiation.
 */
const libPictApplication = require('pict-application');
const libPictSectionTuiGrid = require('../../source/Pict-Section-TuiGrid.js');

// ---------------------------------------------------------------------------
//  Custom Grid View — overrides data marshaling for computed invoice columns
// ---------------------------------------------------------------------------
class InvoiceGridView extends libPictSectionTuiGrid
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	// -----------------------------------------------------------------------
	//  Add a custom percentage formatter alongside the built-in ones
	// -----------------------------------------------------------------------
	initializeCustomFormatters()
	{
		// Call the parent to register the standard formatters first
		super.initializeCustomFormatters();

		this.customFormatters.FormatterPercentage = (pCell) =>
		{
			let tmpValue = Number.parseFloat(pCell.value);
			if (isNaN(tmpValue))
			{
				return '';
			}
			return tmpValue.toFixed(1) + '%';
		};
	}

	// -----------------------------------------------------------------------
	//  Inject row numbers into the grid settings before TuiGrid instantiates
	// -----------------------------------------------------------------------
	customConfigureGridSettings()
	{
		this.gridSettings.rowHeaders = ['rowNum'];
	}

	// -----------------------------------------------------------------------
	//  Intercept edits BEFORE they hit the grid
	// -----------------------------------------------------------------------
	preChangeHandler(pChangeData)
	{
		for (let i = 0; i < pChangeData.changes.length; i++)
		{
			let tmpChange = pChangeData.changes[i];

			// Clamp negative quantities to zero
			if (tmpChange.columnName === 'quantity')
			{
				let tmpVal = Number.parseFloat(tmpChange.nextValue);
				if (!isNaN(tmpVal) && tmpVal < 0)
				{
					tmpChange.nextValue = 0;
				}
			}

			// Round unit prices to exactly two decimal places on input
			if (tmpChange.columnName === 'unitprice')
			{
				let tmpVal = Number.parseFloat(tmpChange.nextValue);
				if (!isNaN(tmpVal))
				{
					tmpChange.nextValue = Number.parseFloat(tmpVal.toFixed(2));
				}
			}
		}
	}

	// -----------------------------------------------------------------------
	//  After a cell is changed, recompute derived columns and the total
	// -----------------------------------------------------------------------
	changeHandler(pChangeData)
	{
		const DISCOUNT_THRESHOLD = 500;
		const DISCOUNT_RATE = 10;

		for (let i = 0; i < pChangeData.changes.length; i++)
		{
			let tmpChange = pChangeData.changes[i];

			// Recompute Line Total when Quantity or Unit Price changes
			if (tmpChange.columnName === 'quantity' || tmpChange.columnName === 'unitprice')
			{
				let tmpQty = Number.parseFloat(pChangeData.instance.getValue(tmpChange.rowKey, 'quantity')) || 0;
				let tmpPrice = Number.parseFloat(pChangeData.instance.getValue(tmpChange.rowKey, 'unitprice')) || 0;
				let tmpLineTotal = tmpQty * tmpPrice;

				// Apply automatic discount when the line total exceeds the threshold
				let tmpDiscount = 0;
				if (tmpLineTotal >= DISCOUNT_THRESHOLD)
				{
					tmpDiscount = DISCOUNT_RATE;
					tmpLineTotal = tmpLineTotal * (1 - (DISCOUNT_RATE / 100));
				}

				this.tuiGrid.setValue(tmpChange.rowKey, 'discount', tmpDiscount);
				this.tuiGrid.setValue(tmpChange.rowKey, 'linetotal', tmpLineTotal);
			}
		}

		// Recompute the invoice total from all rows
		this.updateInvoiceTotal();

		// Call the parent changeHandler to preserve solver integration
		super.changeHandler(pChangeData);
	}

	// -----------------------------------------------------------------------
	//  Sum all Line Totals and write the result into a DOM element
	// -----------------------------------------------------------------------
	updateInvoiceTotal()
	{
		if (!this.tuiGrid)
		{
			return;
		}

		let tmpData = this.tuiGrid.getData();
		let tmpTotal = 0;

		for (let i = 0; i < tmpData.length; i++)
		{
			let tmpLineTotal = Number.parseFloat(tmpData[i].linetotal);
			if (!isNaN(tmpLineTotal))
			{
				tmpTotal += tmpLineTotal;
			}
		}

		// Format the total as currency and write it to the page
		let tmpFormatted = this.fable.DataFormat.formatterDollars(tmpTotal, 2);
		let tmpElements = this.services.ContentAssignment.getElement('#InvoiceTotalValue');
		if (tmpElements.length > 0)
		{
			tmpElements[0].textContent = tmpFormatted;
		}
	}
}

// ---------------------------------------------------------------------------
//  Column schema — note the read-only "Line Total" and "Discount" columns
// ---------------------------------------------------------------------------
const InvoiceGridConfiguration = (
	{
		"ViewIdentifier": "InvoiceGrid",
		"TargetElementAddress": "#InvoiceGridContainer",
		"GridDataAddress": "AppData.InvoiceLines",
		"GridScrollY": true,
		"GridColumnWidthResizable": true,
		"ColumnsToSolveOnChange":
		{
			"quantity": true,
			"unitprice": true
		},
		"TuiColumnSchema":
		[
			{
				"header": "ID",
				"name": "idrecord",
				"hidden": true
			},
			{
				"header": "Entity",
				"name": "entity",
				"hidden": true
			},
			{
				"header": "Item Description",
				"name": "description",
				"editor": "text"
			},
			{
				"header": "Unit Price",
				"name": "unitprice",
				"width": 120,
				"align": "right",
				"formatter": "FormatterCurrencyNumber",
				"editor":
				{
					"type": "EditorNumber",
					"options":
					{
						"decimalPrecision": 2
					}
				}
			},
			{
				"header": "Quantity",
				"name": "quantity",
				"width": 90,
				"align": "right",
				"editor":
				{
					"type": "EditorNumber",
					"options":
					{
						"decimalPrecision": 0
					}
				}
			},
			{
				"header": "Discount",
				"name": "discount",
				"width": 90,
				"align": "right",
				"formatter": "FormatterPercentage"
			},
			{
				"header": "Line Total",
				"name": "linetotal",
				"width": 130,
				"align": "right",
				"formatter": "FormatterCurrencyNumber"
			}
		]
	});

// ---------------------------------------------------------------------------
//  Application class and default configuration with sample invoice data
// ---------------------------------------------------------------------------
class InvoiceApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.pict.addView('InvoiceGridView', InvoiceGridConfiguration, InvoiceGridView);
	}
}

module.exports = InvoiceApplication;

module.exports.default_configuration = (
	{
		"Name": "Invoice Grid",
		"Hash": "InvoiceGrid",
		"MainViewportViewIdentifier": "InvoiceGridView",
		"pict_configuration":
		{
			"Product": "Invoice-Grid",
			"DefaultAppData":
			{
				"InvoiceLines":
				[
					{ "idrecord": 1, "entity": "InvoiceLine", "description": "Consulting — Architecture Review", "unitprice": 175.00, "quantity": 8, "discount": 10, "linetotal": 1260.00 },
					{ "idrecord": 2, "entity": "InvoiceLine", "description": "Development — API Integration", "unitprice": 150.00, "quantity": 24, "discount": 10, "linetotal": 3240.00 },
					{ "idrecord": 3, "entity": "InvoiceLine", "description": "QA Testing — Regression Suite", "unitprice": 95.00, "quantity": 12, "discount": 10, "linetotal": 1026.00 },
					{ "idrecord": 4, "entity": "InvoiceLine", "description": "SSL Certificate — 1 Year", "unitprice": 49.99, "quantity": 2, "discount": 0, "linetotal": 99.98 },
					{ "idrecord": 5, "entity": "InvoiceLine", "description": "Cloud Hosting — Monthly", "unitprice": 89.00, "quantity": 3, "discount": 0, "linetotal": 267.00 }
				]
			}
		}
	});
