# Configuration Reference

Grid configuration is passed as the options object when registering a view with `pict.addView()`. All options are merged with sensible defaults.

## Grid Display Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `GridWidth` | string/number | `"auto"` | Grid width in pixels or `"auto"` |
| `GridRowHeight` | number | `40` | Height of each row in pixels |
| `GridBodyHeight` | string/number | `"auto"` | Grid body height or `"auto"` |
| `GridBodyMinHeight` | number | `130` | Minimum body height in pixels |
| `GridColumnMinWidth` | number | `50` | Minimum column width in pixels |
| `GridColumnWidthResizable` | boolean | `true` | Allow columns to be resized by dragging |
| `GridColumnHeightResizable` | boolean | `false` | Allow column header height resizing |
| `GridColumnFrozenCount` | number | `0` | Number of columns frozen on the left |
| `GridColumnFrozenBorderWidth` | number | `3` | Frozen column border width in pixels |
| `GridScrollX` | boolean | `true` | Enable horizontal scrolling |
| `GridScrollY` | boolean | `true` | Enable vertical scrolling |
| `GridShowDummyRows` | boolean | `false` | Show empty placeholder rows |
| `GridDraggableRows` | boolean | `false` | Allow row reordering by drag |
| `GridSelectionUnit` | string | `"cell"` | Selection mode: `"cell"` or `"row"` |

## View Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `RenderOnLoad` | boolean | `true` | Render the grid when the view loads |
| `ViewIdentifier` | string | — | Unique name for this view instance |
| `TargetElementAddress` | string | `"#TuiGrid-Container-Div"` | CSS selector for the grid mount point |
| `DefaultRenderable` | string | `"TuiGrid-Wrap"` | Renderable hash for the container template |
| `DefaultDestinationAddress` | string | `"#TuiGrid-Container-Div"` | Destination for rendered content |

## Data Binding

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `GridDataAddress` | string/false | `false` | Dot-notation address to data in the Pict address space |
| `GridData` | array | sample data | Fallback data if no address is provided |

### Address Resolution

`GridDataAddress` is resolved against the Pict address space:

```javascript
{
	Fable: this.fable,
	Pict: this.fable,
	AppData: this.AppData,
	Bundle: this.Bundle,
	Options: this.options
}
```

Examples:

```javascript
"GridDataAddress": "AppData.Inventory"         // From application data
"GridDataAddress": "Bundle.Settings.TableRows"  // From the bundle
"GridDataAddress": "Options.GridData"           // From the view's own options
```

The resolved data is deep-cloned to prevent the grid from mutating your source data.

## Column Schema

The `TuiColumnSchema` array defines the columns displayed in the grid. Each entry is an object with these properties:

### Display Properties

| Property | Type | Description |
|----------|------|-------------|
| `header` | string | Column header text |
| `name` | string | **(required)** Key in the row data object |
| `width` | number | Fixed column width in pixels |
| `hidden` | boolean | Hide column from display |
| `align` | string | Horizontal alignment: `"left"`, `"center"`, `"right"` |
| `valign` | string | Vertical alignment: `"top"`, `"middle"`, `"bottom"` |

### Formatter

| Property | Type | Description |
|----------|------|-------------|
| `formatter` | string/function | Built-in formatter name or custom function |
| `decimalPrecision` | number | Decimal places for number formatters (default 2) |
| `dateformat` | string | dayjs format string for `FormatterDate` |

Built-in formatter names: `"FormatterCurrencyNumber"`, `"FormatterTwoDigitNumber"`, `"FormatterRoundedNumber"`, `"FormatterDate"`.

### Editor

| Property | Type | Description |
|----------|------|-------------|
| `editor` | string/object | Editor shorthand string or full configuration object |

#### Shorthand

```javascript
"editor": "text"   // Simple text input
```

#### Full Editor Object

```javascript
"editor":
{
	"type": "EditorNumber",
	"options":
	{
		"decimalPrecision": 2
	}
}
```

#### Editor Types

**EditorText** — Text input with HTML5 validation:

```javascript
{
	"type": "EditorText",
	"options":
	{
		"placeholder": "Enter name",
		"pattern": "[A-Za-z ]+",
		"minLength": 1,
		"maxLength": 100,
		"required": true
	}
}
```

**EditorNumber** — Number input with decimal precision enforcement:

```javascript
{
	"type": "EditorNumber",
	"options":
	{
		"decimalPrecision": 2
	}
}
```

**select** — Native dropdown (Toast UI Grid built-in):

```javascript
{
	"type": "select",
	"options":
	{
		"listItems":
		[
			{ "value": "active", "text": "Active" },
			{ "value": "inactive", "text": "Inactive" }
		]
	}
}
```

The `listItems` property can also be an address string that resolves at initialization:

```javascript
{
	"type": "select",
	"options":
	{
		"listItems": "AppData.StatusOptions"
	}
}
```

**datePicker** — Toast UI date picker:

```javascript
{
	"type": "datePicker",
	"options":
	{
		"format": "yyyy-MM-dd"
	}
}
```

### Solver Integration

| Property | Type | Description |
|----------|------|-------------|
| `PictTriggerSolveOnChange` | boolean | Trigger Pict solver when this column changes |

You can also set solver columns in the view configuration:

```javascript
"ColumnsToSolveOnChange":
{
	"quantity": true,
	"unitprice": true
}
```

Both approaches have the same effect — when a cell in a solver-enabled column is edited, `this.services.PictApplication.solve()` is called automatically.

## Templates

The grid uses a single template to create its mount point. Override to customize the container:

```javascript
"Templates":
[
	{
		"Hash": "TuiGrid-Container",
		"Template": "<div id='MyGrid' class='grid-wrapper'></div>"
	}
],
"Renderables":
[
	{
		"RenderableHash": "TuiGrid-Wrap",
		"TemplateHash": "TuiGrid-Container",
		"DestinationAddress": "#GridContainer"
	}
]
```

## Full Configuration Example

```javascript
const GridConfig =
{
	"ViewIdentifier": "ProductGrid",
	"TargetElementAddress": "#ProductGridContainer",
	"GridDataAddress": "AppData.Products",
	"GridScrollY": true,
	"GridColumnWidthResizable": true,
	"GridColumnFrozenCount": 1,
	"ColumnsToSolveOnChange": { "quantity": true, "unitprice": true },
	"TuiColumnSchema":
	[
		{ "header": "ID", "name": "id", "hidden": true },
		{ "header": "SKU", "name": "sku", "width": 100 },
		{ "header": "Product Name", "name": "name", "editor": "text" },
		{
			"header": "Category",
			"name": "category",
			"editor":
			{
				"type": "select",
				"options": { "listItems": "AppData.Categories" }
			}
		},
		{
			"header": "Unit Price",
			"name": "unitprice",
			"align": "right",
			"formatter": "FormatterCurrencyNumber",
			"editor": { "type": "EditorNumber", "options": { "decimalPrecision": 2 } }
		},
		{
			"header": "Quantity",
			"name": "quantity",
			"align": "right",
			"editor": { "type": "EditorNumber", "options": { "decimalPrecision": 0 } }
		},
		{
			"header": "Last Updated",
			"name": "updated",
			"formatter": "FormatterDate",
			"dateformat": "YYYY-MM-DD",
			"editor": { "type": "datePicker", "options": { "format": "yyyy-MM-dd" } }
		}
	]
};
```
