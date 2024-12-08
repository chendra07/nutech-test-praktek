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
exports.BannerEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../db/entities/base.entity");
const file_entity_1 = require("../../file/entities/file.entity");
let BannerEntity = class BannerEntity extends base_entity_1.BaseEntity {
};
exports.BannerEntity = BannerEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    __metadata("design:type", String)
], BannerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "banner_name" }),
    __metadata("design:type", String)
], BannerEntity.prototype, "bannerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], BannerEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", name: "file_id" }),
    __metadata("design:type", String)
], BannerEntity.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => file_entity_1.FileEntity, (fileEntity) => fileEntity.banner, {
        nullable: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "file_id" }),
    __metadata("design:type", file_entity_1.FileEntity)
], BannerEntity.prototype, "file", void 0);
exports.BannerEntity = BannerEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "banner" })
], BannerEntity);
