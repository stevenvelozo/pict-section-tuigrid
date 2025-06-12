const libPictApplication = require('pict-application');

const libPictSectionTuiGrid = require('../../source/Pict-Section-TuiGrid.js');

class ExampleGridView extends libPictSectionTuiGrid
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

const ExampleGridConfiguration = (
	{
		"ViewIdentifier": "ExampleGrid",
		"TargetElementAddress": "#ExampleGridContainer",
		"GridDataAddress": "AppData.StudentData",
		"ColumnsToSolveOnChange": {
			"quantity": true,
			"costperunit": true,
			"stockpile_id": true
		},
		"TuiColumnSchema": [
			{
				"header": "IDRecord",
				"name": "idrecord",
				"hidden": true
			},
			{
				"header": "Entity",
				"name": "entity",
				"hidden": true
			},
			{
				"header": "Student Name",
				"name": "name",
				"editor": "text"
			},
			{
				"header": "Reading Level",
				"name": "readinglevel",
				"editor": {
					"type": "select",
					"options": {
						"listItems": [
							{value: "1", text: "Level 1"},
							{value: "2", text: "Level 2"},
							{value: "3", text: "Level 3"},
							{value: "4", text: "Level 4"},
							{value: "5", text: "Level 5"},
							{value: "6", text: "Level 6"},
							{value: "7", text: "Level 7"}
						]
					}
				}
			},
			{
				"header": "Overall Tuition",
				"width": 100,
				"align": "right",
				"name": "overalltuition",
				"formatter": "FormatterCurrencyNumber",
				"editor": {
					"type": "EditorNumber",
					"options": {
						"decimalPrecision": 2
					}
				}
			},
			{
				"header": "Monthly Tuition Hike",
				"width": 100,
				"align": "right",
				"name": "monthlytuitionhike",
				"formatter": "FormatterCurrencyNumber",
				"editor": {
					"type": "EditorNumber",
					"options": {
						"decimalPrecision": 4
					}
				}
			},
			{
				"header": "Birthday",
				"name": "birthday",
				"editor": {
					"type": "datePicker",
					"options": {
							"format": "yyyy-MM-dd"
						}
				}
			},
			{
				"header": "Height (cm)",
				"width": 100,
				"align": "right",
				"name": "height",
				"editor": {
					"type": "EditorNumber",
					"options": {
						"decimalPrecision": 3
					}
				}
			}
		]
	});

class PostcardApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.pict.addView('ExampleGridView', ExampleGridConfiguration, ExampleGridView);
	}
};

module.exports = PostcardApplication

module.exports.default_configuration = ({
	"Name": "A Simple Grid Application",
	"Hash": "Grid",

	"MainViewportViewIdentifier": "ExampleGridView",

	"pict_configuration":
		{
			"Product": "Grid-Application",

			"DefaultAppData": {
				"StudentData": [
					{ idrecord: 1, entity: "Student", name: "John Doe", readinglevel: "3", height: 1.75 },
					{ idrecord: 2, entity: "Student", name: "Jane Doe", readinglevel: "5", height: 1.65 },
					{ idrecord: 3, entity: "Student", name: "John Smith", readinglevel: "3", height: 1.851 },
					{ idrecord: 4, entity: "Student", name: "Jane Smith", readinglevel: "6", overalltuition: 75.50, height: 1.754 },
					{ idrecord: 5, entity: "Student", name: "John Johnson", birthday: "1976-02-1", readinglevel: "4", height: 1.95 },
					{ idrecord: 6, entity: "Student", name: "Jane Johnson", birthday: "2010-05-01", readinglevel: "7", overalltuition: 75.50, height: 1.85 },
					{ idrecord: 7, entity: "Student", name: "John Brown", readinglevel: "2", overalltuition: 75.50, height: 1.75 },
					{ idrecord: 8, entity: "Student", name: "Jane Brown", readinglevel: "5", height: 1.657 },
					{ idrecord: 9, entity: "Student", name: "John White", readinglevel: "3", overalltuition: 1.75, height: 1.85 },
					{ idrecord: 10, entity: "Student", name: "Jane White", readinglevel: "6", height: 1.758 }
				]
			}
		}
});
