"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptCritic = void 0;
var solid_1 = require("@heroicons/react/20/solid");
// @ts-ignore
var vex_js_1 = require("vex-js");
// Main css
require("vex-js/dist/css/vex.css");
// Themes (Import all themes you want to use here)
require("vex-js/dist/css/vex-theme-default.css");
require("vex-js/dist/css/vex-theme-os.css");
vex_js_1.default.registerPlugin(require('vex-dialog'));
vex_js_1.default.defaultOptions.className = 'vex-theme-os';
function _promptCritic(originalPrompt) {
    return "I need to improve the original prompt: \n  \n  --- Original Prompt ---\n  ".concat(originalPrompt, "\n  --- End Original Prompt ---\n\n  There are known ways to improve prompts for better LLM performance.\n  Can you please briefly list ways to improve (3 <ol> <li> bullet points with <b>bolded headings</b> per bullet) and then suggest one improved prompt?\n\tDo not attempt to answer the prompt yourself.\n  ");
    // , for example adding "Let's think step by step to get to the right answer" or adding comments before each line of code.
}
function _promptImprover(originalPrompt, modifyInstructions) {
    return "I need to add more detail to the original prompt: \n  \n  --- Original Prompt ---\n  ".concat(originalPrompt, "\n  --- End Original Prompt ---\n\n  ").concat(modifyInstructions
        ? "My modification instructions are: ".concat(modifyInstructions)
        : '', "\n  Please suggest a newer, more detailed (still <300 words) version of this prompt that improves LLM performance. \n  Do not preface with any conversation or small talk, only reply with the improved prompt.\n  ");
    // For example:
    // - for general knowledge questions, appending "Let's think step by step to get to the right answer." is known to do well.
    // - for creative writing, setting temperature=200 and adding exciting adjectives, writing in the style of Hunter S Thompson and Winston Churchill and other well known authors.
    // - for code generation, first ask for the high level implementation plan in comments, then make sure each non-trivial line of code is preceded by a comment explaining what it does.
    // Do not preface with any conversation or small talk, only reply with the improved prompt.
    // `;
}
function PromptCritic(props) {
    var active = props.active, superprompt = props.superprompt, setSuperprompt = props.setSuperprompt;
    function runPromptCritic() {
        return __awaiter(this, void 0, void 0, function () {
            var promptChangeStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (superprompt.length < 10) {
                            alert('superprompt is too short. write a longer one! e.g. "write a receipe for scrambled eggs"');
                            return [2 /*return*/];
                        }
                        if (superprompt.length > 60) {
                            alert('superprompt is too long. it can only currently handle low effort prompts. e.g. "write a receipe for scrambled eggs". we are working on extending it to 100k tokens!');
                            return [2 /*return*/];
                        }
                        console.log('promptCritic', superprompt);
                        window.electron.browserWindow.promptHiddenChat(_promptCritic(superprompt));
                        return [4 /*yield*/, new Promise(function (res) {
                                return vex_js_1.default.dialog.prompt({
                                    unsafeMessage: "\n\t\t\t\t\t<div class=\"title-bar\">\n\t\t\t\t\t\t\t<h1>PromptCritic analysis</h1>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id=\"streamingPromptResponseContainer\">\n\t\t\t\t\t</div>",
                                    placeholder: "Write your new prompt here",
                                    callback: res,
                                });
                            })];
                    case 1:
                        promptChangeStr = _a.sent();
                        if (!promptChangeStr)
                            return [2 /*return*/];
                        console.log('stage 2 response', promptChangeStr);
                        console.log('finalPrompt', promptChangeStr);
                        if (promptChangeStr != null) {
                            setSuperprompt(promptChangeStr);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (<button className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'px-4 py-2 text-sm w-full flex items-center justify-start')} onClick={runPromptCritic}>
			<solid_1.SparklesIcon className="inline w-4 h-4 mr-2"/>
			PromptCritic (alpha)
		</button>);
}
exports.PromptCritic = PromptCritic;
// https://tailwindui.com/components/application-ui/elements/dropdowns
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
