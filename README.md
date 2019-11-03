# Stocki

Stocki 命令行程序查看股票价格。关注股票后，stock star 命令即可打印出关注股票的最新价格。

#### 安装
```bash
npm i -g stocki
```

#### 使用
```bash
$ stock help
Usage:
  stock [command] <options>
  get .............. get stock price
  star ........... star stock
  unstar ........... unstar stock
  version ............ show package version
  help ............... show help menu for a command
```

##### 查看价格
```bash
$ stock get sh601318 sz300433 gb_pdd gb_baba hk01918
```

##### 关注股票
```bash
$ stock star sh601318 sz300433 gb_pdd gb_baba hk01918
$ stock star --list
# 显示已收藏股票价格
$ stock star --top
```

##### 取消关注
```bash
$ stock unstar sh601318
```