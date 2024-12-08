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
exports.PPOBServiceEntity = void 0;
const typeorm_1 = require("typeorm");
const file_entity_1 = require("../../file/entities/file.entity");
const base_entity_1 = require("../../db/entities/base.entity");
const transaction_entity_1 = require("../../transaction/entities/transaction.entity");
let PPOBServiceEntity = class PPOBServiceEntity extends base_entity_1.BaseEntity {
};
exports.PPOBServiceEntity = PPOBServiceEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "varchar", length: 30, name: "service_code" }),
    __metadata("design:type", String)
], PPOBServiceEntity.prototype, "serviceCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "service_name" }),
    __metadata("design:type", String)
], PPOBServiceEntity.prototype, "serviceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "service_tariff" }),
    __metadata("design:type", String)
], PPOBServiceEntity.prototype, "serviceTariff", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "file_id" }),
    __metadata("design:type", String)
], PPOBServiceEntity.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => file_entity_1.FileEntity, (fileEntity) => fileEntity.ppobService, {
        nullable: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "file_id" }),
    __metadata("design:type", file_entity_1.FileEntity)
], PPOBServiceEntity.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.TransactionEntity, (transactionEntity) => transactionEntity.ppobService),
    __metadata("design:type", Array)
], PPOBServiceEntity.prototype, "transaction", void 0);
exports.PPOBServiceEntity = PPOBServiceEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "ppob_service" })
], PPOBServiceEntity);
