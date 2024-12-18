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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../db/entities/base.entity");
const file_entity_1 = require("../../file/entities/file.entity");
const transaction_entity_1 = require("../../transaction/entities/transaction.entity");
let UserEntity = class UserEntity extends base_entity_1.BaseEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "email", unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "password" }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "first_name" }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "last_name" }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: "amount", default: 0 }),
    __metadata("design:type", String)
], UserEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "file_id", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => file_entity_1.FileEntity, (fileEntity) => fileEntity.user, {
        nullable: true,
        onDelete: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)({ name: "file_id" }),
    __metadata("design:type", file_entity_1.FileEntity)
], UserEntity.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.TransactionEntity, (transactionEntity) => transactionEntity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "transaction", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "user" })
], UserEntity);
