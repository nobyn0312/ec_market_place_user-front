package usecase

import (
	"go-rest-api/model"
	"go-rest-api/repository"
)

type IBookmarkUsecase interface {
	GetShopBookmarks(userId uint) (*[]model.ShopBookmarkResponse, error)
	UpdateShopBookmark(userId uint, shopId uint, bookmarkFlg bool) error
	GetItemBookmarks(userId uint) (*[]model.ItemBookmarkResponse, error)
	UpdateItemBookmark(userId uint, shopId uint, itemId uint, bookmarkFlg bool) error
}

type bookmarkUsecase struct {
	br repository.IBookmarkRepository
}

func NewBookmarkUsecase(br repository.IBookmarkRepository) IBookmarkUsecase {
	return &bookmarkUsecase{br}
}

func (bu *bookmarkUsecase) GetShopBookmarks(userId uint) (*[]model.ShopBookmarkResponse, error) {

	sbs := []model.ShopBookmark{}

	if err := bu.br.GetShopBookmarks(&sbs, userId); err != nil {
		return nil, err
	}

	sbr := []model.ShopBookmarkResponse{}
	for _, v := range sbs {
		t := model.ShopBookmarkResponse{
			Id:          v.Id,
			ShopId:      v.Shop.ID,
			Name:        v.Shop.Name,
			Image:       v.Shop.Image,
			Caption:     v.Shop.Caption,
			Description: v.Shop.Description,
			BookmarkFlg: v.BookmarkFlg,
		}
		sbr = append(sbr, t)
	}

	return &sbr, nil
}

func (bu *bookmarkUsecase) UpdateShopBookmark(userId uint, shopId uint, bookmarkFlg bool) error {

	sb, err := bu.br.GetShopBookmarkByUserIdAndShopId(userId, shopId)
	if err != nil {
		return err
	}

	sb.BookmarkFlg = bookmarkFlg

	if err := bu.br.UpdateShopBookmark(sb); err != nil {
		return err
	}

	return nil
}

func (bu *bookmarkUsecase) GetItemBookmarks(userId uint) (*[]model.ItemBookmarkResponse, error) {

	ibs := []model.ItemBookmark{}

	if err := bu.br.GetItemBookmarks(&ibs, userId); err != nil {
		return nil, err
	}

	ibr := []model.ItemBookmarkResponse{}
	for _, v := range ibs {
		t := model.ItemBookmarkResponse{
			Id:           v.Id,
			ShopId:       v.Item.ShopId,
			ItemId:       v.Item.ID,
			Name:         v.Item.Name,
			Image:        v.Item.Image,
			Caption:      v.Item.Caption,
			Description:  v.Item.Description,
			Price:        v.Item.Price,
			Stocks:       v.Item.Stocks,
			OnSale:       v.Item.OnSale,
			DeliveryDate: v.Item.DeliveryDate,
			BookmarkFlg:  v.BookmarkFlg,
		}
		ibr = append(ibr, t)
	}

	return &ibr, nil
}

func (bu *bookmarkUsecase) UpdateItemBookmark(userId uint, shopId uint, itemId uint, bookmarkFlg bool) error {

	ib, err := bu.br.GetItemBookmarkByUserIdAndShopId(userId, shopId)

	if err != nil {
		return err
	}

	ib.BookmarkFlg = bookmarkFlg

	if err := bu.br.UpdateItemBookmark(ib); err != nil {
		return err
	}

	return nil
}
