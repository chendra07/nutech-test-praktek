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
exports.FileEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const banner_entity_1 = require("../../banner/entities/banner.entity");
const ppobService_entity_1 = require("../../ppobService/entities/ppobService.entity");
const base_entity_1 = require("../../db/entities/base.entity");
let FileEntity = class FileEntity extends base_entity_1.BaseEntity {
};
exports.FileEntity = FileEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    __metadata("design:type", String)
], FileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], FileEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20 }),
    __metadata("design:type", String)
], FileEntity.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, name: "original_name" }),
    __metadata("design:type", String)
], FileEntity.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (userEntity) => userEntity.file),
    __metadata("design:type", user_entity_1.UserEntity)
], FileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => banner_entity_1.BannerEntity, (bannerEntity) => bannerEntity.file),
    __metadata("design:type", banner_entity_1.BannerEntity)
], FileEntity.prototype, "banner", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ppobService_entity_1.PPOBServiceEntity, (PPOBServiceEntity) => PPOBServiceEntity.file),
    __metadata("design:type", ppobService_entity_1.PPOBServiceEntity)
], FileEntity.prototype, "ppobService", void 0);
exports.FileEntity = FileEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "file" })
], FileEntity);
