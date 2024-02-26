package usecase

import (
	"go-rest-api/model"
	"go-rest-api/repository"
	"go-rest-api/validator"
)

type IOrderUsecase interface {
	GetAllOrders(userId uint) ([]model.OrderResponse, error)
	GetOrderById(userId uint, orderId uint) (model.OrderResponse, error)
	CreateOrder(order model.Order) (model.OrderResponse, error)
	UpdateOrder(order model.Order, userId uint, orderId uint) (model.OrderResponse, error)
	DeleteOrder(userId uint, orderId uint) error
	GetAllOrdersByUser() ([]model.OrderResponse, error)
	GetOrderByUser(orderId uint) (model.OrderResponse, error)
}

type orderUsecase struct {
	or repository.IOrderRepository
	ov validator.IOrderValidator
}

func NewOrderUsecase(or repository.IOrderRepository, ov validator.IOrderValidator) IOrderUsecase {
	return &orderUsecase{or, ov}
}

func (ou *orderUsecase) GetAllOrders(userId uint) ([]model.OrderResponse, error) {
	orders := []model.Order{}
	if err := ou.or.GetAllOrders(&orders, userId); err != nil {
		return nil, err
	}
	resOrders := []model.OrderResponse{}
	for _, v := range orders {
		t := model.OrderResponse{
			ID:         v.ID,
			Address:    v.Address,
			OrderItems: v.OrderItems,
			OrderedAt:  v.OrderedAt,
		}
		resOrders = append(resOrders, t)
	}
	return resOrders, nil
}

func (ou *orderUsecase) GetOrderById(userId uint, orderId uint) (model.OrderResponse, error) {
	order := model.Order{}
	if err := ou.or.GetOrderById(&order, userId, orderId); err != nil {
		return model.OrderResponse{}, err
	}
	resOrder := model.OrderResponse{
		ID:         order.ID,
		Address:    order.Address,
		OrderItems: order.OrderItems,
		OrderedAt:  order.OrderedAt,
	}
	return resOrder, nil
}

func (ou *orderUsecase) CreateOrder(order model.Order) (model.OrderResponse, error) {
	if err := ou.ov.OrderValidate(order); err != nil {
		return model.OrderResponse{}, err
	}
	if err := ou.or.CreateOrder(&order); err != nil {
		return model.OrderResponse{}, err
	}

	resOrder := model.OrderResponse{
		ID:         order.ID,
		Address:    order.Address,
		OrderItems: order.OrderItems,
		OrderedAt:  order.OrderedAt,
	}
	return resOrder, nil
}

func (ou *orderUsecase) UpdateOrder(order model.Order, userId uint, orderId uint) (model.OrderResponse, error) {
	if err := ou.ov.OrderValidate(order); err != nil {
		return model.OrderResponse{}, err
	}
	if err := ou.or.UpdateOrder(&order, userId, orderId); err != nil {
		return model.OrderResponse{}, err
	}
	resOrder := model.OrderResponse{
		ID:         order.ID,
		Address:    order.Address,
		OrderItems: order.OrderItems,
		OrderedAt:  order.OrderedAt,
	}
	return resOrder, nil
}

func (ou *orderUsecase) DeleteOrder(userId uint, orderId uint) error {
	if err := ou.or.DeleteOrder(userId, orderId); err != nil {
		return err
	}
	return nil
}

func (ou *orderUsecase) GetAllOrdersByUser() ([]model.OrderResponse, error) {
	orders := []model.Order{}
	if err := ou.or.GetAllOrdersByUser(&orders); err != nil {
		return nil, err
	}
	resOrders := []model.OrderResponse{}
	for _, v := range orders {
		t := model.OrderResponse{
			ID:         v.ID,
			Address:    v.Address,
			OrderItems: v.OrderItems,
			OrderedAt:  v.OrderedAt,
		}
		resOrders = append(resOrders, t)
	}
	return resOrders, nil
}

func (ou *orderUsecase) GetOrderByUser(orderId uint) (model.OrderResponse, error) {
	order := model.Order{}
	if err := ou.or.GetOrderByUser(&order, orderId); err != nil {
		return model.OrderResponse{}, err
	}
	resOrder := model.OrderResponse{
		ID:         order.ID,
		Address:    order.Address,
		OrderItems: order.OrderItems,
		OrderedAt:  order.OrderedAt,
	}
	return resOrder, nil
}
