"use strict";

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
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
      var FableCoreServiceProviderBase = /*#__PURE__*/function () {
        function FableCoreServiceProviderBase(pOptions, pServiceHash) {
          _classCallCheck(this, FableCoreServiceProviderBase);
          this.fable = false;
          this.options = _typeof(pOptions) === 'object' ? pOptions : {};
          this.serviceType = 'Unknown';

          // The hash will be a non-standard UUID ... the UUID service uses this base class!
          this.UUID = "CORESVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : "".concat(this.UUID);
        }
        _createClass(FableCoreServiceProviderBase, [{
          key: "connectFable",
          value:
          // After fable is initialized, it would be expected to be wired in as a normal service.
          function connectFable(pFable) {
            this.fable = pFable;
            return true;
          }
        }]);
        return FableCoreServiceProviderBase;
      }();
      _defineProperty(FableCoreServiceProviderBase, "isFableService", true);
      module.exports = FableCoreServiceProviderBase;
    }, {}],
    2: [function (require, module, exports) {
      /**
      * Fable Service Base
      * @author <steven@velozo.com>
      */
      var FableServiceProviderBase = /*#__PURE__*/_createClass(function FableServiceProviderBase(pFable, pOptions, pServiceHash) {
        _classCallCheck(this, FableServiceProviderBase);
        this.fable = pFable;
        this.options = _typeof(pOptions) === 'object' ? pOptions : _typeof(pFable) === 'object' && !pFable.isFable ? pFable : {};
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
      });
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;
      module.exports.CoreServiceProviderBase = require('./Fable-ServiceProviderBase-Preinit.js');
    }, {
      "./Fable-ServiceProviderBase-Preinit.js": 1
    }],
    3: [function (require, module, exports) {
      var libFableServiceBase = require('fable-serviceproviderbase');
      var defaultPictViewSettings = {
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
      var PictView = /*#__PURE__*/function (_libFableServiceBase) {
        _inherits(PictView, _libFableServiceBase);
        var _super = _createSuper(PictView);
        function PictView(pFable, pOptions, pServiceHash) {
          var _this;
          _classCallCheck(this, PictView);
          var tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictViewSettings)), pOptions);
          _this = _super.call(this, pFable, tmpOptions, pServiceHash);
          _this.serviceType = 'PictView';

          // Wire in the essential Pict service
          _this.AppData = _this.fable.AppData;

          // Load all templates from the array in the options
          // Templates are in the form of {Hash:'Some-Template-Hash',Template:'Template content',Source:'TemplateSource'}
          for (var i = 0; i < _this.options.Templates.length; i++) {
            var tmpTemplate = _this.options.Templates[i];
            if (!tmpTemplate.hasOwnProperty('Hash') || !tmpTemplate.hasOwnProperty('Template')) {
              _this.log.error("PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " could not load Template ").concat(i, " in the options array."), tmpTemplate);
            } else {
              if (!tmpTemplate.Source) {
                tmpTemplate.Source = "PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " options object.");
              }
              _this.fable.TemplateProvider.addTemplate(tmpTemplate.Hash, tmpTemplate.Template, tmpTemplate.Source);
            }
          }

          // Load all default templates from the array in the options
          // Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
          for (var _i = 0; _i < _this.options.DefaultTemplates.length; _i++) {
            var tmpDefaultTemplate = _this.options.DefaultTemplates[_i];
            if (!tmpDefaultTemplate.hasOwnProperty('Postfix') || !tmpDefaultTemplate.hasOwnProperty('Template')) {
              _this.log.error("PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " could not load Default Template ").concat(_i, " in the options array."), tmpDefaultTemplate);
            } else {
              if (!tmpDefaultTemplate.Source) {
                tmpDefaultTemplate.Source = "PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " options object.");
              }
              _this.fable.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
            }
          }

          // Load all renderables
          // Renderables are launchable renderable instructions with templates
          // They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
          // The only parts that are necessary are Identifier and Template
          // A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
          _this.renderables = {};
          for (var _i2 = 0; _i2 < _this.options.Renderables.length; _i2++) {
            var tmpRenderable = _this.options.Renderables[_i2];
            if (!tmpRenderable.hasOwnProperty('RenderableHash') || !tmpRenderable.hasOwnProperty('TemplateHash')) {
              _this.log.error("PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " could not load Renderable ").concat(_i2, " in the options array."), tmpRenderable);
            } else {
              _this.renderables[tmpRenderable.RenderableHash] = tmpRenderable;
            }
          }
          if (_this.options.InitializeOnLoad) {
            _this.initialize();
          }
          if (_this.options.RenderOnLoad) {
            _this.render(_this.options.DefaultRenderable, _this.options.DefaultDestinationAddress, _this.options.DefaultTemplateRecordAddress);
            _this.postInitialRenderInitialize();
          }
          return _this;
        }
        _createClass(PictView, [{
          key: "internalInitialize",
          value: function internalInitialize() {
            return true;
          }
        }, {
          key: "postInitialRenderInitialize",
          value: function postInitialRenderInitialize() {
            return true;
          }
        }, {
          key: "initialize",
          value: function initialize() {
            this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " beginning initialization..."));
            this.internalInitialize();
            this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initialization complete."));
          }
        }, {
          key: "render",
          value: function render(pRenderable, pRenderDestinationAddress, pTemplateDataAddress) {
            var tmpRenderableHash = typeof pRenderable === 'string' ? pRenderable : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;
            if (!tmpRenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it is not a valid renderable."));
              return false;
            }
            var tmpRenderable = this.renderables[tmpRenderableHash];
            if (!tmpRenderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not exist."));
              return false;
            }
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
            if (!tmpRenderDestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not have a valid destination address."));
              return false;
            }
            var tmpDataAddress = typeof pTemplateDataAddress === 'string' ? pTemplateDataAddress : typeof tmpRenderable.RecordAddress === 'string' ? tmpRenderable.RecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
            var tmpData = typeof tmpDataAddress === 'string' ? this.fable.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
            var tmpContent = this.fable.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData);
            return this.fable.ContentAssignment.assignContent(tmpRenderDestinationAddress, tmpContent);
          }
        }, {
          key: "renderAsync",
          value: function renderAsync(pRenderable, pRenderDestinationAddress, pTemplateDataAddress, fCallback) {
            var _this2 = this;
            var tmpRenderableHash = typeof pRenderable === 'string' ? pRenderable : false;
            if (!tmpRenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, "because it is not a valid renderable."));
              return fCallback(Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, "because it is not a valid renderable.")));
            }
            var tmpRenderable = this.renderables[tmpRenderableHash];
            if (!tmpRenderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not exist."));
              return fCallback(Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not exist.")));
            }
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
            if (!tmpRenderDestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not have a valid destination address."));
              return fCallback(Error("Could not render ".concat(tmpRenderableHash)));
            }
            var tmpDataAddress = typeof pTemplateDataAddress === 'string' ? pTemplateDataAddress : typeof tmpRenderable.RecordAddress === 'string' ? tmpRenderable.RecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
            var tmpData = typeof tmpDataAddress === 'string' ? this.fable.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
            this.fable.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData, function (pError, pContent) {
              if (pError) {
                _this2.log.error("PictView [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.ViewIdentifier, " could not render (asynchronously) ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it did not parse the template."), pError);
                return fCallback(pError);
              }
              _this2.fable.ContentAssignment.assignContent(tmpRenderDestinationAddress, pContent);
              return fCallback(null, pContent);
            });
          }
        }]);
        return PictView;
      }(libFableServiceBase);
      module.exports = PictView;
    }, {
      "fable-serviceproviderbase": 2
    }],
    4: [function (require, module, exports) {
      module.exports = {
        "RenderOnLoad": true,
        "GridWidth": "auto",
        "GridRowHeight": 40,
        "GridBodyHeight": "auto",
        "GridBodyMinHeight": 130,
        "GridColumnMinWidth": 50,
        "GridColumnWidthResizable": true,
        "GridColumnHeightResizable": false,
        "GridColumnFrozenCount": 0,
        "GridColumnFrozenBorderWidth": 3,
        "GridScrollX": true,
        "GridScrollY": true,
        "GridShowDummyRows": false,
        "GridDraggableRows": false,
        "GridSelectionUnit": "cell",
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
    5: [function (require, module, exports) {
      var libPictViewClass = require('pict-view');
      var PictSectionTuiGrid = /*#__PURE__*/function (_libPictViewClass) {
        _inherits(PictSectionTuiGrid, _libPictViewClass);
        var _super2 = _createSuper(PictSectionTuiGrid);
        function PictSectionTuiGrid(pFable, pOptions, pServiceHash) {
          var _this3;
          _classCallCheck(this, PictSectionTuiGrid);
          var tmpOptions = Object.assign({}, require('./Pict-Section-TuiGrid-DefaultConfiguration.json'), pOptions);
          _this3 = _super2.call(this, pFable, tmpOptions, pServiceHash);
          _this3._tuiGridPrototype = false;
          _this3.tuiGrid = false;
          _this3.customHeaders = require('./Pict-TuiGrid-Headers.js');
          _this3.customEditors = require('./Pict-TuiGrid-Editors.js');
          _this3.customFormatters = require('./Pict-TuiGrid-Formatters.js');
          _this3.columnSchema = false;
          _this3.targetElementAddress = false;
          _this3.gridData = false;
          return _this3;
        }

        // Overload the connectTuiGrid() function to use the inline version of the TuiGrid
        _createClass(PictSectionTuiGrid, [{
          key: "connectTuiGridPrototype",
          value: function connectTuiGridPrototype(pTuiGridPrototype) {
            if (typeof pTuiGridPrototype != 'undefined') {
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
        }, {
          key: "changeHandler",
          value: function changeHandler(pChangeData) {
            var tmpSolverNecessary = false;
            for (var i = 0; i < pChangeData.changes.length; i++) {
              var tmpEntity = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'entity');
              var tmpIDRecord = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'idrecord');
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
        }, {
          key: "postInitialRenderInitialize",
          value: function postInitialRenderInitialize() {
            var _this4 = this;
            // This is where we wire up and initialize the tuigrid control -- the initial render has put the placeholder content in place.
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
              var tmpAddressedData = this.fable.manifest.getValueByHash(this.AppData, this.options.GridDataAddress);
              if (_typeof(tmpAddressedData) != 'object') {
                this.log.error("Address for GridData [".concat(this.options.GridDataAddress, "] did not return an object; it was a ").concat(_typeof(tmpAddressedData), "."));
                this.gridData = [];
              } else {
                this.gridData = JSON.parse(JSON.stringify(tmpAddressedData));
              }
            } else {
              this.gridData = [];
            }
            this.targetElement = this.defaultServices.ContentAssignment.getElement(this.options.TargetElementAddress);

            // TODO: Guard on element not matching?  What's best pattern when this isn't always interactive.
            if (this.targetElement.length < 1) {
              this.log.error("Could not find target element [".concat(this.options.TargetElementAddress, "] for TuiGrid!  Rendering won't function properly."));
              this.targetElement = false;
              return false;
            } else {
              // If it matches more than one element, it's still going to write to the first.  What do you expect!
              this.targetElement = this.targetElement[0];
            }

            // Check to see if there are any custom formatters.
            this.columnSchema = this.options.TuiColumnSchema;
            // Setup the solver and custom schema handlers.
            for (var i = 0; i < this.columnSchema.length; i++) {
              var tmpColumn = this.columnSchema[i];
              // If this bit is set on a column, the Form solver will trigger each time a change happens to that column.
              if (tmpColumn.PictTriggerSolveOnChange) {
                this.options.ColumnsToSolveOnChange[tmpColumn.name] = tmpColumn;
              }
              // Look to see if there is an internal formatter that matches the type
              if (tmpColumn.hasOwnProperty('formatter') && this.customFormatters.hasOwnProperty(tmpColumn.formatter)) {
                // Assign our special formatter to the column.
                tmpColumn.formatter = this.customFormatters[tmpColumn.formatter];
              }
              // Look to see if there is an editor stanza
              if (tmpColumn.hasOwnProperty('editor')) {
                // Look to see if there is an internal editor that matches the type
                if (tmpColumn.editor.hasOwnProperty('type') && typeof tmpColumn.editor.type == 'string' && this.customEditors.hasOwnProperty(tmpColumn.editor.type)) {
                  // Assign our special editor to the column.
                  tmpColumn.editor.type = this.customEditors[tmpColumn.editor.type];
                }

                // Look to see if there is an internal editor that matches the type
                if (tmpColumn.editor.hasOwnProperty('options') && _typeof(tmpColumn.editor.options) == 'object' && tmpColumn.editor.options.hasOwnProperty('listItems') && typeof tmpColumn.editor.options.listItems == 'string') {
                  // Look for this address!  For the Record object, we will pass in the options.
                  var tmpListItems = this.fable.manifest.getValueByHash({
                    AppData: this.AppData,
                    Options: this.options
                  }, tmpColumn.editor.options.listItems);
                  if (_typeof(tmpListItems) == 'object') {
                    tmpColumn.editor.options.listItems = tmpListItems;
                  } else {
                    this.log.warn("Pict TuiGrid for column [".concat(tmpColumn.name, "] had [").concat(tmpColumn.editor.options.listItems, "] as a listItems address, but it didn't return an object.  It was a [").concat(_typeof(tmpListItems), "].  Setting to empty list."));
                    tmpColumn.editor.options.listItems = [];
                  }
                }
              }
            }
            var libTuiGrid = this._tuiGridPrototype;
            this.tuiGrid = new libTuiGrid({
              data: this.gridData,
              el: this.targetElement,
              columns: this.columnSchema,
              // This is no bueno, yo
              usageStatistics: false,
              scrollY: this.options.GridScrollY,
              columnOptions: {
                resizable: this.options.GridColumnWidthResizable
              }
            });
            this.tuiGrid.on('afterChange', function (pChangeData) {
              _this4.changeHandler(pChangeData);
            });
          }
        }, {
          key: "SetGridValue",
          value: function SetGridValue(pCellColumnToBeSet, pCellValueToSet, pLookupValue, pLookupColumn) {
            if (typeof pLookupValue == 'undefined') {
              console.log("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by [").concat(pLookupColumn, "]::[").concat(pLookupValue, "].  No valid lookup value!"));
              return false;
            }
            if (this.tuiGrid) {
              var tmpData = this.tuiGrid.getData();
              for (var i = 0; i < tmpData.length; i++) {
                var tmpRecord = tmpData[i];
                if (tmpRecord[pLookupColumn] == pLookupValue) {
                  this.tuiGrid.setValue(i, pCellColumnToBeSet, pCellValueToSet);
                }
              }
            } else {
              this.log.warn("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by [").concat(pLookupColumn, "]::[").concat(pLookupValue, "].  No valid grid!"));
            }
          }
        }, {
          key: "SetGridValueByRowKey",
          value: function SetGridValueByRowKey(pCellColumnToBeSet, pCellValueToSet, pRowKey) {
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
        }]);
        return PictSectionTuiGrid;
      }(libPictViewClass);
      module.exports = PictSectionTuiGrid;
      module.exports.default_configuration = require('./Pict-Section-TuiGrid-DefaultConfiguration.json');
    }, {
      "./Pict-Section-TuiGrid-DefaultConfiguration.json": 4,
      "./Pict-TuiGrid-Editors.js": 7,
      "./Pict-TuiGrid-Formatters.js": 8,
      "./Pict-TuiGrid-Headers.js": 9,
      "pict-view": 3
    }],
    6: [function (require, module, exports) {
      // Custom number editor class with an option for precision
      var tuiCustomEditorNumber = /*#__PURE__*/function () {
        function tuiCustomEditorNumber(pProperties) {
          _classCallCheck(this, tuiCustomEditorNumber);
          var tmpElement = document.createElement('input');
          var decimalPrecision = pProperties.columnInfo.editor.options.decimalPrecision ? pProperties.columnInfo.editor.options.decimalPrecision : 3;
          tmpElement.type = 'number';
          tmpElement.value = String(pProperties.value);
          tmpElement.oninput = function (pElement) {
            var tmpCastNumber = parseFloat(pElement.target.value).toFixed(decimalPrecision).toString();
            if (tmpCastNumber.length < parseFloat(pElement.target.value).toString().length) {
              pElement.target.value = tmpCastNumber;
            }
          };
          this.Element = tmpElement;
        }
        _createClass(tuiCustomEditorNumber, [{
          key: "getElement",
          value: function getElement() {
            return this.Element;
          }
        }, {
          key: "getValue",
          value: function getValue() {
            return this.Element.value;
          }
        }, {
          key: "mounted",
          value: function mounted() {
            this.Element.select();
          }
        }]);
        return tuiCustomEditorNumber;
      }();
      module.exports = tuiCustomEditorNumber;
    }, {}],
    7: [function (require, module, exports) {
      var tuiGridHeaders = {};
      tuiGridHeaders.EditorNumber = require('./Pict-TuiGrid-Editor-Number.js');
      module.exports = tuiGridHeaders;
    }, {
      "./Pict-TuiGrid-Editor-Number.js": 6
    }],
    8: [function (require, module, exports) {
      // Static functions for formatting data in the grid.
      var tuiGridFormatters = {};
      tuiGridFormatters.FormatterTwoDigitNumber = function (pCell) {
        var tmpCellValue = Number.parseFloat(pCell.value).toFixed(2);
        if (isNaN(tmpCellValue)) {
          return '';
        } else {
          return tmpCellValue;
        }
      };
      tuiGridFormatters.FormatterCurrencyNumber = function (pCell) {
        var tmpCellValue = tuiGridFormatters.FormatterTwoDigitNumber(pCell);
        if (tmpCellValue == '') {
          return tmpCellValue;
        } else {
          return "$".concat(tmpCellValue);
        }
      };
      module.exports = tuiGridFormatters;
    }, {}],
    9: [function (require, module, exports) {
      var tuiGridHeaders = {};

      // Custom column header where the header is hidden
      var tuiCustomColumnHeaderNone = /*#__PURE__*/function () {
        function tuiCustomColumnHeaderNone() {
          _classCallCheck(this, tuiCustomColumnHeaderNone);
          var tmpElement = document.createElement('input');
          tmpElement.type = 'hidden';
          tmpElement.value = '';
          this.Element = tmpElement;
        }
        _createClass(tuiCustomColumnHeaderNone, [{
          key: "getElement",
          value: function getElement() {
            return this.Element;
          }
        }, {
          key: "render",
          value: function render() {
            // Noop!
          }
        }]);
        return tuiCustomColumnHeaderNone;
      }();
      tuiGridHeaders.CustomColumnHeaderNone = tuiCustomColumnHeaderNone;
      module.exports = tuiGridHeaders;
    }, {}]
  }, {}, [5])(5);
});