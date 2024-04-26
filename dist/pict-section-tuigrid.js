"use strict";

function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      * Fable Service Base
      * @author <steven@velozo.com>
      */

      class FableServiceProviderBase {
        // The constructor can be used in two ways:
        // 1) With a fable, options object and service hash (the options object and service hash are optional)
        // 2) With an object or nothing as the first parameter, where it will be treated as the options object
        constructor(pFable, pOptions, pServiceHash) {
          // Check if a fable was passed in; connect it if so
          if (typeof pFable === 'object' && pFable.isFable) {
            this.connectFable(pFable);
          } else {
            this.fable = false;
          }

          // initialize options and UUID based on whether the fable was passed in or not.
          if (this.fable) {
            this.UUID = pFable.getUUID();
            this.options = typeof pOptions === 'object' ? pOptions : {};
          } else {
            // With no fable, check to see if there was an object passed into either of the first two
            // Parameters, and if so, treat it as the options object
            this.options = typeof pFable === 'object' && !pFable.isFable ? pFable : typeof pOptions === 'object' ? pOptions : {};
            this.UUID = "CORE-SVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          }

          // It's expected that the deriving class will set this
          this.serviceType = "Unknown-".concat(this.UUID);

          // The service hash is used to identify the specific instantiation of the service in the services map
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : !this.fable && typeof pOptions === 'string' ? pOptions : "".concat(this.UUID);
        }
        connectFable(pFable) {
          if (typeof pFable !== 'object' || !pFable.isFable) {
            let tmpErrorMessage = "Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [".concat(typeof pFable, "].}");
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
      }
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;

      // This is left here in case we want to go back to having different code/base class for "core" services
      module.exports.CoreServiceProviderBase = FableServiceProviderBase;
    }, {}],
    2: [function (require, module, exports) {
      const libFableServiceBase = require('fable-serviceproviderbase');
      const defaultPictViewSettings = {
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
      class PictView extends libFableServiceBase {
        constructor(pFable, pOptions, pServiceHash) {
          // Intersect default options, parent constructor, service information
          let tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictViewSettings)), pOptions);
          super(pFable, tmpOptions, pServiceHash);
          if (!this.options.ViewIdentifier) {
            this.options.ViewIdentifier = "AutoViewID-".concat(this.fable.getUUID());
          }
          this.serviceType = 'PictView';
          // Convenience and consistency naming
          this.pict = this.fable;
          // Wire in the essential Pict application state
          this.AppData = this.pict.AppData;
          this.initializeTimestamp = false;
          this.lastSolvedTimestamp = false;
          this.lastRenderedTimestamp = false;
          this.lastMarshalFromViewTimestamp = false;
          this.lastMarshalToViewTimestamp = false;

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
              this.pict.TemplateProvider.addTemplate(tmpTemplate.Hash, tmpTemplate.Template, tmpTemplate.Source);
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
              this.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
            }
          }

          // Load the CSS if it's available
          if (this.options.CSS) {
            let tmpCSSHash = this.options.CSSHash ? this.options.CSSHash : "View-".concat(this.options.ViewIdentifier);
            let tmpCSSProvider = this.options.CSSProvider ? this.options.CSSProvider : tmpCSSHash;
            this.pict.CSSMap.addCSS(tmpCSSHash, this.options.CSS, tmpCSSProvider, this.options.CSSPriority);
          }

          // Load all renderables
          // Renderables are launchable renderable instructions with templates
          // They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
          // The only parts that are necessary are Identifier and Template
          // A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
          this.renderables = {};
          for (let i = 0; i < this.options.Renderables.length; i++) {
            let tmpRenderable = this.options.Renderables[i];
            this.addRenderable(this.options.Renderables[i]);
          }
        }
        addRenderable(pRenderableHash, pTemplateHash, pDefaultTemplateDataAddress, pDefaultDestinationAddress, pRenderMethod) {
          let tmpRenderable = false;
          if (typeof pRenderableHash == 'object') {
            // The developer passed in the renderable as an object.
            // Use theirs instead!
            tmpRenderable = pRenderableHash;
          } else {
            let tmpRenderMethod = typeof pRenderMethod !== 'string' ? pRenderMethod : 'replace';
            tmpRenderable = {
              RenderableHash: pRenderableHash,
              TemplateHash: pTemplateHash,
              DefaultTemplateDataAddress: pDefaultTemplateDataAddress,
              DefaultDestinationAddress: pDefaultDestinationAddress,
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
        onBeforeInitialize() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeInitialize:"));
          }
          return true;
        }
        onBeforeInitializeAsync(fCallback) {
          this.onBeforeInitialize();
          return fCallback();
        }
        onInitialize() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onInitialize:"));
          }
          return true;
        }
        onInitializeAsync(fCallback) {
          this.onInitialize();
          return fCallback();
        }
        initialize() {
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
        initializeAsync(fCallback) {
          if (this.pict.LogControlFlow) {
            this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initializeAsync:"));
          }
          if (!this.initializeTimestamp) {
            let tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');
            if (this.pict.LogNoisiness > 0) {
              this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " beginning initialization..."));
            }
            tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
            tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));
            tmpAnticipate.wait(pError => {
              this.initializeTimestamp = this.pict.log.getTimeStamp();
              if (this.pict.LogNoisiness > 0) {
                this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initialization complete."));
              }
              return fCallback();
            });
          } else {
            this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " async initialize called but initialization is already completed.  Aborting."));
            // TODO: Should this be an error?
            return fCallback();
          }
        }
        onAfterInitialize() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterInitialize:"));
          }
          return true;
        }
        onAfterInitializeAsync(fCallback) {
          this.onAfterInitialize();
          return fCallback();
        }

        /* -------------------------------------------------------------------------- */
        /*                            Code Section: Render                            */
        /* -------------------------------------------------------------------------- */
        onBeforeRender(pRenderable, pRenderDestinationAddress, pData) {
          // Overload this to mess with stuff before the content gets generated from the template
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeRender:"));
          }
          return true;
        }
        onBeforeRenderAsync(fCallback) {
          return fCallback();
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
          let tmpDataAddress;
          let tmpData;
          if (typeof pTemplateDataAddress === 'object') {
            tmpData = pTemplateDataAddress;
            tmpDataAddress = 'Passed in as object';
          } else {
            tmpDataAddress = typeof pTemplateDataAddress === 'string' ? pTemplateDataAddress : typeof tmpRenderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
            tmpData = typeof tmpDataAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
          }

          // Execute the developer-overridable pre-render behavior
          this.onBeforeRender(tmpRenderable, tmpRenderDestinationAddress, tmpData);
          if (this.pict.LogControlFlow) {
            this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateDataAddress[").concat(tmpDataAddress, "] render:"));
          }

          // Generate the content output from the template and data
          let tmpContent = this.pict.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData);

          // Assign the content to the destination address
          switch (tmpRenderable.RenderMethod) {
            case 'append':
              this.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress, tmpContent);
              break;
            case 'prepend':
              this.pict.ContentAssignment.prependContent(tmpRenderDestinationAddress, tmpContent);
              break;
            case 'append_once':
              // Try to find the content in the destination address
              let tmpExistingContent = this.pict.ContentAssignment.getElement("#".concat(tmpRenderableHash));
              if (tmpExistingContent.length < 1) {
                this.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress, tmpContent);
              }
              break;
            case 'replace':
            // TODO: Should this be the default?
            default:
              this.pict.ContentAssignment.assignContent(tmpRenderDestinationAddress, tmpContent);
              break;
          }

          // Execute the developer-overridable post-render behavior
          this.onAfterRender(tmpRenderable, tmpRenderDestinationAddress, tmpData, tmpContent);
          this.lastRenderedTimestamp = this.pict.log.getTimeStamp();
          return true;
        }
        renderAsync(pRenderable, pRenderDestinationAddress, pTemplateDataAddress, fCallback) {
          let tmpRenderableHash = typeof pRenderable === 'string' ? pRenderable : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;
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
          let tmpDataAddress;
          let tmpData;
          if (typeof pTemplateDataAddress === 'object') {
            tmpData = pTemplateDataAddress;
            tmpDataAddress = 'Passed in as object';
          } else {
            tmpDataAddress = typeof pTemplateDataAddress === 'string' ? pTemplateDataAddress : typeof tmpRenderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
            tmpData = typeof tmpDataAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
          }
          if (this.pict.LogControlFlow) {
            this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateDataAddress[").concat(tmpDataAddress, "] renderAsync:"));
          }
          if (this.pict.LogNoisiness > 2) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Beginning Asynchronous Render (callback-style)..."));
          }
          if (this.pict.LogNoisiness > 4) {
            this.log.trace("At-render AppData: ", this.AppData);
          }
          let tmpAnticipate = this.fable.newAnticipate();
          tmpAnticipate.anticipate(fOnBeforeRenderCallback => {
            this.onBeforeRender(tmpRenderable, tmpRenderDestinationAddress, tmpData);
            this.onBeforeRenderAsync(fOnBeforeRenderCallback);
          });
          tmpAnticipate.anticipate(fAsyncTemplateCallback => {
            // Render the template (asynchronously)
            this.pict.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData, (pError, pContent) => {
              if (pError) {
                this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render (asynchronously) ").concat(tmpRenderableHash, " (param ").concat(pRenderable, ") because it did not parse the template."), pError);
                return fAsyncTemplateCallback(pError);
              }

              // Assign the content to the destination address
              switch (tmpRenderable.RenderMethod) {
                case 'append':
                  this.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress, pContent);
                  break;
                case 'prepend':
                  this.pict.ContentAssignment.prependContent(tmpRenderDestinationAddress, pContent);
                  break;
                case 'append_once':
                  // Try to find the content in the destination address
                  let tmpExistingContent = this.pict.ContentAssignment.getElement("#".concat(tmpRenderableHash));
                  if (tmpExistingContent.length < 1) {
                    this.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress, pContent);
                  }
                case 'replace':
                default:
                  this.pict.ContentAssignment.assignContent(tmpRenderDestinationAddress, pContent);
                  break;
              }

              // Execute the developer-overridable asynchronous post-render behavior
              this.lastRenderedTimestamp = this.pict.log.getTimeStamp();
              return fAsyncTemplateCallback();
            });
          });
          tmpAnticipate.anticipate(fOnAfterRenderCallback => {
            this.onAfterRender(tmpRenderable, tmpRenderDestinationAddress, tmpData);
            this.onAfterRenderAsync(fOnAfterRenderCallback);
          });
          tmpAnticipate.wait(fCallback);
        }
        renderDefaultAsync(fCallback) {
          // Render the default renderable (falses do the proper forward lookups of values from config and such)
          this.renderAsync(false, false, false, fCallback);
        }
        onAfterRender(pRenderable, pRenderDestinationAddress, pData) {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterRender:"));
          }
          return true;
        }
        onAfterRenderAsync(fCallback) {
          return fCallback();
        }

        /* -------------------------------------------------------------------------- */
        /*                            Code Section: Solver                            */
        /* -------------------------------------------------------------------------- */
        onBeforeSolve() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeSolve:"));
          }
          return true;
        }
        onBeforeSolveAsync(fCallback) {
          this.onBeforeSolve();
          return fCallback();
        }
        onSolve() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onSolve:"));
          }
          return true;
        }
        onSolveAsync(fCallback) {
          this.onSolve();
          return fCallback();
        }
        solve() {
          if (this.pict.LogNoisiness > 2) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
          }
          this.onBeforeSolve();
          this.onSolve();
          this.onAfterSolve();
          this.lastSolvedTimestamp = this.pict.log.getTimeStamp();
          return true;
        }
        solveAsync(fCallback) {
          let tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');
          tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));
          tmpAnticipate.anticipate(this.onSolveAsync.bind(this));
          tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));
          tmpAnticipate.wait(pError => {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " solveAsync() complete."));
            }
            this.lastSolvedTimestamp = this.pict.log.getTimeStamp();
            return fCallback(pError);
          });
        }
        onAfterSolve() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterSolve:"));
          }
          return true;
        }
        onAfterSolveAsync(fCallback) {
          this.onAfterSolve();
          return fCallback();
        }

        /* -------------------------------------------------------------------------- */
        /*                     Code Section: Marshal From View                        */
        /* -------------------------------------------------------------------------- */
        onBeforeMarshalFromView() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeMarshalFromView:"));
          }
          return true;
        }
        onBeforeMarshalFromViewAsync(fCallback) {
          this.onBeforeMarshalFromView();
          return fCallback();
        }
        onMarshalFromView() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onMarshalFromView:"));
          }
          return true;
        }
        onMarshalFromViewAsync(fCallback) {
          this.onMarshalFromView();
          return fCallback();
        }
        marshalFromView() {
          if (this.pict.LogNoisiness > 2) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
          }
          this.onBeforeMarshalFromView();
          this.onMarshalFromView();
          this.onAfterMarshalFromView();
          this.lastMarshalFromViewTimestamp = this.pict.log.getTimeStamp();
          return true;
        }
        marshalFromViewAsync(fCallback) {
          let tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');
          tmpAnticipate.anticipate(this.onBeforeMarshalFromViewAsync.bind(this));
          tmpAnticipate.anticipate(this.onMarshalFromViewAsync.bind(this));
          tmpAnticipate.anticipate(this.onAfterMarshalFromViewAsync.bind(this));
          tmpAnticipate.wait(pError => {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " solveAsync() complete."));
            }
            this.lastMarshalFromViewTimestamp = this.pict.log.getTimeStamp();
            return fCallback(pError);
          });
        }
        onAfterMarshalFromView() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterMarshalFromView:"));
          }
          return true;
        }
        onAfterMarshalFromViewAsync(fCallback) {
          this.onAfterMarshalFromView();
          return fCallback();
        }

        /* -------------------------------------------------------------------------- */
        /*                     Code Section: Marshal To View                          */
        /* -------------------------------------------------------------------------- */
        onBeforeMarshalToView() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeMarshalToView:"));
          }
          return true;
        }
        onBeforeMarshalToViewAsync(fCallback) {
          this.onBeforeMarshalToView();
          return fCallback();
        }
        onMarshalToView() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onMarshalToView:"));
          }
          return true;
        }
        onMarshalToViewAsync(fCallback) {
          this.onMarshalToView();
          return fCallback();
        }
        marshalToView() {
          if (this.pict.LogNoisiness > 2) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
          }
          this.onBeforeMarshalToView();
          this.onMarshalToView();
          this.onAfterMarshalToView();
          this.lastMarshalToViewTimestamp = this.pict.log.getTimeStamp();
          return true;
        }
        marshalToViewAsync(fCallback) {
          let tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');
          tmpAnticipate.anticipate(this.onBeforeMarshalToViewAsync.bind(this));
          tmpAnticipate.anticipate(this.onMarshalToViewAsync.bind(this));
          tmpAnticipate.anticipate(this.onAfterMarshalToViewAsync.bind(this));
          tmpAnticipate.wait(pError => {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " solveAsync() complete."));
            }
            this.lastMarshalToViewTimestamp = this.pict.log.getTimeStamp();
            return fCallback(pError);
          });
        }
        onAfterMarshalToView() {
          if (this.pict.LogNoisiness > 3) {
            this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterMarshalToView:"));
          }
          return true;
        }
        onAfterMarshalToViewAsync(fCallback) {
          this.onAfterMarshalToView();
          return fCallback();
        }
      }
      module.exports = PictView;
    }, {
      "fable-serviceproviderbase": 1
    }],
    3: [function (require, module, exports) {
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
    4: [function (require, module, exports) {
      const libPictViewClass = require('pict-view');
      class PictSectionTuiGrid extends libPictViewClass {
        constructor(pFable, pOptions, pServiceHash) {
          let tmpOptions = Object.assign({}, require('./Pict-Section-TuiGrid-DefaultConfiguration.json'), pOptions);
          super(pFable, tmpOptions, pServiceHash);
          this.initialRenderComplete = false;
        }
        onBeforeInitialize() {
          super.onBeforeInitialize();
          this._tuiGridPrototype = false;
          this.tuiGrid = false;
          this.customHeaders = require('./Pict-TuiGrid-Headers.js');
          this.customEditors = require('./Pict-TuiGrid-Editors.js');
          this.customFormatters = require('./Pict-TuiGrid-Formatters.js');
          this.columnSchema = false;
          this.targetElementAddress = false;
          this.gridData = false;
        }

        // Overload the connectTuiGrid() function to use the inline version of the TuiGrid
        connectTuiGridPrototype(pTuiGridPrototype) {
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
         * @property {Object} instance - The TuiGrid instance that fired the event.
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
        preChangeHandler(pChangeData) {}

        /**
         * Interface method for handling changesets from the TuiGrid control. Invoked after the change has been applied to the affected cells.
         *
         * * Performs solver trigger for changes to any columns configured in "ColumnsToSolveOnChange" or with "PictTriggerSolveOnChange": true on a specific row.
         * * The previous cell value is stored in prevValue while the next cell value is stored in value.
         *
         * @param {TUIGridChangeEvent} pChangeData - An event object containing an array of objects representing the changes to grid cell values.
         */
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
            this.services.PictApplication.solve();
          }
        }
        onAfterRender() {
          if (!this.initialRenderComplete) {
            this.onAfterInitialRender();
            this.initialRenderComplete = true;
          }
        }
        onAfterInitialRender() {
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
            let tmpAddressedData = this.fable.manifest.getValueByHash(this.AppData, this.options.GridDataAddress);
            if (typeof tmpAddressedData != 'object') {
              this.log.error("Address for GridData [".concat(this.options.GridDataAddress, "] did not return an object; it was a ").concat(typeof tmpAddressedData, "."));
              this.gridData = [];
            } else {
              this.gridData = JSON.parse(JSON.stringify(tmpAddressedData));
            }
          } else {
            this.gridData = [];
          }
          let tmpTargetElementSet = this.services.ContentAssignment.getElement(this.options.TargetElementAddress);
          if (tmpTargetElementSet.length < 1) {
            this.log.error("Could not find target element [".concat(this.options.TargetElementAddress, "] for TuiGrid!  Rendering won't function properly."));
            this.targetElement = false;
            return false;
          } else {
            // Just go for the first one.
            this.targetElement = tmpTargetElementSet[0];
          }

          // Check to see if there are any custom formatters.
          this.columnSchema = this.options.TuiColumnSchema;
          // Setup the solver and custom schema handlers.
          for (let i = 0; i < this.columnSchema.length; i++) {
            let tmpColumn = this.columnSchema[i];
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
              if (tmpColumn.editor.hasOwnProperty('options') && typeof tmpColumn.editor.options == 'object' && tmpColumn.editor.options.hasOwnProperty('listItems') && typeof tmpColumn.editor.options.listItems == 'string') {
                // Look for this address!  For the Record object, we will pass in the options.
                let tmpListItems = this.fable.manifest.getValueByHash({
                  AppData: this.AppData,
                  Options: this.options
                }, tmpColumn.editor.options.listItems);
                if (typeof tmpListItems == 'object') {
                  tmpColumn.editor.options.listItems = tmpListItems;
                } else {
                  this.log.warn("Pict TuiGrid for column [".concat(tmpColumn.name, "] had [").concat(tmpColumn.editor.options.listItems, "] as a listItems address, but it didn't return an object.  It was a [").concat(typeof tmpListItems, "].  Setting to empty list."));
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
          let libTuiGrid = this._tuiGridPrototype;
          this.tuiGrid = new libTuiGrid(this.gridSettings);
          this.tuiGrid.on('beforeChange', pChangeData => {
            this.preChangeHandler(pChangeData);
          });
          this.tuiGrid.on('afterChange', pChangeData => {
            this.changeHandler(pChangeData);
          });
        }
        customConfigureGridSettings() {
          // This can be overloaded to tweak up the this.gridSettings
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
      module.exports.default_configuration = require('./Pict-Section-TuiGrid-DefaultConfiguration.json');
    }, {
      "./Pict-Section-TuiGrid-DefaultConfiguration.json": 3,
      "./Pict-TuiGrid-Editors.js": 7,
      "./Pict-TuiGrid-Formatters.js": 8,
      "./Pict-TuiGrid-Headers.js": 9,
      "pict-view": 2
    }],
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
      // Custom number editor class with an option for precision
      class tuiCustomEditorText {
        constructor(pProperties) {
          const tmpElement = document.createElement('input');
          tmpElement.type = 'text';
          tmpElement.value = String(pProperties.value);
          tmpElement.placeholder = pProperties.columnInfo.editor.options.placeholder || '';
          tmpElement.pattern = pProperties.columnInfo.editor.options.pattern || '';
          tmpElement.minLength = pProperties.columnInfo.editor.options.minLength || '';
          tmpElement.maxLength = pProperties.columnInfo.editor.options.maxLength || '';
          tmpElement.required = pProperties.columnInfo.editor.options.required || '';
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
      module.exports = tuiCustomEditorText;
    }, {}],
    7: [function (require, module, exports) {
      const tuiGridHeaders = {};
      tuiGridHeaders.EditorNumber = require('./Pict-TuiGrid-Editor-Number.js');
      tuiGridHeaders.EditorText = require('./Pict-TuiGrid-Editor-Text.js');
      module.exports = tuiGridHeaders;
    }, {
      "./Pict-TuiGrid-Editor-Number.js": 5,
      "./Pict-TuiGrid-Editor-Text.js": 6
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
    }, {}],
    9: [function (require, module, exports) {
      const tuiGridHeaders = {};

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
      tuiGridHeaders.CustomColumnHeaderNone = tuiCustomColumnHeaderNone;
      module.exports = tuiGridHeaders;
    }, {}]
  }, {}, [4])(4);
});