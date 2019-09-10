## <center>Furry Bot API</center>

### Advantages of this api:
* Requires no authentication, so it is easier to use
* All image are HAND PICKED by the api creator, [Donovan_DMC](https://furry.cool) (note: if you find an image that seems out of place, report it in [our Discord server](https://discord.gg/YazeA7e), I try to do my best, but I'm not perfect!)
* The api has multiple instances running, so requests are solved fast, even when there are many people accessing the api at one time!
* Everything is served from our cdn ([furcdn.net](https://furcdn.net))
* [99.9% uptime](https://status.api.furry.bot/)

### This is the **only** official api wrapper for [api.furry.bot](https://apidocs.furry.bot), with special typescript support for all endpoints!

### You can either view [the documentation](https://apidocs.furry.bot) for the methods, or view the list (may be outdated) [here](#list-of-endpoints) 

### If you are building this module from scratch, you will need to build it using `npm run build`, this will put the js files you need in the `src` folder. (you will need typescript to be installed globally (npm i -g typescript) to use the typescript compiler) 

The parameters of the main function (apiRequest) are, in order: category, sfw, subcategory/path, json<br>
* The valid entries for "category" are "furry" and "animals"<br>
* The "sfw" parameter is just a true/false, only valid for the "furry" category.<br>
* The valid entries for "subcategory" are listed in the [api documentation](https://apidocs.furry.bot), and [here](#list-of-endpoints)
* The "json" parameter is once again, a true/false, if true it will return a json object, structured like this:
```json
{
	"success": true,
	"response": {
		"image": "image url",
		"filetype": "extension of the 'image' key",
		"name": "name of the image in the 'image' key"
	}
}
```
if false, it will return an object structured like this:

```json
{
	"image": (ImageBuffer),
	"imageFileType": "extension of the image",
	"imageURL": "the cdn url of the image",
	"imageName": "the name of the image"
}
```

#### This module is exported as a class, you call the class constructor with a user-agent you want to use in all of your api requests

```js
const FurryBotAPI = require("furrybotapi");

const fb = new FurryBotApi("user-agent-string");

// if you don't know how to setup a user agent string, the typical method is PackageName/PackageVersion (Github/Website URL),
// ex: FurryBotAPI/1.0.6 (https://github.com/FurryBotCo/FurryBotAPI)
```

All of the methods that are accessable throught direct requests to the [api](https://apidocs.furry.bot) are accessable here, here's an example for the [animals](https://apidocs.furry.bot/animals/) category:
```js
const FurryBotAPI = require("furrybotapi");

const fb = new FurryBotAPI("FurryBotAPI/1.0.6 (https://github.com/FurryBotCo/FurryBotAPI)");

// category, sfw, subcategory, json
fb.apiRequest("animals", true, "blep", true).then(res => console.log(res));
/* in console:
{
	success: true,
	response:
	{
		image: "https://i.furcdn.net/animals/blep/tumblr_pdquqhcfsA1va8n3bo1_500.jpg",
		filetype: "jpg",
		name: "tumblr_pdquqhcfsA1va8n3bo1_500.jpg"
	}
}*/
```

you can also get an image version, if you don't want to have to fetch the image separately

```js
const FurryBotAPI = require("furrybotapi");
const fs = require("fs");

const fb = new FurryBotAPI("FurryBotAPI/1.0.6 (https://github.com/FurryBotCo/FurryBotAPI)");

fb.apiRequest("furry", true, "hug", false).then(res => fs.writeFileSync(`${__dirname}/image.png`, res.image));
/*
this function returns an object like this:
{
	"image": (Buffer),
	"imageFileType": "jpg",
	"imageURL": "https://i.furcdn.net/furry/sfw/hug/3545-25333-18564.jpg",
	"imageName": "3545-25333-18564.jpg"
}
*/

// look at "image.png" that should be next to the file this was ran in
```

if something has multiple subcategories, like yiff/gay, yiff/straight, etc, you just throw the full sub-path into the subcategory parameter

```js
const FurryBotAPI = require("furrybotapi");

const fb = new FurryBotAPI("FurryBotAPI/1.0.6 (https://github.com/FurryBotCo/FurryBotAPI)");

// category, sfw, subcategory, json
fb.apiRequest("furry", false, "yiff/gay", true).then(res => console.log(res));
/* in console:
{
	success: true,
	response:
	{
		image: "https://i.furcdn.net/furry/nsfw/yiff/gay/806028389_85499.jpg",
		filetype: "jpg",
		name: "806028389_85499.jpg"
	}
}*/
```

you can also fetch the number of images in a category

```js
const FurryBotAPI = require("furrybotapi");

const fb = new FurryBotAPI("FurryBotAPI/1.0.6 (https://github.com/FurryBotCo/FurryBotAPI)");

fb.getCounts().then(res => console.log(res));

/* in console:
{
	"furry": {
		"sfw": {
			"boop": 145,
			"cuddle": 571,
			"flop": 4,
			"fursuit": 213,
			"hold": 459,
			"howl": 13,
			"hug": 143,
			"kiss": 142,
			"lick": 89,
			"propose": 29
		},
		"nsfw": {
			"cuddle": 59,
			"group": 24,
			"hug": 42,
			"kiss": 82,
			"lick": 113,
			"suck": 38,
			"bang": 294,
			"bulge": 7476,
			"yiff": {
				"dickgirl": 1150,
				"straight": 6284,
				"lesbian": 10756,
				"gay": 18876
			}
		}
	},
	"animals": {
		"birb": 66,
		"cheetah": 1,
		"lynx": 1,
		"wolf": 1,
		"fox": 101,
		"blep": 50
	}
}*/
``` 

## list of endpoints: 

Animals:
* birb
* blep
* cheetah
* fox
* fox
* lynx
* wolf

SFW Furry:
* boop
* cuddle
* flop
* fursuit
* hold
* howl
* hug
* kiss
* lick
* propose

NSFW Furry:
* bang
* bulge
* cuddle
* group
* hug
* kiss
* lick
* suck
* yiff
* * yiff/dickgirl
* * yiff/gay
* * yiff/lesbian
* * yiff/straight
