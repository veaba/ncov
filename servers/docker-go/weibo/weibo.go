package weibo

import (
	_ "docker-go/config"
	"io/ioutil"
	"net/http"
	"strings"
)

/**
@desc 根据用户ID获取用户信息
@api https://open.weibo.com/wiki/2/users/show
*/

func GetWeiboUserInfo(accessToken string, uid string) {
	//resp, err := http.Get("https://api.weibo.com/2/users/show.json?access_token=" + accessToken + '&uid=' + uid)
	//if err != nil {
	//	println("获取微博用户信息失败==>", err)
	//}
	//defer resp.Body.Close()
	//
	//body, err := ioutil.ReadAll(resp.Body)
	//println("用户信息==>", string(body))
}

/**
@desc 对一条微博进行评论
@docs https://open.weibo.com/wiki/2/comments/create
*/

func CreateComment(accessToken string) {
	resp, err := http.Post("https://api.weibo.com/2/comments/create.json",
		"application/x-www-form-urlencoded",
		strings.NewReader("access_token="+accessToken+"&comment=haha&id=4495433617504757"))
	if err != nil {
		println("获取微博用户信息失败==>", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	println("用户信息==>", string(body))
}

/**
* @desc 粉丝服务-读取接口-接受消息
* @docs https://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI
* @feat 接收用户私信、关注、取消关注、@等消息接口
 */
func ReadFansMessage() {

}

/**
* @desc 粉丝服务-写入接口-发送消息
* @docs https://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI
* @feat 向用户回复私信消息接口
 */
func SendFansMessage() {

}

/**
* @desc 粉丝服务-写入接口-生成带参数的二维码
* @docs https://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI
* @feat 生成带参数的二维码接口
 */
func CreateFansQrCode() {

}

/**
* @desc 获取某个用户最新发表的微博列表
* @docs https://open.weibo.com/wiki/2/statuses/user_timeline
 */

func GetUserLatestTimeline() {

}

/**
* @desc 第三方分享一条链接到微博
* @docs https://open.weibo.com/wiki/2/statuses/share
* @text 长度140字符
* @error {"error":"auth by Null spi!","error_code":21301,"request":"/2/statuses/share.json" 参数错误
 */

func ShareThirdContentToWeibo(accessToken string, status string) {
	// todo 怎么将map转字符串
	//data := map[string]string {
	//	"access_token":accessToken,
	//	"status":status,
	//}
	//data["access_token"] = accessToken
	//data["status"] = status

	resp, err := http.Post(
		"https://api.weibo.com/2/statuses/share.json",
		"application/x-www-form-urlencoded",
		strings.NewReader("access_token="+accessToken+"&status="+status))
	if err != nil {
		println("err=>", err)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	println(" 第三方分享一条链接到微博==>", string(body))
}

/**
@desc 发布一条新微博,官方文档找不到这个接口
@todo Insufficient app permissions 应用权限不足
*/
func CreatePost(accessToken string) {

	resp, err := http.Post(
		"https://api.weibo.com/2/statuses/update.json",
		"application/x-www-form-urlencoded", strings.NewReader("access_token="+accessToken+"&status="+"发了啥微博呢?"))
	if err != nil {
		println("err=>", err)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	// todo  {"error":"auth by Null spi!","error_code":21301,"request":"/2/statuses/share.json" 暂时无法解决
	println(" 发布一条新的微博==>", string(body))
}
