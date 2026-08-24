"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontendBaseUrl = exports.apiBaseUrl = exports.port = void 0;
const codespaceName = process.env.CODESPACE_NAME;
exports.port = 8000;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${exports.port}`;
exports.frontendBaseUrl = codespaceName
    ? `https://${codespaceName}-5173.app.github.dev`
    : 'http://localhost:5173';
