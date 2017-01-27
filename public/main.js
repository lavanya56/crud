//ngRoute module provides routing and deeplinking services and directives for angular apps
//angular.module is a global place for creating, registering and retrieving Angular modules

var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(function($routeProvider) {
    //Adds a new route definition to the $route service
    //$routeProvider to map a view with a controller
    $routeProvider
        .when('/create', {
            templateUrl: 'create.html',
            controller: 'CreateCtrl'
        })
        .when('/update', {
            templateUrl: 'update.html',
            controller: 'UpdateCtrl'
        })
        .when('/retrieve', {
            templateUrl: 'retrieve.html',
            controller: 'RetrieveCtrl'
        })
        .when('/delete', {
            templateUrl: 'delete.html',
            controller: 'DeleteCtrl'
        })
        .otherwise({
            redirectTo: '/create'
        });
});

//Create controller which is used to insert data
//$http service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's
mainApp.controller('CreateCtrl', function($scope, $http, $window) {
    $scope.insertData = function() {
        var sName = document.getElementById('sName').value;
        var sEmail = document.getElementById('sEmailForCreate').value;
        var sPhoneNumber = document.getElementById('sPhoneNumber').value;
        var sAddress = document.getElementById('sAddress').value;
        var sDepartment = document.getElementById('sDepartment').value;
console.log(window.location.host+"/api/insert");
        $http.post("/api/insert", {
            "_id": sEmail,
            "sName": sName,
            "sEmail": sEmail,
            "sPhoneNumber": sPhoneNumber,
            "sAddress": sAddress,
            "sDepartment": sDepartment
        }).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Data Inserted Successfully!!');
            } else {
				$window.alert(response.data.error);
                $window.alert('Sorry insertion failed. Check your mail !!');

            }
        })

    }
});

//Retrive controller for retiving the data based on EmailId
mainApp.controller('RetrieveCtrl', function($scope, $http, $window) {
    $scope.getList = function() {
        var sEmail = document.getElementById('sEmailRetrieve').value;

        $http.get("/api/retrieveById?sEmail=" + sEmail).then(function(response) {
            if (response.data.error == undefined) {
                $scope.sName = response.data.result.sName;
                $scope.sEmail = response.data.result.sEmail;
                $scope.sPhoneNumber = response.data.result.sPhoneNumber;
                $scope.sAddress = response.data.result.sAddress;
                $scope.sDepartment = response.data.result.sDepartment;

                document.getElementById("showData").style.display = "block";
            } else {
                $window.alert('Please Check Entered ID');

            }
        });
    }
    $scope.clearData = function() {
      document.getElementById("showData").style.display = "none";
    }
});

//Update Controller for updating the data
mainApp.controller('UpdateCtrl', function($scope, $http, $window) {
    $scope.update = function() {
        var sEmail = document.getElementById('sEmail').value;

        $http.get("/api/retrieveById?sEmail=" + sEmail).then(function(response) {
            if (response.data.error == undefined) {
                $scope.sName = response.data.result.sName;
                $scope.sEmail = response.data.result.sEmail;
                $scope.sPhoneNumber = response.data.result.sPhoneNumber;
                $scope.sAddress = response.data.result.sAddress;
                $scope.sDepartment = response.data.result.sDepartment;

                document.getElementById("hideData").style.display = "block";
            } else {
                $window.alert('Please Check Entered ID');

            }
        });
    }
    $scope.updateData = function() {

        var sName = document.getElementById('sNameUpdated').value;
        var sEmail = document.getElementById('sEmailUpdated').value;
        var sPhoneNumber = document.getElementById('sPhoneNumberUpdated').value;
        var sAddress = document.getElementById('sAddressUpdated').value;
        var sDepartment = document.getElementById('sDepartmentUpdated').value;

        $http.post("/api/update", {
            "sName": sName,
            "sEmail": sEmail,
            "sPhoneNumber": sPhoneNumber,
            "sAddress": sAddress,
            "sDepartment": sDepartment
        }).then(function(response) {
          if (response.data.error == undefined) {
              $window.alert('Data Updated Successfully!!');
          } else {
              $window.alert('Sorry insertion failed. Check your mail !!');
          }
        })
    }
    $scope.clearData = function() {
      document.getElementById("hideData").style.display = "none";
    }
});

//Delete Controller for deleting the data using EmailId
mainApp.controller('DeleteCtrl', function($scope, $http, $window) {
    $scope.deleteData = function() {

        var sEmail = document.getElementById('sEmailDelete').value;
        $http.post("/api/delete", {
            "sEmail": sEmail,
        }).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Data Removed Successfully');
            } else {
                $window.alert('Please Check Entered ID');
            }
        })
    }
});
