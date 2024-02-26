package model

import (
	"time"
)

type Shop struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Image       string    `json:"image"`
	Caption     string    `json:"caption"`
	Description string    `json:"description"`
	BookmarkFlg bool      `json:"bookmarkFlg"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	User        User      `json:"user" gorm:"foreignKey:UserId; constraint:OnDelete:CASCADE"`
	UserId      uint      `json:"user_id" gorm:"not null"`
}

type ShopResponse struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Image       string    `json:"image"`
	Caption     string    `json:"caption"`
	Description string    `json:"description"`
	BookmarkFlg bool      `json:"bookmarkFlg"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
