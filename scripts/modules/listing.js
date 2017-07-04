angular.module('listing.module', ['listing.services', 'listing.filters'])
.controller('listingCtrl', ['$scope', 'data', '$rootScope','$timeout', function ($scope, data, $rootScope, $timeout) {
    'use strict';

    $scope.title = "Nicolas Catalog exercise";
    $scope.setData = function (data) {
        $scope.catalogs = data.catalog;
        console.log($scope.catalogs);

    }


    data.get('scripts/data/site.js', $scope.setData);
    $scope.viewLimit = 4;
    $scope.viewMore = function (num) {
        $scope.viewLimit += num;
    }
    $scope.descending = true;

    //WATCH WORKING FINE WITHOUT MATERIALIZE CLASS, adds browser-default to the html then...
    // INCLUSO EN ANGULAR 1.5 FUNCIONA SIN LA DIRECTIVA Y con solo el WATCH DE ABAJO
    $scope.$watch(function () {
                  return $scope.descending;
                },
                 function(newValue, oldValue) {

                console.log(oldValue +" need to listen every time "+ newValue);
                $("select").val(newValue);
                $("select").material_select();

        }, true);


    $scope.filters = {
        query: "",
        tags: [
            {
                label: "Sony",
                selected: false
            },
            {
                label: "Samsung",
                selected: false
            },
            {
                label: "Phillips",
                selected: false
            }
            /*{
                label: "New",
                selected: false
            },
            {
                label: "Sale",
                selected: false
            }*/
        ]
    }


}])
.directive("myMaterialSelect", [ "$timeout", function($timeout) {
        return {
            restrict: 'A',
            require : 'ngModel',
            link : function(scope, element, attrs, ngModelCtrl) {
                $(function() {
                    console.log(element);
                    console.log($(element).context.childNodes[0]);

                    $("select option[value='? boolean:true ?']").remove();

                    $(element).material_select();

                    //Cambia el modelo cuando cambia el elemento seleccionado
                    $(element).change(function() {

                        console.log(ngModelCtrl);
                        console.log("setViewValue " + $(element).val());
                        console.log("selected " + $(element).context[0].selected);
                        console.log($(element).context[0]);

                        if($(element).val() == "true"){
                          //console.log("TRUE " + $("select option:selected").index())
                          $("select option:selected").val('Higher price first')

                        }/*else if($(element).val() == "false"){

                          //console.log("FALSE " + $("select option:selected").index())
                          //$('select:nth-child(1)').text('Higher price first'); ??

                        }*/

                        console.log(attrs);


                        var valor;
                        if($(element).val() === "false"){

                          valor = false;
                          ngModelCtrl.$setViewValue(valor);

                        }
                        if($(element).val() === "true"){

                          valor = true;
                          ngModelCtrl.$setViewValue(valor);

                        }


                        console.log(ngModelCtrl);


                    });


                });
            }
        }
    }])
.controller('testCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.dataFromRoot = $rootScope.testValue;
}])

.run(['$rootScope', function ($rootScope) {
    $rootScope.testValue = "";
}]);
