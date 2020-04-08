package main

import (
	"encoding/csv"
	"fmt"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
	"io"
	"log"
	"os"
	"reflect"
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

	app.Get("/readcsv", readCSVFile)

	app.Get("/twoArray", twoArray)

	app.Get("/toApiJson", toApiJson)

	app.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))
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

/**
*@desc go 读取文件
 */
func readCSVFile(ctx iris.Context) {
	fileName := "./WHO-COVID-19-global-data.csv"
	fs, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("can not open file", err)
	}

	defer fs.Close()

	r := csv.NewReader(fs)

	arrayData := [][]string{{}}
	for {
		row, err := r.Read()
		if err != nil && err != io.EOF {
			log.Fatalf("can not read file", err)
		}
		if err == io.EOF {
			break
		}
		arrayData = append(arrayData, row)
		//fmt.Println("==>", row)
		fmt.Println("类型", reflect.TypeOf(row))
	}

	fmt.Println("结果==>", arrayData)
	ctx.JSON(iris.Map{"message": arrayData})
}

/**
*@desc 二维数组
*@todo 什么将[a,a1] =>"a,a1" ?
*@todo 可能需要自己写方法来实现了，没有js 中的Array.split('x')
 */

func twoArray(ctx iris.Context) {
	//var empty []string   // empty := []string{}
	//for i := 0; i <= 10; i++ {
	//	empty = append(empty, strconv.Itoa(i))
	//	fmt.Println("i==>", i)
	//}
	//fmt.Println("循环结果==>", empty)

	//var empty []string // empty := []string{}
	var arrayData = [][]string{{"a a"}, {"b b"}}
	for k, v := range arrayData {
		//empty = append(empty, strconv.Itoa(k))
		//empty = append(empty, strconv.Itoa(v))
		fmt.Println("i==>", k, v)
		//fmt.Println("分割",strings.Split(v,""))
		arrayData = append(arrayData, v)
	}
	fmt.Println("循环结果==>", arrayData)

	ctx.JSON(iris.Map{"message": arrayData})

}

/**
@todo 解析csv文件
@desc 将csv 文件转为多种格式的api
*/

func toApiJson(ctx iris.Context) {

	ctx.JSON(iris.Map{"a": "a1", "b": "b1", "c": "c1"})
}

