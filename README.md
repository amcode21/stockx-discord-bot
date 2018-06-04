## StockX Discord Bot
StockX market checker for Discord


## Commands
- ?search (item)
	- searches for a specific item on the StockX market returning general information
- ?searchSize (size) (item)
	- searches for the item in the specified size

Both commands return a bunch of data, but the searchSize command returns: Lowest Ask, Highest Bid, Description, Deadstock Sold, Item Link, and more size-specific data!

## Setup
- Be SURE to make your own Discord bot in the developer section of Discord, then copy/paste your token as the `TOKEN` variable in `index.js`
- After you create a bot, link it to your Discord server by generating an OAuth2 URL
- Add it to your server, run `npm install` to install all necessary dependencies when in the directory
- And finally, run `node index.js`!