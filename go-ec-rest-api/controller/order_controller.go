package controller

import (
	"go-rest-api/model"
	"go-rest-api/usecase"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type IOrderController interface {
	GetAllOrders(c echo.Context) error
	GetOrderById(c echo.Context) error
	CreateOrder(c echo.Context) error
	UpdateOrder(c echo.Context) error
	DeleteOrder(c echo.Context) error
	GetAllOrdersByUser(c echo.Context) error
	GetOrderByUser(c echo.Context) error
}

type orderController struct {
	ou usecase.IOrderUsecase
}

func NewOrderController(ou usecase.IOrderUsecase) IOrderController {
	return &orderController{ou}
}

func (oc *orderController) GetAllOrders(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	ordersRes, err := oc.ou.GetAllOrders(uint(userId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, ordersRes)
}

func (oc *orderController) GetOrderById(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("orderId")
	orderId, _ := strconv.Atoi(id)
	orderRes, err := oc.ou.GetOrderById(uint(userId.(float64)), uint(orderId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, orderRes)
}

func (oc *orderController) CreateOrder(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	order := model.Order{}
	if err := c.Bind(&order); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	order.UserId = uint(userId.(float64))
	orderRes, err := oc.ou.CreateOrder(order)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, orderRes)
}

func (oc *orderController) UpdateOrder(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("orderId")
	orderId, _ := strconv.Atoi(id)

	order := model.Order{}
	if err := c.Bind(&order); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	orderRes, err := oc.ou.UpdateOrder(order, uint(userId.(float64)), uint(orderId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, orderRes)
}

func (oc *orderController) DeleteOrder(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("orderId")
	orderId, _ := strconv.Atoi(id)

	err := oc.ou.DeleteOrder(uint(userId.(float64)), uint(orderId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (oc *orderController) GetAllOrdersByUser(c echo.Context) error {
	ordersRes, err := oc.ou.GetAllOrdersByUser()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, ordersRes)
}

func (oc *orderController) GetOrderByUser(c echo.Context) error {
	id := c.Param("orderId")
	orderId, _ := strconv.Atoi(id)
	orderRes, err := oc.ou.GetOrderByUser(uint(orderId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, orderRes)
}
