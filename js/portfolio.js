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
				shiftSlides(1);
				break;
			case 37:
				// left
				shiftSlides(-1);			
				break;
			case 38:
				// up
				changeSlidesSet(1);
				break;
			case 40:
				// down
				changeSlidesSet(-1);
				break;
		}		
	});
}

function getPortfolioDefinition(jsonLocation){	

	$.getJSON(jsonLocation, function(data){
		portfolioDefn = data;
		loadPortfolio();
	});
		
}

function loadPortfolio(){
	
	slides = new Array();	

	for (var i = 0; i < portfolioDefn[slideSetIndex].images.length; i++){
		slides[i] = new Image();
		slides[i].src = portfolioDefn[slideSetIndex].images[i];
	}
	
	$(".slide").each(function(k, e){
		if (k == 0){
			$(e).attr('src', slides[k].src).removeClass("inactive-slide");
		} else {
			$(e).attr('src', slides[k].src).addClass("inactive-slide");
		}
	});
	
	showTitles();
	
	$("#set-description").html(portfolioDefn[slideSetIndex].description);
	
}

function showTitles(){
	var output = "";
	$.each(portfolioDefn, function(k, e){
		var link = "<a>" + e.title + "</a><br>";
		output += link;
	});
	$("#set-titles").html(output);
}

function shiftSlides(direction){
	
	slideIndex += direction;
	if (slideIndex < 0) slideIndex = portfolioDefn[slideSetIndex].images.length - 1;
	if (slideIndex >= portfolioDefn[slideSetIndex].images.length) slideIndex = 0;
	
	var i;
	$(".slide").each(function(k, e){
		i = (slideIndex+k) % portfolioDefn[slideSetIndex].images.length;
		if (k == 0){
			$(e).fadeOut(100).attr("src", slides[i].src).removeClass("inactive-slide").fadeIn(400);
		} else {
			$(e).fadeOut(100).attr("src", slides[i].src).addClass("inactive-slide").fadeIn(1000);			
		}
	});
		
}

function changeSlidesSet(direction){
	
	slideSetIndex += direction;
	if (slideSetIndex < 0) slideSetIndex = portfolioDefn.length - 1;
	if (slideSetIndex >= portfolioDefn.length) slideSetIndex = 0;
	
	$(".slide").each(function(k, e){
		$(e).fadeOut(400);
	});
	
	slideIndex = 0;	
	loadPortfolio();
	
	$(".slide").each(function(k, e){
		$(e).fadeIn(400);
	});		
}
