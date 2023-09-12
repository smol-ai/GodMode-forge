"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import icon from '../../assets/icon.svg';
// https://electron-react-boilerplate.js.org/docs/styling#tailwind-integration
var pane_1 = require("components/pane");
var constants_1 = require("lib/constants");
var react_1 = require("react");
var react_split_1 = require("react-split");
require("tailwindcss/tailwind.css");
var utils_1 = require("lib/utils");
require("./App.css");
var browserPane_1 = require("./browserPane");
var TitleBar_1 = require("./TitleBar");
var settings_1 = require("./components/settings");
var defaultPaneList = (0, utils_1.getEnabledProviders)(constants_1.allProviders).map(function (x) { return ({
    webviewId: x.webviewId,
    shortName: x.shortName,
}); }); // in future we will have to disconnect the provider from the webview Id
var storedPaneList = window.electron.electronStore.get('paneList', defaultPaneList);
function Layout() {
    var _a = react_1.default.useState(''), superprompt = _a[0], setSuperprompt = _a[1];
    var _b = react_1.default.useState(storedPaneList), paneList = _b[0], setPaneList = _b[1];
    var _c = react_1.default.useState(false), isSettingsOpen = _c[0], setIsSettingsOpen = _c[1];
    var originalAlwaysOnTop = window.electron.browserWindow.getAlwaysOnTop();
    var _d = react_1.default.useState(originalAlwaysOnTop), isAlwaysOnTop = _d[0], setisAlwaysOnTop = _d[1];
    var toggleIsAlwaysOnTop = function () {
        var newstate = window.electron.browserWindow.getAlwaysOnTop();
        setisAlwaysOnTop(!newstate);
        window.electron.browserWindow.setAlwaysOnTop(!newstate);
    };
    var enabledProviders = paneList.map(function (x) { return constants_1.allProviders.find(function (y) { return y.webviewId === (x.webviewId || x.id); }); });
    var _e = react_1.default.useState(updateSplitSizes(enabledProviders)), sizes = _e[0], setSizes = _e[1];
    react_1.default.useEffect(function () {
        window.electron.electronStore.set('paneList', paneList);
    }, [paneList]);
    var resetPaneList = function () { return setPaneList(defaultPaneList); };
    var nonEnabledProviders = constants_1.allProviders.filter(function (x) { return !enabledProviders.includes(x); });
    /*
     * Apply provider-specific CSS and custom paste behavior
     */
    react_1.default.useEffect(function () {
        enabledProviders.forEach(function (provider) {
            provider.handleCss();
            provider.setupCustomPasteBehavior();
        });
    }, [enabledProviders]);
    react_1.default.useEffect(function () {
        enabledProviders.forEach(function (provider) {
            // Call provider-specific CSS handling and custom paste setup
            try {
                // regex to sanitize superprompt from backticks since we will put it into a template string
                // solves https://github.com/smol-ai/GodMode/issues/218
                provider.handleInput(superprompt.replace(/`/g, '\\`'));
            }
            catch (err) {
                console.error('error settling ' + provider.paneId(), err);
            }
        });
    }, [enabledProviders, superprompt]);
    var formRef = react_1.default.useRef(null); // don't actually use a <form> because it will just reload on submit even if you preventdefault
    var SuperPromptEnterKey = window.electron.electronStore.get('SuperPromptEnterKey', false);
    function submitProviders() {
        enabledProviders.forEach(function (provider) {
            provider.handleSubmit(superprompt);
        });
    }
    function enterKeyHandler(event) {
        var isCmdOrCtrl = event.metaKey || event.ctrlKey;
        var isEnter = event.key === 'Enter';
        if ((SuperPromptEnterKey && isEnter) || (isCmdOrCtrl && isEnter)) {
            event.preventDefault();
            submitProviders();
        }
    }
    var windowRef = react_1.default.useRef(null);
    function updateSplitSizes(panes, focalIndex) {
        if (focalIndex === void 0) { focalIndex = null; }
        // const clientWidth = windowRef.current?.clientWidth!;
        // const remainingWidth = ((clientWidth - 100) / clientWidth) * 100;
        var remainingWidth = 100;
        // Handle specific pane focus
        if (focalIndex !== null || focalIndex === 'A') {
            var sizes_1 = new Array(panes.length).fill(0);
            sizes_1[focalIndex] = remainingWidth;
            return sizes_1;
        }
        else {
            // Evenly distribute remaining space among all panes
            var remainingPercentage = remainingWidth / panes.length;
            var sizes_2 = new Array(panes.length).fill(remainingPercentage);
            return sizes_2;
        }
    }
    var paneShortcutKeys = {};
    for (var i = 0; i < enabledProviders.length; i++) {
        paneShortcutKeys["".concat(i + 1)] = i;
    }
    console.warn('paneShortcutKeys', paneShortcutKeys);
    var _f = react_1.default.useState(0), currentlyOpenPreviewPane = _f[0], setOpenPreviewPane = _f[1];
    function onKeyDown(event) {
        var _a;
        var isCmdOrCtrl = event.metaKey || event.ctrlKey;
        var isShift = event.shiftKey;
        console.debug('keydown', event.key, isCmdOrCtrl, event);
        if (isCmdOrCtrl &&
            (event.key in paneShortcutKeys ||
                (event.code.match(/Digit[1-9]/) &&
                    event.code[event.code.length - 1] in paneShortcutKeys))) {
            var digit_1 = +event.key || +event.code[event.code.length - 1];
            if (paneShortcutKeys[digit_1] === null) {
                window.electron.browserWindow.reload(); // this is a hack; setSizes by itself does not seem to update the splits, seems like a bug, but we dont have a choice here
            }
            else {
                setOpenPreviewPane(digit_1);
                var previewProvider = enabledProviders.find(function (provider) {
                    return provider.webviewId === storedPaneList[digit_1 - 1].webviewId;
                });
                // @ts-ignore
                var zoomLevel = ((_a = previewProvider.getWebview()) === null || _a === void 0 ? void 0 : _a.getZoomLevel()) + 2;
                // @ts-ignore
                previewProvider.getWebview().setZoomLevel(zoomLevel);
            }
        }
        else if (isCmdOrCtrl && isShift && event.key.toLowerCase() === 'a') {
            window.electron.browserWindow.reload();
        }
        else if ((isCmdOrCtrl && event.key === '+') ||
            (isCmdOrCtrl && event.key === '=')) {
            // Increase zoom level with Cmd/Ctrl + '+' or '='
            enabledProviders.forEach(function (provider) {
                // @ts-ignore
                provider
                    .getWebview()
                    // @ts-ignore
                    .setZoomLevel(provider.getWebview().getZoomLevel() + 1);
            });
        }
        else if (isCmdOrCtrl && event.key === '0') {
            // reset zoomlevel
            enabledProviders.forEach(function (provider) {
                // @ts-ignore
                provider
                    .getWebview()
                    // @ts-ignore
                    .setZoomLevel(0);
            });
        }
        else if (isCmdOrCtrl && event.key === '-') {
            // Decrease zoom level with Cmd/Ctrl + '-'
            enabledProviders.forEach(function (provider) {
                // @ts-ignore
                provider
                    .getWebview()
                    // @ts-ignore
                    .setZoomLevel(provider.getWebview().getZoomLevel() - 1);
            });
        }
        else if (isCmdOrCtrl && event.key === 'p') {
            toggleIsAlwaysOnTop();
        }
        else if (event.shiftKey &&
            event.metaKey &&
            (event.key === 'L' || event.key === 'l')) {
            // Toggle dark mode with Cmd/Ctrl + Shift + L
            var isDarkMode_1 = window.electron.electronStore.get('isDarkMode', false);
            isDarkMode_1 = !isDarkMode_1;
            window.electron.electronStore.set('isDarkMode', isDarkMode_1);
            enabledProviders.forEach(function (provider) {
                provider.handleDarkMode(isDarkMode_1);
            });
        }
        enterKeyHandler(event);
    }
    return (<div id="windowRef" className="flex flex-col" ref={windowRef}>
			<TitleBar_1.TitleBar {...{ isAlwaysOnTop: isAlwaysOnTop, toggleIsAlwaysOnTop: toggleIsAlwaysOnTop }}/>
			<settings_1.default open={isSettingsOpen} onClose={function () { return setIsSettingsOpen(false); }}/>
			<react_split_1.default sizes={sizes} minSize={0} expandToMin={false} gutterSize={3} gutterAlign="center" 
    // snapOffset={30}
    dragInterval={1} direction="horizontal" 
    // cursor="col-resize"
    className="flex">
				{enabledProviders.map(function (provider, index) { return (<pane_1.default provider={provider} number={index + 1} currentlyOpenPreviewPane={currentlyOpenPreviewPane} setOpenPreviewPane={setOpenPreviewPane} key={index}/>); })}
			</react_split_1.default>
			<div 
    // not a form, because the form submit causes a reload for some reason even if we preventdefault.
    ref={formRef} id="form" className="">
				<div id="form-wrapper">
					<textarea rows={4} className="resize-none" id="prompt" value={superprompt} onChange={function (e) { return setSuperprompt(e.target.value); }} onKeyDown={onKeyDown} name="prompt" placeholder={"Enter a superprompt here.\n- Quick Open: ".concat(utils_1.CmdOrCtrlKey, "+Shift+G or Submit: ").concat(utils_1.CmdOrCtrlKey, "+Enter\n- Switch windows: ").concat(utils_1.CmdOrCtrlKey, "+1/2/3/etc, or Global Resize/Pin: ").concat(utils_1.CmdOrCtrlKey, " -/+/p, or Back/Fwd: ").concat(utils_1.CmdOrCtrlKey, " H/L\n- New chat: ").concat(utils_1.CmdOrCtrlKey, "+R or Reset windows evenly: ").concat(utils_1.CmdOrCtrlKey, "+Shift+A")}/>
					<div className="flex items-center justify-center p-4 space-x-2">
						<button className="flex items-center justify-center w-12 h-12 p-1 text-white transition bg-gray-600 rounded-lg shadow-inner hover:bg-gray-200" id="btn" onClick={submitProviders} type="submit" title={"".concat(utils_1.CmdOrCtrlKey, "+Enter to submit")}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
							</svg>
						</button>
						<browserPane_1.BrowserPane {...{
        superprompt: superprompt,
        setSuperprompt: setSuperprompt,
        paneList: paneList,
        setPaneList: setPaneList,
        resetPaneList: resetPaneList,
        nonEnabledProviders: nonEnabledProviders,
        isAlwaysOnTop: isAlwaysOnTop,
        toggleIsAlwaysOnTop: toggleIsAlwaysOnTop,
        isSettingsOpen: isSettingsOpen,
        setIsSettingsOpen: setIsSettingsOpen,
    }}/>
					</div>
				</div>
			</div>
		</div>);
}
exports.default = Layout;
