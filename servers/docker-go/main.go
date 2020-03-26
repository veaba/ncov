package main

import (
	"fmt"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
)

func main() {
	fmt.Println("hello world")
	app := iris.New()
	app.Logger().SetLevel("debug")

	app.Use(recover.New())
	app.Use(logger.New())

	app.Handle("GET", "/", index)

	app.Get("/ping", ping)

	app.Get("/hello", hello)

	app.Run(iris.Addr(":8080"),iris.WithoutServerError(iris.ErrServerClosed))
}

/**
@desc all
*/
func index(ctx iris.Context) {
	ctx.HTML("<h1>Welcome goland iris</h1>")
}

/**
@desc ping
*/
func ping(ctx iris.Context) {
	ctx.WriteString("pong")
}

/**
@desc
*/
func hello(ctx iris.Context) {
	ctx.JSON(iris.Map{"message": "hello Iris! JSON"})
}
