package main

import (
	"docker-go/config"
	"docker-go/types"
	"docker-go/weibo"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"reflect"
	"strings"
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

	app.Get("/auth", authCenter)

	app.Get("/auth/weibo", authWeibo)

	app.Get("/params/get", paramsGet)

	app.Get("/share/weibo", shareWeibo)

	app.Get("/weibo/createComment", createComment)

	app.Get("/weibo/createPost", createPost)

	app.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))
}

/**
@desc all
*/
func index(ctx iris.Context) {
	ctx.WriteString("hello world")
//	ctx.HTML(`
//	<h1>Welcome goland iris</h1>
//	<a href="/share/weibo" target="_blank">test share weibo</> <br>
//	<a href="/weibo/createComment" target="_blank">test weibo/createComment</a> <br>
//	<a href="/weibo/createPost" target="_blank">test weibo/createPost</a> <br>
//	<a href="/auth" target="_blank">授权中心</a> <br>
//`)
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

/**
*@desc 授权中心
 */
func authCenter(ctx iris.Context) {
	ctx.HTML(`
		<h1>授权微博</h1>
		<a href="https://api.weibo.com/oauth2/authorize?client_id=` + config.ClientId +"&response_type=code"+ `&redirect_uri=http://127.0.0.1:8080/auth/weibo" target="_black">授权微博 go</a>
	`)
}

/**
@desc 微博回调，第一次获取code，第二次，交换到access_token
*/
func authWeibo(ctx iris.Context) {
	code := ctx.URLParam("code")
	accessToken := ctx.URLParam("access_token")
	// 如果没有授权，则走授权交换通行证
	if len(accessToken) == 0 {
		httpGet(code, ctx)
	}

}

/**
@desc 与微博交换code获取数据
*/
func httpGet(code string, ctx iris.Context) {
	println("与微博交换code获取数据===>", code)
	resp, err := http.Post(
		"https://api.weibo.com/oauth2/access_token?client_id="+config.ClientId+"&client_secret="+config.ClientSecret+"&grand_type=authorization_code"+"&code="+code,
		"application/x-www-form-urlencoded",
		strings.NewReader("redirect_uri=http://127.0.0.1:8080/auth/weibo"))
	if err != nil {
		println("err=>", err)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	println("body==>", string(body))
	var weiboJsonResult types.WeiboJsonResult
	json.Unmarshal([]byte(string(body)), &weiboJsonResult)

	fmt.Println("回调参数===>", weiboJsonResult)
	// todo 授权失败
	if len(weiboJsonResult.Error) > 0 {
		fmt.Println("授权失败==>", weiboJsonResult)
		ctx.HTML(`
			<h1 style="text-align:center">授权失败</h1>
			<code>` + string(body) + `</code>
		`)
	} else {
		accessToken := weiboJsonResult.Access_Token
		uid := weiboJsonResult.Uid
		remindIn := weiboJsonResult.Remind_in
		expiresIn := weiboJsonResult.Expires_in
		isRealName := weiboJsonResult.IsRealName
		// todo 需要存储用户信息==>
		println("accessToken成功===>", accessToken)
		println("uid成功===>", uid)
		println("aremindIn成功===>", remindIn)
		println("expiresIn成功===>", expiresIn)
		println("isRealName成功===>", isRealName)
		ctx.HTML(`
			<h1>授权成功<h1>
			
		`)
	}

}

func paramsGet(ctx iris.Context) {
	code := ctx.URLParam("code")
	println("code===>", code)
}

/**
*@desc 微博授权结果
 */
func authWeiboResult() {

}

func shareWeibo(ctx iris.Context) {
	status := "www.veaba.cn Hello Hello Hello share http://www.veaba.cn "
	weibo.ShareThirdContentToWeibo(config.AccessToken, status)
}

func createComment(ctx iris.Context) {
	weibo.CreateComment(config.AccessToken)
}

func createPost(ctx iris.Context) {
	weibo.CreatePost(config.AccessToken)
}
