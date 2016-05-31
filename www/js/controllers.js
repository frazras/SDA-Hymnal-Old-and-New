angular.module('starter.controllers', ['ngCordova'])
.factory('global', function($state, $ionicHistory, $ionicActionSheet, $ionicPopup, $stateParams, hymnIndexFactory, $rootScope, $ionicSettings) {
    var globalService = {};
	
	$rootScope.$on($ionicSettings.changed, function($event, changedSetting) {
        console.log(changedSetting.key + ' -> ' + changedSetting.value);
		if(changedSetting.key=='font'){
			angular.element(document).find('p').css('font-size','1.'+changedSetting.value+'em');
			angular.element(document).find('p').css('line-height','1.0'+changedSetting.value+'em');	
		}
    });
	
	$ionicSettings.init({
        /*awesomeSelection: {
            type: 'selection',
            values: ['one', 'two', 'three'],
            label: 'Awesome Selection',
            value: 'two'
        },*/
        font: {
			type: 'range',
			label: 'Font Size',
			iconLeft: 'icon-font-size small',
			iconRight: 'icon-font-size big',
			min: 1,
			max: 9,
			value: 5
    	},
    });
	
	globalService.feedback = function(){
		window.open('http://bit.ly/1JUk9BC', '_system');
	}
	globalService.github = function(){
		window.open('https://github.com/frazras/SDA-Hymnal-Old-and-New', '_system');
	}
	globalService.set = function(key, value) {
        $ionicSettings.set(key, value);
    };
    globalService.get = function(key) {
       return $ionicSettings.get(key);
    };
	globalService.getData = function() {
        return $ionicSettings.getData();
    };
	
		// An alert dialog
	globalService.showAlert = function(title, body) {
	var alertPopup = $ionicPopup.alert({
		title: title,
		template: body
	});
	alertPopup.then(function(res) {
		//alert action
	});
	};
	 // Triggered on a button click, or some other target
	globalService.donate = function() {
	// Show the action sheet
	var hideSheet = $ionicActionSheet.show({
		buttons: [
		{ text: '<b>Monthly</b> Donation' },
		{ text: 'One time Gift' }
		],
		titleText: 'You are free to leave a generous <b>donation</b> to help us with our development efforts',
		cancelText: 'Cancel',
		cancel: function() {
			// add cancel code..
			},
		buttonClicked: function(index) {
			console.log(index);
			if (index == 0){
				globalService.sub_cycle();
			}else{
				globalService.cycle();
			}
		return true;
		}
	});
	
	};
	
	globalService.cycle = function() {
	// Show the action sheet
	var cycleSheet = $ionicActionSheet.show({
		buttons: [
		{ text: '$1' },
		{ text: '$2' },
		{ text: '$5' },
		{ text: '$10' },
		{ text: '$20' },
		{ text: '$50' },
		{ text: '$100' },
		{ text: 'Other...' },
		],
		titleText: 'Choose the gift you are impressed to give',
		cancelText: 'Cancel',
		cancel: function() {
			// add cancel code..
			},
		buttonClicked: function(index) {
			switch(index) {
				case 0:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GQWQ5WTYMMXKA', '_system');
					break;
				case 1:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2UFZLBTGC5Y66', '_system');
					break;
				case 2:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=46YK8UZMLMMBS', '_system');
					break;
				case 3:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D7HEYU4RT6J9A', '_system');
					break;
				case 4:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4RH2HJN2V7AC2', '_system');
					break;
				case 5:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UFGHFEUTEU6W2', '_system');
					break;
				case 6:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E8T22BCTS62G8', '_system');
					break;
				case 7:
					window.open('http://bit.ly/1PAZqQ2', '_system');
					break;
			}
		return true;
		}
	});
	
	};
	
	
	globalService.sub_cycle = function() {
	// Show the action sheet
	var cycleSheet = $ionicActionSheet.show({
		buttons: [
		{ text: '$1' },
		{ text: '$2' },
		{ text: '$5' },
		{ text: '$10' },
		{ text: '$20' },
		{ text: '$50' },
		{ text: '$100' },
		],
		titleText: 'Choose the monthly recurrent gift you are impressed to give',
		cancelText: 'Cancel',
		cancel: function() {
			// add cancel code..
			},
		buttonClicked: function(index) {
			switch(index) {
				case 0:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NQZ3U3QGEZKBC', '_system');
					break;
				case 1:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QG6FKTMKK8WFU', '_system');
					break;
				case 2:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=APBU3ELUE8F42', '_system');
					break;
				case 3:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R2DRPQ47WGGWJ', '_system');
					break;
				case 4:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BED6UDNPG4C2C', '_system');
					break;
				case 5:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8A3RXGNRJEUQC', '_system');
					break;
				case 6:
					window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HJDGSUTP7PY6G', '_system');
					break;
			}
		return true;
		}
	});
	}
	
	globalService.skip = function(nextPrev) {
		var hymnum = parseInt($stateParams.number,10);
		if(nextPrev=='next'){
			hymnum+=1;
		}else if(nextPrev=='prev'){
			hymnum-=1;
		}
		hymn = hymnIndexFactory.getOld(hymnum);
		$ionicHistory.currentView($ionicHistory.backView());

		if (hymn.number<2){
			hymn.isPrevDisabled="true";
			hymn.isNextDisabled="false";
		}else if(hymn.number>702 && ($stateParams.version=='oldList' || $stateParams.version == 'oldNum')){
			hymn.isPrevDisabled="false";
			hymn.isNextDisabled="true";
		}else if(hymn.number>694 && ($stateParams.version=='newList' || $stateParams.version == 'newNum')){
			hymn.isPrevDisabled="false";
			hymn.isNextDisabled="true";
		}else{
			hymn.isPrevDisabled="false";
			hymn.isNextDisabled="false";
		}
 
		switch($stateParams.version) {
	    case "oldNum":
			hymn.isPrevDisabled;
			hymn.isNextDisabled;
					$state.go('tab.old-num-detail',
										{cache: false, "number":hymn.number, "version":"oldNum", "isPrevDisabled":hymn.isPrevDisabled, "isNextDisabled":hymn.isNextDisabled},
										{location: 'replace'});
	        break;
	    case "newNum":
					$state.go('tab.new-num-detail',
										{cache: false, "number":hymn.number, "version":"newNum", "isPrevDisabled":hymn.isPrevDisabled, "isNextDisabled":hymn.isNextDisabled},
										{location: 'replace'});
	        break;
			case "oldList":
					$state.go('tab.old-list-detail',
										{cache: false, "number":hymn.number, "version":"oldList", "isPrevDisabled":hymn.isPrevDisabled, "isNextDisabled":hymn.isNextDisabled},
										{location: 'replace'});
	        break;
			case "newList":
					$state.go('tab.new-list-detail',
										{cache: false, "number":hymn.number, "version":"newList", "isPrevDisabled":hymn.isPrevDisabled, "isNextDisabled":hymn.isNextDisabled},
										{location: 'replace'});
					break;
	    default:
	        //default code block
			}

	}
	
    return globalService;
})
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
.controller('Settings', function($scope, $state, global, $ionicSettings) {

	$scope.feedback = global.feedback;
	$scope.donate = global.donate;
	$scope.github = global.github;
	$scope.get = global.get;
	$scope.set = global.set;
	
	var deploy = new Ionic.Deploy();
	// Update app code with new release from Ionic Deploy
	$scope.doUpdate = function() {
		deploy.update().then(function(res) {
		global.showAlert('SDA Hymnal Old & New has Updated Successfully! ', res);
		}, function(err) {
		global.showAlert('SDA Hymnal Old & New: Update error! ', err);
		}, function(prog) {
		console.log('SDA Hymnal Old & New: Progress... ', prog);
		});
	};
	
	// Check Ionic Deploy for new code
	$scope.checkForUpdates = function() {
		console.log('SDA Hymnal Old & New is Checking for updates...');
		deploy.check().then(function(hasUpdate) {
			if (hasUpdate) {
				global.showAlert('SDA Hymnal Old & New has an Update available');
			}else{
				global.showAlert('There are no updates available for SDA Hymnal Old & New');
			}
		$scope.hasUpdate = hasUpdate;
		}, function(err) {
		global.showAlert('SDA Hymnal Old & New is Unable to check for updates', err);
		});
	}
	$scope.data = { 'size' : '1' };
	$scope.fontSize = function(newsize) {
		 debugger;
		angular.element(document).find('p').css('font-size','1.'+$scope.data.size+'em');
		angular.element(document).find('p').css('line-height','1.'+$scope.data.size+'em');
		//global.showAlert('boomy');
	};
	
	
	//console.log($ionicSettings.get(myRange));
	//$scope.fontSize($scope.get(myRange));
	
})
	
.controller('NewNum', function($scope, $state) {
	console.log("newnum tab loaded");
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
.controller('OldList', function($scope, hymnIndexFactory, $ionicFilterBar, $filter) {
          $scope.data ={};
          $scope.data.searchQuery = "";
          $scope.hymns = [];
          $scope.hymns=hymnIndexFactory.allOld();
					$scope.showFilterBar = function () {
			      filterBarInstance = $ionicFilterBar.show({
			        items: $scope.hymns,
			        update: function (filteredItems) {
								$scope.hymns = filteredItems;
			        },
							filter:$filter('filterPunctuation')
			      });
			    };
          $scope.clearSearch = function() {
		    		$scope.data.searchQuery = "";
		  		};
})
.controller('NewList', function($scope, hymnIndexFactory, $ionicFilterBar, $filter) {
          $scope.data ={};
          $scope.data.searchQuery = "";
          $scope.hymns = [];
          $scope.hymns=hymnIndexFactory.allNew();
					$scope.showFilterBar = function () {
			      filterBarInstance = $ionicFilterBar.show({
			        items: $scope.hymns,
			        update: function (filteredItems) {
								$scope.hymns = filteredItems;
			        },
							filter:$filter('filterPunctuation')
			      });
			    };
          $scope.clearSearch = function() {
		    $scope.data.searchQuery = "";
		  };
})
.controller('NewHymnsDetailCtrl', function($scope, global, $sce, $stateParams, hymnIndexFactory, $cordovaMedia, $ionicLoading, $state, $ionicHistory, $timeout, $ionicPlatform){
	var hymn = hymnIndexFactory.getNew($stateParams.number);
	$scope.hymn=hymn;
	$scope.hymn.isPrevDisabled=$stateParams.isPrevDisabled;
	$scope.hymn.isNextDisabled=$stateParams.isNextDisabled;
	if($scope.hymn.number==1){
	$scope.hymn.isPrevDisabled="true";
	}else if(($scope.hymn.number>702) && ($stateParams.version=='oldList' || $stateParams.version == 'oldNum')){$scope.hymn.isNextDisabled="true";}
	else if(($scope.hymn.number>694) && ($stateParams.version=='newList' || $stateParams.version == 'newNum')){$scope.hymn.isNextDisabled="true";}

   	if(hymn.body.constructor.name!="TrustedValueHolderType"){
  		$scope.hymn.bodyTrusted = $sce.trustAsHtml(hymn.body);
	}
	$scope.skip = global.skip;
	$scope.feedback = global.feedback;
	$scope.donate = global.donate;
	$scope.getData = global.getData;
	
	angular.element(document).ready(function () {
	global.getData();
		 //console.log(global.get('font'));
		angular.element(document).find('p').css('font-size','1.'+global.get('font')+'em');
		angular.element(document).find('p').css('line-height','1.'+global.get('font')+'em');	
	 
	});
		/* //$scope.play = function(hymnNum) {
    	//var src =  cordova.file.applicationDirectory + 'www/media/midi/'+('000' + hymnNum).substr(-3)+'.mid';

    	//var src_mid ="http://173.230.135.45/uploads/001.mid";
      //MidiPlayer.setup(src.substring(7), Array.apply(null, Array(120)).map(function (_, i) {return i;}), null, mediaStatusCallback);
		  var media=null;

     $scope.play = function(hymnNum){*/
        //var src_mp3 = 'https://hymnsoldandnew.s3.amazonaws.com/16bitmp3/'+('000'+hymnNum).substr(-3)+'.mp3';//http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3';
        //var src =  cordova.file.applicationDirectory + 'www/media/midi/'+('000' + hymnNum).substr(-3)+'.mid';
        //if(!media){media = new Media(src_mp3,null,null,mediaStatusCallback);}
        //media.play();
        /* MidiPlayer.setup(
            //MidiPlayer.getPathFromAsset("demo.mid"),
            src,
            ["1","2","3","4","5"], 
            function() {
                MidiPlayer.play();
            },
            function(data) {
                console.log("Error occured:", data) ;
            },
            function(data) {
                console.log("Status Updates: ", data) ;
            }
        );
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
    }*/
	
})
.controller('OldHymnsDetailCtrl', function($scope, $sce, $state, $stateParams, hymnIndexFactory, $cordovaMedia, $ionicLoading, $ionicHistory, $ionicPlatform, global){
  	hymn = hymnIndexFactory.getOld($stateParams.number);
   	$scope.hymn=hymn;
		$scope.hymn.isPrevDisabled=$stateParams.isPrevDisabled;
		$scope.hymn.isNextDisabled=$stateParams.isNextDisabled;
		if($scope.hymn.number==1){
		$scope.hymn.isPrevDisabled="true";
		}else if(($scope.hymn.number>702) && ($stateParams.version=='oldList' || $stateParams.version == 'oldNum')){$scope.hymn.isNextDisabled="true";}
		else if(($scope.hymn.number>694) && ($stateParams.version=='newList' || $stateParams.version == 'newNum')){$scope.hymn.isNextDisabled="true";}

   	if(hymn.body.constructor.name!="TrustedValueHolderType"){
  		$scope.hymn.bodyTrusted = $sce.trustAsHtml(hymn.body);
		}

	$scope.skip = global.skip;
	$scope.feedback = global.feedback;
	$scope.donate = global.donate;
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.filter('filterPunctuation', function() {
  return function(items, searchTerm) {
    if (!searchTerm || '' === searchTerm) {
      return items;
    }

    searchTerm = searchTerm.replace(/[^\w\s]|_/g, "").toLowerCase();

    return items.filter(function(element, index, array) {
      var title = element.title.replace(/(<([^>]+)>)/ig, "").replace(/[^\w\s]|_/g, "").toLowerCase();
      var body = element.body.replace(/(<([^>]+)>)/ig, "").replace(/[^\w\s]|_/g, "").toLowerCase();
      return (title.indexOf(searchTerm)>-1) || (body.indexOf(searchTerm)>-1);
    });
  }
}).controller(function($scope, $ionicActionSheet, $timeout) {


});
