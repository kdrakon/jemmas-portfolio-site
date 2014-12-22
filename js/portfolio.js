

angular.module('portfolio', [])
	.controller('PortfolioController', ['$scope', '$http', function($scope, $http) {
		
		$scope.portfolio = [];
		$scope.sliderPortfolioSet = {images:[]};
		
		$scope.loadPortfolio = function(){
			$http.get('portfolio/layout.json').
				success(function(data, status, headers, config) {
					$scope.portfolio = data;
				 });
		};
		
		$scope.setSliderImages = function(portfolioSet, startIndex){
			var length = portfolioSet.images.length;
			var images = new Array(), index = startIndex;
			while(images.length < length){
				images.push(portfolioSet.images[index]);
				index = (index + 1) % length;
			}
			
			$scope.sliderPortfolioSet.images = images;
		};
		
		$scope.shiftSliderImages = function(shift){
			if (shift == 1) {
				var last = $scope.sliderPortfolioSet.images.pop();
				$scope.sliderPortfolioSet.images.unshift(last);
			} else {
				var first = $scope.sliderPortfolioSet.images.shift();
				$scope.sliderPortfolioSet.images.push(first);
			}
		};
		
		$scope.isSliderEmpty = function(){
			return $scope.sliderPortfolioSet.images.length == 0;
		};
		
		$scope.getCurrentSliderImage = function(){
			return $scope.sliderPortfolioSet.images[0];
		};
		
		$scope.clearSlider = function(){ 
			$scope.sliderPortfolioSet.images = new Array();
		};

		// start the controller
		var init = function() { 
			$scope.loadPortfolio(); 
		}
		init();
		
	}]);
