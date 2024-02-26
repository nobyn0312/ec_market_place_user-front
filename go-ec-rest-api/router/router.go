package router

import (
	"go-rest-api/controller"
	"net/http"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewRouter(uc controller.IUserController, sc controller.IShopController, ic controller.IItemController, oc controller.IOrderController, bc controller.IBookmarkController) *echo.Echo {
	e := echo.New()

	u := e.Group("/user")
	u.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", os.Getenv("FE_URL"), "http://localhost:4000", "http://localhost:4001"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept,
			echo.HeaderAccessControlAllowHeaders, echo.HeaderXCSRFToken},
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
		AllowCredentials: true,
	}))
	u.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		CookiePath:     "/",
		CookieDomain:   os.Getenv("API_DOMAIN"),
		CookieHTTPOnly: true,
		// CookieSameSite: http.SameSiteNoneMode,
		CookieSameSite: http.SameSiteDefaultMode,
		// CookieMaxAge:   60,
	}))
	u.GET("/csrf", uc.CsrfToken)
	u.POST("/signup", uc.SignUp)
	u.POST("/login", uc.LogIn)
	u.POST("/logout", uc.LogOut)

	u.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	u.GET("/shop", sc.GetAllShopsByUser)
	u.GET("/shop/:shopId", sc.GetShopByUser)
	u.GET("/item", ic.GetAllItemsByUser)
	u.GET("/item/:itemId", ic.GetItemByUser)
	u.GET("/order", oc.GetAllOrders)
	u.POST("/order", oc.CreateOrder)
	u.DELETE("/order/:orderId", oc.DeleteOrder)
	u.GET("/order/:orderId", oc.GetOrderById)
	u.GET("/bookmark/shops", bc.GetShopBookmarks)
	u.PUT("/bookmark/shops", bc.UpdateShopBookmark)
	u.GET("/bookmark/items", bc.GetItemBookmarks)
	u.PUT("/bookmark/items", bc.UpdateItemBookmark)

	o := e.Group("/owner")
	o.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	o.GET("/shop", sc.GetAllShops)
	o.POST("/shop", sc.CreateShop)
	o.PUT("/shop/:shopId", sc.UpdateShop)
	o.DELETE("/shop/:shopId", sc.DeleteShop)
	o.GET("/shop/:shopId", sc.GetShopById)
	o.POST("/shop/:shopId/item", ic.AddItemToShop)
	o.GET("/shop/:shopId/item", ic.GetAllItemsByShopId)
	o.GET("/shop/:shopId/item/:itemId", ic.GetItemById)
	o.PUT("/shop/:shopId/item/:itemId", ic.UpdateItem)
	o.DELETE("/shop/:shopId/item/:itemId", ic.DeleteItem)

	return e
}
