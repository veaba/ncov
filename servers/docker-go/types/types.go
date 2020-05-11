/**
* @desc 语法结构
 */
package types

// 微博OAuth失败返回结果
type WeiboJsonResult struct {
	Error             string
	Error_code        int32
	Request           string
	Error_uri         string
	Error_description string
	Access_Token      string
	Remind_in         string
	Expires_in        int32
	Uid               string
	IsRealName        string
}

// 获取微博用户信息,更多的结构见/config.go
type WeiboUserInfo struct {
	Id          string
	Idstr       string
	Class       int32
	Screen_name string
	name        string
}
