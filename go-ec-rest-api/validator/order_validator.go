package validator

import (
	"go-rest-api/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IOrderValidator interface {
	OrderValidate(order model.Order) error
}

type orderValidator struct{}

func NewOrderValidator() IOrderValidator {
	return &orderValidator{}
}

func (ov *orderValidator) OrderValidate(order model.Order) error {
	return validation.ValidateStruct(&order,
		validation.Field(
			&order.Address,
			// &order.ShippingInfo,
			// validation.Required.Error("shippingInfo is required"),
		),
	)
}
