# 基于Rust实现的后端服务（备选方案）


- [Cargo 中文文档 budshome.com](https://cargo.budshome.com/getting-started/installation.html)
- [getting start hyper](https://hyper.rs/guides/server/hello-world/)
- [docs.rs hyper](https://docs.rs/hyper/0.13.4/hyper/server/index.html)

## run

- 安装[rust rustc 1.42.0 (b8cedc004 2020-03-09)](https://rust-lang.org/)
- 安装[cargo cargo 1.42.0 (86334295e 2020-01-31)](https://crates.io/)

> cargo run   

访问: http://127.0.0.1:3000 


## 依赖
- hyper

```rust
#![deny(warnings)]

use std::convert::Infallible;

use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Request, Response, Server};

async fn hello(_: Request<Body>) -> Result<Response<Body>, Infallible> {
    Ok(Response::new(Body::from("Hello World!")))
}

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {

    // For every connection, we must make a `Service` to handle all
    // incoming HTTP requests on said connection.
    let make_svc = make_service_fn(|_conn| {
        // This is the `Service` that will handle the connection.
        // `service_fn` is a helper to convert a function that
        // returns a Response into a `Service`.
        async { Ok::<_, Infallible>(service_fn(hello)) }
    });

    let addr = ([127, 0, 0, 1], 3000).into();

    let server = Server::bind(&addr).serve(make_svc);

    println!("Listening on http://{}", addr);

    server.await?;

    Ok(())
}

```
- rocket  目前尚未工作起来
 rocket 需要  nightly 
 
 ```shell 
rustup default nightly
rustup override set nightly 
rustup update && cargo update
```
