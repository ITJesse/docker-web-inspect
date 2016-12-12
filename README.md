# docker-web-inspect
Restful API for docker inspect.

# How to use
1. Run `npm install docker-web-inspect -g`
2. Run `docker-web-inspect`

Example request:
```
$ curl -H 'Authorization:Basic ZG9ja2VyOmRvY2tlcg==' http://localhost:8000/all -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 450
Date: Mon, 12 Dec 2016 12:20:01 GMT
Connection: keep-alive

{"errorCode":0,"desp":"ok","data":[{"id":"16598180d896a91ee8df1213fd53d46cfab0e8795e9a8154625fa70998896174","name":"redis","state":"running","status":"Up 4 hours","ports":[{"IP":"0.0.0.0","PrivatePort":6379,"PublicPort":6379,"Type":"tcp"}]},{"id":"cece1b66af0db372492634d5a14982236c2ace8de4d5970a820ba638ac42305c","name":"mariadb","state":"running","status":"Up 4 hours","ports":[{"IP":"0.0.0.0","PrivatePort":3306,"PublicPort":3306,"Type":"tcp"}]}]}
```

Example response:
```
{
  "errorCode": 0,
  "desp": "ok",
  "data": {
    "id": "16598180d896a91ee8df1213fd53d46cfab0e8795e9a8154625fa70998896174",
    "name": "redis",
    "state": "running",
    "status": "Up 4 hours",
    "ports": [
      {
      "IP": "0.0.0.0",
      "PrivatePort": 6379,
      "PublicPort": 6379,
      "Type": "tcp"
      }
    ]
  }
}
```
```
{
  "errorCode": -1,
  "desp": "Container redis not found"
}
```

# API
* /all
* /search_by_name/:name
* /search_by_id/:id

# Environment
* `DOCKER_SOCKET_PATH`

  The Unix socket file path of Docker, default is `/var/run/docker.sock`.

* `DOCKER_HOST`

  The Docker Remote API host, default is null. 
  Notice: When `DOCKER_SOCKET_PATH` is set, DOCKER_HOST will never be used. If you want to use this option, please set `DOCKER_SOCKET_PATH` to null.
  
* `DOCKER_PORT`

  The Docker Remote API port, default is null.
  Notice: This option will only take effect with `DOCKER_HOST`.
  
* `WEB_AUTH_NAME`

  The web authorization username, default is `docker`.
  
* `WEB_AUTH_PASS`

  The web authorization password, default is `docker`.
