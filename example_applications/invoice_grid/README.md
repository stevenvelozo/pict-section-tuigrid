# Invoice Grid — Custom Data Marshaling Example

An invoice line-item grid that overrides the data marshaling methods to compute
derived columns, apply business logic, and update external DOM elements in real
time.

## What It Demonstrates

### preChangeHandler() — Input Interception

Before a cell edit is applied to the grid:

- **Negative quantities** are clamped to zero by modifying `nextValue`
- **Unit prices** are rounded to exactly two decimal places

### changeHandler() — Computed Columns

After a cell edit is applied:

- **Line Total** is recalculated as `Quantity × Unit Price`
- **Automatic discount** of 10% is applied when a line total exceeds $500
- **Invoice Total** is summed from all line totals and written to a DOM
  element outside the grid via `ContentAssignment.getElement()`
- The parent `changeHandler()` is called to preserve solver integration

### initializeCustomFormatters() — Custom Formatter

A `FormatterPercentage` formatter is registered alongside the built-in ones,
displaying the discount column as `10.0%` instead of a raw number.

### customConfigureGridSettings() — Grid Settings Override

Row numbers are injected into the grid by setting `this.gridSettings.rowHeaders`
before the Toast UI Grid is instantiated.

## Running

Install dependencies in the root of the pict-section-tuigrid repository with
`npm install`, then navigate to this folder and run:

```bash
npm run build
```

Open `dist/index.html` in your browser. Edit `Unit Price` or `Quantity` to see
the Line Total, Discount, and Invoice Total update live.
