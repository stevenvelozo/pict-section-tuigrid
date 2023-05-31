"use strict";

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.PictSectionTuigrid = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      /**
      * Fable Core Pre-initialization Service Base
      *
      * For a couple services, we need to be able to instantiate them before the Fable object is fully initialized.
      * This is a base class for those services.
      *
      * @author <steven@velozo.com>
      */

      class FableCoreServiceProviderBase {
        constructor(pOptions, pServiceHash) {
          this.fable = false;
          this.options = typeof pOptions === 'object' ? pOptions : {};
          this.serviceType = 'Unknown';

          // The hash will be a non-standard UUID ... the UUID service uses this base class!
          this.UUID = "CORESVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : "".concat(this.UUID);
        }
        // After fable is initialized, it would be expected to be wired in as a normal service.
        connectFable(pFable) {
          this.fable = pFable;
          return true;
        }
      }
      _defineProperty(FableCoreServiceProviderBase, "isFableService", true);
      module.exports = FableCoreServiceProviderBase;
    }, {}],
    2: [function (require, module, exports) {
      /**
      * Fable Service Base
      * @author <steven@velozo.com>
      */

      class FableServiceProviderBase {
        constructor(pFable, pOptions, pServiceHash) {
          this.fable = pFable;
          this.options = typeof pOptions === 'object' ? pOptions : typeof pFable === 'object' && !pFable.isFable ? pFable : {};
          this.serviceType = 'Unknown';
          if (typeof pFable.getUUID == 'function') {
            this.UUID = pFable.getUUID();
          } else {
            this.UUID = "NoFABLESVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          }
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : "".concat(this.UUID);

          // Pull back a few things
          this.log = this.fable.log;
          this.services = this.fable.services;
          this.defaultServices = this.fable.defaultServices;
        }
      }
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;
      module.exports.CoreServiceProviderBase = require('./Fable-ServiceProviderBase-Preinit.js');
    }, {
      "./Fable-ServiceProviderBase-Preinit.js": 1
    }],
    3: [function (require, module, exports) {
      const libFableServiceBase = require('fable-serviceproviderbase');
      const defaultPictViewSettings = {
        DefaultRenderable: false,
        DefaultDestinationAddress: false,
        DefaultTemplateRecordAddress: false,
        ViewIdentifier: 'DEFAULT',
        InitializeOnLoad: true,
        RenderOnLoad: false,
        Templates: [],
        DefaultTemplates: [],
        Renderables: [],
        Manifests: {}
      };
      class PictView extends libFableServiceBase {
        constructor(pFable, pOptions, pServiceHash) {
          let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictViewSettings)), pOptions);
          super(pFable, tmpOptions, pServiceHash);
          this.serviceType = 'PictView';

          // Wire in the essential Pict service
          this.AppData = this.fable.AppData;

          // Load all templates from the array in the options
          // Templates are in the form of {Hash:'Some-Template-Hash',Template:'Template content',Source:'TemplateSource'}
          for (let i = 0; i < this.options.Templates.length; i++) {
            let tmpTemplate = this.options.Templates[i];
            if (!tmpTemplate.hasOwnProperty('Hash') || !tmpTemplate.hasOwnProperty('Template')) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not load Template ").concat(i, " in the options array."), tmpTemplate);
            } else {
              if (!tmpTemplate.Source) {
                tmpTemplate.Source = "PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " options object.");
              }
              this.fable.TemplateProvider.addTemplate(tmpTemplate.Hash, tmpTemplate.Template, tmpTemplate.Source);
            }
          }

          // Load all default templates from the array in the options
          // Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
          for (let i = 0; i < this.options.DefaultTemplates.length; i++) {
            let tmpDefaultTemplate = this.options.DefaultTemplates[i];
            if (!tmpDefaultTemplate.hasOwnProperty('Postfix') || !tmpDefaultTemplate.hasOwnProperty('Template')) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not load Default Template ").concat(i, " in the options array."), tmpDefaultTemplate);
            } else {
              if (!tmpDefaultTemplate.Source) {
                tmpDefaultTemplate.Source = "PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " options object.");
              }
              this.fable.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
            }
          }

          // Load all renderables
          // Renderables are launchable renderable instructions with templates
          // They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
          // The only parts that are necessary are Identifier and Template
          // A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
          this.renderables = {};
          for (let i = 0; i < this.options.Renderables.length; i++) {
            let tmpRenderable = this.options.Renderables[i];
            if (!tmpRenderable.hasOwnProperty('RenderableHash') || !tmpRenderable.hasOwnProperty('TemplateHash')) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not load Renderable ").concat(i, " in the options array."), tmpRenderable);
            } else {
              this.renderables[tmpRenderable.RenderableHash] = tmpRenderable;
            }
          }
          if (this.options.InitializeOnLoad) {
            this.initialize();
          }
          if (this.options.RenderOnLoad) {
            this.render(this.options.DefaultRenderable, this.options.DefaultDestinationAddress, this.options.DefaultTemplateRecordAddress);
            this.postInitialRenderInitialize();
          }
        }
        internalInitialize() {
          return true;
        }
        postInitialRenderInitialize() {
          return true;
        }
        initialize() {
          this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " beginning initialization..."));
          this.internalInitialize();
          this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initialization complete."));
        }
        render(pRenderable, pRenderDestinationAddress, pTemplateDataAddress) {
          let tmpRenderableHash = typeof pRenderable === 'string' ? pRenderable : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;
          if (!tmpRenderableHash) {
            this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it is not a valid renderable."));
            return false;
          }
          let tmpRenderable = this.renderables[tmpRenderableHash];
          if (!tmpRenderable) {
            this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not exist."));
            return false;
          }
          let tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
          if (!tmpRenderDestinationAddress) {
            this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not have a valid destination address."));
            return false;
          }
          let tmpDataAddress = typeof pTemplateDataAddress === 'string' ? pTemplateDataAddress : typeof tmpRenderable.RecordAddress === 'string' ? tmpRenderable.RecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
          let tmpData = typeof tmpDataAddress === 'string' ? this.fable.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
          let tmpContent = this.fable.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData);
          return this.fable.ContentAssignment.assignContent(tmpRenderDestinationAddress, tmpContent);
        }
        renderAsync(pRenderable, pRenderDestinationAddress, pTemplateDataAddress, fCallback) {
          let tmpRenderableHash = typeof pRenderable === 'string' ? pRenderable : false;
          if (!tmpRenderableHash) {
            this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, "because it is not a valid renderable."));
            return fCallback(Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, "because it is not a valid renderable.")));
          }
          let tmpRenderable = this.renderables[tmpRenderableHash];
          if (!tmpRenderable) {
            this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not exist."));
            return fCallback(Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not exist.")));
          }
          let tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
          if (!tmpRenderDestinationAddress) {
            this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not have a valid destination address."));
            return fCallback(Error("Could not render ".concat(tmpRenderableHash)));
          }
          let tmpDataAddress = typeof pTemplateDataAddress === 'string' ? pTemplateDataAddress : typeof tmpRenderable.RecordAddress === 'string' ? tmpRenderable.RecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
          let tmpData = typeof tmpDataAddress === 'string' ? this.fable.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
          this.fable.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData, (pError, pContent) => {
            if (pError) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render (asynchronously) ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it did not parse the template."), pError);
              return fCallback(pError);
            }
            this.fable.ContentAssignment.assignContent(tmpRenderDestinationAddress, pContent);
            return fCallback(null, pContent);
          });
        }
      }
      module.exports = PictView;
    }, {
      "fable-serviceproviderbase": 2
    }],
    4: [function (require, module, exports) {
      // Custom column header where the header is hidden
      class tuiCustomColumnHeaderNone {
        constructor() {
          let tmpElement = document.createElement('input');
          tmpElement.type = 'hidden';
          tmpElement.value = '';
          this.Element = tmpElement;
        }
        getElement() {
          return this.Element;
        }
        render() {
          // Noop!
        }
      }
      module.exports = tuiCustomColumnHeaderNone;
    }, {}],
    5: [function (require, module, exports) {
      // Custom number editor class with an option for precision
      class tuiCustomEditorNumber {
        constructor(pProperties) {
          const tmpElement = document.createElement('input');
          const decimalPrecision = pProperties.columnInfo.editor.options.decimalPrecision ? pProperties.columnInfo.editor.options.decimalPrecision : 3;
          tmpElement.type = 'number';
          tmpElement.value = String(pProperties.value);
          tmpElement.oninput = pElement => {
            const tmpCastNumber = parseFloat(pElement.target.value).toFixed(decimalPrecision).toString();
            if (tmpCastNumber.length < parseFloat(pElement.target.value).toString().length) {
              pElement.target.value = tmpCastNumber;
            }
          };
          this.Element = tmpElement;
        }
        getElement() {
          return this.Element;
        }
        getValue() {
          return this.Element.value;
        }
        mounted() {
          this.Element.select();
        }
      }
      module.exports = tuiCustomEditorNumber;
    }, {}],
    6: [function (require, module, exports) {
      module.exports = {
        "RenderOnLoad": true,
        "DefaultRenderable": "TuiGrid-Wrap",
        "DefaultDestinationAddress": "#TuiGrid-Container-Div",
        "Templates": [{
          "Hash": "TuiGrid-Container",
          "Template": "<!-- TuiGrid-Container Rendering Soon -->"
        }],
        "Renderables": [{
          "RenderableHash": "TuiGrid-Wrap",
          "TemplateHash": "TuiGrid-Container",
          "DestinationAddress": "#TuiGrid-Container-Div"
        }],
        "TargetElementAddress": "#TuiGrid-Container-Div",
        "GridDataAddress": false,
        "GridData": [{
          "idrecord": 1,
          "entity": "SampleEntity",
          "name": "Record name 1",
          "description": "description 1"
        }, {
          "idrecord": 2,
          "entity": "SampleEntity",
          "name": "Record name 2",
          "description": "description 2"
        }, {
          "idrecord": 3,
          "entity": "SampleEntity",
          "name": "Record name 3",
          "description": "description 3"
        }, {
          "idrecord": 4,
          "entity": "SampleEntity",
          "name": "Record name 4",
          "description": "description 4"
        }, {
          "idrecord": 5,
          "entity": "SampleEntity",
          "name": "Record name 5",
          "description": "description 5"
        }, {
          "idrecord": 6,
          "entity": "SampleEntity",
          "name": "Record name 6",
          "description": "description 6"
        }, {
          "idrecord": 7,
          "entity": "SampleEntity",
          "name": "Record name 7",
          "description": "description 7"
        }, {
          "idrecord": 8,
          "entity": "SampleEntity",
          "name": "Record name 8",
          "description": "description 8"
        }, {
          "idrecord": 9,
          "entity": "SampleEntity",
          "name": "Record name 9",
          "description": "description 9"
        }],
        "ColumnsToSolveOnChange": {},
        "TuiColumnSchema": [{
          "header": "IDRecord",
          "name": "idrecord",
          "PictTriggerSolveOnChange": true
        }, {
          "header": "Entity",
          "name": "entity",
          "PictTriggerSolveOnChange": true
        }, {
          "header": "Name",
          "name": "name",
          "editor": "text"
        }, {
          "header": "Description",
          "name": "description",
          "editor": "text"
        }]
      };
    }, {}],
    7: [function (require, module, exports) {
      const libPictViewClass = require('pict-view');
      class PictSectionTuiGrid extends libPictViewClass {
        constructor(pFable, pOptions, pServiceHash) {
          let tmpOptions = Object.assign({}, require('./Pict-Section-TuiGrid-DefaultConfiguration.json'), pOptions);
          super(pFable, tmpOptions, pServiceHash);
          this._tuiGridPrototype = false;
          this.tuiGrid = false;
        }

        // Overload the connectTuiGrid() function to use the inline version of the TuiGrid
        connectTuiGridPrototype(pTuiGridPrototype) {
          if (typeof pTuiGridPrototype != undefined) {
            this._tuiGridPrototype = pTuiGridPrototype;
          } else {
            this.log.trace("PICT-TuiGrid No TuiGrid Prototype defined or explicitly set; looking for it in the window object.");
            if (typeof window != 'undefined') {
              if (typeof window.tui != 'undefined' && typeof window.tui.Grid != 'undefined') {
                this.log.trace("PICT-TuiGrid Found TuiGrid Prototype in window.tuiGrid.");
                this.connectTuiGridPrototype(window.tui.Grid);
              } else {
                this.log.error("PICT-TuiGrid No TuiGrid Prototype found in window.tuiGrid.");
                return false;
              }
            } else {
              this.log.error("PICT-TuiGrid No TuiGrid Prototype found in window.tuiGrid -- window object unavailable.");
              return false;
            }
          }
        }
        changeHandler(pChangeData) {
          let tmpSolverNecessary = false;
          for (let i = 0; i < pChangeData.changes.length; i++) {
            let tmpEntity = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'entity');
            let tmpIDRecord = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'idrecord');
            this.log.trace("Generic Change Handler for TuiGrid Fired, Entity ".concat(tmpEntity, " IDRecord ").concat(tmpIDRecord, " setting Column [").concat(pChangeData.changes[i].value, "] to new Value [").concat(pChangeData.changes[i].value, "]"));

            //if (pChangeData.changes[i].columnName == 'some_important_column')
            //{
            //if (pChangeData.changes[i].value > some_important_threshold)
            //{
            // Do something
            //}
            //}
            if (this.options.ColumnsToSolveOnChange.hasOwnProperty(pChangeData.changes[i].columnName)) {
              tmpSolverNecessary = true;
            }
          }
          if (tmpSolverNecessary) {
            this.defaultServices.PictApplication.solve();
          }
        }
        postInitialRenderInitialize() {
          // Check for a tuigrid prototype, and find it in the window object it if it doesn't exist
          if (!this._tuiGridPrototype) {
            this.connectTuiGridPrototype();
          }
          // This is where we wire up and initialize the tuigrid control
          if (this.tuiGrid) {
            // The grid is already initialized.
            this.log.error("TuiGrid going to ".concat(this.options.TargetElementAddress, " is already initialized!"));
            return false;
          }
          if (this.options.GridDataAddress) {
            let tmpAddressedData = this.fable.manifest.getValueByHash(this.AppData, this.options.GridDataAddress);
            if (typeof tmpAddressedData != 'object') {
              this.log.error("Address for GridData [".concat(this.options.GridDataAddress, "] did not return an object; it was a ").concat(typeof tmpAddressedData, "."));
            } else {
              this.options.GridData = JSON.parse(JSON.stringify(tmpAddressedData));
            }
          }
          let tmpTargetElement = this.defaultServices.ContentAssignment.getElement(this.options.TargetElementAddress);

          // Setup the solver
          for (let i = 0; i < this.options.TuiColumnSchema.length; i++) {
            let tmpColumn = this.options.TuiColumnSchema[i];
            if (tmpColumn.PictTriggerSolveOnChange) {
              this.options.ColumnsToSolveOnChange[tmpColumn.name] = tmpColumn;
            }
          }
          if (!this._tuiGridPrototype) {
            this.log.warn("TuiGrid Prototype not defined; cannot initialize TuiGrid at ".concat(this.options.TargetElementAddress, "."));
          } else {
            let libTuiGrid = this._tuiGridPrototype;
            this.tuiGrid = new libTuiGrid({
              el: tmpTargetElement,
              usageStatistics: false,
              scrollY: false,
              columns: this.options.TuiColumnSchema,
              data: this.options.GridData,
              columnOptions: {
                resizable: true
              }
            });
            this.tuiGrid.on('afterChange', pChangeData => {
              this.changeHandler(pChangeData);
            });
          }
        }
        SetGridValue(pCellColumnToBeSet, pCellValueToSet, pLookupValue, pLookupColumn) {
          if (typeof pLookupValue == 'undefined') {
            console.log("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by [").concat(pLookupColumn, "]::[").concat(pLookupValue, "].  No valid lookup value!"));
            return false;
          }
          if (this.tuiGrid) {
            let tmpData = this.tuiGrid.getData();
            for (let i = 0; i < tmpData.length; i++) {
              let tmpRecord = tmpData[i];
              if (tmpRecord[pLookupColumn] == pLookupValue) {
                this.tuiGrid.setValue(i, pCellColumnToBeSet, pCellValueToSet);
              }
            }
          } else {
            this.log.warn("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by [").concat(pLookupColumn, "]::[").concat(pLookupValue, "].  No valid grid!"));
          }
        }
        SetGridValueByRowKey(pCellColumnToBeSet, pCellValueToSet, pRowKey) {
          if (typeof pRowKey == 'undefined') {
            this.log.error("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by row key [").concat(pRowKey, "].  No valid row key!"));
            return false;
          }
          if (this.tuiGrid) {
            this.tuiGrid.setValue(pRowKey, pCellColumnToBeSet, pCellValueToSet);
          } else {
            this.log.warn("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by [").concat(pLookupColumn, "]::[").concat(pLookupValue, "].  No valid grid!"));
          }
        }
      }
      module.exports = PictSectionTuiGrid;

      // Custom column header classes
      module.exports.CustomColumnHeaderNone = require('./Pict-Section-TuiGrid-CustomHeaderNone.js');

      // Custom editor classes
      module.exports.CustomEditorNumber = require('./Pict-Section-TuiGrid-CustomNumberEditor.js');

      // Custom formatting functions
      module.exports.FormatterTwoDigitNumber = require('./Pict-TuiGrid-Formatters.js').FormatterTwoDigitNumber;
      module.exports.FormatterCurrencyNumber = require('./Pict-TuiGrid-Formatters.js').FormatterCurrencyNumber;
      module.exports.default_configuration = require('./Pict-Section-TuiGrid-DefaultConfiguration.json');
    }, {
      "./Pict-Section-TuiGrid-CustomHeaderNone.js": 4,
      "./Pict-Section-TuiGrid-CustomNumberEditor.js": 5,
      "./Pict-Section-TuiGrid-DefaultConfiguration.json": 6,
      "./Pict-TuiGrid-Formatters.js": 8,
      "pict-view": 3
    }],
    8: [function (require, module, exports) {
      // Static functions for formatting data in the grid.
      const tuiGridFormatters = {};
      tuiGridFormatters.FormatterTwoDigitNumber = pCell => {
        let tmpCellValue = Number.parseFloat(pCell.value).toFixed(2);
        if (isNaN(tmpCellValue)) {
          return '';
        } else {
          return tmpCellValue;
        }
      };
      tuiGridFormatters.FormatterCurrencyNumber = pCell => {
        let tmpCellValue = tuiGridFormatters.FormatterTwoDigitNumber(pCell);
        if (tmpCellValue == '') {
          return tmpCellValue;
        } else {
          return "$".concat(tmpCellValue);
        }
      };
      module.exports = tuiGridFormatters;
    }, {}]
  }, {}, [7])(7);
});