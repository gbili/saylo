"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mostachito =
/*#__PURE__*/
function () {
  function Mostachito(missingRefCallback) {
    _classCallCheck(this, Mostachito);

    this.missingRefCallback = missingRefCallback || function (ref) {
      throw new TypeError('Template references a data which is missing in the view, ref: ' + ref);
    };
  }

  _createClass(Mostachito, [{
    key: "hydrate",
    value: function hydrate(viewTemplate, viewData) {
      viewTemplate = this.replaceArray(viewTemplate, viewData);
      return this.replace(viewTemplate, viewData);
    }
  }, {
    key: "getRefList",
    value: function getRefList(viewTemplate) {
      var surroundingLen = '{{ '.length;
      var unsurroundedRefs = viewTemplate.match(new RegExp('{{ \\w+(?:\\.\\w+)* }}', 'gs')).map(function (surroundedRef) {
        return surroundedRef.substring(surroundingLen, surroundedRef.length - surroundingLen);
      });
      return unsurroundedRefs && _toConsumableArray(new Set(unsurroundedRefs)) || [];
    }
  }, {
    key: "getNestedPath",
    value: function getNestedPath(dotNotation) {
      return dotNotation.split('.');
    }
  }, {
    key: "getReferencedValue",
    value: function getReferencedValue(data, ref) {
      if (_typeof(data) !== 'object') {
        throw new TypeError('You must pass an object to access its properties');
      }

      var nestedPath = this.getNestedPath(ref);

      var value = _objectSpread({}, data);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nestedPath[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var paramName = _step.value;

          if (!value.hasOwnProperty(paramName)) {
            return this.missingRefCallback(ref);
          }

          value = value[paramName];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return value;
    }
  }, {
    key: "replaceRef",
    value: function replaceRef(viewTemplate, viewData, ref) {
      return viewTemplate.replace(new RegExp("{{ ".concat(ref, " }}"), 'g'), this.getReferencedValue(viewData, ref));
    }
  }, {
    key: "replace",
    value: function replace(viewTemplate, viewData) {
      var references = this.getRefList(viewTemplate);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = references[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ref = _step2.value;
          viewTemplate = this.replaceRef(viewTemplate, viewData, ref);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return viewTemplate;
    }
  }, {
    key: "replaceArray",
    value: function replaceArray(viewTemplate, viewData) {
      var r = new RegExp('{{(\\w+(?:\\.\\w+)*) as (\\w+)(.+)\\1}}', 'sg');
      var match = r.exec(viewTemplate);

      if (match) {
        var tpl = match[0];
        var outerRef = match[1];
        var subDatas = this.getReferencedValue(viewData, outerRef);
        var innerRef = match[2];
        var subTpl = match[3];
        var subTplWithoutInnerRefPrefix = subTpl.replace(new RegExp("{{ ".concat(innerRef, "\\."), 'g'), '{{ ');
        var hydratedViewPart = subDatas.map(function (subData) {
          return this.replace(subTplWithoutInnerRefPrefix, subData);
        }.bind(this)).join('');
        viewTemplate = viewTemplate.replace(new RegExp(tpl, 'g'), hydratedViewPart);
      }

      return viewTemplate;
    }
  }]);

  return Mostachito;
}();

var _default = Mostachito;
exports["default"] = _default;