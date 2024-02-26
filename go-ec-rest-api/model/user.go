package model

import "time"

type User struct {
	ID           uint         `json:"id" gorm:"primaryKey"`
	Role         string       `json:"role" gorm:"not null"`
	Email        string       `json:"email" gorm:"unique"`
	Password     string       `json:"password"`
	CreditCards  []CreditCard `json:"creditCard" gorm:"foreignKey:UserId"`
	ShippingInfo ShippingInfo `json:"shippingInfo" gorm:"foreignKey:UserId"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
}

type ShippingInfo struct {
	PostalCode string `json:"postalCode"`
	Tel        string `json:"tel"`
	Country    string `json:"country"`
	Prefecture string `json:"prefecture"`
	City       string `json:"city"`
	Address    string `json:"address"`
	Building   string `json:"building"`
	UserId     uint   `json:"userId"`
}

type CreditCard struct {
	HolderName string `json:"holderName"`
	Number     string `json:"number"`
	ExpireDate string `json:"expireDate"`
	UserId     uint   `json:"userId"`
}

type UserResponse struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Role  string `json:"role"`
	Email string `json:"email" gorm:"unique"`
}
