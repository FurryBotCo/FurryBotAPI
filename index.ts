import phin from "phin";
import util from "util";

class APIError extends Error {
	constructor(err: string, message: string, response: any) {
		super(`${err}, ${message}, response: ${util.inspect(response, { depth: 1 })}`);
		this.name = "APIError";
	}
}

interface JSONResponse {
	success: boolean;
	response: {
		image: string;
		filetype: "png" | "jpg" | "jpeg" | "webp" | "gif" | "mp4";
		name: string;
	};
}

type AnimalTypes = "birb" | "blep" | "cheeta" | "fox" | "lynx" | "wolf";
type SFWFurryTypes = "boop" | "cuddle" | "flop" | "fursuit" | "hold" | "howl" | "hug" | "kiss" | "lick" | "propose";
type NSFWFurryTypes = "bang" | "bulge" | "cuddle" | "group" | "hug" | "kiss" | "lick" | "suck" | "yiff" | "yiff/dickgirl" | "yiff/gay" | "yiff/lesbian" | "yiff/straight";

class FurryBotAPI {
	userAgent: string;
	constructor(userAgent: string) {
		this.userAgent = userAgent;
	}

	apiRequest(category: "animals", sfw: true, path: AnimalTypes, json: false): Promise<Buffer>;
	apiRequest(category: "furry", sfw: true, path: SFWFurryTypes, json: false): Promise<Buffer>;
	apiRequest(category: "furry", sfw: false, path: NSFWFurryTypes, json: false): Promise<Buffer>;
	apiRequest(category: string, sfw: boolean, path: string, json: false): Promise<Buffer>;

	apiRequest(category: "animals", sfw: true, path: AnimalTypes, json: true): Promise<JSONResponse>;
	apiRequest(category: "furry", sfw: true, path: SFWFurryTypes, json: true): Promise<JSONResponse>;
	apiRequest(category: "furry", sfw: false, path: NSFWFurryTypes, json: true): Promise<JSONResponse>;
	apiRequest(category: string, sfw: boolean, path: string, json: true): Promise<JSONResponse>;

	async apiRequest(category = "furry", sfw = false, path = "hug", json = true) {
		const p = await phin({
			method: "GET",
			url: `https://api.furry.bot/${category.toLowerCase()}${category === "furry" ? `${sfw ? "/sfw" : "/nsfw"}` : ""}/${path.toLowerCase()}${!json ? "/image" : ""}`,
			parse: json ? "json" : "none",
			headers: {
				"User-Agent": this.userAgent
			}
		}) as phin.JsonResponse | phin.BufferResponse;

		if (p.statusCode !== 200) throw new APIError(`${p.statusCode} ${p.statusMessage}`, `api request to "https://api.furry.bot/${category.toLowerCase()}${category === "animals" ? `${sfw ? "/sfw" : "/nsfw"}` : ""}/${path.toLowerCase()}" returned a non 200 OK status.`, json ? p.body : p.body.toString());

		else return p.body;
	}

	getCounts(): Promise<{
		furry: {
			sfw: {
				[cat: string]: number & {
					yiff: {
						[cat: string]: number;
					}
				}
			};
			nsfw: {
				[cat: string]: number;
			};
		};
		animals: {
			[cat: string]: number
		}
	}>;

	async getCounts() {
		return phin({
			method: "GET",
			url: "https://api.furry.bot/counts",
			headers: {
				"User-Agent": this.userAgent
			},
			parse: "json"
		}).then(res => res.body);
	}
}

export = FurryBotAPI;