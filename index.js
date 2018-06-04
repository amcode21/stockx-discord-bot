let stockx = require('./stockx');
let Discord = require('discord.js');
let client = new Discord.Client();

let TOKEN = 'YOUR_TOKEN_HERE';

client.on('ready', () => {
	console.log(`Logged in as: ${client.user.tag}!`);
});

client.on('message', (msg) => {
	if (msg.author.bot || !msg.content.startsWith('?')) return;

	let args = msg.content.slice(1).split(/ +/);

	let command = args.shift();

	if (command === 'search') {
		let product = args.join(' ');

		stockx.getData(product, null, (err, data) => {
			console.log(data);
			if (!err && data !== null) {
				msg.channel.send({
					embed: {
					    color: 3447003,
					    author: {
					      	name: client.user.username,
					      	icon_url: 'https://pbs.twimg.com/profile_images/880500140984946689/YLtBaLZS_400x400.jpg'
					    },
					    title: data.name,
					    description: `${data.deadstock_sold} sold to date. Big boof.`,
					    url: data.link,
					    thumbnail: {
					    	url: data.image_url
					    },
					    fields: [
					    	{
					        	name: 'Lowest Ask',
					        	value: data.lowest_ask,
					        	inline: true
					      	},
					      	{
					       		name: 'Highest Bid',
					        	value: data.highest_bid,
					        	inline: true
					      	},
					      	{
					        	name: 'Last Sale',
					        	value: data.last_sale,
					        	inline: true
					      	},
					      	{
					        	name: '72-Hour Sales',
					        	value: data.sales_last_72,
					        	inline: true
					      	}
					    ],
					    timestamp: new Date().toISOString(),
					    footer: {
					      	text: 'Powered by Bork + Memes'
					    }
				  	}
				});
			}
			else {
				console.log(`[${new Date().toISOString()}] Error finding data for: '${product}'`);
			}
		});
	}

	else if (command === 'searchSize') {
		let size = args.splice(0, 1)[0];
		let product = args.join(' ');

		stockx.getData(product, size, (err, data) => {
			console.log(data);
			if (!err && data !== null) {
				msg.channel.send({
					embed: {
					    color: 3447003,
					    author: {
					      	name: client.user.username,
					      	icon_url: 'https://pbs.twimg.com/profile_images/880500140984946689/YLtBaLZS_400x400.jpg'
					    },
					    title: data.name,
					    description: `${(data.description !== null) ? data.description : '*No Description For This Product*'}`,
					    url: data.link,
					    thumbnail: {
					    	url: data.image_url
					    },
					    fields: [
					    	{
					    		name: 'Size',
					    		value: `${size}`
					    	},
					    	{
					        	name: 'Lowest Ask',
					        	value: data.lowest_ask,
					        	inline: true
					      	},
					      	{
					       		name: 'Highest Bid',
					        	value: data.highest_bid,
					        	inline: true
					      	},
					      	{
					        	name: 'Average Price',
					        	value: data.avg_price,
					        	inline: true
					      	},
					      	{
					        	name: 'Deadstock Sold',
					        	value: data.deadstock_sold,
					        	inline: true
					      	},
					      	{
					        	name: 'Last Sale',
					        	value: data.last_sale,
					        	inline: true
					      	},
					      	{
					        	name: '72-Hour Sales',
					        	value: data.sales_last_72,
					        	inline: true
					      	}
					    ],
					    timestamp: new Date().toISOString(),
					    footer: {
					      	text: 'Powered by Bork + Memes'
					    }
				  	}
				});
			}
			else {
				console.log(`[${new Date().toISOString()}] Error finding data for: '${product}'`);
			}
		});
	}
});

client.login(TOKEN);

/*stockx.getData('Supreme/Hanes White Tagless Tees', (err, product) => {
	console.log(product);
});*/