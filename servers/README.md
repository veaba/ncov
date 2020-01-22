# 后端服务 todo 尚未完成，请勿使用!!!

- docker-zookeeper
- docker-kafka
- docker-redis
- docker-mongo
- docker-python


## Usage

docker容器化，一键启动后端脚本

### todo docker组网

```shell
docker network create --subnet=172.2.0.0/16 2019_nCoV_network

```


### todo 注意安全问题


- 白名单iptables，防止搞事
- todo redis 通过证书去访问，现在docker-compose 配置是通过设置密码访问的
- todo kafka 通过证书去访问，pro下：开启白名单+内网访问，dev：开启白名单
- todo zookeeper 通过证书去访问，现在并未开启访问服务
- todo mongo 通过证书去访问，pro下：开启白名单+内网访问，dev：开启白名单

## docker-zookeeper

## docker-kafka

## docker-redis

## docker-mongo

## docker-python

