let request = require('request').defaults({gzip: true});

let StockX = {};

StockX.getData = (product, size, callback) => {
	request({
		url: 'https://xw7sbct9v6-2.algolianet.com/1/indexes/products/query?x-algolia-api-key=6bfb5abee4dcd8cea8f0ca1ca085c2b3',
		qs: {
			'x-algolia-agent': 'Algolia for vanilla JavaScript 3.27.1',
			'x-algolia-application-id': 'XW7SBCT9V6',
			'x-algolia-api-key': '6bfb5abee4dcd8cea8f0ca1ca085c2b3'
		},
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'en-US,en;q=0.9',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
			'Content-Type': 'application/json',
			'DNT': '1',
			'Host': 'xw7sbct9v6-2.algolianet.com',
			'Origin': 'https://stockx.com',
			'Pragma': 'no-cache',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
		},
		json: {
			"params": `query=${product.replace(/\s/g, '%20')}&hitsPerPage=5`
		}
	}, (err, resp, body) => {
		if (!err && resp.statusCode === 200) {
			if (body.hits[0]) {
				let product = body.hits[0];

				if (size !== null) {
					StockX.getSizeData(product.url, size, (err, data) => {
						//console.log(data);
						return callback(err, data);
					})
				}

				else {
					return callback(null, {
						name: product.name,
						image_url: product.media.imageUrl,
						highest_bid: '$' + product.highest_bid,
						lowest_ask: '$' + product.lowest_ask,
						last_sale: '$' + product.last_sale,
						link: `https://www.stockx.com/${product.url}`,
						deadstock_sold: product.deadstock_sold,
						sales_last_72: product.sales_last_72
					});
				}
			}
			else {
				return callback('invalid product', null);
			}
		}
		else {
			return callback(err, null);
		}
	});
};

StockX.getSizeData = (url, size, callback) => {
	request({
		url: `https://stockx.com/api/products/${url}`,
		qs: {
			'includes': 'market'
		},
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'en-US,en;q=0.9',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
			'Content-Type': 'application/json',
			'DNT': '1',
			'Origin': 'https://stockx.com',
			'Pragma': 'no-cache',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
		},
		json: true
	}, (err, resp, body) => {
		if (!err && resp.statusCode === 200) {
			let product = body.Product;

			let sizes = Object.keys(product.children);

			let item;

			sizes.forEach((sizeID) => {
				if (product.children[sizeID].shoeSize === size) {
					item = product.children[sizeID];

					return callback(null, {
						name: item.title,
						image_url: item.media.imageUrl,
						description: `${(item.description) ? item.description : null}`,
						highest_bid: '$' + item.market.highestBid,
						lowest_ask: '$' + item.market.lowestAsk,
						last_sale: '$' + item.market.lastSale,
						link: `https://www.stockx.com/${item.urlKey}`,
						avg_price: '$' + item.market.averageDeadstockPrice,
						deadstock_sold: item.market.deadstockSold,
						sales_last_72: item.market.salesLast72Hours
					});
				}
			});
		}
		else {
			console.log(err);
		}
	});
};

module.exports = StockX;