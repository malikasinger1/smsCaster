angular.module("starter")
  .controller("sendSmsController", function ($scope, $cordovaSms,$cordovaToast, dataService) {

    $scope.data = {};
    $scope.isBreak = false;



    $scope.send = function(){

      if($scope.isBreak){
        return;
      }

      var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          //intent: 'INTENT'  // send SMS with the native android SMS messaging
          intent: '' // send SMS without open any other app
        }
      };

      $scope.data.count--;

      $cordovaSms
        .send($scope.data.mobileNumber, $scope.data.text, options)
        .then(function () {
          console.log("// Success! SMS was sent");

          $cordovaToast.showShortBottom("Success! SMS was sent. Remaining: " + $scope.data.count);

          $scope.data.mobileNumber++;
          if ($scope.data.count) {

            $scope.send();

          }
        }, function (error) {
          console.log("// An error occurred");
          $cordovaToast.showShortBottom("Massage sending failed. Remaining: " + $scope.data.count);

          // An error occurred
          $scope.data.mobileNumber++;
          if ($scope.data.count) {

            $scope.send();

          }
        });
    };


    $scope.stopSending = function(){
      $scope.isBreak = true;
      console.log("stop attempted");
      setTimeout(function(){
        $scope.isBreak = false;
      },3000);

    }

});
