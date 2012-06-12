(function(window, $){
	
	var GRID = GRID || {};
	
	GRID.Index = (function(){
		
	var container, template;
	
	function init(){
		container = $('#container');
		template= $('#photo-tpl').html();
				
		var search_term = "people";
		
		var request = $.ajax({
			url: '/photos',
			type:"POST",
			data: search_term,
			dataType: 'JSON'
		})
		
		request.done(function(photos){
			
			var extended_photo_array = _.map(photos.photos,function(photo){
				
				var ratio = photo.height/photo.width;
				
			var extended_photo = _.extend(photo,{
					image_url : photo.image_url.replace("2.jpg","4.jpg"),
					_dwidth: 320,
					_dheight: 320*ratio
					
				})
				return extended_photo;
			});
			
			console.log(extended_photo_array);

			var html = Mustache.to_html(template, {photos: extended_photo_array})
			
			container.append(html);
			
			console.log('html');
			
		 
		 container.imagesLoaded( function(){
			  container.masonry({
			    itemSelector : '.box',
			    columnWidth: 340,
			    isAnimated: true
			  });
			});
			
			
		});
		
		request.fail(function(msg){
			alert('error getting images', msg);
		});
		
		
	}	
	
	
		
	return{
		init: init
	}

	})();
	
	
	$(function(){
		GRID.Index.init();
	});
	
	
})(window, jQuery);


