# 技易联盟

> `技易联盟`  是提供给渠道部门针对技术背包客开发的一个公众号平台。

> 设计人员:  `吴欣琳`(前端研发部)  `张立明`(前端研发部)

> 前端开发人员: `桂玉杰`(前端研发部) 

> 后端开发人员: `刘强`(web研发部)  

> 测试人员: `唐玄`(品控中心-测试部)   `熊颖`(品控中心-测试部)

> 后端提供的API文档:  https://svn-repo.stnts.com/repo/techno_union/java/trunk/technounion-web/src/main/webapp/技易联盟接口文档.txt(权限请联系刘强开通)

> 后端提供的SVN地址:  https://svn-repo.stnts.com/repo/techno_union/java/trunk/technounion-web/src/main/webapp/Public (权限请联系刘强开通)

> 其他说明: 项目挂在易乐游公众号的 `技易联盟` 入口。 

## 环境要求
* nodejs 6.x
* npm 3.x


### 安装
首页克隆 项目的 dev 分支到你的机器上

然后执行安装命令:
```
npm install
```

### 本地开发
```
npm run dev
```

> 注:确保项目master已经执行过npm run dll 编译依赖库并提交
> 本地开发使用的mock数据

### 本地调试
```
npm run debug
```

> 本地调试使用的接口API代理数据

牵出后端提供的SVN地址(权限请联系刘强开通).
并修改 build文件夹下有release.js文件的release目标地址 和牵出目录一致

### 发布测试
```
npm run build
```

 本地编译成功后执行
```
npm run release 
```

svn提交(运维使用钩子发布到测试环境)

> 注: build文件夹下有release.js文件的release目标地址,请确保跟后端提供的SVN地址牵出的目录一致

### 发布上线
编译到SVN后,由后端java发布jar包进行上线. 
