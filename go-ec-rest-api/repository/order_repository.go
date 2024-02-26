package repository

import (
	"fmt"
	"go-rest-api/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type IOrderRepository interface {
	GetAllOrders(orders *[]model.Order, userId uint) error
	GetOrderById(order *model.Order, userId uint, orderId uint) error
	CreateOrder(order *model.Order) error
	UpdateOrder(order *model.Order, userId uint, orderId uint) error
	DeleteOrder(userId uint, orderId uint) error
	GetAllOrdersByUser(orders *[]model.Order) error
	GetOrderByUser(order *model.Order, orderId uint) error
}

type orderRepository struct {
	db *gorm.DB
}

func NewOrderRepository(db *gorm.DB) IOrderRepository {
	return &orderRepository{db}
}

func (or *orderRepository) GetAllOrders(orders *[]model.Order, userId uint) error {
	if err := or.db.Joins("User").Where("user_id=?", userId).Order("ordered_at").Preload("OrderItems").Find(orders).Error; err != nil {
		return err
	}
	return nil
}

func (or *orderRepository) GetOrderById(order *model.Order, userId uint, orderId uint) error {
	if err := or.db.Joins("User").Where("user_id=?", userId).Preload("OrderItems").First(order, orderId).Error; err != nil {
		return err
	}
	return nil
}

func (or *orderRepository) CreateOrder(order *model.Order) error {
	if err := or.db.Create(order).Error; err != nil {
		return err
	}
	return nil
}

func (or *orderRepository) UpdateOrder(order *model.Order, userId uint, orderId uint) error {
	result := or.db.Model(order).Clauses(clause.Returning{}).Where("id=? AND user_id=?", orderId, userId).Updates(model.Order{Address: order.Address})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (or *orderRepository) DeleteOrder(userId uint, orderId uint) error {
	result := or.db.Where("id=? AND user_id=?", orderId, userId).Delete(&model.Order{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}

func (or *orderRepository) GetAllOrdersByUser(orders *[]model.Order) error {
	if err := or.db.Order("created_at").Find(orders).Error; err != nil {
		return err
	}
	return nil
}

func (or *orderRepository) GetOrderByUser(order *model.Order, orderId uint) error {
	if err := or.db.First(order, orderId).Error; err != nil {
		return err
	}
	return nil
}
