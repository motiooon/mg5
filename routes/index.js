
/*
 * GET home page.
 */



exports.index = function(req, res){
	
	
  res.render('index', { title: 'Grid' })
};



/*
 * GET photos.
 */


var API500px 			= require('500px').API500px,
    api500px 			= new API500px('m4wEjXGZQDqUGRmcMmZpB1GXQdx6OkfiJU5Av56u');


exports.photos = function(req, res){
	
	var search_term = req.body.search_term;
	
	api500px.photos.searchByTerm(search_term, {'sort': 'created_at', 'rpp': '100'},  function(error, photos) {
    if (error) {
    	throw error;
        // Error!
    } else {
    	res.send(photos);
        // Do something
    }
});
	
	
}
