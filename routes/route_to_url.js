const { Q_MOBILE, Q_AI, Q_COMPUTER, Q_COMP_MOB_HARDWARE, Q_ELECTRONICs } = require('../utils/api_endpoints')

const API_START_POINT = "http://api.mediastack.com/v1/news?access_key=be7021667ddbd44040c3d5bc89262673&keywords="
const API_END_POINT = '&languages=en&categories=technology&sort=published_desc&limit=100'
module.exports = {
    routeToUrl: function (category, page) {
        switch (category) {
            case "mobile":
                return `${API_START_POINT}${Q_MOBILE}${API_END_POINT}&page=${page}`
            case "laptop-pc":
                return `${API_START_POINT}${Q_COMPUTER}${API_END_POINT}&page=${page}`
            case "hardware":
                return `${API_START_POINT}${Q_COMP_MOB_HARDWARE}${API_END_POINT}&page=${page}`
            case "ai":
                return `${API_START_POINT}${Q_AI}${API_END_POINT}&page=${page}`
            case "electronics":
                return `${API_START_POINT}${Q_ELECTRONICs}${API_END_POINT}&page=${page}`
            default:
                return `${API_START_POINT}${Q_MOBILE}${API_END_POINT}&page=${page}`
        }
    }
}