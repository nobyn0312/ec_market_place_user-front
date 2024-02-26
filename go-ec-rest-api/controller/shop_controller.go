package controller

import (
	"go-rest-api/model"
	"go-rest-api/usecase"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type IShopController interface {
	GetAllShops(c echo.Context) error
	GetShopById(c echo.Context) error
	CreateShop(c echo.Context) error
	UpdateShop(c echo.Context) error
	DeleteShop(c echo.Context) error
	GetAllShopsByUser(c echo.Context) error
	GetShopByUser(c echo.Context) error
}

type shopController struct {
	su usecase.IShopUsecase
}

func NewShopController(su usecase.IShopUsecase) IShopController {
	return &shopController{su}
}

func (sc *shopController) GetAllShops(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	shopsRes, err := sc.su.GetAllShops(uint(userId.(float64)))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, shopsRes)
}

func (sc *shopController) GetShopById(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("shopId")
	shopId, _ := strconv.Atoi(id)
	shopRes, err := sc.su.GetShopById(uint(userId.(float64)), uint(shopId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, shopRes)
}

func (sc *shopController) CreateShop(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	shop := model.Shop{}
	if err := c.Bind(&shop); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	shop.UserId = uint(userId.(float64))
	shopRes, err := sc.su.CreateShop(shop)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, shopRes)
}

func (sc *shopController) UpdateShop(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("shopId")
	shopId, _ := strconv.Atoi(id)

	shop := model.Shop{}
	if err := c.Bind(&shop); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	shopRes, err := sc.su.UpdateShop(shop, uint(userId.(float64)), uint(shopId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, shopRes)
}

func (sc *shopController) DeleteShop(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]
	id := c.Param("shopId")
	shopId, _ := strconv.Atoi(id)

	err := sc.su.DeleteShop(uint(userId.(float64)), uint(shopId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (sc *shopController) GetAllShopsByUser(c echo.Context) error {
	shopsRes, err := sc.su.GetAllShopsByUser()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, shopsRes)
}

func (sc *shopController) GetShopByUser(c echo.Context) error {
	id := c.Param("shopId")
	shopId, _ := strconv.Atoi(id)
	shopRes, err := sc.su.GetShopByUser(uint(shopId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, shopRes)
}
