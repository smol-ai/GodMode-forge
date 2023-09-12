"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
var react_1 = require("@testing-library/react");
var App_1 = require("../renderer/App");
describe('App', function () {
    it('should render', function () {
        expect((0, react_1.render)(<App_1.default />)).toBeTruthy();
    });
});
