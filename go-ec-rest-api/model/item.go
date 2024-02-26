package model

import (
	"time"
)

type Item struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Name         string    `json:"name" gorm:"not null"`
	Image        string    `json:"image"`
	Caption      string    `json:"caption"`
	Description  string    `json:"description"`
	Price        int       `json:"price"`
	Stocks       int       `json:"stocks"`
	OnSale       bool      `json:"onSale"`
	DeliveryDate int       `json:"deliveryDate"`
	BookmarkFlg  bool      `json:"bookmarkFlg"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Shop         Shop      `json:"shop" gorm:"foreignKey:ShopId; constraint:OnDelete:CASCADE"`
	ShopId       uint      `json:"shop_id" gorm:"not null"`
}

type ItemResponse struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Name         string    `json:"name" gorm:"not null"`
	Image        string    `json:"image"`
	Caption      string    `json:"caption"`
	Description  string    `json:"description"`
	Price        int       `json:"price"`
	Stocks       int       `json:"stocks"`
	OnSale       bool      `json:"onSale"`
	DeliveryDate int       `json:"deliveryDate"`
	BookmarkFlg  bool      `json:"bookmarkFlg"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
