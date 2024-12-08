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
exports.TransactionEntity = void 0;
const typeorm_1 = require("typeorm");
const ppobService_entity_1 = require("../../ppobService/entities/ppobService.entity");
const base_entity_1 = require("../../db/entities/base.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let TransactionEntity = class TransactionEntity extends base_entity_1.BaseEntity {
};
exports.TransactionEntity = TransactionEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid", name: "invoice_number" }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "invoiceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, name: "transaction_type" }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", name: "total_amount" }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "user_id" }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "service_code_id", nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "serviceCodeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (userEntity) => userEntity.transaction, {
        onDelete: "RESTRICT",
    }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.UserEntity)
], TransactionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ppobService_entity_1.PPOBServiceEntity, (ppobServiceEntity) => ppobServiceEntity.transaction, {
        onDelete: "RESTRICT",
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "service_code_id" }),
    __metadata("design:type", ppobService_entity_1.PPOBServiceEntity)
], TransactionEntity.prototype, "ppobService", void 0);
exports.TransactionEntity = TransactionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "transaction" })
], TransactionEntity);
