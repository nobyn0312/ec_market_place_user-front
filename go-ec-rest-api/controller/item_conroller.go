package controller

import (
	"go-rest-api/model"
	"go-rest-api/usecase"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type IItemController interface {
	GetAllItems(c echo.Context) error
	GetItemById(c echo.Context) error
	GetAllItemsByShopId(c echo.Context) error
	AddItemToShop(c echo.Context) error
	UpdateItem(c echo.Context) error
	DeleteItem(c echo.Context) error
	GetAllItemsByUser(c echo.Context) error
	GetItemByUser(c echo.Context) error
}

type itemController struct {
	iu usecase.IItemUsecase
}

func NewItemController(iu usecase.IItemUsecase) IItemController {
	return &itemController{iu}
}

func (ic *itemController) GetAllItems(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	itemsRes, err := ic.iu.GetAllItems(uint(userId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, itemsRes)
}

func (ic *itemController) GetItemById(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("itemId")
	itemId, _ := strconv.Atoi(id)
	itemRes, err := ic.iu.GetItemById(uint(userId.(float64)), uint(itemId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, itemRes)
}

func (ic *itemController) GetAllItemsByShopId(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("shopId")
	shopId, _ := strconv.Atoi(id)

	itemsRes, err := ic.iu.GetAllItemsByShopId(uint(userId.(float64)), uint(shopId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, itemsRes)
}

func (ic *itemController) AddItemToShop(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("shopId")
	shopId, _ := strconv.Atoi(id)
	item := model.Item{}
	if err := c.Bind(&item); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	itemRes, err := ic.iu.AddItemToShop(item, uint(userId.(float64)), uint(shopId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, itemRes)
}

func (ic *itemController) UpdateItem(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	shop_Id := c.Param("shopId")
	item_Id := c.Param("itemId")
	shopId, _ := strconv.Atoi(shop_Id)
	itemId, _ := strconv.Atoi(item_Id)

	item := model.Item{}
	if err := c.Bind(&item); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	itemRes, err := ic.iu.UpdateItem(item, uint(userId.(float64)), uint(shopId), uint(itemId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, itemRes)
}

func (ic *itemController) DeleteItem(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	shop_Id := c.Param("shopId")
	item_Id := c.Param("itemId")
	shopId, _ := strconv.Atoi(shop_Id)
	itemId, _ := strconv.Atoi(item_Id)

	err := ic.iu.DeleteItem(uint(userId.(float64)), uint(shopId), uint(itemId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (ic *itemController) GetAllItemsByUser(c echo.Context) error {
	itemsRes, err := ic.iu.GetAllItemsByUser()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, itemsRes)
}

func (ic *itemController) GetItemByUser(c echo.Context) error {
	id := c.Param("itemId")
	itemId, _ := strconv.Atoi(id)
	itemsRes, err := ic.iu.GetItemByUser(uint(itemId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, itemsRes)
}
