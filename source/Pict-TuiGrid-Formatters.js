// Static functions for formatting data in the grid.
const tuiGridFormatters = {};

tuiGridFormatters.FormatterTwoDigitNumber = (pCell) =>
	{
		let tmpCellValue = Number.parseFloat(pCell.value).toFixed(2);
		if (isNaN(tmpCellValue))
		{
			return '';
		}
		else
		{
			return tmpCellValue;
		}
	}

tuiGridFormatters.FormatterCurrencyNumber = (pCell) =>
	{
		let tmpCellValue = tuiGridFormatters.FormatterTwoDigitNumber(pCell);
		if (tmpCellValue == '')
		{
			return tmpCellValue;
		}
		else
		{
			return `$${tmpCellValue}`;
		}
	}

module.exports = tuiGridFormatters;