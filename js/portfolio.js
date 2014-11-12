

angular.module('portfolio', [])
	.controller('PortfolioController', ['$scope', function($scope) {
		
		$scope.portfolio = [];
		
		$scope.loadPortfolio = function(){
			$.getJSON('portfolio/layout.json', function(portfolioDefn){						
				$scope.$apply(function(){
					$scope.portfolio = portfolioDefn;
				});							
			});	
		};

		// start the controller
		var init = function() { $scope.loadPortfolio(); }
		init();
		
	}]);
