package validator

import (
	"go-rest-api/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IItemValidator interface {
	ItemValidate(item model.Item) error
}

type itemValidator struct{}

func NewItemValidator() IItemValidator {
	return &itemValidator{}
}

func (iv *itemValidator) ItemValidate(item model.Item) error {
	return validation.ValidateStruct(&item,
		validation.Field(
			&item.Name,
			validation.Required.Error("name is required"),
			validation.RuneLength(1, 10).Error("limited max 10 char"),
		),
	)
}
