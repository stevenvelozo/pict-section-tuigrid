# API Reference

## Class: PictSectionTuiGrid

Extends `pict-view`. Wraps a Toast UI Grid instance as a Pict view with configuration-driven column schemas, built-in formatters and editors, and Pict solver integration.

### Constructor

```javascript
new PictSectionTuiGrid(pFable, pOptions, pServiceHash)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `pFable` | object | A Fable or Pict instance |
| `pOptions` | object | View configuration (merged with defaults) |
| `pServiceHash` | string | Service identifier |

Options are deep-merged with `Pict-Section-TuiGrid-DefaultConfiguration.json`. See [Configuration](configuration.md) for the full options reference.

---

## Properties

### tuiGrid

The Toast UI Grid instance. `null` until the first render completes and the grid is initialized in `onAfterInitialRender()`.

**Type:** `TuiGrid | null`

---

### gridData

The array of row objects loaded from `GridDataAddress`. This is a deep clone of the source data — mutations here do not affect `AppData` directly.

**Type:** `Array<object> | null`

---

### columnSchema

The resolved column configuration array. After initialization, formatter strings have been replaced with functions and editor type strings with class references.

**Type:** `Array<object> | false`

---

### gridSettings

The configuration object passed to the Toast UI Grid constructor. Available after `onAfterInitialRender()` runs.

**Type:** `object`

---

### targetElement

The DOM element the grid is mounted to.

**Type:** `HTMLElement | false`

---

### customFormatters

Map of formatter name strings to formatter functions. Pre-populated with the four built-in formatters. Add your own here before initialization.

**Type:** `object`

---

### customEditors

Map of editor type strings to editor classes. Pre-populated with `EditorNumber` and `EditorText`.

**Type:** `object`

---

### customHeaders

Map of custom header renderer classes. Pre-populated with `tuiCustomColumnHeaderNone` (hides the header).

**Type:** `object`

---

### initialRenderComplete

Guard flag that ensures `onAfterInitialRender()` runs only once.

**Type:** `boolean`

---

### dateFormatter

A Fable Dates service instance for date formatting operations.

**Type:** `object`

---

## Lifecycle Methods

### onBeforeInitialize()

Sets up the TuiGrid prototype reference, loads custom headers and editors, and initializes built-in formatters. Called automatically during the Pict view initialization lifecycle.

---

### onAfterRender(pRenderable)

Called after each render cycle. On the first render, delegates to `onAfterInitialRender()` to create the actual Toast UI Grid instance.

---

### onAfterInitialRender()

The main grid initialization method. Runs once on the first render:

1. Connects the TuiGrid prototype from `window.tui.Grid`
2. Resolves `GridDataAddress` to load grid data from `AppData`
3. Finds the target DOM element via `TargetElementAddress`
4. Processes the column schema (resolves formatters, editors, list items, solver triggers)
5. Builds the `gridSettings` object
6. Calls `customConfigureGridSettings()` for subclass overrides
7. Creates the Toast UI Grid instance
8. Registers `beforeChange` and `afterChange` event listeners

---

### customConfigureGridSettings()

Extension hook called just before the Toast UI Grid is instantiated. Override in subclasses to modify `this.gridSettings`:

```javascript
customConfigureGridSettings()
{
	this.gridSettings.bodyHeight = 400;
	this.gridSettings.rowHeaders = ['rowNum'];
}
```

---

## Event Handlers

### preChangeHandler(pChangeData)

Called before a cell edit is applied. Override to intercept, validate, or transform incoming values.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pChangeData` | TUIGridChangeEvent | Event with `instance` and `changes[]` |

Each change object contains:

| Property | Type | Description |
|----------|------|-------------|
| `rowKey` | any | Toast UI Grid row identifier |
| `columnName` | string | The column that changed |
| `value` | any | The current (pre-change) cell value |
| `nextValue` | any | The incoming value (mutable — modify to transform input) |

```javascript
preChangeHandler(pChangeData)
{
	for (let i = 0; i < pChangeData.changes.length; i++)
	{
		let tmpChange = pChangeData.changes[i];
		if (tmpChange.columnName === 'quantity' && tmpChange.nextValue < 0)
		{
			tmpChange.nextValue = 0; // Clamp negative quantities to zero
		}
	}
}
```

---

### changeHandler(pChangeData)

Called after a cell edit is applied. The default implementation checks whether the changed column is in `ColumnsToSolveOnChange` and triggers the Pict application solver if so.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pChangeData` | TUIGridChangeEvent | Event with `instance` and `changes[]` |

Each change object contains:

| Property | Type | Description |
|----------|------|-------------|
| `rowKey` | any | Toast UI Grid row identifier |
| `columnName` | string | The column that changed |
| `value` | any | The new (post-change) cell value |
| `prevValue` | any | The previous cell value |

Override to add custom post-change logic. Call `super.changeHandler(pChangeData)` to preserve solver integration:

```javascript
changeHandler(pChangeData)
{
	for (let i = 0; i < pChangeData.changes.length; i++)
	{
		let tmpChange = pChangeData.changes[i];
		if (tmpChange.columnName === 'quantity' || tmpChange.columnName === 'unitprice')
		{
			let tmpQty = pChangeData.instance.getValue(tmpChange.rowKey, 'quantity');
			let tmpPrice = pChangeData.instance.getValue(tmpChange.rowKey, 'unitprice');
			this.tuiGrid.setValue(tmpChange.rowKey, 'linetotal', tmpQty * tmpPrice);
		}
	}
	super.changeHandler(pChangeData);
}
```

---

## Data Methods

### SetGridValue(pCellColumnToBeSet, pCellValueToSet, pLookupValue, pLookupColumn)

Look up a row by a value in one column and set a value in another column. Use this instead of direct object mutation so the Toast UI Grid UI refreshes.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pCellColumnToBeSet` | string | Column to update |
| `pCellValueToSet` | any | Value to write |
| `pLookupValue` | any | Value to search for |
| `pLookupColumn` | string | Column to search in |

```javascript
// Set the "status" column to "Shipped" for the row where idrecord is 42
this.SetGridValue('status', 'Shipped', 42, 'idrecord');
```

---

### SetGridValueByRowKey(pCellColumnToBeSet, pCellValueToSet, pRowKey)

Set a cell value by Toast UI Grid's native row key. More direct than `SetGridValue`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pCellColumnToBeSet` | string | Column to update |
| `pCellValueToSet` | any | Value to write |
| `pRowKey` | any | Toast UI Grid row key |

**Returns:** `boolean` — `true` on success, `false` if the grid is not initialized or the row key is invalid.

---

### connectTuiGridPrototype(pTuiGridPrototype)

Connect the Toast UI Grid class. If not called explicitly, the grid auto-discovers `window.tui.Grid` on first render.

| Parameter | Type | Description |
|-----------|------|-------------|
| `pTuiGridPrototype` | class | The TuiGrid constructor (optional) |

---

### initializeCustomFormatters()

Populates `this.customFormatters` with the four built-in formatters. Called automatically during `onBeforeInitialize()`. Override to add or replace formatters:

```javascript
initializeCustomFormatters()
{
	super.initializeCustomFormatters();
	this.customFormatters.FormatterPercentage = (pCell) =>
	{
		let tmpValue = Number.parseFloat(pCell.value);
		return isNaN(tmpValue) ? '' : (tmpValue * 100).toFixed(1) + '%';
	};
}
```

---

## Built-In Formatter Functions

Each formatter receives a `pCell` object with at minimum a `value` property:

| Formatter | Output | Options |
|-----------|--------|---------|
| `FormatterTwoDigitNumber` | `1234.57` | `decimalPrecision` (default 2) |
| `FormatterCurrencyNumber` | `$1,234.57` | `decimalPrecision` (default 2) |
| `FormatterRoundedNumber` | `1234.57` | `decimalPrecision` (default 2) |
| `FormatterDate` | `2024-01-15T00:00:00Z` | `dateformat` (dayjs format string) |

---

## Built-In Editor Classes

### EditorNumber

Number input that enforces decimal precision on keystroke.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `decimalPrecision` | number | `3` | Max decimal places |

### EditorText

Text input with HTML5 validation attributes.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `placeholder` | string | `''` | Placeholder text |
| `pattern` | string | `''` | HTML5 pattern regex |
| `minLength` | number | `''` | Minimum character length |
| `maxLength` | number | `''` | Maximum character length |
| `required` | boolean | `''` | HTML5 required flag |
