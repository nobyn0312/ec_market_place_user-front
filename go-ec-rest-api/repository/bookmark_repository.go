package repository

import (
	"go-rest-api/model"

	"gorm.io/gorm"
)

type IBookmarkRepository interface {
	GetShopBookmarks(sb *[]model.ShopBookmark, userId uint) error
	GetShopBookmarkByUserIdAndShopId(userId uint, shopId uint) (*model.ShopBookmark, error)
	UpdateShopBookmark(sb *model.ShopBookmark) error
	GetItemBookmarks(ib *[]model.ItemBookmark, userId uint) error
	GetItemBookmarkByUserIdAndShopId(userId uint, shopId uint) (*model.ItemBookmark, error)
	UpdateItemBookmark(ib *model.ItemBookmark) error
}

type bookmarkRepository struct {
	db *gorm.DB
}

func NewBookmarkRepository(db *gorm.DB) IBookmarkRepository {
	return &bookmarkRepository{db}
}

func (br *bookmarkRepository) GetShopBookmarks(sb *[]model.ShopBookmark, userId uint) error {
	if err := br.db.Joins("Shop").
		Where("shop_bookmarks.user_id=?", userId).
		Where("shop_bookmarks.bookmark_flg", true).
		Order("created_at").
		Find(&sb).Error; err != nil {
		return err
	}
	return nil
}

func (br *bookmarkRepository) GetShopBookmarkByUserIdAndShopId(userId uint, shopId uint) (*model.ShopBookmark, error) {
	sb := model.ShopBookmark{}
	if err := br.db.Where("user_id = ?", userId).Where("shop_id = ?", shopId).First(&sb).Error; err != nil {
		return nil, err
	}

	return &sb, nil
}

func (br *bookmarkRepository) UpdateShopBookmark(sb *model.ShopBookmark) error {
	if err := br.db.Save(&sb).Error; err != nil {
		return err
	}

	return nil
}

func (br *bookmarkRepository) GetItemBookmarks(ib *[]model.ItemBookmark, userId uint) error {
	if err := br.db.Joins("Item").
		Where("item_bookmarks.user_id=?", userId).
		Where("item_bookmarks.bookmark_flg", true).
		Order("created_at").
		Find(&ib).Error; err != nil {
		return err
	}

	return nil
}

func (br *bookmarkRepository) GetItemBookmarkByUserIdAndShopId(userId uint, shopId uint) (*model.ItemBookmark, error) {
	ib := model.ItemBookmark{}
	if err := br.db.Where("user_id = ?", userId).Where("shop_id = ?", shopId).Find(&ib).Error; err != nil {
		return nil, err
	}

	return &ib, nil
}

func (br *bookmarkRepository) UpdateItemBookmark(ib *model.ItemBookmark) error {
	if err := br.db.Save(&ib).Error; err != nil {
		return err
	}

	return nil
}
