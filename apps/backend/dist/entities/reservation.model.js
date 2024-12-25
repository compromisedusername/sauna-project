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
exports.Reservation = void 0;
const typeorm_1 = require("typeorm");
const sauna_model_1 = require("./sauna.model");
const user_model_1 = require("./user.model");
let Reservation = class Reservation {
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Reservation.prototype, "numberOfPeople", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sauna_model_1.Sauna, (sauna) => sauna.reservations),
    __metadata("design:type", sauna_model_1.Sauna)
], Reservation.prototype, "sauna", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.reservations),
    __metadata("design:type", user_model_1.User)
], Reservation.prototype, "user", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['dateFrom', 'dateTo'])
], Reservation);
