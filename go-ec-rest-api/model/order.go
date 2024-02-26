package model

import (
	"time"
)

type Order struct {
	ID         uint        `json:"id" gorm:"primaryKey"`
	OrderItems []OrderItem `json:"items" gorm:"foreignKey:OrderId; constraint:OnDelete:CASCADE"`
	Address    string      `json:"address" gorm:"not null"`
	OrderedAt  time.Time   `json:"ordered_at"`
	User       User        `json:"user" gorm:"foreignKey:UserId; constraint:OnDelete:CASCADE"`
	UserId     uint        `json:"user_id" gorm:"not null"`
}

type OrderItem struct {
	ID       uint    `json:"id" gorm:"primaryKey"`
	Quantity int     `json:"quantity" gorm:"not null"`
	Price    float64 `json:"price" gorm:"not null"`
	// Item     Item    `json:"item" gorm:"foreignKey:ItemId; constraint:OnDelete:CASCADE"`
	ItemId uint `json:"itemId" gorm:"foreignKey:ItemId; constraint:OnDelete:CASCADE"`
	// Order   Order `json:"order" gorm:"foreignKey:OrderId; constraint:OnDelete:CASCADE"`
	OrderId uint `json:"orderId" gorm:"foreignKey:OrderId; constraint:OnDelete:CASCADE"`
}

type OrderResponse struct {
	ID         uint        `json:"id" gorm:"primaryKey"`
	OrderItems []OrderItem `json:"items" gorm:"not null"`
	Address    string      `json:"address" gorm:"not null"`
	OrderedAt  time.Time   `json:"ordered_at"`
}
