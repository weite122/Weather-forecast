
let LoadInformation = require('./loadinformation.js')
let LoadNews = require('./news.js')
let Suggestions = require('./suggestion.js')
let Tab = require('./tab.js')
require('../css/index.scss');

LoadInformation.init()

LoadNews.init()
    
Suggestions.init()
    
Tab.init()