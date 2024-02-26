package model

import (
	"time"

	"gorm.io/gorm"
)

type ItemBookmark struct {
	Id          uint           `json:"id" gorm:"primaryKey"`
	User        User           `json:"user" gorm:"foreignKey:UserId; constraint:OnDelete:CASCADE"`
	UserId      uint           `json:"user_id" gorm:"not null"`
	Shop        Shop           `json:"shop" gorm:"foreignKey:ShopId; constraint:OnDelete:CASCADE"`
	ShopId      uint           `json:"shop_id" gorm:"not null"`
	Item        Item           `json:"item" gorm:"foreignKey:ItemId; constraint:OnDelete:CASCADE"`
	ItemId      uint           `json:"item_id" gorm:"not null"`
	BookmarkFlg bool           `json:"bookmarkFlg" gorm:"not null"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at"`
}

type ItemBookmarkResponse struct {
	Id           uint   `json:"id"`
	ShopId       uint   `json:"shopId"`
	ItemId       uint   `json:"itemId"`
	Name         string `json:"name"`
	Image        string `json:"image"`
	Caption      string `json:"caption"`
	Description  string `json:"description"`
	Price        int    `json:"price"`
	Stocks       int    `json:"stocks"`
	OnSale       bool   `json:"onSale"`
	DeliveryDate int    `json:"deliveryDate"`
	BookmarkFlg  bool   `json:"bookmarkFlg"`
}
