"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Coins = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentPromise = require("superagent-promise");

var _superagentPromise2 = _interopRequireDefault(_superagentPromise);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

var _superagentHmac = require("superagent-hmac");

var _superagentHmac2 = _interopRequireDefault(_superagentHmac);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var agent = (0, _superagentPromise2.default)(_superagent2.default, _bluebird2.default);

var Coins = exports.Coins = function () {
    function Coins(options) {
        _classCallCheck(this, Coins);

        this.options = options;
        this.host = "https://coins.ph/";
    }

    /**
     * createBuyorder
     * Create a new buyorder
     *
     * @name createBuyorder
     * @function
     * @param {Object} data - The order data as documented [here](https://coins.readme.io/docs/testinput).
     */


    _createClass(Coins, [{
        key: "createBuyorder",
        value: function createBuyorder(data) {
            return this._request({
                path: "buyorder",
                method: "POST",
                data: data,
                responseField: "order",
                version: "api/v2"
            });
        }

        /**
         * markBuyorderPaid
         * Mark a buy order as paid
         *
         * @name markBuyorderPaid
         * @function
         * @param {Object} data - The order data as documented [here](https://coins.readme.io/docs/buyorder-1).
         */

    }, {
        key: "markBuyorderPaid",
        value: function markBuyorderPaid(data) {
            return this._request({
                path: "buyorder/" + data.id + "/",
                method: "PUT",
                params: {},
                responseField: "order"
            });
        }

        /**
         * buyorder
         * Retrieve an existing buyorder
         *
         * @name buyorder
         * @function
         * @param {Object} data - The order data as documented [here](https://coins.readme.io/docs/buyorder).
         */

    }, {
        key: "buyorder",
        value: function buyorder(params) {
            return this._request({
                path: "buyorder" + (params.buyorder_id ? "/" + params.buyorder_id : "") + "/",
                method: "GET",
                params: {},
                responseField: "order"
            });
        }

        /**
         * createSellorder
         * Create a new sellorder
         *
         * @name createSellorder
         * @function
         * @param {Object} data - The sell order data (documented [here](https://coins.readme.io/docs/sellorder)).
         */

    }, {
        key: "createSellorder",
        value: function createSellorder(data) {
            return this._request({
                path: "sellorder",
                method: "POST",
                data: data,
                responseField: "order",
                version: "api/v2"
            });
        }

        /**
         * validateField
         * Validate field values
         *
         * @name validateField
         * @function
         * @param {Object} data - The post data (documented [here](https://coins.readme.io/docs/validate-field)).
         */

    }, {
        key: "validateField",
        value: function validateField(data) {
            return this._request({
                path: "validate-field/",
                method: "POST",
                params: {},
                data: data,
                version: "api/v3",
                responseField: "is_valid"
            });
        }

        /**
         * sellorder
         * Retrieve an existing sellorder
         *
         * @name sellorder
         * @function
         * @param {Object} params - The sell order params (documented [here](https://coins.readme.io/docs/sellorder-1)).
         */

    }, {
        key: "sellorder",
        value: function sellorder(params) {
            return this._request({
                path: "sellorder/" + (params.sell_order_id ? params.sell_order_id : ""),
                params: {},
                data: "order",
                version: "api/v2"
            });
        }

        /**
         * transactionHistory
         * Gets the transaction history (buyorders).
         *
         * @name transactionHistory
         * @function
         */

    }, {
        key: "transactionHistory",
        value: function transactionHistory() {
            return this._request({
                path: "buyorder",
                params: {},
                data: "orders",
                version: "api/v2"
            });
        }

        /**
         * payinOutlets
         * Retrieve supported payin-outlets
         *
         * @name payinOutlets
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/payin-outlets)).
         */

    }, {
        key: "payinOutlets",
        value: function payinOutlets(params) {
            return this._request({
                path: "payin-outlets/",
                method: "GET",
                params: params
            });
        }

        /**
         * payinOutletFees
         * Retrieve current payin-outlet-fees
         *
         * @name payinOutletFees
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/payin-outlet-fees)).
         */

    }, {
        key: "payinOutletFees",
        value: function payinOutletFees(params) {
            return this._request({
                path: "payin-outlet-fees/",
                method: "GET",
                params: params
            });
        }

        /**
         * payinOutletCategories
         * Retrieve supported payin-outlet-categories
         *
         * @name payinOutletCategories
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/payin-outlet-categories)).
         */

    }, {
        key: "payinOutletCategories",
        value: function payinOutletCategories(params) {
            return this._request({
                path: "payin-outlet-categories/",
                method: "GET",
                params: params,
                data: undefined
            });
        }

        /**
         * payOutOutlets
         * Retrieve supported payout-outlets
         *
         * @name payinOutlets
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/payin-outlets)).
         */

    }, {
        key: "payoutOutlets",
        value: function payoutOutlets(params) {
            return this._request({
                path: "payout-outlets/",
                method: "GET",
                params: params
            });
        }

        /**
         * payoutOutletFees
         * Retrieve current payout-outlet-fees
         *
         * @name payinOutletFees
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/payin-outlet-fees)).
         */

    }, {
        key: "payoutOutletFees",
        value: function payoutOutletFees(params) {
            return this._request({
                path: "payout-outlet-fees/",
                method: "GET",
                params: params
            });
        }

        /**
         * payoutOutletCategories
         * Retrieve supported payout-outlet-categories
         *
         * @name payinOutletCategories
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/payin-outlet-categories)).
         */

    }, {
        key: "payoutOutletCategories",
        value: function payoutOutletCategories(params) {
            return this._request({
                path: "payout-outlet-categories/",
                method: "GET",
                params: params,
                data: undefined
            });
        }

        /**
         * createPaymentRequest
         * Create a new payment request
         *
         * @name createPaymentRequest
         * @function
         * @param {Object} data - The request data (documented [here](https://coins.readme.io/docs/payment-requests)).
         */

    }, {
        key: "createPaymentRequest",
        value: function createPaymentRequest(data) {
            return this._request({
                path: "payment-requests/",
                method: "POST",
                data: data,
                version: "api/v3",
                responseField: "payment-request"
            });
        }

        /**
         * paymentRequests
         * Retrieve an existing or a list of existing payment requests
         *
         * @name paymentRequests
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/payment-requests-1)).
         */

    }, {
        key: "paymentRequests",
        value: function paymentRequests(params) {
            return this._request({
                path: "payment-requests/",
                params: params,
                version: "api/v3",
                responseField: "payment-request"
            });
        }

        /**
         * createPaymentRequest
         * Transfer funds between two accounts
         *
         * @name createPaymentRequest
         * @function
         * @param {Object} data - The request data (documented [here](https://coins.readme.io/docs/transfers)).
         */

    }, {
        key: "createPaymentRequest",
        value: function createPaymentRequest(data) {
            return this._request({
                path: "transfers/",
                method: "POST",
                data: data,
                version: "api/v3",
                responseField: "transfer"
            });
        }

        /**
         * transfers
         * Get the list of transfers or a specific one.
         *
         * @name transfers
         * @function
         * @param {Object} params - The params object (documented [here](https://coins.readme.io/docs/transfers-1)).
         */

    }, {
        key: "transfers",
        value: function transfers(params) {
            return this._request({
                path: "transfers" + (params.id ? "/" + params.id : "") + "/",
                params: {},
                version: "api/v3",
                responseField: "transfer"
            });
        }

        /**
         * cryptoAccounts
         * Retrieve existing crypto-accounts
         *
         * @name cryptoAccounts
         * @function
         * @param {Object} params - The params object (documented [here](https://coins.readme.io/docs/crypto-accounts)).
         */

    }, {
        key: "cryptoAccounts",
        value: function cryptoAccounts(params) {
            return this._request({
                path: "crypto-accounts/",
                params: params,
                version: "api/v3"
            });
        }

        /**
         * convertFunds
         * Convert funds between a user's accounts
         *
         * @name convertFunds
         * @function
         * @param {Object} data - The data object (documented [here](https://coins.readme.io/docs/crypto-account://coins.readme.io/docs/crypto-exchange)).
         */

    }, {
        key: "convertFunds",
        value: function convertFunds(data) {
            return this._request({
                path: "crypto-exchanges/",
                data: data,
                version: "api/v3",
                responseField: "crypto-exchanges"
            });
        }

        /**
         * cryptoExchanges
         * Retrieve current crypto-exchanges
         *
         * @name cryptoExchanges
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/crypto-exchanges)).
         */

    }, {
        key: "cryptoExchanges",
        value: function cryptoExchanges(params) {
            return this._request({
                path: "crypto-exchanges" + (params && params.id ? "/" + params.id : "") + "/",
                params: params,
                version: "api/v3",
                responseField: "crypto-exchanges"
            });
        }

        /**
         * cryptoRoutes
         * Retrieve existing crypto-routes
         *
         * @name cryptoRoutes
         * @function
         */

    }, {
        key: "cryptoRoutes",
        value: function cryptoRoutes() {
            return this._request({
                path: "crypto-routes/",
                version: "api/v3",
                responseField: " "
            });
        }

        /**
         * cryptoPayments
         * Get the crypto payments or a specific one.
         *
         * @name cryptoPayments
         * @function
         * @param {Object} params - The request params (documented [here](https://coins.readme.io/docs/crypto-payments)).
         */

    }, {
        key: "cryptoPayments",
        value: function cryptoPayments(params) {
            return this._request({
                path: "crypto-payments" + (params.id ? "/" + params.id : "") + "/",
                params: params,
                version: "api/v3",
                responseField: "crypto-payments"
            });
        }

        /**
         * createUser
         * Create a new user
         *
         * @name createUser
         * @function
         * @param {Object} data - The request data (documented [here](https://coins.readme.io/docs/user)).
         */

    }, {
        key: "createUser",
        value: function createUser(data) {
            return this._request({
                path: "user",
                method: "POST",
                data: data,
                responseField: "user",
                version: "api/v2"
            });
        }

        /**
         * getMarketRates
         * Get a mark rate for all currencies from coins.ph
         *
         * @name getMarketRates
         * @function
         */

    }, {
        key: "getMarketRates",
        value: function getMarketRates() {
            return this._request({
                fullURL: 'https://quote.coins.ph/v1/markets',
                responseField: 'markets'
            });
        }

        /**
         * _signRequest
         * Signs a request.
         *
         * @name _signRequest
         * @function
         * @param {String} url The request url.
         * @param {Object} body The request data.
         * @returns {Object} An object containing:
         *
         *  - `signature` (String): The HMAC signature.
         *  - `nonce` (String): nonce value.
         */

    }, {
        key: "_signRequest",
        value: function _signRequest(url, body) {
            var unixTime = new Date().getTime();
            var nonce = unixTime * 1e14;
            var nonceString = String(nonce);
            var message = '';
            if (body === undefined) {
                message = nonceString + url;
            } else {
                message = nonceString + url + JSON.stringify(body);
            }
            return {
                signature: _crypto2.default.createHmac("SHA256", this.options.secret).update(message).digest("hex"),
                nonce: nonce
            };
        }

        /**
         * _request
         *
         * @name _request
         * @function
         * @param {Object} options An object containing the following fields:
         *
         *  - `url` (String): API endpoint.
         *  - `method` (String): HTTP method (default: `get`).
         *  - `params` (Object): GET params object.
         *  - `data` (Object): POST data object.
         *  - `responseField` (String): The response field to take.
         *  - `version` (String): The endpoint version (default: `d/api`).
         *
         */

    }, {
        key: "_request",
        value: function _request(options) {

            var method = options.method || "GET",
                data = options.data,
                version = options.version || "d/api",
                qs = _querystring2.default.stringify(options.params || {}),
                requestURL = options.fullURL ? options.fullURL : this.host + version + "/" + options.path + (qs ? "?" + qs : ""),
                signed = this._signRequest(requestURL, data);

            var request = agent(method, requestURL).set('ACCESS_SIGNATURE', signed.signature).set('ACCESS_KEY', this.options.key).set('ACCESS_NONCE', signed.nonce).set('Accept', 'application/json');
            if (method === "POST") {
                request.set('Content-Type', 'application/json');
            }
            if (options.data) {
                request.send(options.data);
            }
            return request.end().then(function (response) {
                return options.responseField && response.body[options.responseField] ? response.body[options.responseField] : response.body;
            });
        }
    }]);

    return Coins;
}();

;