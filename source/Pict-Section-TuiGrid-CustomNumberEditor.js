// Custom number editor class with an option for precision
class tuiCustomEditorNumber
{
	constructor(pProperties)
	{
		const tmpElement = document.createElement('input');

		const decimalPrecision = (pProperties.columnInfo.editor.options.decimalPrecision) ? pProperties.columnInfo.editor.options.decimalPrecision : 3;

		tmpElement.type = 'number';
		tmpElement.value = String(pProperties.value);
		tmpElement.oninput = (pElement) =>
		{
			const tmpCastNumber = parseFloat(pElement.target.value).toFixed(decimalPrecision).toString()
			if (tmpCastNumber.length < parseFloat(pElement.target.value).toString().length)
			{
				pElement.target.value = tmpCastNumber;
			}
		};

		this.Element = tmpElement;
	}

	getElement()
	{
		return this.Element;
	}

	getValue()
	{
		return this.Element.value;
	}

	mounted()
	{
		this.Element.select();
	}
}

module.exports = tuiCustomEditorNumber;