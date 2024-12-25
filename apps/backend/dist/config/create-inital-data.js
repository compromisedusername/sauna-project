"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const user_model_1 = require("../entities/user.model");
const role_model_1 = require("../entities/role.model");
const sauna_model_1 = require("../entities/sauna.model");
const reservation_model_1 = require("../entities/reservation.model");
const bcrypt = __importStar(require("bcrypt"));
const seed = (dataSource) => __awaiter(void 0, void 0, void 0, function* () {
    const roleRepository = dataSource.getRepository(role_model_1.Role);
    const userRepository = dataSource.getRepository(user_model_1.User);
    const saunaRepository = dataSource.getRepository(sauna_model_1.Sauna);
    const reservationRepository = dataSource.getRepository(reservation_model_1.Reservation);
    const adminRole = roleRepository.create({ name: 'admin', description: 'Administrator' });
    const userRole = roleRepository.create({ name: 'user', description: 'Standard user' });
    yield roleRepository.save([adminRole, userRole]);
    const saltRounds = 10;
    const passwordHashAdmin = yield bcrypt.hash('admin123', saltRounds);
    const passwordHashUser = yield bcrypt.hash('user123', saltRounds);
    const adminUser = userRepository.create({
        name: 'Admin',
        surname: 'Adminowski',
        email: 'admin@example.com',
        passwordHash: passwordHashAdmin,
        salt: 'some_salt',
        role: adminRole,
    });
    const regularUser = userRepository.create({
        name: 'User',
        surname: 'Userowski',
        email: 'user@example.com',
        passwordHash: passwordHashUser,
        salt: 'another_salt',
        role: userRole,
    });
    yield userRepository.save([adminUser, regularUser]);
    const sauna1 = saunaRepository.create({ saunaType: 'Fińska', humidity: 10, temperature: 90, peopleCapacity: 6 });
    const sauna2 = saunaRepository.create({ saunaType: 'Parowa', humidity: 90, temperature: 50, peopleCapacity: 4 });
    yield saunaRepository.save([sauna1, sauna2]);
    const reservation1 = reservationRepository.create({ dateFrom: new Date(), dateTo: new Date(Date.now() + 3600000), numberOfPeople: 2, sauna: sauna1, user: regularUser });
    yield reservationRepository.save(reservation1);
});
exports.seed = seed;
