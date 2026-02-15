# Inventory Grid — Config-Only Example

A purely configuration-driven TuiGrid application. No custom code beyond the
column schema and sample data. Demonstrates:

- Text editors for product names and SKUs
- Number editors with decimal precision for prices and quantities
- Select dropdowns with options loaded from an AppData address
- Currency and date formatters
- Date picker editor
- Solver-triggered columns
- Hidden ID columns for entity tracking
- Frozen first column

## Running

Install dependencies in the root of the pict-section-tuigrid repository with
`npm install`, then navigate to this folder and run:

```bash
npm run build
```

Open `dist/index.html` in your browser.
