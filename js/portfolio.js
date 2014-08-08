
var minPortfolioWidth = 1080;

angular.module('portfolio', [])
	.controller('SlideController', ['$scope', '$animate', function($scope, $animate) {
		
		$scope.portfolioImageSet = [];
		$scope.portfolioSetTitles = [];
		$scope.portfolioWidth = minPortfolioWidth;
		$scope.slideSetElement = $('#slide-set');
		$scope.scrollInterval = 0;
		
		$scope.loadPortfolioSet = function(setIndex){	
			$.getJSON('portfolio/layout.json', function(portfolioDefn){		
				$scope.$apply(function() {

					if (typeof portfolioDefn == 'undefined') return;
					
					$scope.resetSlides();
					$scope.portfolioSetTitles = [];	
					$scope.portfolioWidth = minPortfolioWidth;
					
					// clear old image set
					$.each($scope.portfolioImageSet, function(){
						var slide = $scope.portfolioImageSet.pop();
						$animate.leave(slide);
					});
					
					// load set titles
					$.each(portfolioDefn, function(i, e){
						$scope.portfolioSetTitles.push({title : e.title, index : i});
					});

					// load portfolio set
					for (var i = 0; i < portfolioDefn[setIndex].images.length; i++){
						var slide = new Image();
						slide.src = portfolioDefn[setIndex].images[i];
						slide.onload = function(){ 
							$scope.addToPortfolioWidth(this.width);
							$(this).addClass("slide");
							$animate.enter(this, $scope.slideSetElement);
						}
						$scope.portfolioImageSet.push(slide);
					}					
					
				});					
			});	
		};
		
		$scope.addToPortfolioWidth = function(width){
			$scope.$apply(function(){ $scope.portfolioWidth += width; })
		};
		
		$scope.resetSlides = function(){	
			var x = $(window).scrollLeft();
			clearInterval($scope.scrollInterval);
			$scope.scrollInterval = setInterval(function(){
				scrollTo(x-=50,0);
				if (x <= 0)	clearInterval($scope.scrollInterval);
			}, 10);				
		};

		// start the controller
		var init = function() { $scope.loadPortfolioSet(0); }
		init();
		
	}]);
