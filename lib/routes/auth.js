"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const router_1 = require("./router");
const auth_1 = __importDefault(require("../controllers/auth"));
const register_1 = __importDefault(require("../validation/register"));
const app_1 = require("../app");
class AuthRoutes extends router_1.Router {
    constructor(app) {
        super(app, 'AuthRoutes');
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post('/login', (req, res) => {
            auth_1.default.login(req, res);
        });
        this.app.post('/logout', (req, res) => {
            res.send('logout');
        });
        this.app.post('/register', (0, app_1.validate)(register_1.default), (req, res) => {
            auth_1.default.register(req, res);
        });
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.js.map