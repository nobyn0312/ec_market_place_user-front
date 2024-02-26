package validator

import (
	"go-rest-api/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IShopValidator interface {
	ShopValidate(shop model.Shop) error
}

type shopValidator struct{}

func NewShopValidator() IShopValidator {
	return &shopValidator{}
}

func (sv *shopValidator) ShopValidate(shop model.Shop) error {
	return validation.ValidateStruct(&shop,
		validation.Field(
			&shop.Name,
			validation.Required.Error("name is required"),
			validation.RuneLength(1, 10).Error("limited max 10 char"),
		),
	)
}
