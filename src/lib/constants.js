"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProviders = void 0;
var bard_1 = require("../providers/bard");
var bing_1 = require("../providers/bing");
var claude_1 = require("../providers/claude");
var claude2_1 = require("../providers/claude2");
var huggingchat_1 = require("../providers/huggingchat");
var oobabooga_1 = require("../providers/oobabooga");
var openai_1 = require("../providers/openai");
var perplexity_1 = require("../providers/perplexity");
var you_1 = require("../providers/you");
var perplexity_llama_js_1 = require("../providers/perplexity-llama.js");
var lepton_llama_js_1 = require("../providers/lepton-llama.js");
var phind_1 = require("../providers/phind");
var smol_1 = require("../providers/smol");
var together_1 = require("../providers/together");
var vercel_1 = require("providers/vercel");
var openrouter_1 = require("../providers/openrouter");
var poe_1 = require("providers/poe");
var inflection_1 = require("providers/inflection");
var stablechat_1 = require("providers/stablechat");
var falcon180bspace_1 = require("providers/falcon180bspace");
exports.allProviders = [
    openai_1.default,
    bard_1.default,
    bing_1.default,
    claude_1.default,
    claude2_1.default,
    you_1.default,
    perplexity_1.default,
    phind_1.default,
    poe_1.default,
    inflection_1.default,
    huggingchat_1.default,
    stablechat_1.default,
    falcon180bspace_1.default,
    oobabooga_1.default,
    together_1.default,
    openrouter_1.default,
    perplexity_llama_js_1.default,
    lepton_llama_js_1.default,
    vercel_1.default,
    smol_1.default,
];
