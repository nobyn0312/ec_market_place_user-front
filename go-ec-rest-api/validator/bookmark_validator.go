package validator

import (
	"go-rest-api/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IBookmarkValidator interface {
	ShopBookmarkValidate(sb model.ShopBookmark) error
	ItemBookmarkValidate(ib model.ItemBookmark) error
}

type bookmarkValidator struct{}

func NewBookmarkValidator() IBookmarkValidator {
	return &bookmarkValidator{}
}

func (iv *bookmarkValidator) ShopBookmarkValidate(sb model.ShopBookmark) error {
	return validation.ValidateStruct(&sb,
		validation.Field(
			&sb.ShopId,
			validation.Required.Error("shop_id is required"),
		),
	)
}

func (iv *bookmarkValidator) ItemBookmarkValidate(ib model.ItemBookmark) error {
	return validation.ValidateStruct(&ib,
		validation.Field(
			&ib.ShopId,
			validation.Required.Error("shop_id is required"),
		),
		validation.Field(
			&ib.ItemId,
			validation.Required.Error("item_id is required"),
		),
	)
}
