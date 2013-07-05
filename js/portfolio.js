var portfolioDefn = new Array();
var slides = new Array();
var slideSetIndex = 0;

function init(){
	
	getPortfolioDefinition('portfolio/layout.json');
	
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
		}		
	});
	
	$('#slide-reset').hide().click(function(){
		scrollTo(0,0);
	});
	
	$(window).scroll(function(e){
		if($(window).scrollLeft() != 0){
			$('#slide-reset').show();
		}else{
			$('#slide-reset').hide();
		}
	});
	
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
	
	// move scroll back to the left
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
	var slideSetWidth = parseInt(portfolioDiv.css("width").replace("px", ""));
	
	// add/show the slide
	$(image).addClass("slide");
	slideSetDiv.append(image);
	
	// set the width of the portfolio div
	var newWidth = $(image).position().left + image.width + slideSetWidth;
	portfolioDiv.css("width", newWidth + "px");	
	
	// match the top-bar width with the portfolio width
	//var barWidth = portfolioDiv.position().left + slideSetWidth;
	$("#bar").css("width", newWidth + "px");
}

// deprecated
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

// deprecated
function hideImageModal(){
	var image = $("#fullscreen-image");
	image.hide();
}
