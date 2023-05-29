// Custom column header where the header is hidden
class tuiCustomColumnHeaderNone
{
	constructor()
	{
		let tmpElement = document.createElement('input');
		tmpElement.type = 'hidden';
		tmpElement.value = '';
		this.Element = tmpElement;
	}

	getElement()
	{
		return this.Element;
	}

	render()
	{
		// Noop!
	}
}

module.exports = tuiCustomColumnHeaderNone;