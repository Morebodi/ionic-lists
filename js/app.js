/**
@credits due Asim at Code Craft, my Ionic instructor in Udemy
*/
(function () {
    var app = angular.module('soundboard', ['ionic']);

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

    app.controller('SoundBoardCtrl', function ($scope, $window) {

        $scope.media = null;

        $scope.model = {
            showDelete: false,
            showMove: false,
            sounds: [
                {
                    'title': 'Lion',
                    'image': 'img/animals/lion-icon.png',
                    'desc': 'Lion roaw',
                    'file': '/sounds/lion.wav'
            },
                {
                    'title': 'Chimpanzee',
                    'image': 'img/animals/chimpazee.gif',
                    'desc': 'Chimpanzee',
                    'file': '/sounds/chimpazee.wav'
            },
                {
                    'title': 'Hawk',
                    'image': 'img/animals/hawk_icon.jpg',
                    'desc': 'Hawk',
                    'file': '/sounds/hawk.wav'
            },
                {
                    'title': 'Tiger',
                    'image': 'img/animals/tiger_icon.jpg',
                    'desc': 'Tiger growl',
                    'file': '/sounds/tiger.wav'
            },
                {
                    'title': 'Elephant',
                    'image': 'img/animals/elephant.ico',
                    'desc': 'Elephant trumpeting',
                    'file': '/sounds/elephant.wav'
            },
                {
                    'title': 'Cow',
                    'image': 'img/animals/cow-icon.png',
                    'desc': 'Mooo',
                    'file': '/sounds/cow.mp3'
			},
                {
                    'title': 'Dolphin',
                    'image': 'img/animals/dolphin-icon.png',
                    'desc': 'Whistle',
                    'file': '/sounds/dolphin.mp3'
			},
                {
                    'title': 'Frog',
                    'image': 'img/animals/frog-icon.png',
                    'desc': 'Croak',
                    'file': '/sounds/frog.mp3'
			},
                {
                    'title': 'Bird',
                    'image': 'img/animals/bird-icon.png',
                    'desc': 'Chirp',
                    'file': '/sounds/bird.mp3'
			},
                {
                    'title': 'Pig',
                    'image': 'img/animals/pig-icon.png',
                    'desc': 'Oink',
                    'file': '/sounds/pig.mp3'
			},
                {
                    'title': 'Dog',
                    'image': 'img/animals/puppy-icon.png',
                    'desc': 'Bark',
                    'file': '/sounds/dog.mp3'
			},
                {
                    'title': 'Cat',
                    'image': 'img/animals/black-cat-icon.png',
                    'desc': 'Meow',
                    'file': '/sounds/cat.mp3'
			}
		]
        };

        //delete sounds on the list
        $scope.deleteSound = function ($index) {
            $scope.model.sounds.splice($index, 1);
        };

        //reorder elements on the list
        $scope.moveSound = function (sound, fromIndex, toIndex) {
            $scope.model.sounds.splice(fromIndex, 1);
            $scope.model.sounds.splice(toIndex, 0, sound);
        };

        //play sounds when user clicks on list-item
        $scope.play = function (sound) {
            //prevent sound from playing over each other
            if ($scope.media) {
                $scope.media.pause();
            }
            //for playing sound on the actual device
            if ($window.cordova) {

                ionic.Platform.ready(function () {

                    var src = sound.file;

                    if (ionic.Platform.is('android')) {
                        src = '/android_asset/www' + src;
                        console.log(src);
                    }
                    $scope.media = new $window.Media(src);
                    $scope.media.play();
                });
            } else {
                $scope.media = new Audio();
                $scope.media.src = sound.file;
                $scope.media.load();
                $scope.media.play();
            }
        };
    })
}());