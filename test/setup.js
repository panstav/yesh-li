import * as Gatsby from "gatsby";

import * as trackEvents from "@lib/track-events.js";
import localDb from "@services/localDb.js";
import xhr from "@services/xhr/index.js";

import config from '../gatsby-config.js';

// Mock Gatsby methods
Gatsby.useStaticQuery = jest.fn().mockReturnValue({ site: config });
Gatsby.graphql = jest.fn();

trackEvents.trackConversion = jest.fn();

mockEveryMethod(localDb);
mockEveryMethod(xhr);

function mockEveryMethod (obj) {
	for (const key in obj) {
		if (typeof obj[key] === 'function') {
			obj[key] = jest.fn();
		}
	}
}