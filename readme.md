# THIS IS OUTDATED!
@FIXME update this

## <center>Furry Bot API</center>

### Advantages of this api:
* Requires no authentication, so it is easier to use
* All image are HAND PICKED by the api creator, [Donovan_DMC](https://furry.cool) (note: if you find an image that seems out of place, report it in [our Discord server](https://discord.gg/YazeA7e), I try to do my best, but I'm not perfect!)
* The api has multiple instances running, so requests are solved fast, even when there are many people accessing the api at one time!
* Everything is served from our cdn ([furcdn.net](https://furcdn.net))
* [99.9% uptime](https://status.api.furry.bot/)

### This is the **only** official api wrapper for [api.furry.bot](https://docs.furry.bot), with special typescript support for all endpoints!

### You can get the available methods from the typings, or by making a request to [https://api.furry.bot/V2/categories](https://api.furry.bot/V2/categories), replace the periods in the `db` property with forward slashes, and use that as the url.

### If you are building this module from scratch, you will need to build it using `npm run build`, this will put the js files you need in the `src` folder. (you will need typescript to be installed globally (npm i -g typescript) to use the typescript compiler) 

Requests on the default api are converted to methods by replacing forward slashes with periods.
ex
https://api.furry.bot/V2/furry/hug -> furry.hug()
