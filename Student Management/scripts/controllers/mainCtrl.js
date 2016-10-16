
myApp.controller("navbarCtrl", ["$scope", "$rootScope", "$log", "$location", function ($scope, $rootScope, $log, $location,$http) {

    $rootScope.showUserName = false;
    $rootScope.signedInUser = "";
    $rootScope.currentPath = "";

    $scope.logout = function () {
        $location.path("/");
        $rootScope.currentPath = "/";
        $rootScope.showUserName = false;

    }
}]);

myApp.controller("loginPageCtrl", ["$scope", "$rootScope", "$log", "$location", "$routeParams", "$http", "getDataFactory", function ($scope, $rootScope, $log, $location, $routeParams, $http, getDataFactory) {

    
    $scope.selectedstaffs = {};
    $scope.selectedTechnologies = {};
    $scope.clickedStaySigned = "";

    $scope.empAccordion = 12;
    $scope.projAccordion = 12;
    $scope.techAccordion = 12;

    $scope.showEmpCheckBoxes = false;
    $scope.showProjCheckBoxes = false;
    $scope.showTechCheckBoxes = false;

    $scope.empOrderBy = "name";
    $scope.projOrderBy = "staffs";
    $scope.techOrderBy = "subject";
    $scope.regEx="/^[0-9]{10,10}$/;";

    $scope.wholeData = getDataFactory.getWholeData();
    console.log("$scope.wholeData :: ", $scope.wholeData);

    $scope.users = $scope.wholeData.users;
    $scope.Students = $scope.wholeData.Students;
    $scope.staffs = $scope.wholeData.staffs;
    $scope.subject = $scope.wholeData.subject;

    jQuery("#signupSuccess").hide();
    jQuery("#errorLogin").hide();
    jQuery("#signupError").hide();
    jQuery("#multiPurposeAlert").hide();

    $scope.alertClass = "success";
    $scope.alertText = "The record has been added successfully";
    $scope.authenticateUser = function (uname, pwd) {
        var temp = false;
        $scope.users.forEach(function (val, key) {
            if (val.uname == uname || val.email == uname) {
                if (val.pwd == pwd) {
                    temp = true;
                    $rootScope.signedInUser = val.uname;                    
                }
            }
        });

        if (temp == true) {
            $rootScope.showUserName = true;
            $location.path("/userPage");
            $rootScope.currentPath = "/userPage";

        } else {
            jQuery("#errorLogin").slideDown();
            setTimeout(function () {
                jQuery("#errorLogin").slideUp();
            }, 4000);
        }
        return true;
    };

    $scope.createNewUser = function () {

        if ($scope.newUser.pwd == $scope.newUser.pwd2) {

            $scope.newUser = {
                uname: $scope.newUser.name,
                pwd: $scope.newUser.pwd,
                email: $scope.newUser.email
            };

            $scope.users.push($scope.newUser);
            $location.path("/");

        } else {

            jQuery("#signupError").slideDown();

            setTimeout(function () {
                jQuery("#signupError").slideUp();
            }, 4000);
            console.log("Passwords mismatch. Please fill the correct data to create an account.");
        }
        setTimeout(function () {
        }, 10);
            jQuery("#signupSuccess").slideDown();
        setTimeout(function () {
            jQuery("#signupSuccess").slideUp();
        }, 4000);
        console.log("$scope.newUser", $scope.newUser);

    };

    $scope.deleteRecord = function (str, item) {
        if (str == "Students") {
            var index = $scope.Students.indexOf(item);
            $scope.Students.splice(index, 1);
        } else if (str == "staffs") {
            var index = $scope.staffs.indexOf(item);
            $scope.staffs.splice(index, 1);
        } else if (str == "subject") {
            var index = $scope.subject.indexOf(item);
            $scope.subject.splice(index, 1);
        }

        $scope.alertClass = "success";
        $scope.alertText = "The record has been deleted successfully";
        jQuery("#multiPurposeAlert").slideDown();

        setTimeout(function () {
            jQuery("#multiPurposeAlert").slideUp();
        }, 4000);

    };

    $scope.addNewRecord = function (str) {
        if (str == "Students") {
            $scope.newContact = [];
            $("#addStudentTemplate").modal('show');
        } else if (str == "staffs") {
            $scope.newContact = [];
            $("#addstaffTemplate").modal('show');
        } else if (str == "subject") {
            $scope.newContact = [];
            $("#addSubjectTemplate").modal('show');
        }
    };
    $scope.discardRecord = function () {

        $(".modal").modal('hide');
    };

    $scope.commitRecord = function (str, obj) {
        console.log(obj);
        if (str == "Students") {
            $scope.Students.push(obj);
            $("#addStudentTemplate").modal('hide');
        } else if (str == "staffs") {
            $scope.staffs.push(obj);
            $("#addstaffTemplate").modal('hide');
        } else if (str == "subject") {
            $scope.subject.push(obj);
            console.log($scope.subject);
            $("#addSubjectTemplate").modal('hide');
        }

        setTimeout(function () {
            jQuery("#multiPurposeAlert").slideDown();
        }, 10);

        setTimeout(function () {
            jQuery("#multiPurposeAlert").slideUp();
        }, 4000);

    };


    $scope.openEditModal = function (str, index, id) {
        var tempUrl;
        $scope.currentData = {};
        if (str == 'Students') {
            $scope.index = index;
            var name = $scope.Students[index].name;            
            var bloodgroup = $scope.Students[index].bloodgroup;
            var email = $scope.Students[index].email;
            var phone = $scope.Students[index].phone;
            var dob = $scope.Students[index].dob;
            $scope.currentData = {
                name: name,                
                bloodgroup: bloodgroup,
                email: email,
                phone: phone,
                dob: dob
            };
            $scope.items = $scope.currentData;
            $scope.forDiscardEmpChange = $scope.Students;
            $scope.Students[index] = $scope.currentData;
            $("#editStudentTemplate").modal('show');
            
        } else if (str == 'staffs') {
            var staff = $scope.staffs[index].staff;
            var dept = $scope.staffs[index].dept;
            var experience = $scope.staffs[index].experience;
            var bookreferal = $scope.staffs[index].bookreferal;
            $scope.currentData = {
                staff: staff,
                dept: dept,
                experience: experience,
                bookreferal: bookreferal
            };
            $scope.items = $scope.currentData;
            $scope.staffs[index] = $scope.currentData;
            $("#editstaffTemplate").modal('show');
        } else if (str == 'subject') {
            var subject = $scope.subject[index].subject;
            var year = $scope.subject[index].year;
            var bookreferal = $scope.subject[index].bookreferal;
            var staff = $scope.subject[index].staff;

            $scope.currentData = {
                subject: subject,
                year: year,
                bookreferal: bookreferal,
                staff: staff
            };
            $scope.items = $scope.currentData;
            $scope.subject[index] = $scope.currentData;
            $("#editTechnologyTemplate").modal('show');
        }
    };

    $scope.updateRecord = function(){
        $(".modal").modal('hide');
        $scope.alertClass = "success";
            $scope.alertText = "The record has been updated successfully";
            jQuery("#multiPurposeAlert").slideDown();

            setTimeout(function () {
                jQuery("#multiPurposeAlert").slideUp();
            }, 4000);
    }

    $scope.discardUpdate = function () {
      $(".modal").modal('hide');
      var httpRequest = $http({
           method: 'POST',
           url: '/api/mainData.json'
       }).success(function(data, status) {
           $scope.wholeData = data;
           $scope.users = $scope.wholeData.users;
           $scope.Students = $scope.wholeData.Students;
           $scope.staffs = $scope.wholeData.staffs;
           $scope.subject = $scope.wholeData.subject;
       });
    };
}]);
