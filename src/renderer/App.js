"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
// import icon from '../../assets/icon.svg';
// https://electron-react-boilerplate.js.org/docs/styling#tailwind-integration
require("tailwindcss/tailwind.css");
require("./App.css");
var layout_1 = require("./layout");
function App() {
    return (<react_router_dom_1.MemoryRouter>
			<react_router_dom_1.Routes>
				<react_router_dom_1.Route path="/" element={<layout_1.default />}/>
			</react_router_dom_1.Routes>
		</react_router_dom_1.MemoryRouter>);
}
exports.default = App;
