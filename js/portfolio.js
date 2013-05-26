var portfolioDefn;
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
				changeSlidesSet("up");
				break;
			case 40:
				changeSlidesSet("down");
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
	
	slides = new Array();	

	for (var i = 0; i < portfolioDefn[setIndex].images.length; i++){
		slides[i] = new Image();
		slides[i].src = portfolioDefn[setIndex].images[i];
	}
	
	$(".portfolio-image").each(function(k, e){
		$(e).attr('src', slides[k].src);
	});
	
}

function chooseClass(index){
	switch(index){
		case 0:
			return "slide slide-one";
		case 1:
			return "slide slide-two";
		case 2:
			return "slide slide-three";
	}
}

function resetSlide(k, e){
	$(e).removeClass()
	.removeAttr('style')
	.addClass(chooseClass(k));
}

function shiftSlides(direction){
	
	slideIndex += direction;
	
	//var toAttach = new Array();
	//var indexDir;
	
	//if (direction == "right") {
		//indexDir = new Array(2,0,1);
	//} else if (direction == "left") {
		//indexDir = new Array(1,2,0);
	//}
	
	//$(".slide").each(function(k, e){
		//toAttach[indexDir[k]] = $(e).fadeOut(100)
		//.removeClass()
		//.addClass(chooseClass(indexDir[k]))
		//.fadeIn(600)
		//.detach();
	//});
	
	//$.each(toAttach, function(k, e){
		//e.appendTo("#main");
	//});
		
}

function changeSlidesSet(direction){
	
	var speed = 400;
	var destination;
	
	if (direction == "up") {
		destination = '-100%';
	} else if (direction == "down") {
		destination = '50%';
	}
	
	$(".slide").each(function(k, e){
				
		$(e).animate(
		{
			opacity: 0,
			top: destination
		},
		{
			duration: speed,
			complete: function(){
				$(e)
				.removeAttr('style')
				.removeClass()
				.addClass(chooseClass(k));
			}
		}
		);
		
	});
	
}
