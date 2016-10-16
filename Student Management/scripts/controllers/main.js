'use strict';

angular.module('studentManagement')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });


  describe('myApp', function () {
    var scope,
    controller;
    beforeEach(function () {
        module('studentManagement');
    });

    describe('MainCtrl', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            $scope.today = moment().toDate();
            controller = $controller('MyCtrl', {
                '$scope': scope,
                    'BasketNavigationService': {
                    showBasketList: function () {
                        return 'test'
                    }
                }
            });
        }));
        it('should create $scope.testVar when calling test',

        function () {
            expect(scope.testVar).toBeUndefined();
            scope.test();
            //     scope.$digest();
            expect(scope.testVar).toBeDefined();
        });
    });


});
