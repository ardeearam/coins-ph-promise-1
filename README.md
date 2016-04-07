# Coins.ph API for Node.js with Promises

The [Coins.ph API Reference](https://coins.readme.io/v2.1/docs) is a good resource to learn more about these APIs.

## Installing in your Node project

```sh
$ npm install --save coins-ph-promise
```

## Building
Be sure you have babel installed:
```sh
$ npm install -g babel-cli babel-preset-es2015
```

Then:
```sh
$npm run build
```


## Example Usage

```js
import Coins from "coins-ph-promise";

var coinsClient = new Coins({
    key: process.env.COINS_KEY,
    secret: process.env.COINS_SECRET
});

client.transactionHistory()
.then(function(data) {
    console.log(data);
})
.catch(function(err) {
    console.log(err);
});

client.payoutOutlets({ region: "PH" })
.then(function(data) {
    console.log(data);
})
.catch(function(err) {
    console.log(err);
});
```

## License

[MIT][license] © [Scott Hasbrouck][http://scotthasbrouck.com]