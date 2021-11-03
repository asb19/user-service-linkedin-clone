"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let AuthGuard = class AuthGuard {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async canActivate(context) {
        var _a;
        common_1.Logger.log('Auth Guard');
        const req = context.switchToHttp().getRequest();
        try {
            const res = await this.httpService
                .get(`http://localhost:3000/auth/check`, {
                headers: {
                    'x-auth-token': (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1],
                },
            })
                .pipe()
                .toPromise();
            req.user = res.data;
            return res.data;
        }
        catch (err) {
            common_1.Logger.error(err);
            return false;
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=AuthGuard.js.map