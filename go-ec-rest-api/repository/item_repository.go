package repository

import (
	"fmt"
	"go-rest-api/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type IItemRepository interface {
	GetAllItems(items *[]model.Item, userId uint) error
	GetItemById(item *model.Item, userId uint, itemId uint) error
	GetAllItemsByShopId(items *[]model.Item, userId uint, shopId uint) error
	AddItemToShop(item *model.Item, userId uint, shopId uint) error
	UpdateItem(item *model.Item, userId uint, shopId uint, itemId uint) error
	DeleteItem(userId uint, shopId uint, itemId uint) error
	GetAllItemsByUser(items *[]model.Item) error
	GetItemByUser(item *model.Item, itemId uint) error
}

type itemRepository struct {
	db *gorm.DB
}

func NewItemRepository(db *gorm.DB) IItemRepository {
	return &itemRepository{db}
}

func (ir *itemRepository) GetAllItems(items *[]model.Item, userId uint) error {
	if err := ir.db.Joins("User").Where("user_id=?", userId).Order("created_at").Find(items).Error; err != nil {
		return err
	}
	return nil
}

func (ir *itemRepository) GetItemById(item *model.Item, userId uint, itemId uint) error {
	if err := ir.db.Joins("User").Where("user_id=?", userId).First(item, itemId).Error; err != nil {
		return err
	}
	return nil
}

func (ir *itemRepository) GetAllItemsByShopId(items *[]model.Item, userId uint, shopId uint) error {
	if err := ir.db.Joins("Shop").Where("shop_id=?", shopId).Order("created_at").Find(items).Error; err != nil {
		return err
	}
	return nil
}

func (ir *itemRepository) AddItemToShop(item *model.Item, userId uint, shopId uint) error {
	item.ShopId = shopId
	if err := ir.db.Create(item).Error; err != nil {
		return err
	}
	return nil
}

func (ir *itemRepository) UpdateItem(item *model.Item, userId uint, shopId uint, itemId uint) error {
	result := ir.db.Model(item).Clauses(clause.Returning{}).Where("id=? AND shop_id=?", itemId, shopId).Updates(model.Item{Name: item.Name, Image: item.Image, Caption: item.Caption, Description: item.Description, BookmarkFlg: item.BookmarkFlg})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (ir *itemRepository) DeleteItem(userId uint, shopId uint, itemId uint) error {
	result := ir.db.Where("id=? AND shop_id=?", itemId, shopId).Delete(&model.Item{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (ir *itemRepository) GetAllItemsByUser(items *[]model.Item) error {
	if err := ir.db.Order("created_at").Find(items).Error; err != nil {
		return err
	}
	return nil
}

func (ir *itemRepository) GetItemByUser(item *model.Item, itemId uint) error {
	if err := ir.db.First(item, itemId).Error; err != nil {
		return err
	}
	return nil
}
