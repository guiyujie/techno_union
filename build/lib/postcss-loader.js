/**
 * 包含配置：
 * postcss-loader
 */
const autoprefixer = require('autoprefixer')

module.exports = function(conf, webpack) {
	const { autoprefixerOptions } = conf
	return {
		loader: 'postcss-loader',
		options: {
			plugins: function() {
				return [
					autoprefixer(autoprefixerOptions)
				]
			}
		}
	}
}