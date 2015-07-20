angular.module('starter.controllers', ['ngCordova'])
.controller('OldNum', function($scope, $state) {
	$scope.hymnNum = "";
	$scope.numberButton = function(num) {
    	if ($scope.hymnNum.length<3 && $scope.hymnNum+num<704){
    		$scope.hymnNum = $scope.hymnNum+num;
    	}
  	}
  	$scope.hymnNumberClear = function() {
  		$scope.hymnNum = "";
  	}
  	$scope.hymnNumberDelete = function() {
  		$scope.hymnNum = $scope.hymnNum.substring(0, $scope.hymnNum.length - 1);
  	}
  	$scope.hymnNumberGo = function() {
  		if ($scope.hymnNum!='' && $scope.hymnNum>0){
  			$state.go('tab.old-num-detail',{"number":$scope.hymnNum, "version":"oldNum"});
				$scope.hymnNum='';
  		}
  	}
})
.controller('NewNum', function($scope, $state) {
	$scope.hymnNum = "";
	$scope.numberButton = function(num) {
    	if ($scope.hymnNum.length<3 && $scope.hymnNum+num<696){
    		$scope.hymnNum = $scope.hymnNum+num;
    	}
  	}
  	$scope.hymnNumberClear = function() {
  		$scope.hymnNum = "";
  	}
  	$scope.hymnNumberDelete = function() {
  		$scope.hymnNum = $scope.hymnNum.substring(0, $scope.hymnNum.length - 1);
  	}
  	$scope.hymnNumberGo = function() {
  		if ($scope.hymnNum!='' && $scope.hymnNum>0){
  			$state.go('tab.new-num-detail',{"number":$scope.hymnNum, "version":"newNum"});
				$scope.hymnNum='';
  		}
  	}
})
.controller('OldList', function($scope, hymnIndexFactory) {
          $scope.data ={};
          $scope.data.searchQuery = "";
          $scope.hymns = [];
          $scope.hymns=hymnIndexFactory.allOld();

          $scope.clearSearch = function() {
		    $scope.data.searchQuery = "";
		  };
})
.controller('NewList', function($scope, hymnIndexFactory) {
          $scope.data ={};
          $scope.data.searchQuery = "";
          $scope.hymns = [];
          $scope.hymns=hymnIndexFactory.allNew();

          $scope.clearSearch = function() {
		    $scope.data.searchQuery = "";
		  };
})
.controller('NewHymnsDetailCtrl', function($scope, $sce, $stateParams, hymnIndexFactory, $cordovaMedia, $ionicLoading, $state, $ionicHistory,  $ionicPlatform){
  	hymn = hymnIndexFactory.getNew($stateParams.number);
		$scope.hymn=hymn;
	$scope.hymn.isPrevDisabled=$stateParams.isPrevDisabled;
	$scope.hymn.isNextDisabled=$stateParams.isNextDisabled;
	if($scope.hymn.number==1){
	$scope.hymn.isPrevDisabled="true";
	}else if(($scope.hymn.number>702) && ($stateParams.version=='oldList' || $stateParams.version == 'oldNum')){$scope.hymn.isNextDisabled="true";}
	else if(($scope.hymn.number>694) && ($stateParams.version=='newList' || $stateParams.version == 'newNum')){$scope.hymn.isNextDisabled="true";}

   	if(hymn.body.constructor.name!="TrustedValueHolderType"){
  		$scope.hymn.body = $sce.trustAsHtml(hymn.body);
	}
	$scope.skip = function(nextPrev) {
		if(nextPrev=='next'){
			$scope.hymn.number+=1;
		}else if(nextPrev=='prev'){
			$scope.hymn.number-=1;
		}

		$ionicHistory.currentView($ionicHistory.backView());

		if ($scope.hymn.number<2){
			$scope.hymn.isPrevDisabled="true";
			$scope.hymn.isNextDisabled="false";
		}else if($scope.hymn.number>702 && ($stateParams.version=='oldList' || $stateParams.version == 'oldNum')){
			$scope.hymn.isPrevDisabled="false";
			$scope.hymn.isNextDisabled="true";
		}else if($scope.hymn.number>694 && ($stateParams.version=='newList' || $stateParams.version == 'newNum')){
			$scope.hymn.isPrevDisabled="false";
			$scope.hymn.isNextDisabled="true";
		}else{
			$scope.hymn.isPrevDisabled="false";
			$scope.hymn.isNextDisabled="false";
		}


			switch($stateParams.version) {
			case "oldNum":
			$scope.hymn.isPrevDisabled;
			$scope.hymn.isNextDisabled;
					$state.go('tab.old-num-detail',
										{"number":$scope.hymn.number, "version":"oldNum", "isPrevDisabled":$scope.hymn.isPrevDisabled, "isNextDisabled":$scope.hymn.isNextDisabled},
										{location: 'replace'});
					break;
			case "newNum":
					$state.go('tab.new-num-detail',
										{"number":$scope.hymn.number, "version":"newNum", "isPrevDisabled":$scope.hymn.isPrevDisabled, "isNextDisabled":$scope.hymn.isNextDisabled},
										{location: 'replace'});
					break;
			case "oldList":
					$state.go('tab.old-list-detail',{"number":$scope.hymn.number, "version":"oldList"},{location: 'replace'});
					break;
			case "newList":
					$state.go('tab.new-list-detail',{"number":$scope.hymn.number, "version":"newList"},{location: 'replace'});
					break;
			default:
					//default code block
			}

	}
	 //$scope.play = function(hymnNum) {
    	//var src =  cordova.file.applicationDirectory + 'www/media/midi/'+('000' + hymnNum).substr(-3)+'.mid';

    	//var src_mid ="http://173.230.135.45/uploads/001.mid";
      //MidiPlayer.setup(src.substring(7), Array.apply(null, Array(120)).map(function (_, i) {return i;}), null, mediaStatusCallback);
		  var media=null;

     $scope.play = function(hymnNum){
        var src_mp3 = 'https://hymnsoldandnew.s3.amazonaws.com/16bitmp3/'+('000'+hymnNum).substr(-3)+'.mp3';//http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3';
        if(!media){media = new Media(src_mp3,null,null,mediaStatusCallback);}
        media.play();
     }
     $scope.pause = function(){
        media.pause();
     }
     $scope.stop = function(){
     	  media.stop();
     }

    var mediaStatusCallback = function(status) {
      $ionicLoading.show({template: 'Loading...'});
        if(status == 1) {
            $ionicLoading.show({template: 'Loading...'});
        } else {
            $ionicLoading.hide();
						$ionicLoading.show({template: 'Loading n e ways...'});
        }
    }
})
.controller('OldHymnsDetailCtrl', function($scope, $sce, $state, $stateParams, hymnIndexFactory, $cordovaMedia, $ionicLoading, $ionicHistory, $ionicPlatform){
  	hymn = hymnIndexFactory.getOld($stateParams.number);
   	$scope.hymn=hymn;
		$scope.hymn.isPrevDisabled=$stateParams.isPrevDisabled;
		$scope.hymn.isNextDisabled=$stateParams.isNextDisabled;
		if($scope.hymn.number==1){
		$scope.hymn.isPrevDisabled="true";
		}else if(($scope.hymn.number>702) && ($stateParams.version=='oldList' || $stateParams.version == 'oldNum')){$scope.hymn.isNextDisabled="true";}
		else if(($scope.hymn.number>694) && ($stateParams.version=='newList' || $stateParams.version == 'newNum')){$scope.hymn.isNextDisabled="true";}

   	if(hymn.body.constructor.name!="TrustedValueHolderType"){
  		$scope.hymn.body = $sce.trustAsHtml(hymn.body);
		}

	$scope.skip = function(nextPrev) {
		if(nextPrev=='next'){
			$scope.hymn.number+=1;
		}else if(nextPrev=='prev'){
			$scope.hymn.number-=1;
		}

		$ionicHistory.currentView($ionicHistory.backView());

		if ($scope.hymn.number<2){
			$scope.hymn.isPrevDisabled="true";
			$scope.hymn.isNextDisabled="false";
		}else if($scope.hymn.number>702 && ($stateParams.version=='oldList' || $stateParams.version == 'oldNum')){
			$scope.hymn.isPrevDisabled="false";
			$scope.hymn.isNextDisabled="true";
		}else if($scope.hymn.number>694 && ($stateParams.version=='newList' || $stateParams.version == 'newNum')){
			$scope.hymn.isPrevDisabled="false";
			$scope.hymn.isNextDisabled="true";
		}else{
			$scope.hymn.isPrevDisabled="false";
			$scope.hymn.isNextDisabled="false";
		}


			switch($stateParams.version) {
	    case "oldNum":
			$scope.hymn.isPrevDisabled;
			$scope.hymn.isNextDisabled;
					$state.go('tab.old-num-detail',
										{"number":$scope.hymn.number, "version":"oldNum", "isPrevDisabled":$scope.hymn.isPrevDisabled, "isNextDisabled":$scope.hymn.isNextDisabled},
										{location: 'replace'});
	        break;
	    case "newNum":
					$state.go('tab.new-num-detail',
										{"number":$scope.hymn.number, "version":"newNum", "isPrevDisabled":$scope.hymn.isPrevDisabled, "isNextDisabled":$scope.hymn.isNextDisabled},
										{location: 'replace'});
	        break;
			case "oldList":
					$state.go('tab.old-list-detail',{"number":$scope.hymn.number, "version":"oldList"},{location: 'replace'});
	        break;
			case "newList":
					$state.go('tab.new-list-detail',{"number":$scope.hymn.number, "version":"newList"},{location: 'replace'});
					break;
	    default:
	        //default code block
			}

	}
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
