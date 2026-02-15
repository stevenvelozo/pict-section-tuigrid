/**
 * Inventory Grid Example
 *
 * A purely configuration-driven TuiGrid application.  No custom code beyond
 * the column schema and data -- everything is handled by the base class.
 *
 * This demonstrates:
 *  - Text editors for free-form string entry
 *  - Number editors with decimal precision for currency and quantity
 *  - A select dropdown whose options come from an AppData address
 *  - Currency and date formatters
 *  - Date picker editor
 *  - PictTriggerSolveOnChange for solver integration
 *  - Hidden ID columns for entity tracking
 */
const libPictApplication = require('pict-application');
const libPictSectionTuiGrid = require('../../source/Pict-Section-TuiGrid.js');

// A plain subclass -- no overrides needed for a config-only grid.
class InventoryGridView extends libPictSectionTuiGrid
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

const InventoryGridConfiguration = (
	{
		"ViewIdentifier": "InventoryGrid",
		"TargetElementAddress": "#InventoryGridContainer",
		"GridDataAddress": "AppData.InventoryItems",
		"GridScrollY": true,
		"GridColumnWidthResizable": true,
		"GridColumnFrozenCount": 1,
		"ColumnsToSolveOnChange":
		{
			"unitprice": true,
			"quantity": true
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
				"header": "SKU",
				"name": "sku",
				"width": 100,
				"editor":
				{
					"type": "EditorText",
					"options":
					{
						"placeholder": "e.g. WDG-001",
						"maxLength": 12
					}
				}
			},
			{
				"header": "Product Name",
				"name": "name",
				"editor": "text"
			},
			{
				"header": "Category",
				"name": "category",
				"editor":
				{
					"type": "select",
					"options":
					{
						"listItems": "AppData.CategoryOptions"
					}
				}
			},
			{
				"header": "Unit Price",
				"name": "unitprice",
				"width": 110,
				"align": "right",
				"formatter": "FormatterCurrencyNumber",
				"PictTriggerSolveOnChange": true,
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
				"PictTriggerSolveOnChange": true,
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
				"header": "Reorder Date",
				"name": "reorderdate",
				"formatter": "FormatterDate",
				"dateformat": "YYYY-MM-DD",
				"editor":
				{
					"type": "datePicker",
					"options":
					{
						"format": "yyyy-MM-dd"
					}
				}
			}
		]
	});

class InventoryApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.pict.addView('InventoryGridView', InventoryGridConfiguration, InventoryGridView);
	}
}

module.exports = InventoryApplication;

module.exports.default_configuration = (
	{
		"Name": "Inventory Grid",
		"Hash": "InventoryGrid",
		"MainViewportViewIdentifier": "InventoryGridView",
		"pict_configuration":
		{
			"Product": "Inventory-Grid",
			"DefaultAppData":
			{
				"CategoryOptions":
				[
					{ "value": "electronics", "text": "Electronics" },
					{ "value": "hardware", "text": "Hardware" },
					{ "value": "software", "text": "Software" },
					{ "value": "accessories", "text": "Accessories" },
					{ "value": "services", "text": "Services" }
				],
				"InventoryItems":
				[
					{ "idrecord": 1, "entity": "InventoryItem", "sku": "WDG-001", "name": "Standard Widget", "category": "hardware", "unitprice": 9.99, "quantity": 250, "reorderdate": "2025-03-15" },
					{ "idrecord": 2, "entity": "InventoryItem", "sku": "WDG-002", "name": "Deluxe Widget", "category": "hardware", "unitprice": 19.50, "quantity": 120, "reorderdate": "2025-04-01" },
					{ "idrecord": 3, "entity": "InventoryItem", "sku": "GDG-001", "name": "Bluetooth Gadget", "category": "electronics", "unitprice": 34.99, "quantity": 85, "reorderdate": "2025-02-28" },
					{ "idrecord": 4, "entity": "InventoryItem", "sku": "SFT-010", "name": "Analytics Platform", "category": "software", "unitprice": 299.00, "quantity": 15, "reorderdate": "2025-06-01" },
					{ "idrecord": 5, "entity": "InventoryItem", "sku": "ACC-005", "name": "USB-C Cable 2m", "category": "accessories", "unitprice": 7.49, "quantity": 500, "reorderdate": "2025-01-20" },
					{ "idrecord": 6, "entity": "InventoryItem", "sku": "SVC-001", "name": "Annual Support", "category": "services", "unitprice": 149.00, "quantity": 42, "reorderdate": "2025-12-31" },
					{ "idrecord": 7, "entity": "InventoryItem", "sku": "GDG-002", "name": "Wireless Mouse", "category": "electronics", "unitprice": 24.99, "quantity": 310, "reorderdate": "2025-05-10" },
					{ "idrecord": 8, "entity": "InventoryItem", "sku": "ACC-012", "name": "Screen Protector", "category": "accessories", "unitprice": 4.99, "quantity": 1000, "reorderdate": "2025-03-01" }
				]
			}
		}
	});
