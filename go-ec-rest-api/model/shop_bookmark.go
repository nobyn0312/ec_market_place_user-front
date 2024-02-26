package model

import (
	"time"

	"gorm.io/gorm"
)

type ShopBookmark struct {
	Id          uint `json:"id" gorm:"primaryKey"`
	User        User `json:"user" gorm:"foreignKey:UserId; constraint:OnDelete:CASCADE"`
	UserId      uint `json:"userId" gorm:"not null"`
	Shop        Shop `json:"shop" gorm:"foreignKey:ShopId; constraint:OnDelete:CASCADE"`
	ShopId      uint `json:"shopId" gorm:"not null"`
	BookmarkFlg bool `json:"bookmarkFlg" gorm:"not null"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `json:"deleted_at"`
}

type ShopBookmarkResponse struct {
	Id          uint   `json:"id" gorm:"primaryKey"`
	ShopId      uint   `json:"shop_id" gorm:"primaryKey"`
	Name        string `json:"name" gorm:"not null"`
	Image       string `json:"image"`
	Caption     string `json:"caption"`
	Description string `json:"description"`
	BookmarkFlg bool   `json:"bookmarkFlg"`
}
