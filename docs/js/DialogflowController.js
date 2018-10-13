(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

//import  ApiAiClient  from './es6/ApiAiClient.js'
var _require = require("./es6/ApiAiClient.js"),
    ApiAiClient = _require.ApiAiClient;

var config = {
  app: {
    token: "c94a385816024f36862208a37fadb67e",
    // <- enter your token here
    muted: false,
    // <- mute microphone by default
    googleIt: true // <- ask users to google their request, in case of input.unknown action

  },
  locale: {
    strings: {
      welcomeTitle: "Hello, ask something to get started",
      welcomeDescription: "You can type \"Hello\" for example. Or just press on the microphone to talk",
      offlineTitle: "Oh, no!",
      offlineDescription: "It looks like you are not connected to the internet, this webpage requires internet connection, to process your requests",
      queryTitle: "Ask me something...",
      voiceTitle: "Go ahead, im listening..."
    },
    settings: {
      speechLang: "ja-JP",
      // <- output language
      recognitionLang: "ja-JP" // <- input(recognition) language

    }
  }
};
console.log(config.app.token);
var client = new ApiAiClient({
  accessToken: config.app.token
}); // <- replace it with yours

console.log(client);
client.textRequest("こんにちわ").then(function (response) {});
/*
export default {
    name: 'app',
    data: function(){
        return {
            answers: [],
            query: '',
            speech: config.locale.strings.voiceTitle,
            micro: false,
            muted: config.app.muted,
            online: navigator.onLine,
            config
        }
    },
    watch: {
        answers: function(val){
            setTimeout(() => { 
                document.querySelector('#bottom').scrollIntoView({ 
                    behavior: 'smooth' 
                })
            }, 2) // if new answers arrive, wait for render and then smoothly scroll down to #bottom selector, used as anchor
        }
    },
    methods: {
        submit(){
            client.textRequest(this.query).then((response) => {
                if(response.result.action == "input.unknown" && this.config.app.googleIt == true){
                    response.result.fulfillment.messages[0].unknown = true
                    response.result.fulfillment.messages[0].text = response.result.resolvedQuery
                } // if the googleIt is enabled, show the button

                this.answers.push(response)
                this.handle(response) // <- handle the response in handle() method

                this.query = ''
                this.speech = config.locale.strings.voiceTitle // <- reset query and speech
            })
        },
        handle(response){
            if(response.result.fulfillment.speech || response.result.fulfillment.messages[0].type == 'simple_response'){
                let speech = new SpeechSynthesisUtterance(response.result.fulfillment.speech || response.result.fulfillment.messages[0].textToSpeech)
                speech.voiceURI = 'native'
                speech.lang = config.locale.settings.speechLang

                if(this.muted == false) window.speechSynthesis.speak(speech) // <- Speech output if microphone is allowed
            }
        },
        autosubmit(suggestion){
            this.query = suggestion
            this.submit()
        },
        mute(mode){
            this.muted = mode
        },
        microphone(mode){
            this.micro = mode
            let self = this // <- correct scope

            if(mode == true){
                let recognition = new webkitSpeechRecognition() // <- chrome speech recognition

                recognition.interimResults = true
                recognition.lang = config.locale.settings.recognitionLang
			    recognition.start()

                recognition.onresult = function(event){
			        for (var i = event.resultIndex; i < event.results.length; ++i){
			    	    self.speech = event.results[i][0].transcript
			        }
			    }

			    recognition.onend = function(){
				    recognition.stop()
                    self.micro = false
                    self.autosubmit(self.speech)
			    }
            }
        }
    }
}
*/

},{"./es6/ApiAiClient.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ApiAiClient: true,
  ApiAiConstants: true
};
Object.defineProperty(exports, "ApiAiConstants", {
  enumerable: true,
  get: function get() {
    return _ApiAiConstants.ApiAiConstants;
  }
});
exports.ApiAiClient = void 0;

var _ApiAiConstants = require("./ApiAiConstants");

var _Errors = require("./Errors");

var _EventRequest = require("./Request/EventRequest");

var _TextRequest = _interopRequireDefault(require("./Request/TextRequest"));

var _Interfaces = require("./Interfaces");

Object.keys(_Interfaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Interfaces[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiAiClient =
/*#__PURE__*/
function () {
  function ApiAiClient(options) {
    _classCallCheck(this, ApiAiClient);

    if (!options || !options.accessToken) {
      throw new _Errors.ApiAiClientConfigurationError("Access token is required for new ApiAi.Client instance");
    }

    this.accessToken = options.accessToken;
    this.apiLang = options.lang || _ApiAiConstants.ApiAiConstants.DEFAULT_CLIENT_LANG;
    this.apiVersion = options.version || _ApiAiConstants.ApiAiConstants.DEFAULT_API_VERSION;
    this.apiBaseUrl = options.baseUrl || _ApiAiConstants.ApiAiConstants.DEFAULT_BASE_URL;
    this.sessionId = options.sessionId || this.guid();
  }

  _createClass(ApiAiClient, [{
    key: "textRequest",
    value: function textRequest(query) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!query) {
        throw new _Errors.ApiAiClientConfigurationError("Query should not be empty");
      }

      options.query = query;
      return new _TextRequest.default(this, options).perform();
    }
  }, {
    key: "eventRequest",
    value: function eventRequest(eventName) {
      var eventData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!eventName) {
        throw new _Errors.ApiAiClientConfigurationError("Event name can not be empty");
      }

      options.event = {
        name: eventName,
        data: eventData
      };
      return new _EventRequest.EventRequest(this, options).perform();
    } // @todo: implement local tts request

    /*public ttsRequest(query) {
        if (!query) {
            throw new ApiAiClientConfigurationError("Query should not be empty");
        }
        return new TTSRequest(this).makeTTSRequest(query);
    }*/

    /*public userEntitiesRequest(options: IRequestOptions = {}): UserEntitiesRequest {
        return new UserEntitiesRequest(this, options);
    }*/

  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.accessToken;
    }
  }, {
    key: "getApiVersion",
    value: function getApiVersion() {
      return this.apiVersion ? this.apiVersion : _ApiAiConstants.ApiAiConstants.DEFAULT_API_VERSION;
    }
  }, {
    key: "getApiLang",
    value: function getApiLang() {
      return this.apiLang ? this.apiLang : _ApiAiConstants.ApiAiConstants.DEFAULT_CLIENT_LANG;
    }
  }, {
    key: "getApiBaseUrl",
    value: function getApiBaseUrl() {
      return this.apiBaseUrl ? this.apiBaseUrl : _ApiAiConstants.ApiAiConstants.DEFAULT_BASE_URL;
    }
  }, {
    key: "setSessionId",
    value: function setSessionId(sessionId) {
      this.sessionId = sessionId;
    }
  }, {
    key: "getSessionId",
    value: function getSessionId() {
      return this.sessionId;
    }
    /**
     * generates new random UUID
     * @returns {string}
     */

  }, {
    key: "guid",
    value: function guid() {
      var s4 = function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      };

      return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }
  }]);

  return ApiAiClient;
}();

exports.ApiAiClient = ApiAiClient;

},{"./ApiAiConstants":3,"./Errors":4,"./Interfaces":5,"./Request/EventRequest":6,"./Request/TextRequest":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiAiConstants = void 0;
var ApiAiConstants;
exports.ApiAiConstants = ApiAiConstants;

(function (ApiAiConstants) {
  var AVAILABLE_LANGUAGES;

  (function (AVAILABLE_LANGUAGES) {
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["EN"] = "en"] = "EN";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["DE"] = "de"] = "DE";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ES"] = "es"] = "ES";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["PT_BR"] = "pt-BR"] = "PT_BR";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ZH_HK"] = "zh-HK"] = "ZH_HK";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ZH_CN"] = "zh-CN"] = "ZH_CN";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ZH_TW"] = "zh-TW"] = "ZH_TW";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["NL"] = "nl"] = "NL";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["FR"] = "fr"] = "FR";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["IT"] = "it"] = "IT";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["JA"] = "ja"] = "JA";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["KO"] = "ko"] = "KO";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["PT"] = "pt"] = "PT";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["RU"] = "ru"] = "RU";
    AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["UK"] = "uk"] = "UK";
  })(AVAILABLE_LANGUAGES = ApiAiConstants.AVAILABLE_LANGUAGES || (ApiAiConstants.AVAILABLE_LANGUAGES = {}));

  ApiAiConstants.VERSION = "2.0.0-beta.20";
  ApiAiConstants.DEFAULT_BASE_URL = "https://api.api.ai/v1/";
  ApiAiConstants.DEFAULT_API_VERSION = "20150910";
  ApiAiConstants.DEFAULT_CLIENT_LANG = AVAILABLE_LANGUAGES.EN;
})(ApiAiConstants || (exports.ApiAiConstants = ApiAiConstants = {}));

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiAiRequestError = exports.ApiAiClientConfigurationError = exports.ApiAiBaseError = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ApiAiBaseError =
/*#__PURE__*/
function (_Error) {
  _inherits(ApiAiBaseError, _Error);

  function ApiAiBaseError(message) {
    var _this;

    _classCallCheck(this, ApiAiBaseError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ApiAiBaseError).call(this, message));
    _this.message = message;
    _this.stack = new Error().stack;
    return _this;
  }

  return ApiAiBaseError;
}(_wrapNativeSuper(Error));

exports.ApiAiBaseError = ApiAiBaseError;

var ApiAiClientConfigurationError =
/*#__PURE__*/
function (_ApiAiBaseError) {
  _inherits(ApiAiClientConfigurationError, _ApiAiBaseError);

  function ApiAiClientConfigurationError(message) {
    var _this2;

    _classCallCheck(this, ApiAiClientConfigurationError);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ApiAiClientConfigurationError).call(this, message));
    _this2.name = "ApiAiClientConfigurationError";
    return _this2;
  }

  return ApiAiClientConfigurationError;
}(ApiAiBaseError);

exports.ApiAiClientConfigurationError = ApiAiClientConfigurationError;

var ApiAiRequestError =
/*#__PURE__*/
function (_ApiAiBaseError2) {
  _inherits(ApiAiRequestError, _ApiAiBaseError2);

  function ApiAiRequestError(message) {
    var _this3;

    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, ApiAiRequestError);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ApiAiRequestError).call(this, message));
    _this3.message = message;
    _this3.code = code;
    _this3.name = "ApiAiRequestError";
    return _this3;
  }

  return ApiAiRequestError;
}(ApiAiBaseError);

exports.ApiAiRequestError = ApiAiRequestError;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IStreamClient = void 0;
var IStreamClient;
exports.IStreamClient = IStreamClient;

(function (IStreamClient) {
  var ERROR;

  (function (ERROR) {
    ERROR[ERROR["ERR_NETWORK"] = 0] = "ERR_NETWORK";
    ERROR[ERROR["ERR_AUDIO"] = 1] = "ERR_AUDIO";
    ERROR[ERROR["ERR_SERVER"] = 2] = "ERR_SERVER";
    ERROR[ERROR["ERR_CLIENT"] = 3] = "ERR_CLIENT";
  })(ERROR = IStreamClient.ERROR || (IStreamClient.ERROR = {}));

  var EVENT;

  (function (EVENT) {
    EVENT[EVENT["MSG_WAITING_MICROPHONE"] = 0] = "MSG_WAITING_MICROPHONE";
    EVENT[EVENT["MSG_MEDIA_STREAM_CREATED"] = 1] = "MSG_MEDIA_STREAM_CREATED";
    EVENT[EVENT["MSG_INIT_RECORDER"] = 2] = "MSG_INIT_RECORDER";
    EVENT[EVENT["MSG_RECORDING"] = 3] = "MSG_RECORDING";
    EVENT[EVENT["MSG_SEND"] = 4] = "MSG_SEND";
    EVENT[EVENT["MSG_SEND_EMPTY"] = 5] = "MSG_SEND_EMPTY";
    EVENT[EVENT["MSG_SEND_EOS_OR_JSON"] = 6] = "MSG_SEND_EOS_OR_JSON";
    EVENT[EVENT["MSG_WEB_SOCKET"] = 7] = "MSG_WEB_SOCKET";
    EVENT[EVENT["MSG_WEB_SOCKET_OPEN"] = 8] = "MSG_WEB_SOCKET_OPEN";
    EVENT[EVENT["MSG_WEB_SOCKET_CLOSE"] = 9] = "MSG_WEB_SOCKET_CLOSE";
    EVENT[EVENT["MSG_STOP"] = 10] = "MSG_STOP";
    EVENT[EVENT["MSG_CONFIG_CHANGED"] = 11] = "MSG_CONFIG_CHANGED";
  })(EVENT = IStreamClient.EVENT || (IStreamClient.EVENT = {}));
})(IStreamClient || (exports.IStreamClient = IStreamClient = {}));

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventRequest = void 0;

var _Request2 = _interopRequireDefault(require("./Request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EventRequest =
/*#__PURE__*/
function (_Request) {
  _inherits(EventRequest, _Request);

  function EventRequest() {
    _classCallCheck(this, EventRequest);

    return _possibleConstructorReturn(this, _getPrototypeOf(EventRequest).apply(this, arguments));
  }

  return EventRequest;
}(_Request2.default);

exports.EventRequest = EventRequest;

},{"./Request":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Errors = require("../Errors");

var _XhrRequest = _interopRequireDefault(require("../XhrRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Request =
/*#__PURE__*/
function () {
  function Request(apiAiClient, options) {
    _classCallCheck(this, Request);

    this.apiAiClient = apiAiClient;
    this.options = options;
    this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion();
    this.requestMethod = _XhrRequest.default.Method.POST;
    this.headers = {
      Authorization: "Bearer " + this.apiAiClient.getAccessToken()
    };
    this.options.lang = this.apiAiClient.getApiLang();
    this.options.sessionId = this.apiAiClient.getSessionId();
  }

  _createClass(Request, [{
    key: "perform",
    value: function perform() {
      var overrideOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var options = overrideOptions ? overrideOptions : this.options;
      return _XhrRequest.default.ajax(this.requestMethod, this.uri, options, this.headers).then(Request.handleSuccess.bind(this)).catch(Request.handleError.bind(this));
    }
  }], [{
    key: "handleSuccess",
    value: function handleSuccess(xhr) {
      return Promise.resolve(JSON.parse(xhr.responseText));
    }
  }, {
    key: "handleError",
    value: function handleError(xhr) {
      var error = new _Errors.ApiAiRequestError(null);

      try {
        var serverResponse = JSON.parse(xhr.responseText);

        if (serverResponse.status && serverResponse.status.errorDetails) {
          error = new _Errors.ApiAiRequestError(serverResponse.status.errorDetails, serverResponse.status.code);
        } else {
          error = new _Errors.ApiAiRequestError(xhr.statusText, xhr.status);
        }
      } catch (e) {
        error = new _Errors.ApiAiRequestError(xhr.statusText, xhr.status);
      }

      return Promise.reject(error);
    }
  }]);

  return Request;
}();

var _default = Request;
exports.default = _default;

},{"../Errors":4,"../XhrRequest":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Request2 = _interopRequireDefault(require("./Request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextRequest =
/*#__PURE__*/
function (_Request) {
  _inherits(TextRequest, _Request);

  function TextRequest() {
    _classCallCheck(this, TextRequest);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextRequest).apply(this, arguments));
  }

  return TextRequest;
}(_Request2.default);

exports.default = TextRequest;

},{"./Request":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * quick ts implementation of example from
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * with some minor improvements
 * @todo: test (?)
 * @todo: add node.js implementation with node's http inside. Just to make SDK cross-platform
 */
var XhrRequest =
/*#__PURE__*/
function () {
  function XhrRequest() {
    _classCallCheck(this, XhrRequest);
  }

  _createClass(XhrRequest, null, [{
    key: "ajax",
    // Method that performs the ajax request
    value: function ajax(method, url) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      // Creating a promise
      return new Promise(function (resolve, reject) {
        // Instantiates the XMLHttpRequest
        var client = XhrRequest.createXMLHTTPObject();
        var uri = url;
        var payload = null; // Add given payload to get request

        if (args && method === XhrRequest.Method.GET) {
          uri += "?";
          var argcount = 0;

          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += "&";
              }

              uri += encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
            }
          }
        } else if (args) {
          if (!headers) {
            headers = {};
          }

          headers["Content-Type"] = "application/json; charset=utf-8";
          payload = JSON.stringify(args);
        }

        for (var _key in options) {
          if (_key in client) {
            client[_key] = options[_key];
          }
        } // hack: method[method] is somewhat like .toString for enum Method
        // should be made in normal way


        client.open(XhrRequest.Method[method], uri, true); // Add given headers

        if (headers) {
          for (var _key2 in headers) {
            if (headers.hasOwnProperty(_key2)) {
              client.setRequestHeader(_key2, headers[_key2]);
            }
          }
        }

        payload ? client.send(payload) : client.send();

        client.onload = function () {
          if (client.status >= 200 && client.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            resolve(client);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(client);
          }
        };

        client.onerror = function () {
          reject(client);
        };
      });
    }
  }, {
    key: "get",
    value: function get(url) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return XhrRequest.ajax(XhrRequest.Method.GET, url, payload, headers, options);
    }
  }, {
    key: "post",
    value: function post(url) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return XhrRequest.ajax(XhrRequest.Method.POST, url, payload, headers, options);
    }
  }, {
    key: "put",
    value: function put(url) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return XhrRequest.ajax(XhrRequest.Method.PUT, url, payload, headers, options);
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return XhrRequest.ajax(XhrRequest.Method.DELETE, url, payload, headers, options);
    }
  }, {
    key: "createXMLHTTPObject",
    value: function createXMLHTTPObject() {
      var xmlhttp = null;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = XhrRequest.XMLHttpFactories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          try {
            xmlhttp = i();
          } catch (e) {
            continue;
          }

          break;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return xmlhttp;
    }
  }]);

  return XhrRequest;
}();

XhrRequest.XMLHttpFactories = [function () {
  return new XMLHttpRequest();
}, function () {
  return new window["ActiveXObject"]("Msxml2.XMLHTTP");
}, function () {
  return new window["ActiveXObject"]("Msxml3.XMLHTTP");
}, function () {
  return new window["ActiveXObject"]("Microsoft.XMLHTTP");
}];

(function (XhrRequest) {
  var Method;

  (function (Method) {
    Method[Method["GET"] = "GET"] = "GET";
    Method[Method["POST"] = "POST"] = "POST";
    Method[Method["PUT"] = "PUT"] = "PUT";
    Method[Method["DELETE"] = "DELETE"] = "DELETE";
  })(Method = XhrRequest.Method || (XhrRequest.Method = {}));
})(XhrRequest || (XhrRequest = {}));

var _default = XhrRequest;
exports.default = _default;

},{}]},{},[1]);
