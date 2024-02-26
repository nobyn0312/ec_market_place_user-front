package main

import (
	"go-rest-api/controller"
	"go-rest-api/db"
	"go-rest-api/repository"
	"go-rest-api/router"
	"go-rest-api/usecase"
	"go-rest-api/validator"
)

func main() {
	db := db.NewDB()
	userValidator := validator.NewUserValidator()
	shopValidator := validator.NewShopValidator()
	itemValidator := validator.NewItemValidator()
	orderValidator := validator.NewOrderValidator()
	bookmarkValidator := validator.NewBookmarkValidator()
	userRepository := repository.NewUserRepository(db)
	shopRepository := repository.NewShopRepository(db)
	itemRepository := repository.NewItemRepository(db)
	orderRepository := repository.NewOrderRepository(db)
	bookmarkRepository := repository.NewBookmarkRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository, userValidator)
	shopUsecase := usecase.NewShopUsecase(shopRepository, shopValidator)
	itemUsecase := usecase.NewItemUsecase(itemRepository, itemValidator)
	orderUsecase := usecase.NewOrderUsecase(orderRepository, orderValidator)
	bookmarkUsecase := usecase.NewBookmarkUsecase(bookmarkRepository)
	userController := controller.NewUserController(userUsecase)
	shopController := controller.NewShopController(shopUsecase)
	itemController := controller.NewItemController(itemUsecase)
	orderController := controller.NewOrderController(orderUsecase)
	bookmarkController := controller.NewBookmarkController(bookmarkValidator, bookmarkUsecase)
	e := router.NewRouter(userController, shopController, itemController, orderController, bookmarkController)
	e.Logger.Fatal(e.Start(":9090"))
}
