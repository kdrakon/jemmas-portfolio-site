var portfolioDefn = new Array();
var slides = new Array();
var slideIndex = 0;
var slideSetIndex = 0;

function init(){
	
	portfolioDefn = getPortfolioDefinition('portfolio/layout.json');
	
	$(document).keyup(function(e){
		switch(e.keyCode){
			case 39:
				// right
				shiftSlides(1, slideSetIndex);
				break;
			case 37:
				// left
				shiftSlides(-1, slideSetIndex);			
				break;
		}		
	});
}

function getPortfolioDefinition(jsonLocation){	

	$.getJSON(jsonLocation, function(data){
		portfolioDefn = data;
		loadPortfolio(slideSetIndex);
	});
		
}

function loadPortfolio(setIndex){
	
	slideSetIndex = setIndex;
	slideIndex = 0;
	
	slides = new Array();	

	for (var i = 0; i < portfolioDefn[slideSetIndex].images.length; i++){
		slides[i] = new Image();
		slides[i].src = portfolioDefn[slideSetIndex].images[i];
	}
	
	$(".slide").each(function(k, e){
		var element = $(e);
		if (k == 0){
			element.attr('src', slides[k].src).removeClass("inactive-slide");
		} else {
			element.attr('src', slides[k].src).addClass("inactive-slide");
		}
		element.attr("onclick", "showImageModal('" + k + "')");
		element.attr("id", "image_" + k);
	});
	
	showTitles();
	
}

function showTitles(){
	var output = "";
	$.each(portfolioDefn, function(k, e){
		var link = "<a class='set-link' onclick='loadPortfolio(" + k + ")'>" + e.title + "</a><br>";
		output += link;
	});
	$("#set-titles").html(output);
}

// refactored helper method for frontend
function uiShiftSlides(direction) {
	shiftSlides(direction, slideSetIndex);
}

function shiftSlides(direction, setIndex){
	
	slideIndex += direction;

	if (slideIndex < 0) slideIndex = portfolioDefn[setIndex].images.length - 1;
	if (slideIndex >= portfolioDefn[setIndex].images.length) slideIndex = 0;
	
	var i;
	$(".slide").each(function(k, e){
		var element = $(e);
		i = (slideIndex+k) % portfolioDefn[setIndex].images.length;
		if (k == 0){
			element.attr("src", slides[i].src).removeClass("inactive-slide");
		} else {
			element.attr("src", slides[i].src).addClass("inactive-slide");			
		}
		element.attr("onclick", "showImageModal('" + i + "')");
		element.attr("id", "image_" + i);
		
		// shake them
		element.animate({left: '+=' + direction*(k*4)});
		element.animate({left: '+=' + direction*-1*(k*4)});
	});
		
}

function showImageModal(imageIndex){
	
	var image = $("#fullscreen-image");
	var imageSrc = $("#image_" + imageIndex).attr("src");
	
	image.hide();
	image.attr("src", imageSrc);
	
	var left = ($("body").width() - image.width())/2;
	var top = ($("body").height() - image.height())/2;
	
	image.css("left", left);
	image.css("top", top);
	image.css("margin", "auto");
	
	image.show();
	
}

function hideImageModal(){
	var image = $("#fullscreen-image");
	image.hide();
}
