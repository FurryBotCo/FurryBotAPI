import pkg from "../../package.json";

export const API_URL = "https://api.furry.bot";
export const API_VERSION = "V2";
export const API_HEADERS = {
	artists: "X-FurryBotAPI-Artist",
	source: "X-FurryBotAPI-Source",
	width: "X-FurryBotAPI-Image-Width",
	height: "X-FurryBotAPI-Image-Height",
	url: "X-FurryBotAPI-Image-URL",
	shorturl: "X-FurryBotAPI-Short-URL",
	type: "X-FurryBotAPI-Image-Type",
	name: "X-FurryBotAPI-Image-Name",
	ext: "X-FurryBotAPI-Image-Extension"
};
export const USER_AGENT = `FurryBotAPI/${pkg.version} (https://api.furry.bot/V2, https://github.com/FurryBotCo/FurryBotAPI)`;
