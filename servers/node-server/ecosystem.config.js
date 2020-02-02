/***********************
 * @name pm2 配置文件
 * @author veava
 * @date 2020年2月2日22:12:56
 ***********************/
module.exports={
	apps:[{
		name:"server-node",
		script:"/srv/node-server/dist/app.js",
		args:"one two",
		instances:1,
		autorestart:true,
		watch:false,
		env:{
			NODE_ENV:"development"
		},
		env_production:{
			NODE_ENV:"production"
		}
	}]
};
