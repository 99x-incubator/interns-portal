(function() {
    'use strict';

    angular.module('BlurAdmin.pages.register')
        .controller('internRegCtrl', internRegCtrl);

    /** @ngInject */
    function internRegCtrl($scope, $http, $state, $rootScope, toastr, printService) {

        console.log(IG);

        $scope.data = {
            'generalInfo': {},
            'contactInfo': {},
            'eduInsInfo': {},
            'internshipInfo': {}
        };

        $scope.state = $state.current.name;

        $scope.submitform = function() {
            //crate new intern in DynamoDB
            $scope.createNewIntern($scope.data.generalInfo, $scope.data.contactInfo, $scope.data.eduInsInfo, $scope.data.internshipInfo);


        };

        $scope.createNewIntern = function(generalInfo, contactInfo, eduInsInfo, internshipInfo) {

            // create json for store user dataEmail
            var data = {
                "id": contactInfo.email,
                "firstname": generalInfo.firstName,
                "fullname": generalInfo.fullName,
                "lastname": generalInfo.LastName,
                "mobile": contactInfo.mobile,
                "status": "active",
                "instInfo": eduInsInfo,
                "intshpInfo": internshipInfo,
                "tel": contactInfo.contactHome,
                "address": contactInfo.address,
                "nic": generalInfo.nic,
                "email": contactInfo.email,
                "startdate": convertDate(String(internshipInfo.startDate)),
                "enddate": convertDate(String(internshipInfo.endDate)),
                "projects": {}
            };

            console.log(data);
            var stat = {
                'status': 'admin'
            };
            data = angular.merge(data, stat);
            $http({
                method: 'POST',
                url: IG.api + 'users/createUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then(function successCallback(response) {

                if (response.data.status === "success") {
                    //create new Intern in Cognito DB
                    $scope.signUp($scope.data.contactInfo.email, $scope.data.contactInfo.email, "99Xt@intern");
                    toastr.success('Your information has been saved successfully!');

                } else {
                    toastr.error(response.data.status);
                }
            }, function errorCallback(response) {
                toastr.error(response.data);
            });

        };

        $scope.signUp = function(email, username, password) {

            AWSCognito.config.region = IG.cognitoConfigRegion;

            var poolData = {
                UserPoolId: IG.cognitoUserPoolId,
                ClientId: IG.cognitoClientId
            };

            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

            var attributeList = [];

            var attributes = [{
                Name: 'email',
                Value: email
            }, {
                Name: 'profile',
                Value: '/'
            }, {
                Name: 'name',
                Value: 'ADMIN'
            }];

            _.each(attributes, function(attribute) {
                attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute));
            });

            userPool.signUp(username, password, attributeList, null, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            });
        };
        $scope.formdata = {};

        $scope.submitted = 'true'; //for form validation
        $scope.reset = function() {
            $scope.submitted = false;

            $scope.formdata = {};
        };

        $scope.University = ["UCSC", "UOM-CSE", "UOM-IT", "University of Kelaniya", "Uva Wellassa University", "University of Rajarata", "University of Peradeniya", "University of Jaffna", "SLIIT", "IIT", "APIIT", "Sabaragamuwa University", "Sri Jayawardanapura University", "Northshore College of Business and Technology", "University of Wayamba", "Auston University", "General Sir John Kotelawala Defence University", "NSBM", "Umea University–Sweden"];
        $scope.addInterviewee = function() {

            $scope.formdata.id = $scope.formdata.email;
            var status = {
                'status': 'interviewed'
            };
            $scope.formdata = angular.merge($scope.formdata, status);
            $http.post(IG.api + 'users/createUser', $scope.formdata).then(function(response) {
                if (response.data.status === "success") {
                    $scope.reset();
                    toastr.success("User added successfully");
                } else {
                    toastr.error("Unable to add user");
                }
            });
        };
    }

    function convertDate(input) {
        var date = input.split(" ");

        var mnths = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        };

        return [date[3], mnths[date[1]], date[2]].join("-");
    }


})();
