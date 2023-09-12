"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("renderer/components/ui/button");
var dialog_1 = require("renderer/components/ui/dialog");
var utils_1 = require("lib/utils");
var react_1 = require("react");
var react_icons_1 = require("@radix-ui/react-icons");
var input_1 = require("renderer/components/ui/input");
var tooltip_1 = require("renderer/components/ui/tooltip");
function Pane(_a) {
    var provider = _a.provider, number = _a.number, currentlyOpenPreviewPane = _a.currentlyOpenPreviewPane, setOpenPreviewPane = _a.setOpenPreviewPane;
    var isPreviewOpen = currentlyOpenPreviewPane === number;
    var contentRef = react_1.default.useRef(null);
    var _b = react_1.default.useState(null), shownUrl = _b[0], setShownUrl = _b[1];
    // this did not work not sure why
    // set a timer effect every second to check if the webview is can go back
    react_1.default.useEffect(function () {
        var interval = setInterval(function () {
            var _a;
            // @ts-ignore
            var newUrl = (_a = provider.getWebview()) === null || _a === void 0 ? void 0 : _a.src;
            if (newUrl !== shownUrl)
                setShownUrl(newUrl);
        }, 1000);
        return function () { return clearInterval(interval); };
    });
    // this did not work not sure why
    // // set a timer effect every second to check if the webview is can go back
    // const [canGoBack, setCanGoBack] = React.useState(false);
    // const [canGoFwd, setCanGoFwd] = React.useState(false);
    // React.useEffect(() => {
    // 	const interval = setInterval(() => {
    // 		console.log(
    // 			'provider.getWebview()?.canGoBack()',
    // 			provider.getWebview(),
    // 			provider.getWebview()?.canGoBack()
    // 		);
    // 		// @ts-ignore
    // 		if (provider.getWebview()?.canGoBack()) {
    // 			setCanGoBack(true);
    // 		} else {
    // 			setCanGoBack(false);
    // 		}
    // 		// @ts-ignore
    // 		if (provider.getWebview()?.canGoForward()) {
    // 			setCanGoFwd(true);
    // 		} else {
    // 			setCanGoFwd(true);
    // 		}
    // 	}, 1000);
    // 	return () => clearInterval(interval);
    // });
    function XButton(_a) {
        var children = _a.children, tooltip = _a.tooltip, onClick = _a.onClick, _b = _a.className, className = _b === void 0 ? '' : _b;
        return (<tooltip_1.TooltipProvider delayDuration={300}>
				<tooltip_1.Tooltip>
					<tooltip_1.TooltipTrigger asChild>
						<button_1.Button variant="outline" className={"hover:bg-gray-200 ".concat(className)} onClick={onClick}>
							{children}
						</button_1.Button>
					</tooltip_1.TooltipTrigger>
					<tooltip_1.TooltipContent side="right" className="text-white bg-black">
						<p>{tooltip}</p>
					</tooltip_1.TooltipContent>
				</tooltip_1.Tooltip>
			</tooltip_1.TooltipProvider>);
    }
    return (<div key={provider.paneId()} className="page darwin group">
			<div className="hidden powerbar group-hover:block">
				<button_1.Button className="text-xs shadow-2xl" onClick={function () {
            var _a, _b;
            setOpenPreviewPane(number);
            console.log('zooming in on ', provider);
            // @ts-ignore
            var zoomLevel = ((_a = provider === null || provider === void 0 ? void 0 : provider.getWebview()) === null || _a === void 0 ? void 0 : _a.getZoomLevel()) + 2;
            // @ts-ignore
            (_b = provider.getWebview()) === null || _b === void 0 ? void 0 : _b.setZoomLevel(zoomLevel);
        }} variant="ghost">
					<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
					</svg>{' '}
					{utils_1.CmdOrCtrlKey} + {number}
				</button_1.Button>
			</div>
			<dialog_1.Dialog open={isPreviewOpen} onOpenChange={function () {
            setOpenPreviewPane(0);
            // zoom out when dropping out of preview
            provider
                .getWebview()
                // @ts-ignore
                .setZoomLevel(provider.getWebview().getZoomLevel() - 2);
        }}>
				<dialog_1.DialogXContent className="bg-white pointer-events-none" ref={contentRef}>
					<dialog_1.DialogHeader>
						<dialog_1.DialogTitle className="flex items-center justify-between pr-8">
							{provider.fullName}
							<div className="flex">
								<XButton tooltip={"Zoom in"} //: ${CmdOrCtrlKey} + =`}
     onClick={function () {
            provider
                .getWebview()
                // @ts-ignore
                .setZoomLevel(provider.getWebview().getZoomLevel() + 1);
        }}>
									<react_icons_1.ZoomInIcon />
								</XButton>
								<XButton tooltip={"Zoom out"} //: ${CmdOrCtrlKey} + -`}
     onClick={function () {
            provider
                .getWebview()
                // @ts-ignore
                .setZoomLevel(provider.getWebview().getZoomLevel() - 1);
        }}>
									<react_icons_1.ZoomOutIcon />
								</XButton>
								<XButton tooltip={"Reset Zoom"} // : ${CmdOrCtrlKey} + 0`}
     onClick={function () {
            provider
                .getWebview()
                // @ts-ignore
                .setZoomLevel(0);
        }}>
									<react_icons_1.MagnifyingGlassIcon />
								</XButton>
							</div>
							<input_1.Input type="url" value={shownUrl || ''} readOnly={true}/>
							<div className="flex">
								<XButton tooltip={"Reload window"} // : ${CmdOrCtrlKey} + R`}
     className="mr-4" onClick={function () {
            var webview = provider.getWebview();
            if (typeof (webview === null || webview === void 0 ? void 0 : webview.refresh) === 'function') {
                webview === null || webview === void 0 ? void 0 : webview.refresh();
            }
            else {
                webview === null || webview === void 0 ? void 0 : webview.reload();
            }
        }}>
									<react_icons_1.ReloadIcon />
								</XButton>
								<XButton tooltip={"Go Back"} // : ${CmdOrCtrlKey} + H`}
     onClick={function () {
            var _a;
            (_a = provider.getWebview()) === null || _a === void 0 ? void 0 : _a.goBack();
        }}>
									<react_icons_1.ArrowLeftIcon />
								</XButton>
								<XButton tooltip={"Go forward"} // : ${CmdOrCtrlKey} + L`}
     onClick={function () {
            var _a;
            (_a = provider.getWebview()) === null || _a === void 0 ? void 0 : _a.goForward();
        }}>
									<react_icons_1.ArrowRightIcon />
								</XButton>
								{provider.clearCookies && (<XButton tooltip={"Clear Cookies"} onClick={function () {
                provider.clearCookies();
            }}>
										<react_icons_1.ResetIcon className="mr-1"/> Clear Cookies
									</XButton>)}
							</div>
						</dialog_1.DialogTitle>
					</dialog_1.DialogHeader>
				</dialog_1.DialogXContent>
			</dialog_1.Dialog>
			<webview 
    // @ts-ignore - we need this to be here or it will not show up in electron and then the allowpopups doesnt work
    allowpopups="true" id={provider.webviewId} src={provider.url} className={isPreviewOpen
            ? 'fixed pointer-events-auto left-[5%] top-[10%] z-[100] grid w-10/12 gap-4 p-2 duration-200 sm:rounded-lg rounded-xl h-[85vh]'
            : ''} useragent={provider.getUserAgent() ? provider.getUserAgent() : undefined}/>
		</div>);
}
exports.default = Pane;
