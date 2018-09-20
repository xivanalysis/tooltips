import React from 'react';
import PropTypes from 'prop-types';
import _merge from 'lodash/merge';
import _mapValues from 'lodash/mapValues';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import _cloneDeep from 'lodash/cloneDeep';
import Popup from 'reactjs-popup';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get$1(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get$1 = Reflect.get;
  } else {
    _get$1 = function _get$$1(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get$1(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var noProvider = function noProvider() {
  throw new Error('No tooltip provider found!');
};

var _React$createContext = React.createContext({
  data: {},
  load: noProvider,
  baseUrl: ''
}),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var styles = {"majorStats":"MajorStats-module_majorStats__1rOqY","stat":"MajorStats-module_stat__3fynC","name":"MajorStats-module_name__6CSgY","value":"MajorStats-module_value__2ugLW"};

var PER_ROW = 3; // Game seems to like displaying a few major statistics for... stuff... _really_ large

var MajorStats =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MajorStats, _React$PureComponent);

  function MajorStats() {
    _classCallCheck(this, MajorStats);

    return _possibleConstructorReturn(this, _getPrototypeOf(MajorStats).apply(this, arguments));
  }

  _createClass(MajorStats, [{
    key: "render",
    value: function render() {
      var stats = this.props.stats;
      var extra = PER_ROW - (stats.length % PER_ROW || PER_ROW);
      return React.createElement("div", {
        className: styles.majorStats
      }, stats.map(function (stat, i) {
        return React.createElement("div", {
          key: i,
          className: stat && styles.stat
        }, stat && React.createElement(React.Fragment, null, React.createElement("div", {
          className: styles.name
        }, stat.name), React.createElement("div", {
          className: styles.value
        }, stat.value)));
      }), _toConsumableArray(Array(extra)).map(function (_, i) {
        return React.createElement("div", {
          key: i
        });
      }));
    }
  }]);

  return MajorStats;
}(React.PureComponent);

_defineProperty(MajorStats, "propTypes", {
  stats: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired
  })).isRequired
});

var styles$1 = {"headerMeta":"Action-module_headerMeta__3szJT","meta":"Action-module_meta__LBDsx"};

var styles$2 = {"tooltip":"Base-module_tooltip__1pSM2","header":"Base-module_header__20oAN","iconHolder":"Base-module_iconHolder__1Mvs2","titleContainer":"Base-module_titleContainer__2GXeW","name":"Base-module_name__sFJ0s","category":"Base-module_category__BjSWx","description":"Base-module_description__3_vS-","attribution":"Base-module_attribution__3t60Y"};

var Base =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Base, _React$Component);

  function Base() {
    _classCallCheck(this, Base);

    return _possibleConstructorReturn(this, _getPrototypeOf(Base).apply(this, arguments));
  }

  _createClass(Base, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: styles$2.tooltip
      }, React.createElement("div", {
        className: styles$2.header
      }, this.renderHeader()), this.renderDescription(), this.renderFooter(), React.createElement("a", {
        href: "https://xivapi.com/",
        target: "_blank",
        rel: "noopener noreferrer",
        className: styles$2.attribution
      }, "xivapi.com"));
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this$props = this.props,
          baseUrl = _this$props.baseUrl,
          data = _this$props.data;
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: styles$2.iconHolder
      }, React.createElement("img", {
        src: baseUrl + data.icon
      })), React.createElement("div", {
        className: styles$2.titleContainer
      }, React.createElement("div", {
        className: styles$2.name
      }, data.name), data.category && React.createElement("div", {
        className: styles$2.category
      }, data.category)));
    }
  }, {
    key: "renderDescription",
    value: function renderDescription() {
      var data = this.props.data; // Need to turn newlines into, like, _newlines_

      var description = data.description.replace(/\n/g, '<br/>');
      return React.createElement("p", {
        className: styles$2.description,
        dangerouslySetInnerHTML: {
          __html: description
        }
      });
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      return null;
    }
  }]);

  return Base;
}(React.Component);

_defineProperty(Base, "propTypes", {
  data: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired
});

_defineProperty(Base, "columns", {
  id: 'ID',
  name: 'Name',
  icon: 'Icon',
  description: 'Description'
});

var _COST_TYPE_NAME;
var MELEE_RANGE = 3;
var CAST_TIME_DIVISOR = 10; // Only get costTypes as IDs

var COST_TYPE = {
  MP: 3,
  TP: 5,
  GP: 7 // Overkill? Overkill.

};
var COST_TYPE_NAME = (_COST_TYPE_NAME = {}, _defineProperty(_COST_TYPE_NAME, COST_TYPE.MP, 'MP'), _defineProperty(_COST_TYPE_NAME, COST_TYPE.TP, 'TP'), _defineProperty(_COST_TYPE_NAME, COST_TYPE.GP, 'GP'), _COST_TYPE_NAME);

var Action =
/*#__PURE__*/
function (_Base) {
  _inherits(Action, _Base);

  function Action() {
    _classCallCheck(this, Action);

    return _possibleConstructorReturn(this, _getPrototypeOf(Action).apply(this, arguments));
  }

  _createClass(Action, [{
    key: "_calculateManaCost",
    value: function _calculateManaCost(costFactor) {
      // TODO: Only handling lv70 atm
      var levelModifier = 12000;
      return Math.floor(costFactor * levelModifier / 100);
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var data = this.props.data; // Range === -1 seems to mean "melee distance", which is 3y

      var range = data.range;

      if (range === -1) {
        range = MELEE_RANGE;
      }

      return React.createElement(React.Fragment, null, _get$1(_getPrototypeOf(Action.prototype), "renderHeader", this).call(this), React.createElement("dl", {
        className: styles$1.headerMeta
      }, React.createElement("dt", null, "Range"), React.createElement("dd", null, range, "y"), React.createElement("dt", null, "Radius"), React.createElement("dd", null, data.radius, "y")));
    }
  }, {
    key: "renderDescription",
    value: function renderDescription() {
      var data = this.props.data; // Cast times are stored in 100ms units

      var castTime = data.castTime ? (data.castTime / CAST_TIME_DIVISOR).toFixed(2) + 's' : 'Instant'; // Cast time is always shown

      var majorStats = [{
        name: 'Cast',
        value: castTime
      }]; // Only show recast if it's >0

      majorStats.push(data.recastTime ? {
        name: 'Recast',
        value: (data.recastTime / CAST_TIME_DIVISOR).toFixed(2) + 's'
      } : null); // Only show cost if there is one and it's one of the costs we support (gauge shows up in the same fields)

      if (data.cost && COST_TYPE_NAME[data.costType]) {
        var cost = data.cost;

        if (data.costType === COST_TYPE.MP) {
          cost = this._calculateManaCost(cost);
        }

        majorStats.push({
          name: COST_TYPE_NAME[data.costType] + ' Cost',
          value: cost
        });
      }

      return React.createElement(React.Fragment, null, React.createElement(MajorStats, {
        stats: majorStats
      }), _get$1(_getPrototypeOf(Action.prototype), "renderDescription", this).call(this));
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var data = this.props.data;
      return React.createElement("table", {
        className: styles$1.meta
      }, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", {
        scope: "row"
      }, "Acquired"), React.createElement("td", null, data.learntBy, " Lv. ", data.learntAt)), React.createElement("tr", null, React.createElement("th", {
        scope: "row"
      }, "Affinity"), React.createElement("td", null, data.affinity))));
    }
  }]);

  return Action;
}(Base);

_defineProperty(Action, "columns", _objectSpread({}, Base.columns, {
  category: 'ActionCategory.Name',
  range: 'Range',
  radius: 'EffectRange',
  castTime: 'Cast100ms',
  recastTime: 'Recast100ms',
  costType: 'CostType',
  cost: 'Cost',
  learntBy: 'ClassJob.Abbreviation',
  learntAt: 'ClassJobLevel',
  affinity: 'ClassJobCategory.Name' // TODO: This needs to be abstracted into a shared lib at some point

}));

var handlers = {
  Action: Action
};
var getHandler = function getHandler(type) {
  return handlers[type] || Base;
};

// eslint-disable-next-line no-undef

var axios = require('axios');

var DEFAULT_BASE_URL = 'https://xivapi.com/';
var DEFAULT_DEBOUNCE_DELAY = 50;

var Provider$1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Provider$$1, _React$Component);

  // Request queue handling
  function Provider$$1() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Provider$$1);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Provider$$1)).call.apply(_getPrototypeOf2, [this].concat(args))); // Set up the state, it will be passed out to consumers

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "endpoint", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "run", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pending", {});

    _this.state = {
      data: {},
      load: _this.load.bind(_assertThisInitialized(_assertThisInitialized(_this))) // Set up our endpoint with axios.

    };
    _this.endpoint = axios.create({
      baseURL: _this.props.baseUrl || DEFAULT_BASE_URL
    }); // Set up the debounced processing func

    _this.run = _debounce(_this._process.bind(_assertThisInitialized(_assertThisInitialized(_this))), _this.props.debounceDelay || DEFAULT_DEBOUNCE_DELAY);
    return _this;
  }

  _createClass(Provider$$1, [{
    key: "load",
    value: function load(type, id) {
      var path = [this.props.language, type];

      var typePending = _get(this.pending, path, new Set());

      typePending.add(id);

      _set(this.pending, path, typePending);

      this.run();
    }
  }, {
    key: "_process",
    value: function _process() {
      var _this2 = this;

      var language = this.props.language;
      var pending = this.pending;
      this.pending = {}; // We need to do a seperate request for each content type
      // For simplicity's sake, only request for the current lang

      Object.entries(pending[language]).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            type = _ref2[0],
            idSet = _ref2[1];

        var ids = Array.from(idSet); // Mark these ids as being loaded

        _this2.setState(function (state) {
          var newState = _cloneDeep(state);

          var loading = ids.reduce(function (carry, id) {
            carry[id] = null;
            return carry;
          }, {});

          _merge(newState, {
            data: _defineProperty({}, language, _defineProperty({}, type, loading))
          });

          return newState;
        }); // Grab the handler for this type


        var handler = getHandler(type); // Run the data request
        // TODO: Pagination?

        _this2.endpoint.get(type, {
          params: {
            ids: ids.join(','),
            columns: Object.values(handler.columns).join(','),
            language: language
          }
        }).then(function (response) {
          // TODO: Sanity check the response?
          var results = response.data.Results; // Transform the response data into our representation and key by id

          var keyedResults = results.reduce(function (carry, content) {
            var mapped = _mapValues(handler.columns, function (value) {
              return _get(content, value, null);
            });

            carry[mapped.id] = mapped;
            return carry;
          }, {}); // Set the new results in place

          _this2.setState(function (state) {
            var newState = _cloneDeep(state);

            _merge(newState, {
              data: _defineProperty({}, language, _defineProperty({}, type, keyedResults))
            });

            return newState;
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Provider, {
        value: _objectSpread({}, this.state, {
          data: this.state.data[this.props.language],
          baseUrl: this.props.baseUrl || DEFAULT_BASE_URL
        })
      }, this.props.children);
    }
  }]);

  return Provider$$1;
}(React.Component);

_defineProperty(Provider$1, "propTypes", {
  children: PropTypes.node,
  baseUrl: PropTypes.string,
  debounceDelay: PropTypes.number,
  language: PropTypes.string
});

_defineProperty(Provider$1, "defaultProps", {
  language: 'en' // I like axios. Fight me.

});

var tooltipHOC = (function (Component) {
  var TooltipHOC =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(TooltipHOC, _React$PureComponent);

    function TooltipHOC() {
      _classCallCheck(this, TooltipHOC);

      return _possibleConstructorReturn(this, _getPrototypeOf(TooltipHOC).apply(this, arguments));
    }

    _createClass(TooltipHOC, [{
      key: "render",
      value: function render() {
        var _this = this;

        var _this$props = this.props,
            type = _this$props.type,
            id = _this$props.id; // Get the handler we'll be rendering for this type

        var Handler = getHandler(type);
        return React.createElement(Consumer, null, function (_ref) {
          var baseUrl = _ref.baseUrl,
              data = _ref.data,
              load = _ref.load;

          // Grab the data from the provider (using lodash because ez)
          var tooltipData = _get(data, [type, id], undefined); // Build props for the wrapped component


          var props = _objectSpread({}, _this.props, {
            // HOC props, overriding if req.
            baseUrl: baseUrl,
            loading: !tooltipData,
            data: tooltipData,
            Content: null // If the data hasn't been loaded yet, request it, otherwise prep a handler

          });

          if (tooltipData === undefined) {
            load(type, id);
          } else if (tooltipData) {
            props.Content = function () {
              return React.createElement(Handler, {
                data: tooltipData,
                baseUrl: baseUrl
              });
            };
          } // Pass over control to the lucky user


          return React.createElement(Component, props);
        });
      }
    }]);

    return TooltipHOC;
  }(React.PureComponent);

  _defineProperty(TooltipHOC, "propTypes", {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  });

  return TooltipHOC;
});

var styles$3 = {"icon":"Tooltip-module_icon__2Sv2l"};

var POPUP_STYLE = {
  border: 'none',
  padding: 0,
  width: 'auto',
  background: 'transparent',
  boxShadow: 'none'
};

var Tooltip =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Tooltip, _React$PureComponent);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: "render",
    value: function render() {
      // Pull in data from props and state
      var _this$props = this.props,
          baseUrl = _this$props.baseUrl,
          loading = _this$props.loading,
          data = _this$props.data,
          Content = _this$props.Content;

      if (loading) {
        return React.createElement("span", null, "Loading...");
      } // We've got the data we need, the tooltip


      return React.createElement(Popup, {
        trigger: React.createElement("span", null, React.createElement("img", {
          src: baseUrl + data.icon,
          alt: data.name,
          className: styles$3.icon
        }), data.name),
        position: "top left",
        on: "hover",
        arrow: false,
        contentStyle: POPUP_STYLE,
        keepTooltipInside: true
      }, React.createElement(Content, null));
    }
  }]);

  return Tooltip;
}(React.PureComponent);

_defineProperty(Tooltip, "propTypes", {
  baseUrl: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  Content: PropTypes.node
});

var Tooltip$1 = tooltipHOC(Tooltip);

export { Provider$1 as Provider, Tooltip$1 as Tooltip, tooltipHOC };
