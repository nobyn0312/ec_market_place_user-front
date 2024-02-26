package usecase

import (
	"go-rest-api/model"
	"go-rest-api/repository"
	"go-rest-api/validator"
)

type IShopUsecase interface {
	GetAllShops(userId uint) ([]model.ShopResponse, error)
	GetShopById(userId uint, shopId uint) (model.ShopResponse, error)
	CreateShop(shop model.Shop) (model.ShopResponse, error)
	UpdateShop(shop model.Shop, userId uint, shopId uint) (model.ShopResponse, error)
	DeleteShop(userId uint, shopId uint) error
	GetAllShopsByUser() ([]model.ShopResponse, error)
	GetShopByUser(shopId uint) (model.ShopResponse, error)
}

type shopUsecase struct {
	sr repository.IShopRepository
	sv validator.IShopValidator
}

func NewShopUsecase(sr repository.IShopRepository, sv validator.IShopValidator) IShopUsecase {
	return &shopUsecase{sr, sv}
}

func (su *shopUsecase) GetAllShops(userId uint) ([]model.ShopResponse, error) {
	shops := []model.Shop{}
	if err := su.sr.GetAllShops(&shops, userId); err != nil {
		return nil, err
	}
	resShops := []model.ShopResponse{}
	for _, v := range shops {
		t := model.ShopResponse{
			ID:          v.ID,
			Name:        v.Name,
			Image:       v.Image,
			Caption:     v.Caption,
			Description: v.Description,
			BookmarkFlg: v.BookmarkFlg,
			CreatedAt:   v.CreatedAt,
			UpdatedAt:   v.UpdatedAt,
		}
		resShops = append(resShops, t)
	}
	return resShops, nil
}

func (su *shopUsecase) GetShopById(userId uint, shopId uint) (model.ShopResponse, error) {
	shop := model.Shop{}
	if err := su.sr.GetShopById(&shop, userId, shopId); err != nil {
		return model.ShopResponse{}, err
	}
	resShop := model.ShopResponse{
		ID:          shop.ID,
		Name:        shop.Name,
		Image:       shop.Image,
		Caption:     shop.Caption,
		Description: shop.Description,
		BookmarkFlg: shop.BookmarkFlg,
		CreatedAt:   shop.CreatedAt,
		UpdatedAt:   shop.UpdatedAt,
	}
	return resShop, nil
}

func (su *shopUsecase) CreateShop(shop model.Shop) (model.ShopResponse, error) {
	if err := su.sv.ShopValidate(shop); err != nil {
		return model.ShopResponse{}, err
	}
	if err := su.sr.CreateShop(&shop); err != nil {
		return model.ShopResponse{}, err
	}
	resShop := model.ShopResponse{
		ID:          shop.ID,
		Name:        shop.Name,
		Image:       shop.Image,
		Caption:     shop.Caption,
		Description: shop.Description,
		BookmarkFlg: shop.BookmarkFlg,
		CreatedAt:   shop.CreatedAt,
		UpdatedAt:   shop.UpdatedAt,
	}
	return resShop, nil
}

func (su *shopUsecase) UpdateShop(shop model.Shop, userId uint, shopId uint) (model.ShopResponse, error) {
	if err := su.sv.ShopValidate(shop); err != nil {
		return model.ShopResponse{}, err
	}
	if err := su.sr.UpdateShop(&shop, userId, shopId); err != nil {
		return model.ShopResponse{}, err
	}
	resShop := model.ShopResponse{
		ID:          shop.ID,
		Name:        shop.Name,
		Image:       shop.Image,
		Caption:     shop.Caption,
		Description: shop.Description,
		BookmarkFlg: shop.BookmarkFlg,
		CreatedAt:   shop.CreatedAt,
		UpdatedAt:   shop.UpdatedAt,
	}
	return resShop, nil
}

func (su *shopUsecase) DeleteShop(userId uint, shopId uint) error {
	if err := su.sr.DeleteShop(userId, shopId); err != nil {
		return err
	}
	return nil
}

func (su *shopUsecase) GetAllShopsByUser() ([]model.ShopResponse, error) {
	shops := []model.Shop{}
	if err := su.sr.GetAllShopsByUser(&shops); err != nil {
		return nil, err
	}
	resShops := []model.ShopResponse{}
	for _, v := range shops {
		t := model.ShopResponse{
			ID:          v.ID,
			Name:        v.Name,
			Image:       v.Image,
			Caption:     v.Caption,
			Description: v.Description,
			BookmarkFlg: v.BookmarkFlg,
			CreatedAt:   v.CreatedAt,
			UpdatedAt:   v.UpdatedAt,
		}
		resShops = append(resShops, t)
	}
	return resShops, nil
}

func (su *shopUsecase) GetShopByUser(shopId uint) (model.ShopResponse, error) {
	shop := model.Shop{}
	if err := su.sr.GetShopByUser(&shop, shopId); err != nil {
		return model.ShopResponse{}, err
	}
	resShop := model.ShopResponse{
		ID:          shop.ID,
		Name:        shop.Name,
		Image:       shop.Image,
		Caption:     shop.Caption,
		Description: shop.Description,
		BookmarkFlg: shop.BookmarkFlg,
		CreatedAt:   shop.CreatedAt,
		UpdatedAt:   shop.UpdatedAt,
	}
	return resShop, nil
}
