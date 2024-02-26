package usecase

import (
	"go-rest-api/model"
	"go-rest-api/repository"
	"go-rest-api/validator"
)

type IItemUsecase interface {
	GetAllItems(userId uint) ([]model.ItemResponse, error)
	GetItemById(userId uint, itemId uint) (model.ItemResponse, error)
	GetAllItemsByShopId(userId uint, shopId uint) ([]model.ItemResponse, error)
	AddItemToShop(item model.Item, userId uint, shopId uint) (model.ItemResponse, error)
	UpdateItem(item model.Item, userId uint, shopId uint, itemId uint) (model.ItemResponse, error)
	DeleteItem(userId uint, shopId uint, itemId uint) error
	GetAllItemsByUser() ([]model.ItemResponse, error)
	GetItemByUser(itemId uint) (model.ItemResponse, error)
}

type itemUsecase struct {
	ir repository.IItemRepository
	iv validator.IItemValidator
}

func NewItemUsecase(ir repository.IItemRepository, iv validator.IItemValidator) IItemUsecase {
	return &itemUsecase{ir, iv}
}

func (iu *itemUsecase) GetAllItems(userId uint) ([]model.ItemResponse, error) {
	items := []model.Item{}
	if err := iu.ir.GetAllItems(&items, userId); err != nil {
		return nil, err
	}
	resItems := []model.ItemResponse{}
	for _, v := range items {
		t := model.ItemResponse{
			ID:          v.ID,
			Name:        v.Name,
			Image:       v.Image,
			Caption:     v.Caption,
			Description: v.Description,
			BookmarkFlg: v.BookmarkFlg,
			CreatedAt:   v.CreatedAt,
			UpdatedAt:   v.UpdatedAt,
		}
		resItems = append(resItems, t)
	}
	return resItems, nil
}

func (iu *itemUsecase) GetItemById(userId uint, itemId uint) (model.ItemResponse, error) {
	item := model.Item{}
	if err := iu.ir.GetItemById(&item, userId, itemId); err != nil {
		return model.ItemResponse{}, err
	}
	resItem := model.ItemResponse{
		ID:          item.ID,
		Name:        item.Name,
		Image:       item.Image,
		Caption:     item.Caption,
		Description: item.Description,
		BookmarkFlg: item.BookmarkFlg,
		CreatedAt:   item.CreatedAt,
		UpdatedAt:   item.UpdatedAt,
	}
	return resItem, nil
}

func (iu *itemUsecase) GetAllItemsByShopId(userId uint, shopId uint) ([]model.ItemResponse, error) {
	items := []model.Item{}
	if err := iu.ir.GetAllItemsByShopId(&items, userId, shopId); err != nil {
		return nil, err
	}
	resItems := []model.ItemResponse{}
	for _, v := range items {
		t := model.ItemResponse{
			ID:           v.ID,
			Name:         v.Name,
			Image:        v.Image,
			Caption:      v.Caption,
			Description:  v.Description,
			Price:        v.Price,
			Stocks:       v.Stocks,
			OnSale:       v.OnSale,
			DeliveryDate: v.DeliveryDate,
			BookmarkFlg:  v.BookmarkFlg,
			CreatedAt:    v.CreatedAt,
			UpdatedAt:    v.UpdatedAt,
		}
		resItems = append(resItems, t)
	}
	return resItems, nil
}

func (iu *itemUsecase) AddItemToShop(item model.Item, userId uint, shopId uint) (model.ItemResponse, error) {
	if err := iu.iv.ItemValidate(item); err != nil {
		return model.ItemResponse{}, err
	}
	if err := iu.ir.AddItemToShop(&item, userId, shopId); err != nil {
		return model.ItemResponse{}, err
	}
	resItem := model.ItemResponse{
		ID:           item.ID,
		Name:         item.Name,
		Image:        item.Image,
		Caption:      item.Caption,
		Description:  item.Description,
		Price:        item.Price,
		Stocks:       item.Stocks,
		OnSale:       item.OnSale,
		DeliveryDate: item.DeliveryDate,
		BookmarkFlg:  item.BookmarkFlg,
		CreatedAt:    item.CreatedAt,
		UpdatedAt:    item.UpdatedAt,
	}
	return resItem, nil
}

func (iu *itemUsecase) UpdateItem(item model.Item, userId uint, shopId uint, itemId uint) (model.ItemResponse, error) {
	if err := iu.iv.ItemValidate(item); err != nil {
		return model.ItemResponse{}, err
	}
	if err := iu.ir.UpdateItem(&item, userId, shopId, itemId); err != nil {
		return model.ItemResponse{}, err
	}
	resItem := model.ItemResponse{
		ID:           item.ID,
		Name:         item.Name,
		Image:        item.Image,
		Caption:      item.Caption,
		Description:  item.Description,
		Price:        item.Price,
		Stocks:       item.Stocks,
		OnSale:       item.OnSale,
		DeliveryDate: item.DeliveryDate,
		BookmarkFlg:  item.BookmarkFlg,
		CreatedAt:    item.CreatedAt,
		UpdatedAt:    item.UpdatedAt,
	}
	return resItem, nil
}

func (iu *itemUsecase) DeleteItem(userId uint, shopId uint, itemId uint) error {
	if err := iu.ir.DeleteItem(userId, shopId, itemId); err != nil {
		return err
	}
	return nil
}

func (iu *itemUsecase) GetAllItemsByUser() ([]model.ItemResponse, error) {
	items := []model.Item{}
	if err := iu.ir.GetAllItemsByUser(&items); err != nil {
		return nil, err
	}
	resItems := []model.ItemResponse{}
	for _, v := range items {
		t := model.ItemResponse{
			ID:          v.ID,
			Name:        v.Name,
			Image:       v.Image,
			Caption:     v.Caption,
			Description: v.Description,
			BookmarkFlg: v.BookmarkFlg,
			CreatedAt:   v.CreatedAt,
			UpdatedAt:   v.UpdatedAt,
		}
		resItems = append(resItems, t)
	}
	return resItems, nil
}

func (iu *itemUsecase) GetItemByUser(itemId uint) (model.ItemResponse, error) {
	item := model.Item{}
	if err := iu.ir.GetItemByUser(&item, itemId); err != nil {
		return model.ItemResponse{}, err
	}
	resItem := model.ItemResponse{
		ID:          item.ID,
		Name:        item.Name,
		Image:       item.Image,
		Caption:     item.Caption,
		Description: item.Description,
		BookmarkFlg: item.BookmarkFlg,
		CreatedAt:   item.CreatedAt,
		UpdatedAt:   item.UpdatedAt,
	}
	return resItem, nil
}
