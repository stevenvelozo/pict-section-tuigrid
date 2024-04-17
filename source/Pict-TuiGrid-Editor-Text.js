// Custom number editor class with an option for precision
class tuiCustomEditorText
{
	constructor(pProperties)
	{
		const tmpElement = document.createElement('input');

		tmpElement.type = 'text';
		tmpElement.value = String(pProperties.value);
		tmpElement.placeholder =  pProperties.columnInfo.editor.options.placeholder || '';
		tmpElement.pattern = pProperties.columnInfo.editor.options.pattern || '';
		tmpElement.minLength = pProperties.columnInfo.editor.options.minLength || '';
		tmpElement.maxLength = pProperties.columnInfo.editor.options.maxLength || '';
		tmpElement.required = pProperties.columnInfo.editor.options.required || '';

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

module.exports = tuiCustomEditorText;
