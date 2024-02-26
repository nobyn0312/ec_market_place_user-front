package controller

import (
	"go-rest-api/model"
	"go-rest-api/usecase"
	"go-rest-api/validator"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type IBookmarkController interface {
	GetShopBookmarks(c echo.Context) error
	UpdateShopBookmark(c echo.Context) error
	GetItemBookmarks(c echo.Context) error
	UpdateItemBookmark(c echo.Context) error
}

type bookmarkController struct {
	bv validator.IBookmarkValidator
	bu usecase.IBookmarkUsecase
}

func NewBookmarkController(bv validator.IBookmarkValidator, bu usecase.IBookmarkUsecase) IBookmarkController {
	return &bookmarkController{bv, bu}
}

func (bc *bookmarkController) GetShopBookmarks(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	res, err := bc.bu.GetShopBookmarks(uint(userId.(float64)))

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, res)
}

func (bc *bookmarkController) UpdateShopBookmark(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	sb := model.ShopBookmark{}
	if err := c.Bind(&sb); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := bc.bv.ShopBookmarkValidate(sb); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	err := bc.bu.UpdateShopBookmark(uint((userId.(float64))), sb.ShopId, sb.BookmarkFlg)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, err)
}

func (bc *bookmarkController) GetItemBookmarks(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	res, err := bc.bu.GetItemBookmarks(uint(userId.(float64)))

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, res)
}

func (bc *bookmarkController) UpdateItemBookmark(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["user_id"]

	ib := model.ItemBookmark{}

	if err := c.Bind(&ib); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := bc.bv.ItemBookmarkValidate(ib); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	err := bc.bu.UpdateItemBookmark(uint(userId.(float64)), ib.ShopId, ib.ItemId, ib.BookmarkFlg)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, err)
}
