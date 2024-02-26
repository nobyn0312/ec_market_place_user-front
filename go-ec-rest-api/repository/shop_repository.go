package repository

import (
	"fmt"
	"go-rest-api/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type IShopRepository interface {
	GetAllShops(shops *[]model.Shop, userId uint) error
	GetShopById(shop *model.Shop, userId uint, shopId uint) error
	CreateShop(shop *model.Shop) error
	UpdateShop(shop *model.Shop, userId uint, shopId uint) error
	DeleteShop(userId uint, shopId uint) error
	GetAllShopsByUser(shops *[]model.Shop) error
	GetShopByUser(shop *model.Shop, shopId uint) error
}

type shopRepository struct {
	db *gorm.DB
}

func NewShopRepository(db *gorm.DB) IShopRepository {
	return &shopRepository{db}
}

func (sr *shopRepository) GetAllShops(shops *[]model.Shop, userId uint) error {
	if err := sr.db.Joins("User").Where("user_id=?", userId).Order("created_at").Find(shops).Error; err != nil {
		return err
	}
	return nil
}

func (sr *shopRepository) GetShopById(shop *model.Shop, userId uint, shopId uint) error {
	if err := sr.db.Joins("User").Where("user_id=?", userId).First(shop, shopId).Error; err != nil {
		return err
	}
	return nil
}

func (sr *shopRepository) CreateShop(shop *model.Shop) error {
	if err := sr.db.Create(shop).Error; err != nil {
		return err
	}
	return nil
}

func (sr *shopRepository) UpdateShop(shop *model.Shop, userId uint, shopId uint) error {
	result := sr.db.Model(shop).Clauses(clause.Returning{}).Where("id=? AND user_id=?", shopId, userId).Updates(model.Shop{Name: shop.Name, Image: shop.Image, Caption: shop.Caption, Description: shop.Description, BookmarkFlg: shop.BookmarkFlg})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (sr *shopRepository) DeleteShop(userId uint, shopId uint) error {
	result := sr.db.Where("id=? AND user_id=?", shopId, userId).Delete(&model.Shop{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (sr *shopRepository) GetAllShopsByUser(shops *[]model.Shop) error {
	if err := sr.db.Order("created_at").Find(shops).Error; err != nil {
		return err
	}
	return nil
}

func (sr *shopRepository) GetShopByUser(shop *model.Shop, shopId uint) error {
	if err := sr.db.First(shop, shopId).Error; err != nil {
		return err
	}
	return nil
}
