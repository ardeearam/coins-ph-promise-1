import B from "bluebird";
import superagent from "superagent";
import superagentPromise from "superagent-promise";
import crypto from "crypto";
import querystring from "querystring";
import superagentHmac from "superagent-hmac";

const agent = superagentPromise(superagent, B);

export class Coins {
    constructor (options) {
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
    createBuyorder(data) {
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
    markBuyorderPaid(data) {
        return this._request({
            path: `buyorder/${data.id}/`,
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
    buyorder(params) {
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
    createSellorder(data) {
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
    validateField(data) {
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
    sellorder(params) {
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
    transactionHistory () {
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
    payinOutlets(params) {
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
    payinOutletFees(params) {
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
    payinOutletCategories(params) {
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
    payoutOutlets(params) {
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
    payoutOutletFees(params) {
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
    payoutOutletCategories(params) {
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
    createPaymentRequest(data) {
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
    paymentRequests(params) {
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
    createPaymentRequest(data) {
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
    transfers(params) {
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
    cryptoAccounts(params) {
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
    convertFunds(data) {
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
    cryptoExchanges(params) {
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
    cryptoRoutes() {
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
    cryptoPayments(params) {
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
    createUser(data) {
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
    getMarketRates() {
        return this._request({
            fullURL: 'https://quote.coins.ph/v1/markets',
            responseField: 'markets'
        })
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
    _signRequest (url, body) {
        var unixTime = new Date().getTime();
        var nonce = unixTime * 1e14;
        var nonceString = String(nonce);
        var message = '';
        if (body === undefined) {
            message = nonceString + url;
        }
        else {
            message = nonceString + url + JSON.stringify(body);
        }
        return {
            signature: crypto.createHmac("SHA256", this.options.secret)
                .update(message)
                .digest("hex"),
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
    _request (options) {

        var method = options.method || "GET",
        data = options.data,
        version = options.version || "d/api",
        qs = querystring.stringify(options.params || {}),
        requestURL = options.fullURL
            ? options.fullURL
            : this.host + version + "/" + options.path + (qs ? "?" + qs : ""),
        signed = this._signRequest(requestURL, data);

        var request = agent(method, requestURL)
        .set('ACCESS_SIGNATURE', signed.signature)
        .set('ACCESS_KEY', this.options.key)
        .set('ACCESS_NONCE', signed.nonce)
        .set('Accept', 'application/json');
        if (method === "POST") {
            request.set('Content-Type', 'application/json');
        }
        if (options.data) {
            request.send(options.data);
        }
        return request.end()
        .then(function(response) {
            return options.responseField
                && response.body[options.responseField]
                ?  response.body[options.responseField] : response.body;
        });
    }
};
