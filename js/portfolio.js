
var minPortfolioWidth = 1080;

angular.module('portfolio', [])
	.controller('SlideController', ['$scope', '$animate', function($scope, $animate) {
		
		$scope.loadingPortfolio = false;
		$scope.portfolioImageSet = [];
		$scope.portfolioSetTitles = [];
		$scope.portfolioWidth = minPortfolioWidth;
		$scope.slideSetElement = $('#slide-set');
		$scope.scrollInterval = 0;
		
		$scope.loadPortfolioSet = function(setIndex){
			if ($scope.loadingPortfolio) return;
			$.getJSON('portfolio/layout.json', function(portfolioDefn){		
				$scope.$apply(function() {

					if (typeof portfolioDefn == 'undefined') return;
					
					$scope.loadingPortfolio = true;
					
					$scope.resetSlides();
					$scope.portfolioSetTitles = [];	
					$scope.portfolioWidth = minPortfolioWidth;
					
					// clear old image set
					$.each($scope.portfolioImageSet, function(){
						var slide = $scope.portfolioImageSet.pop();
						$animate.leave(slide);
					});
					$('.slide').each(function(){ this.remove() });
					
					// load set titles
					$.each(portfolioDefn, function(i, e){
						$scope.portfolioSetTitles.push({title : e.title, index : i});
					});

					// load portfolio set
					for (var i = 0; i < portfolioDefn[setIndex].images.length; i++){
						var slide = new Image();
						slide.src = portfolioDefn[setIndex].images[i];
						slide.onload = function(){
							var lastSlide = $('.slide').last();
							$scope.addToPortfolioWidth(this.width);
							$(this).addClass("slide");
							if (lastSlide.length > 0){
								$animate.enter(this, $scope.slideSetElement, lastSlide);
							} else {
								$animate.enter(this, $scope.slideSetElement);
							}
						}
						$scope.portfolioImageSet.push(slide);
					}
					
					$scope.loadingPortfolio = false;		
					
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
