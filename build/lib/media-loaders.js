/**
 * 包含配置：
 * url-loader
 * html-loader
 */
module.exports = function(conf, webpack){
	const {minimize} = conf
	return [
		//media
		{
			test: /\.(jpg|png|gif|ico|eot|svg|ttf|woff|woff2)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
                    name:conf.outpath+'[hash].[ext]'
				}
			}]
		},
		{
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {
					attrs: ["img:src", "link:href"],
                    interpolate: true,
					minimize
				}
			}]
		}
	]
}
