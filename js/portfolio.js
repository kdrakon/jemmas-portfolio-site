var portfolioDefn = new Array();
var slides = new Array();
var slideSetIndex = 0;
var scrollInterval = null;

function init(){
	
	getPortfolioDefinition('portfolio/layout.json');	
	prepareSlideControls();
	
}

function prepareSlideControls(){
	
	// some key mapping
	$(document).keyup(function(e){
		switch(e.keyCode){
			case 39:
				// right
				//shiftSlides(1, slideSetIndex);
				break;
			case 37:
				// left
				//shiftSlides(-1, slideSetIndex);			
				break;
			case 36:
				resetSlideAnimation();
				break;
		}		
	});
	
	var slideReset = $('#slide-reset');
	
	$(window).scroll(function(){
		if ($(this).scrollLeft() > 0){
			slideReset.show();
		}else{
			slideReset.hide();
		}
	});
	
	slideReset.hide().click(function(){
		resetSlideAnimation();		
	});
}

function resetSlideAnimation(){
	
	var x = $(window).scrollLeft();
	clearInterval(scrollInterval);
	scrollInterval = setInterval(function(){
		scrollTo(x-=50,0);
		if (x <= 0)	clearInterval(scrollInterval);
	}, 10);	
	
}

// gets portfolio JSON and preloads all images
function getPortfolioDefinition(jsonLocation){	

	$.getJSON(jsonLocation, function(data){
		
		portfolioDefn = data;
		
		// show first portfolio set	
		slideSetIndex = 0;
		loadPortfolio(slideSetIndex);
		
		// show titles/links to portfolio sets
		showTitles();
		
	});		
}

function showTitles(){
	var output = "";
	$.each(portfolioDefn, function(k, e){
		var link = "<a class='set-link' onclick='loadPortfolio(" + k + ")'>" + e.title + "</a><br>";
		output += link;
	});
	$("#set-titles").html(output);
}

function loadPortfolio(setIndex){
	
	slideSetIndex = setIndex;	
	slides = new Array(portfolioDefn[slideSetIndex].images.length+1);	
	
	// clear all previous slides
	$('#slide-set > .slide').remove();
	
	// move scroll back to the left and clear the scroll animation
	clearInterval(scrollInterval);
	scrollTo(0,0);
	
	// reset the portfolio width
	$("#portfolio").css("width", "0px");

	// load and show images onload
	for (var i = 0; i < portfolioDefn[slideSetIndex].images.length; i++){
		slides[i] = new Image();
		slides[i].src = portfolioDefn[slideSetIndex].images[i];
		slides[i].onload = function(){
			// show the image once its loaded
			showImageInPortfolio(this);
		};
	}	
}

function showImageInPortfolio(image){
	
	var slideSetDiv = $('#slide-set');
	var portfolioDiv = $('#portfolio');
	var portfolioWidth = portfolioDiv.width();
	var portfolioOffset = portfolioDiv.offset().left;
	var lastImage = slideSetDiv.find('img').last();
	
	var lastImageHeight = 450;
	if(lastImage.position() != undefined){
		lastImageHeight = lastImage.height();
	}
	
	// add/show the slide
	slideSetDiv.append(prepareSlideImage(image));
	
	// set the width of the portfolio div
	var newWidth = portfolioWidth + ((lastImageHeight / image.height) * image.width);
	portfolioDiv.css("width", newWidth + "px");	
	
	// match the top-bar width with the portfolio width
	var barNewWidth = portfolioOffset + newWidth;
	$("#bar").css("width", barNewWidth + "px");
}

function prepareSlideImage(image){
	
	$(image).addClass("slide")
	.click(function(){
		// move the slide into focus
		var imageLeft = $(this).position().left - 10;
		scrollTo(imageLeft, 0);
	});	
	
	return image;	
}
