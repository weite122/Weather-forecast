module.exports={
	entry: __dirname + '/js/app/index.js', //入口文件路径,__dirname则是该文件所在目录的绝对路径
	output:{
		path: __dirname + '/dist/', //存放打包后文件的地方路径
		filename: 'bundle.js'  //打包后的文件名
	}
}