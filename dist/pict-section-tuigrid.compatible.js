"use strict";

function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      module.exports = {
        "name": "fable-serviceproviderbase",
        "version": "3.0.15",
        "description": "Simple base classes for fable services.",
        "main": "source/Fable-ServiceProviderBase.js",
        "scripts": {
          "start": "node source/Fable-ServiceProviderBase.js",
          "test": "npx mocha -u tdd -R spec",
          "tests": "npx mocha -u tdd --exit -R spec --grep",
          "coverage": "npx nyc --reporter=lcov --reporter=text-lcov npx mocha -- -u tdd -R spec",
          "build": "npx quack build"
        },
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase.git"
        },
        "keywords": ["entity", "behavior"],
        "author": "Steven Velozo <steven@velozo.com> (http://velozo.com/)",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase/issues"
        },
        "homepage": "https://github.com/stevenvelozo/fable-serviceproviderbase",
        "devDependencies": {
          "fable": "^3.0.143",
          "quackage": "^1.0.33"
        }
      };
    }, {}],
    2: [function (require, module, exports) {
      /**
      * Fable Service Base
      * @author <steven@velozo.com>
      */

      var libPackage = require('../package.json');
      var FableServiceProviderBase = /*#__PURE__*/function () {
        // The constructor can be used in two ways:
        // 1) With a fable, options object and service hash (the options object and service hash are optional)
        // 2) With an object or nothing as the first parameter, where it will be treated as the options object
        function FableServiceProviderBase(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, FableServiceProviderBase);
          // Check if a fable was passed in; connect it if so
          if (_typeof(pFable) === 'object' && pFable.isFable) {
            this.connectFable(pFable);
          } else {
            this.fable = false;
          }

          // Initialize the services map if it wasn't passed in
          /** @type {Object} */
          this._PackageFableServiceProvider = libPackage;

          // initialize options and UUID based on whether the fable was passed in or not.
          if (this.fable) {
            this.UUID = pFable.getUUID();
            this.options = _typeof(pOptions) === 'object' ? pOptions : {};
          } else {
            // With no fable, check to see if there was an object passed into either of the first two
            // Parameters, and if so, treat it as the options object
            this.options = _typeof(pFable) === 'object' && !pFable.isFable ? pFable : _typeof(pOptions) === 'object' ? pOptions : {};
            this.UUID = "CORE-SVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          }

          // It's expected that the deriving class will set this
          this.serviceType = "Unknown-".concat(this.UUID);

          // The service hash is used to identify the specific instantiation of the service in the services map
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : !this.fable && typeof pOptions === 'string' ? pOptions : "".concat(this.UUID);
        }
        return _createClass(FableServiceProviderBase, [{
          key: "connectFable",
          value: function connectFable(pFable) {
            if (_typeof(pFable) !== 'object' || !pFable.isFable) {
              var tmpErrorMessage = "Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [".concat(_typeof(pFable), "].}");
              console.log(tmpErrorMessage);
              return new Error(tmpErrorMessage);
            }
            if (!this.fable) {
              this.fable = pFable;
            }
            if (!this.log) {
              this.log = this.fable.Logging;
            }
            if (!this.services) {
              this.services = this.fable.services;
            }
            if (!this.servicesMap) {
              this.servicesMap = this.fable.servicesMap;
            }
            return true;
          }
        }]);
      }();
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;

      // This is left here in case we want to go back to having different code/base class for "core" services
      module.exports.CoreServiceProviderBase = FableServiceProviderBase;
    }, {
      "../package.json": 1
    }],
    3: [function (require, module, exports) {
      module.exports = {
        "name": "pict-view",
        "version": "1.0.61",
        "description": "Pict View Base Class",
        "main": "source/Pict-View.js",
        "scripts": {
          "test": "./node_modules/.bin/mocha -u tdd -R spec",
          "start": "node source/Pict-View.js",
          "coverage": "./node_modules/.bin/nyc --reporter=lcov --reporter=text-lcov ./node_modules/mocha/bin/_mocha -- -u tdd -R spec",
          "build": "npx quack build",
          "docker-dev-build": "docker build ./ -f Dockerfile_LUXURYCode -t pict-view-image:local",
          "docker-dev-run": "docker run -it -d --name pict-view-dev -p 30001:8080 -p 38086:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/pict-view\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" pict-view-image:local",
          "docker-dev-shell": "docker exec -it pict-view-dev /bin/bash",
          "types": "tsc -p .",
          "lint": "eslint source/**"
        },
        "types": "types/source/Pict-View.d.ts",
        "repository": {
          "type": "git",
          "url": "git+https://github.com/stevenvelozo/pict-view.git"
        },
        "author": "steven velozo <steven@velozo.com>",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/pict-view/issues"
        },
        "homepage": "https://github.com/stevenvelozo/pict-view#readme",
        "devDependencies": {
          "@eslint/js": "^9.28.0",
          "browser-env": "^3.3.0",
          "eslint": "^9.28.0",
          "pict": "^1.0.272",
          "quackage": "^1.0.41",
          "typescript": "^5.8.3"
        },
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        },
        "dependencies": {
          "fable": "^3.1.11",
          "fable-serviceproviderbase": "^3.0.15"
        }
      };
    }, {}],
    4: [function (require, module, exports) {
      var libFableServiceBase = require('fable-serviceproviderbase');
      var libPackage = require('../package.json');
      var defaultPictViewSettings = {
        DefaultRenderable: false,
        DefaultDestinationAddress: false,
        DefaultTemplateRecordAddress: false,
        ViewIdentifier: false,
        // If this is set to true, when the App initializes this will.
        // After the App initializes, initialize will be called as soon as it's added.
        AutoInitialize: true,
        AutoInitializeOrdinal: 0,
        // If this is set to true, when the App autorenders (on load) this will.
        // After the App initializes, render will be called as soon as it's added.
        AutoRender: true,
        AutoRenderOrdinal: 0,
        AutoSolveWithApp: true,
        AutoSolveOrdinal: 0,
        CSSHash: false,
        CSS: false,
        CSSProvider: false,
        CSSPriority: 500,
        Templates: [],
        DefaultTemplates: [],
        Renderables: [],
        Manifests: {}
      };

      /** @typedef {(error?: Error) => void} ErrorCallback */
      /** @typedef {number | boolean} PictTimestamp */

      /**
       * @typedef {'replace' | 'append' | 'prepend' | 'append_once'} RenderMethod
       */
      /**
       * @typedef {Object} Renderable
       *
       * @property {string} RenderableHash - A unique hash for the renderable.
       * @property {string} TemplateHash] - The hash of the template to use for rendering this renderable.
       * @property {string} [DefaultTemplateRecordAddress] - The default address for resolving the data record for this renderable.
       * @property {string} [ContentDestinationAddress] - The default address (DOM CSS selector) for rendering the content of this renderable.
       * @property {RenderMethod} [RenderMethod=replace] - The method to use when projecting the renderable to the DOM ('replace', 'append', 'prepend', 'append_once').
       * @property {string} [TestAddress] - The address to use for testing the renderable.
       */

      /**
       * Represents a view in the Pict ecosystem.
       */
      var PictView = /*#__PURE__*/function (_libFableServiceBase) {
        /**
         * @param {any} pFable - The Fable object that this service is attached to.
         * @param {any} [pOptions] - (optional) The options for this service.
         * @param {string} [pServiceHash] - (optional) The hash of the service.
         */
        function PictView(pFable, pOptions, pServiceHash) {
          var _this;
          _classCallCheck(this, PictView);
          // Intersect default options, parent constructor, service information
          var tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictViewSettings)), pOptions);
          _this = _callSuper(this, PictView, [pFable, tmpOptions, pServiceHash]);
          //FIXME: add types to fable and ancillaries
          /** @type {any} */
          _this.fable;
          /** @type {any} */
          _this.options;
          /** @type {String} */
          _this.UUID;
          /** @type {String} */
          _this.Hash;
          /** @type {any} */
          _this.log;
          if (!_this.options.ViewIdentifier) {
            _this.options.ViewIdentifier = "AutoViewID-".concat(_this.fable.getUUID());
          }
          _this.serviceType = 'PictView';
          /** @type {Record<string, any>} */
          _this._Package = libPackage;
          // Convenience and consistency naming
          /** @type {import('pict') & { log: any, instantiateServiceProviderWithoutRegistration: (hash: String) => any }} */
          _this.pict = _this.fable;
          // Wire in the essential Pict application state
          _this.AppData = _this.pict.AppData;
          _this.Bundle = _this.pict.Bundle;

          /** @type {PictTimestamp} */
          _this.initializeTimestamp = false;
          /** @type {PictTimestamp} */
          _this.lastSolvedTimestamp = false;
          /** @type {PictTimestamp} */
          _this.lastRenderedTimestamp = false;
          /** @type {PictTimestamp} */
          _this.lastMarshalFromViewTimestamp = false;
          /** @type {PictTimestamp} */
          _this.lastMarshalToViewTimestamp = false;

          // Load all templates from the array in the options
          // Templates are in the form of {Hash:'Some-Template-Hash',Template:'Template content',Source:'TemplateSource'}
          for (var i = 0; i < _this.options.Templates.length; i++) {
            var tmpTemplate = _this.options.Templates[i];
            if (!('Hash' in tmpTemplate) || !('Template' in tmpTemplate)) {
              _this.log.error("PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " could not load Template ").concat(i, " in the options array."), tmpTemplate);
            } else {
              if (!tmpTemplate.Source) {
                tmpTemplate.Source = "PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " options object.");
              }
              _this.pict.TemplateProvider.addTemplate(tmpTemplate.Hash, tmpTemplate.Template, tmpTemplate.Source);
            }
          }

          // Load all default templates from the array in the options
          // Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
          for (var _i = 0; _i < _this.options.DefaultTemplates.length; _i++) {
            var tmpDefaultTemplate = _this.options.DefaultTemplates[_i];
            if (!('Postfix' in tmpDefaultTemplate) || !('Template' in tmpDefaultTemplate)) {
              _this.log.error("PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " could not load Default Template ").concat(_i, " in the options array."), tmpDefaultTemplate);
            } else {
              if (!tmpDefaultTemplate.Source) {
                tmpDefaultTemplate.Source = "PictView [".concat(_this.UUID, "]::[").concat(_this.Hash, "] ").concat(_this.options.ViewIdentifier, " options object.");
              }
              _this.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
            }
          }

          // Load the CSS if it's available
          if (_this.options.CSS) {
            var tmpCSSHash = _this.options.CSSHash ? _this.options.CSSHash : "View-".concat(_this.options.ViewIdentifier);
            var tmpCSSProvider = _this.options.CSSProvider ? _this.options.CSSProvider : tmpCSSHash;
            _this.pict.CSSMap.addCSS(tmpCSSHash, _this.options.CSS, tmpCSSProvider, _this.options.CSSPriority);
          }

          // Load all renderables
          // Renderables are launchable renderable instructions with templates
          // They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
          // The only parts that are necessary are Identifier and Template
          // A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
          /** @type {Object<String, Renderable>} */
          _this.renderables = {};
          for (var _i2 = 0; _i2 < _this.options.Renderables.length; _i2++) {
            /** @type {Renderable} */
            var tmpRenderable = _this.options.Renderables[_i2];
            _this.addRenderable(tmpRenderable);
          }
          return _this;
        }

        /**
         * Adds a renderable to the view.
         *
         * @param {string | Renderable} pRenderableHash - The hash of the renderable, or a renderable object.
         * @param {string} [pTemplateHash] - (optional) The hash of the template for the renderable.
         * @param {string} [pDefaultTemplateRecordAddress] - (optional) The default data address for the template.
         * @param {string} [pDefaultDestinationAddress] - (optional) The default destination address for the renderable.
         * @param {RenderMethod} [pRenderMethod=replace] - (optional) The method to use when rendering the renderable (ex. 'replace').
         */
        _inherits(PictView, _libFableServiceBase);
        return _createClass(PictView, [{
          key: "addRenderable",
          value: function addRenderable(pRenderableHash, pTemplateHash, pDefaultTemplateRecordAddress, pDefaultDestinationAddress, pRenderMethod) {
            /** @type {Renderable} */
            var tmpRenderable;
            if (_typeof(pRenderableHash) == 'object') {
              // The developer passed in the renderable as an object.
              // Use theirs instead!
              tmpRenderable = pRenderableHash;
            } else {
              /** @type {RenderMethod} */
              var tmpRenderMethod = typeof pRenderMethod !== 'string' ? pRenderMethod : 'replace';
              tmpRenderable = {
                RenderableHash: pRenderableHash,
                TemplateHash: pTemplateHash,
                DefaultTemplateRecordAddress: pDefaultTemplateRecordAddress,
                ContentDestinationAddress: pDefaultDestinationAddress,
                RenderMethod: tmpRenderMethod
              };
            }
            if (typeof tmpRenderable.RenderableHash != 'string' || typeof tmpRenderable.TemplateHash != 'string') {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not load Renderable; RenderableHash or TemplateHash are invalid."), tmpRenderable);
            } else {
              if (this.pict.LogNoisiness > 0) {
                this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " adding renderable [").concat(tmpRenderable.RenderableHash, "] pointed to template ").concat(tmpRenderable.TemplateHash, "."));
              }
              this.renderables[tmpRenderable.RenderableHash] = tmpRenderable;
            }
          }

          /* -------------------------------------------------------------------------- */
          /*                        Code Section: Initialization                        */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before the view is initialized.
           */
        }, {
          key: "onBeforeInitialize",
          value: function onBeforeInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeInitialize:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before the view is initialized (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeInitializeAsync",
          value: function onBeforeInitializeAsync(fCallback) {
            this.onBeforeInitialize();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when the view is initialized.
           */
        }, {
          key: "onInitialize",
          value: function onInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onInitialize:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when the view is initialized (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onInitializeAsync",
          value: function onInitializeAsync(fCallback) {
            this.onInitialize();
            return fCallback();
          }

          /**
           * Performs view initialization.
           */
        }, {
          key: "initialize",
          value: function initialize() {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initialize:"));
            }
            if (!this.initializeTimestamp) {
              this.onBeforeInitialize();
              this.onInitialize();
              this.onAfterInitialize();
              this.initializeTimestamp = this.pict.log.getTimeStamp();
              return true;
            } else {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initialize called but initialization is already completed.  Aborting."));
              return false;
            }
          }

          /**
           * Performs view initialization (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "initializeAsync",
          value: function initializeAsync(fCallback) {
            var _this2 = this;
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initializeAsync:"));
            }
            if (!this.initializeTimestamp) {
              var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');
              if (this.pict.LogNoisiness > 0) {
                this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " beginning initialization..."));
              }
              tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));
              tmpAnticipate.wait(/** @param {Error} pError */
              function (pError) {
                if (pError) {
                  _this2.log.error("PictView [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.ViewIdentifier, " initialization failed: ").concat(pError.message || pError), {
                    stack: pError.stack
                  });
                }
                _this2.initializeTimestamp = _this2.pict.log.getTimeStamp();
                if (_this2.pict.LogNoisiness > 0) {
                  _this2.log.info("PictView [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.ViewIdentifier, " initialization complete."));
                }
                return fCallback();
              });
            } else {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " async initialize called but initialization is already completed.  Aborting."));
              // TODO: Should this be an error?
              return fCallback();
            }
          }
        }, {
          key: "onAfterInitialize",
          value: function onAfterInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterInitialize:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after the view is initialized (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterInitializeAsync",
          value: function onAfterInitializeAsync(fCallback) {
            this.onAfterInitialize();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                            Code Section: Render                            */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before the view is rendered.
           *
           * @param {Renderable} pRenderable - The renderable that will be rendered.
           * @param {string} pRenderDestinationAddress - The address where the renderable will be rendered.
           * @param {any} pRecord - The record (data) that will be used to render the renderable.
           */
        }, {
          key: "onBeforeRender",
          value: function onBeforeRender(pRenderable, pRenderDestinationAddress, pRecord) {
            // Overload this to mess with stuff before the content gets generated from the template
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeRender:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before the view is rendered (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeRenderAsync",
          value: function onBeforeRenderAsync(fCallback) {
            return fCallback();
          }

          /**
           * Builds the render options for a renderable.
           *
           * For DRY purposes on the three flavors of render.
           *
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           */
        }, {
          key: "buildRenderOptions",
          value: function buildRenderOptions(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress) {
            var tmpRenderOptions = {
              Valid: true
            };
            tmpRenderOptions.RenderableHash = typeof pRenderableHash === 'string' ? pRenderableHash : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;
            if (!tmpRenderOptions.RenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not find a suitable RenderableHash ").concat(tmpRenderOptions.RenderableHash, " (param ").concat(pRenderableHash, "because it is not a valid renderable."));
              tmpRenderOptions.Valid = false;
            }
            tmpRenderOptions.Renderable = this.renderables[tmpRenderOptions.RenderableHash];
            if (!tmpRenderOptions.Renderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderOptions.RenderableHash, " (param ").concat(pRenderableHash, ") because it does not exist."));
              tmpRenderOptions.Valid = false;
            }
            tmpRenderOptions.DestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderOptions.Renderable.ContentDestinationAddress === 'string' ? tmpRenderOptions.Renderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
            if (!tmpRenderOptions.DestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderOptions.RenderableHash, " (param ").concat(pRenderableHash, ") because it does not have a valid destination address (param ").concat(pRenderDestinationAddress, ")."));
              tmpRenderOptions.Valid = false;
            }
            if (_typeof(pTemplateRecordAddress) === 'object') {
              tmpRenderOptions.RecordAddress = 'Passed in as object';
              tmpRenderOptions.Record = pTemplateRecordAddress;
            } else {
              tmpRenderOptions.RecordAddress = typeof pTemplateRecordAddress === 'string' ? pTemplateRecordAddress : typeof tmpRenderOptions.Renderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderOptions.Renderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
              tmpRenderOptions.Record = typeof tmpRenderOptions.RecordAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpRenderOptions.RecordAddress) : undefined;
            }
            return tmpRenderOptions;
          }

          /**
           * Assigns the content to the destination address.
           *
           * For DRY purposes on the three flavors of render.
           *
           * @param {Renderable} pRenderable - The renderable to render.
           * @param {string} pRenderDestinationAddress - The address where the renderable will be rendered.
           * @param {string} pContent - The content to render.
           * @returns {boolean} - Returns true if the content was assigned successfully.
           * @memberof PictView
           */
        }, {
          key: "assignRenderContent",
          value: function assignRenderContent(pRenderable, pRenderDestinationAddress, pContent) {
            return this.pict.ContentAssignment.projectContent(pRenderable.RenderMethod, pRenderDestinationAddress, pContent, pRenderable.TestAddress);
          }

          /**
           * Render a renderable from this view.
           *
           * @param {string} [pRenderable] - The hash of the renderable to render.
           * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object} [pTemplateRecordAddress] - The address where the data for the template is stored.
           * @return {boolean}
           */
        }, {
          key: "render",
          value: function render(pRenderable, pRenderDestinationAddress, pTemplateRecordAddress) {
            var tmpRenderableHash = typeof pRenderable === 'string' ? pRenderable : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;
            if (!tmpRenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it is not a valid renderable."));
              return false;
            }
            var tmpRenderable;
            if (tmpRenderableHash == '__Virtual') {
              tmpRenderable = {
                RenderableHash: '__Virtual',
                TemplateHash: this.renderables[this.options.DefaultRenderable].TemplateHash,
                DestinationAddress: pRenderDestinationAddress,
                RenderMethod: 'virtual-assignment'
              };
            } else {
              tmpRenderable = this.renderables[tmpRenderableHash];
            }
            if (!tmpRenderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not exist."));
              return false;
            }
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
            if (!tmpRenderDestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it does not have a valid destination address."));
              return false;
            }
            var tmpRecordAddress;
            var tmpRecord;
            if (_typeof(pTemplateRecordAddress) === 'object') {
              tmpRecord = pTemplateRecordAddress;
              tmpRecordAddress = 'Passed in as object';
            } else {
              tmpRecordAddress = typeof pTemplateRecordAddress === 'string' ? pTemplateRecordAddress : typeof tmpRenderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
              tmpRecord = typeof tmpRecordAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpRecordAddress) : undefined;
            }

            // Execute the developer-overridable pre-render behavior
            this.onBeforeRender(tmpRenderable, tmpRenderDestinationAddress, tmpRecord);
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateRecordAddress[").concat(tmpRecordAddress, "] render:"));
            }
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Beginning Render of Renderable[").concat(tmpRenderableHash, "] to Destination [").concat(tmpRenderDestinationAddress, "]..."));
            }
            // Generate the content output from the template and data
            var tmpContent = this.pict.parseTemplateByHash(tmpRenderable.TemplateHash, tmpRecord, null, [this]);
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Assigning Renderable[").concat(tmpRenderableHash, "] content length ").concat(tmpContent.length, " to Destination [").concat(tmpRenderDestinationAddress, "] using render method [").concat(tmpRenderable.RenderMethod, "]."));
            }

            // Assign the content to the destination address
            this.pict.ContentAssignment.projectContent(tmpRenderable.RenderMethod, tmpRenderDestinationAddress, tmpContent, tmpRenderable.TestAddress);

            // Execute the developer-overridable post-render behavior
            this.onAfterRender(tmpRenderable, tmpRenderDestinationAddress, tmpRecord, tmpContent);
            this.lastRenderedTimestamp = this.pict.log.getTimeStamp();
            return true;
          }

          /**
           * Render a renderable from this view.
           *
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address where the data for the template is stored.
           * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
           *
           * @return {void}
           */
        }, {
          key: "renderAsync",
          value: function renderAsync(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, fCallback) {
            var _this3 = this;
            var tmpRenderableHash = typeof pRenderableHash === 'string' ? pRenderableHash : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;

            // Allow the callback to be passed in as the last parameter no matter what
            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : typeof pTemplateRecordAddress === 'function' ? pTemplateRecordAddress : typeof pRenderDestinationAddress === 'function' ? pRenderDestinationAddress : typeof pRenderableHash === 'function' ? pRenderableHash : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this3.log.error("PictView [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.Name, " renderAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (!tmpRenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, "because it is not a valid renderable."));
              return tmpCallback(new Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, "because it is not a valid renderable.")));
            }
            var tmpRenderable;
            if (tmpRenderableHash == '__Virtual') {
              tmpRenderable = {
                RenderableHash: '__Virtual',
                TemplateHash: this.renderables[this.options.DefaultRenderable].TemplateHash,
                DestinationAddress: pRenderDestinationAddress,
                RenderMethod: 'virtual-assignment'
              };
            } else {
              tmpRenderable = this.renderables[tmpRenderableHash];
            }
            if (!tmpRenderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not exist."));
              return tmpCallback(new Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not exist.")));
            }
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
            if (!tmpRenderDestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not have a valid destination address."));
              return tmpCallback(new Error("Could not render ".concat(tmpRenderableHash)));
            }
            var tmpRecordAddress;
            var tmpRecord;
            if (_typeof(pTemplateRecordAddress) === 'object') {
              tmpRecord = pTemplateRecordAddress;
              tmpRecordAddress = 'Passed in as object';
            } else {
              tmpRecordAddress = typeof pTemplateRecordAddress === 'string' ? pTemplateRecordAddress : typeof tmpRenderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
              tmpRecord = typeof tmpRecordAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpRecordAddress) : undefined;
            }
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateRecordAddress[").concat(tmpRecordAddress, "] renderAsync:"));
            }
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Beginning Asynchronous Render (callback-style)..."));
            }
            var tmpAnticipate = this.fable.newAnticipate();
            tmpAnticipate.anticipate(function (fOnBeforeRenderCallback) {
              _this3.onBeforeRender(tmpRenderable, tmpRenderDestinationAddress, tmpRecord);
              _this3.onBeforeRenderAsync(fOnBeforeRenderCallback);
            });
            var tmpContent;
            tmpAnticipate.anticipate(function (fAsyncTemplateCallback) {
              // Render the template (asynchronously)
              _this3.pict.parseTemplateByHash(tmpRenderable.TemplateHash, tmpRecord, function (pError, pContent) {
                if (pError) {
                  _this3.log.error("PictView [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.ViewIdentifier, " could not render (asynchronously) ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it did not parse the template."), pError);
                  return fAsyncTemplateCallback(pError);
                }
                tmpContent = pContent;
                if (_this3.pict.LogNoisiness > 0) {
                  _this3.log.trace("PictView [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.ViewIdentifier, " Assigning Renderable[").concat(tmpRenderableHash, "] content length ").concat(pContent.length, " to Destination [").concat(tmpRenderDestinationAddress, "] using Async render method ").concat(tmpRenderable.RenderMethod, "."));
                }
                _this3.pict.ContentAssignment.projectContent(tmpRenderable.RenderMethod, tmpRenderDestinationAddress, pContent, tmpRenderable.TestAddress);

                // Execute the developer-overridable asynchronous post-render behavior
                _this3.lastRenderedTimestamp = _this3.pict.log.getTimeStamp();
                return fAsyncTemplateCallback();
              }, [_this3]);
            });
            tmpAnticipate.anticipate(function (fOnAfterRenderCallback) {
              _this3.onAfterRender(tmpRenderable, tmpRenderDestinationAddress, tmpRecord, tmpContent);
              _this3.onAfterRenderAsync(fOnAfterRenderCallback);
            });
            tmpAnticipate.wait(tmpCallback);
          }

          /**
           * Renders the default renderable.
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "renderDefaultAsync",
          value: function renderDefaultAsync(fCallback) {
            // Render the default renderable
            this.renderAsync(fCallback);
          }

          /**
           * @param {string} [pRenderableHash] - The hash of the renderable to render.
           * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           */
        }, {
          key: "basicRender",
          value: function basicRender(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress) {
            var tmpRenderOptions = this.buildRenderOptions(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress);
            if (tmpRenderOptions.Valid) {
              this.assignRenderContent(tmpRenderOptions.Renderable, tmpRenderOptions.DestinationAddress, this.pict.parseTemplateByHash(tmpRenderOptions.Renderable.TemplateHash, tmpRenderOptions.Record, null, [this]));
              return true;
            } else {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not perform a basic render of ").concat(tmpRenderOptions.RenderableHash, " because it is not valid."));
              return false;
            }
          }

          /**
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|Object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
           */
        }, {
          key: "basicRenderAsync",
          value: function basicRenderAsync(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, fCallback) {
            var _this4 = this;
            // Allow the callback to be passed in as the last parameter no matter what
            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : typeof pTemplateRecordAddress === 'function' ? pTemplateRecordAddress : typeof pRenderDestinationAddress === 'function' ? pRenderDestinationAddress : typeof pRenderableHash === 'function' ? pRenderableHash : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " basicRenderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this4.log.error("PictView [".concat(_this4.UUID, "]::[").concat(_this4.Hash, "] ").concat(_this4.options.Name, " basicRenderAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            var tmpRenderOptions = this.buildRenderOptions(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress);
            if (tmpRenderOptions.Valid) {
              this.pict.parseTemplateByHash(tmpRenderOptions.Renderable.TemplateHash, tmpRenderOptions.Record,
              /**
               * @param {Error} [pError] - The error that occurred during template parsing.
               * @param {string} [pContent] - The content that was rendered from the template.
               */
              function (pError, pContent) {
                if (pError) {
                  _this4.log.error("PictView [".concat(_this4.UUID, "]::[").concat(_this4.Hash, "] ").concat(_this4.options.ViewIdentifier, " could not render (asynchronously) ").concat(tmpRenderOptions.RenderableHash, " because it did not parse the template."), pError);
                  return tmpCallback(pError);
                }
                _this4.assignRenderContent(tmpRenderOptions.Renderable, tmpRenderOptions.DestinationAddress, pContent);
                return tmpCallback();
              }, [this]);
            } else {
              var tmpErrorMessage = "PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not perform a basic render of ").concat(tmpRenderOptions.RenderableHash, " because it is not valid.");
              this.log.error(tmpErrorMessage);
              return tmpCallback(new Error(tmpErrorMessage));
            }
          }

          /**
           * Lifecycle hook that triggers after the view is rendered.
           *
           * @param {Renderable} pRenderable - The renderable that was rendered.
           * @param {string} pRenderDestinationAddress - The address where the renderable was rendered.
           * @param {any} pRecord - The record (data) that was used by the renderable.
           * @param {string} pContent - The content that was rendered.
           */
        }, {
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterRender:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after the view is rendered (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterRenderAsync",
          value: function onAfterRenderAsync(fCallback) {
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                            Code Section: Solver                            */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before the view is solved.
           */
        }, {
          key: "onBeforeSolve",
          value: function onBeforeSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeSolve:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before the view is solved (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeSolveAsync",
          value: function onBeforeSolveAsync(fCallback) {
            this.onBeforeSolve();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when the view is solved.
           */
        }, {
          key: "onSolve",
          value: function onSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onSolve:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when the view is solved (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onSolveAsync",
          value: function onSolveAsync(fCallback) {
            this.onSolve();
            return fCallback();
          }

          /**
           * Performs view solving and triggers lifecycle hooks.
           *
           * @return {boolean} - True if the view was solved successfully, false otherwise.
           */
        }, {
          key: "solve",
          value: function solve() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
            }
            this.onBeforeSolve();
            this.onSolve();
            this.onAfterSolve();
            this.lastSolvedTimestamp = this.pict.log.getTimeStamp();
            return true;
          }

          /**
           * Performs view solving and triggers lifecycle hooks (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "solveAsync",
          value: function solveAsync(fCallback) {
            var _this5 = this;
            var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');

            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " solveAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this5.log.error("PictView [".concat(_this5.UUID, "]::[").concat(_this5.Hash, "] ").concat(_this5.options.Name, " solveAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));
            tmpAnticipate.anticipate(this.onSolveAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this5.pict.LogNoisiness > 2) {
                _this5.log.trace("PictView [".concat(_this5.UUID, "]::[").concat(_this5.Hash, "] ").concat(_this5.options.ViewIdentifier, " solveAsync() complete."));
              }
              _this5.lastSolvedTimestamp = _this5.pict.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * Lifecycle hook that triggers after the view is solved.
           */
        }, {
          key: "onAfterSolve",
          value: function onAfterSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterSolve:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after the view is solved (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterSolveAsync",
          value: function onAfterSolveAsync(fCallback) {
            this.onAfterSolve();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal From View                        */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before data is marshaled from the view.
           *
           * @return {boolean} - True if the operation was successful, false otherwise.
           */
        }, {
          key: "onBeforeMarshalFromView",
          value: function onBeforeMarshalFromView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeMarshalFromView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before data is marshaled from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeMarshalFromViewAsync",
          value: function onBeforeMarshalFromViewAsync(fCallback) {
            this.onBeforeMarshalFromView();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when data is marshaled from the view.
           */
        }, {
          key: "onMarshalFromView",
          value: function onMarshalFromView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onMarshalFromView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when data is marshaled from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onMarshalFromViewAsync",
          value: function onMarshalFromViewAsync(fCallback) {
            this.onMarshalFromView();
            return fCallback();
          }

          /**
           * Marshals data from the view.
           *
           * @return {boolean} - True if the operation was successful, false otherwise.
           */
        }, {
          key: "marshalFromView",
          value: function marshalFromView() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
            }
            this.onBeforeMarshalFromView();
            this.onMarshalFromView();
            this.onAfterMarshalFromView();
            this.lastMarshalFromViewTimestamp = this.pict.log.getTimeStamp();
            return true;
          }

          /**
           * Marshals data from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "marshalFromViewAsync",
          value: function marshalFromViewAsync(fCallback) {
            var _this6 = this;
            var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');

            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalFromViewAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this6.log.error("PictView [".concat(_this6.UUID, "]::[").concat(_this6.Hash, "] ").concat(_this6.options.Name, " marshalFromViewAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalFromViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onMarshalFromViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalFromViewAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this6.pict.LogNoisiness > 2) {
                _this6.log.trace("PictView [".concat(_this6.UUID, "]::[").concat(_this6.Hash, "] ").concat(_this6.options.ViewIdentifier, " marshalFromViewAsync() complete."));
              }
              _this6.lastMarshalFromViewTimestamp = _this6.pict.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * Lifecycle hook that triggers after data is marshaled from the view.
           */
        }, {
          key: "onAfterMarshalFromView",
          value: function onAfterMarshalFromView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterMarshalFromView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after data is marshaled from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterMarshalFromViewAsync",
          value: function onAfterMarshalFromViewAsync(fCallback) {
            this.onAfterMarshalFromView();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal To View                          */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before data is marshaled into the view.
           */
        }, {
          key: "onBeforeMarshalToView",
          value: function onBeforeMarshalToView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeMarshalToView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before data is marshaled into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeMarshalToViewAsync",
          value: function onBeforeMarshalToViewAsync(fCallback) {
            this.onBeforeMarshalToView();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when data is marshaled into the view.
           */
        }, {
          key: "onMarshalToView",
          value: function onMarshalToView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onMarshalToView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when data is marshaled into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onMarshalToViewAsync",
          value: function onMarshalToViewAsync(fCallback) {
            this.onMarshalToView();
            return fCallback();
          }

          /**
           * Marshals data into the view.
           *
           * @return {boolean} - True if the operation was successful, false otherwise.
           */
        }, {
          key: "marshalToView",
          value: function marshalToView() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
            }
            this.onBeforeMarshalToView();
            this.onMarshalToView();
            this.onAfterMarshalToView();
            this.lastMarshalToViewTimestamp = this.pict.log.getTimeStamp();
            return true;
          }

          /**
           * Marshals data into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "marshalToViewAsync",
          value: function marshalToViewAsync(fCallback) {
            var _this7 = this;
            var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');

            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalToViewAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this7.log.error("PictView [".concat(_this7.UUID, "]::[").concat(_this7.Hash, "] ").concat(_this7.options.Name, " marshalToViewAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalToViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onMarshalToViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalToViewAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this7.pict.LogNoisiness > 2) {
                _this7.log.trace("PictView [".concat(_this7.UUID, "]::[").concat(_this7.Hash, "] ").concat(_this7.options.ViewIdentifier, " marshalToViewAsync() complete."));
              }
              _this7.lastMarshalToViewTimestamp = _this7.pict.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * Lifecycle hook that triggers after data is marshaled into the view.
           */
        }, {
          key: "onAfterMarshalToView",
          value: function onAfterMarshalToView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterMarshalToView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after data is marshaled into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterMarshalToViewAsync",
          value: function onAfterMarshalToViewAsync(fCallback) {
            this.onAfterMarshalToView();
            return fCallback();
          }

          /** @return {boolean} - True if the object is a PictView. */
        }, {
          key: "isPictView",
          get: function get() {
            return true;
          }
        }]);
      }(libFableServiceBase);
      module.exports = PictView;
    }, {
      "../package.json": 3,
      "fable-serviceproviderbase": 2
    }],
    5: [function (require, module, exports) {
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
    6: [function (require, module, exports) {
      var libPictViewClass = require('pict-view');

      /**
       * @typedef {typeof import('tui-grid').default} TuiGridClass
       * @typedef {import('tui-grid').default} TuiGrid
       */
      var PictSectionTuiGrid = /*#__PURE__*/function (_libPictViewClass) {
        function PictSectionTuiGrid(pFable, pOptions, pServiceHash) {
          var _this8;
          _classCallCheck(this, PictSectionTuiGrid);
          var tmpOptions = Object.assign({}, require('./Pict-Section-TuiGrid-DefaultConfiguration.json'), pOptions);
          _this8 = _callSuper(this, PictSectionTuiGrid, [pFable, tmpOptions, pServiceHash]);

          /** @type {{ [key: string]: any }} */
          _this8.services;
          _this8.dateFormatter = _this8.fable.instantiateServiceProviderWithoutRegistration('Dates');
          _this8.initialRenderComplete = false;
          _this8.customFormatters = {};
          return _this8;
        }
        _inherits(PictSectionTuiGrid, _libPictViewClass);
        return _createClass(PictSectionTuiGrid, [{
          key: "onBeforeInitialize",
          value: function onBeforeInitialize() {
            _superPropGet(PictSectionTuiGrid, "onBeforeInitialize", this, 3)([]);

            /** @type {TuiGridClass} */
            this._tuiGridPrototype = null;

            /** @type {TuiGrid} */
            this.tuiGrid = null;
            this.customHeaders = require('./Pict-TuiGrid-Headers.js');
            this.customEditors = require('./Pict-TuiGrid-Editors.js');
            this.initializeCustomFormatters();
            this.columnSchema = false;
            this.targetElementAddress = false;
            /** @type {Array<any>} */
            this.gridData = null;
            return _superPropGet(PictSectionTuiGrid, "onBeforeInitialize", this, 3)([]);
          }
        }, {
          key: "initializeCustomFormatters",
          value: function initializeCustomFormatters() {
            var _this9 = this;
            this.customFormatters.FormatterTwoDigitNumber = function (pCell) {
              var _pCell$decimalPrecisi;
              var tmpCellValue = Number.parseFloat(pCell.value);
              var tmpPrecision = (_pCell$decimalPrecisi = pCell === null || pCell === void 0 ? void 0 : pCell.decimalPrecision) !== null && _pCell$decimalPrecisi !== void 0 ? _pCell$decimalPrecisi : 2;
              if (isNaN(tmpCellValue)) {
                return '';
              } else {
                return _this9.fable.Math.roundPrecise(pCell.value, tmpPrecision);
              }
            };
            this.customFormatters.FormatterCurrencyNumber = function (pCell) {
              var _pCell$decimalPrecisi2;
              var tmpPrecision = (_pCell$decimalPrecisi2 = pCell === null || pCell === void 0 ? void 0 : pCell.decimalPrecision) !== null && _pCell$decimalPrecisi2 !== void 0 ? _pCell$decimalPrecisi2 : 2;
              var tmpCellValue = _this9.fable.DataFormat.formatterDollars(pCell.value, tmpPrecision);
              return tmpCellValue;
            };
            this.customFormatters.FormatterRoundedNumber = function (pCell) {
              var _pCell$decimalPrecisi3;
              var tmpCellValue = Number.parseFloat(pCell.value);
              var tmpPrecision = (_pCell$decimalPrecisi3 = pCell === null || pCell === void 0 ? void 0 : pCell.decimalPrecision) !== null && _pCell$decimalPrecisi3 !== void 0 ? _pCell$decimalPrecisi3 : 2;
              if (isNaN(tmpCellValue)) {
                return '';
              } else {
                return _this9.fable.Math.roundPrecise(pCell.value, tmpPrecision);
              }
            };
            this.customFormatters.FormatterDate = function (pCell) {
              var tmpDate = _this9.fable.Dates.dayJS.utc(pCell.value);
              if (pCell.dateformat) {
                return tmpDate.format(pCell.dateformat);
              } else {
                return tmpDate.format();
              }
            };
          }

          /**
           * Construct a tuiGrid instance and connect it to the browser's dom object for the grid.  If the
           * prototype is not passed in, try to find a window.tui (where the library puts itself) in the window
           * object.
           *
           * @param {TuiGridClass} [pTuiGridPrototype] - The TuiGrid prototype class expected to be loaded in the browser
           * @returns
           */
        }, {
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

          /**
           * @typedef {Object} TUIGridCellChange
           * @property {any} rowKey - The key of the row that changed.
           * @property {string} columnName - The name of the column that changed.
           * @property {any} value - The "current" value of the cell. Slightly different meaning in preChangeHandler vs changeHandler (before / after the change is applied).
           * @property {any} [nextValue] - The value that the cell will have after the change. Only populated in preChangeHandler (not changeHandler).
           * @property {any} [prevValue] - The value that the cell had before the change. Only populated in changeHandler (not preChangeHandler).
           */

          /**
           * @typedef {Object} TUIGridChangeEvent
           * @property {TuiGrid} instance - The TuiGrid instance that fired the event.
           * @property {TUIGridCellChange[]} changes - An array of objects representing the changes to grid cell values.
           */

          /**
           * Interface method for handling changesets from the TuiGrid control. Invoked before the change has been applied to the affected cells.
           *
           * * The pre-change cell value is stored in value while the new cell value is stored in nextValue.
           * * Any changes made to nextValue in this method will be reflected in the grid for that cell.
           *
           * @param {TUIGridChangeEvent} pChangeData - An event containing an array of objects representing the changes to grid cell values.
           */
        }, {
          key: "preChangeHandler",
          value: function preChangeHandler(pChangeData) {}

          /**
           * Interface method for handling changesets from the TuiGrid control. Invoked after the change has been applied to the affected cells.
           *
           * * Performs solver trigger for changes to any columns configured in "ColumnsToSolveOnChange" or with "PictTriggerSolveOnChange": true on a specific row.
           * * The previous cell value is stored in prevValue while the next cell value is stored in value.
           *
           * @param {TUIGridChangeEvent} pChangeData - An event object containing an array of objects representing the changes to grid cell values.
           */
        }, {
          key: "changeHandler",
          value: function changeHandler(pChangeData) {
            var tmpSolverNecessary = false;
            for (var i = 0; i < pChangeData.changes.length; i++) {
              var tmpEntity = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'entity');
              var tmpIDRecord = pChangeData.instance.getValue(pChangeData.changes[i].rowKey, 'idrecord');
              this.log.trace("Generic Change Handler for TuiGrid Fired, Entity ".concat(tmpEntity, " IDRecord ").concat(tmpIDRecord, " setting Column [").concat(pChangeData.changes[i].value, "] to new Value [").concat(pChangeData.changes[i].value, "]"));
              if (this.options.ColumnsToSolveOnChange.hasOwnProperty(pChangeData.changes[i].columnName)) {
                tmpSolverNecessary = true;
              }
            }
            if (tmpSolverNecessary) {
              this.services.PictApplication.solve();
            }
          }

          /**
           * Lifecycle hook that triggers after the view is rendered.
           *
           * @param {import('pict-view').Renderable} pRenderable - The renderable that was rendered.
           * @param {string} pRenderDestinationAddress - The address where the renderable was rendered.
           * @param {any} pRecord - The record (data) that was used by the renderable.
           * @param {string} pContent - The content that was rendered.
           */
        }, {
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            if (!this.initialRenderComplete) {
              this.onAfterInitialRender();
              this.initialRenderComplete = true;
            }
            return _superPropGet(PictSectionTuiGrid, "onAfterRender", this, 3)([pRenderable, pRenderDestinationAddress, pRecord, pContent]);
          }
        }, {
          key: "onAfterInitialRender",
          value: function onAfterInitialRender() {
            var _this10 = this;
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
            var tmpTargetElementSet = this.services.ContentAssignment.getElement(this.options.TargetElementAddress);
            if (tmpTargetElementSet.length < 1) {
              this.log.error("Could not find target element [".concat(this.options.TargetElementAddress, "] for TuiGrid!  Rendering won't function properly."));
              this.targetElement = false;
              return false;
            }

            // Just go for the first one.
            this.targetElement = tmpTargetElementSet[0];

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
            this.gridSettings = {
              data: this.gridData,
              el: this.targetElement,
              columns: this.columnSchema,
              // This is no bueno, yo
              usageStatistics: false,
              scrollY: this.options.GridScrollY,
              columnOptions: {
                resizable: this.options.GridColumnWidthResizable
              }
            };
            this.customConfigureGridSettings();
            var libTuiGrid = this._tuiGridPrototype;
            this.tuiGrid = new libTuiGrid(this.gridSettings);
            this.tuiGrid.on('beforeChange', function (pChangeData) {
              //TODO: the exported event type from tui-grid is incomplete so mask it here
              /** @type {any} */
              var tmpChangeData = pChangeData;
              _this10.preChangeHandler(tmpChangeData);
            });
            this.tuiGrid.on('afterChange', function (pChangeData) {
              //TODO: the exported event type from tui-grid is incomplete so mask it here
              /** @type {any} */
              var tmpChangeData = pChangeData;
              _this10.changeHandler(tmpChangeData);
            });
          }

          /**
           * This is expected to be overloaded with anything that needs to be added to the grid configuration
           * before the Toast UI Grid component is initialized in the browser.
           */
        }, {
          key: "customConfigureGridSettings",
          value: function customConfigureGridSettings() {
            // This can be overloaded to tweak up the this.gridSettings
          }

          /**
           * Lookup a specific record in the toast ui grid data set by value and pull the value from the map into the browser.
           *
           * This function exists because if we mutate data in the map of plain javascript records tuigrid
           * manages, it doesn't automatically refresh the UI.  From reading the TUIGrid documentation, this
           * is because they don't want to refresh until all the data has changed.
           *
           * The best practice has been to have a hidden column behind the tuigrid that maps the correct entity
           * value set to the record in the map (e.g. IDRecord in one column and Entity in another).
           *
           * @param {string} pCellColumnToBeSet - the Column hash to set
           * @param {string} pCellValueToSet - Value to be set
           * @param {string} pLookupValue - the Value to look up in tuigrid
           * @param {string} pLookupColumn - the key of the column in the tuigrid record (which are plain javascript objects defined by the tuigrid config)
           * @return {void}
           */
        }, {
          key: "SetGridValue",
          value: function SetGridValue(pCellColumnToBeSet, pCellValueToSet, pLookupValue, pLookupColumn) {
            if (typeof pLookupValue == 'undefined') {
              console.log("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by [").concat(pLookupColumn, "]::[").concat(pLookupValue, "].  No valid lookup value!"));
              return;
            }
            if (!this.tuiGrid) {
              this.log.warn("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by [").concat(pLookupColumn, "]::[").concat(pLookupValue, "].  No valid grid!"));
              return;
            }
            var tmpData = this.tuiGrid.getData();
            for (var i = 0; i < tmpData.length; i++) {
              var tmpRecord = tmpData[i];
              if (tmpRecord[pLookupColumn] == pLookupValue) {
                this.tuiGrid.setValue(i, pCellColumnToBeSet, pCellValueToSet);
              }
            }
          }

          /**
           * Lookup a specific record in the toast ui grid data set by row key and pull in a column.
           *
           * This function exists because if we mutate data in the map of plain javascript records tuigrid
           * manages, it doesn't automatically refresh the UI.  From reading the TUIGrid documentation, this
           * is because they don't want to refresh until all the data has changed.
           *
           *
           * @param {string} pCellColumnToBeSet - the Column hash to set
           * @param {string} pCellValueToSet - Value to be set
           * @param {string} pRowKey - the key of the row to be set
           * @return {boolean}
           */
        }, {
          key: "SetGridValueByRowKey",
          value: function SetGridValueByRowKey(pCellColumnToBeSet, pCellValueToSet, pRowKey) {
            if (typeof pRowKey == 'undefined') {
              this.log.error("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by row key [").concat(pRowKey, "].  No valid row key!"));
              return false;
            }
            if (!this.tuiGrid) {
              this.log.warn("Could not set grid value [".concat(pCellColumnToBeSet, "] = [").concat(pCellValueToSet, "] looked up by row key [").concat(pRowKey, "].  No valid grid!"));
              return false;
            }
            this.tuiGrid.setValue(pRowKey, pCellColumnToBeSet, pCellValueToSet);
            return true;
          }
        }]);
      }(libPictViewClass);
      module.exports = PictSectionTuiGrid;
      module.exports.default_configuration = require('./Pict-Section-TuiGrid-DefaultConfiguration.json');
    }, {
      "./Pict-Section-TuiGrid-DefaultConfiguration.json": 5,
      "./Pict-TuiGrid-Editors.js": 9,
      "./Pict-TuiGrid-Headers.js": 10,
      "pict-view": 4
    }],
    7: [function (require, module, exports) {
      // Custom number editor class with an option for precision
      var tuiCustomEditorNumber = /*#__PURE__*/function () {
        function tuiCustomEditorNumber(pProperties) {
          _classCallCheck(this, tuiCustomEditorNumber);
          var tmpElement = document.createElement('input');
          var decimalPrecision = pProperties.columnInfo.editor.options.decimalPrecision ? pProperties.columnInfo.editor.options.decimalPrecision : 3;
          tmpElement.type = 'number';
          tmpElement.value = String(pProperties.value);
          tmpElement.oninput = function (pElement) {
            if (pElement.target instanceof HTMLInputElement) {
              var tmpCastNumber = parseFloat(pElement.target.value).toFixed(decimalPrecision).toString();
              if (tmpCastNumber.length < parseFloat(pElement.target.value).toString().length) {
                pElement.target.value = tmpCastNumber;
              }
            }
          };
          this.Element = tmpElement;
        }
        return _createClass(tuiCustomEditorNumber, [{
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
      }();
      module.exports = tuiCustomEditorNumber;
    }, {}],
    8: [function (require, module, exports) {
      // Custom number editor class with an option for precision
      var tuiCustomEditorText = /*#__PURE__*/function () {
        function tuiCustomEditorText(pProperties) {
          _classCallCheck(this, tuiCustomEditorText);
          var tmpElement = document.createElement('input');
          tmpElement.type = 'text';
          tmpElement.value = String(pProperties.value);
          tmpElement.placeholder = pProperties.columnInfo.editor.options.placeholder || '';
          tmpElement.pattern = pProperties.columnInfo.editor.options.pattern || '';
          tmpElement.minLength = pProperties.columnInfo.editor.options.minLength || '';
          tmpElement.maxLength = pProperties.columnInfo.editor.options.maxLength || '';
          tmpElement.required = pProperties.columnInfo.editor.options.required || '';
          this.Element = tmpElement;
        }
        return _createClass(tuiCustomEditorText, [{
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
      }();
      module.exports = tuiCustomEditorText;
    }, {}],
    9: [function (require, module, exports) {
      module.exports = {
        EditorNumber: require('./Pict-TuiGrid-Editor-Number.js'),
        EditorText: require('./Pict-TuiGrid-Editor-Text.js')
      };
    }, {
      "./Pict-TuiGrid-Editor-Number.js": 7,
      "./Pict-TuiGrid-Editor-Text.js": 8
    }],
    10: [function (require, module, exports) {
      // Custom column header where the header is hidden
      var tuiCustomColumnHeaderNone = /*#__PURE__*/function () {
        function tuiCustomColumnHeaderNone() {
          _classCallCheck(this, tuiCustomColumnHeaderNone);
          var tmpElement = document.createElement('input');
          tmpElement.type = 'hidden';
          tmpElement.value = '';
          this.Element = tmpElement;
        }
        return _createClass(tuiCustomColumnHeaderNone, [{
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
      }();
      module.exports = {
        CustomColumnHeaderNone: tuiCustomColumnHeaderNone
      };
    }, {}]
  }, {}, [6])(6);
});
//# sourceMappingURL=pict-section-tuigrid.compatible.js.map
