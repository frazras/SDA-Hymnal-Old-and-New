ion-index-scroll
================

> Configurable Ionic directive for an indexed list with a configurable scroll bar.

#Table of contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Advanced Usage](#advanced-usage)
- [Issues](#issues)
- [Acknowledgements](#acknowledgements)
- [License](#license)

# Demo

![Animated demo](https://github.com/billsanto/ion-index-scroll/blob/master/demo.gif)

To install the library embedded in a fully functioning demo, please see https://github.com/billsanto/ion-index-scroll-demo
# Installation

1. Use bower to install the new module.  For reference, http://bower.io/docs/api/#install:
```bash
bower install https://github.com/billsanto/ion-index-scroll.git --save
```
2. Import the `ion-index-scroll` javascript and css file into your HTML file:
```html
<script src="bower_components/ion-index-scroll/dist/ion-index-scroll.js"></script>
<link href="bower_components/ion-index-scroll/dist/ion-index-scroll.css" rel="stylesheet">
```
3. Add `ion-index-scroll` as a dependency on your Ionic app:
```javascript
angular.module('myApp', [
  'ionic',
  'ion-index-scroll'
]);
```

# Usage

To use the `ion-index-scroll` directive simply add the following snippet to your template:
```html
<ion-index-scroll ng-model="model" sort-key="keyName" display-key="displayKeyName" num-display-chars="int" use-complete-alphabet="true" subheader="true">
  Content Goes here...
</ion-index-scroll>
```
where
  'ng-model' is the model you would like to sort
  'sort-key' is the name of the key you would like to sort by.
  'display-key' is the name of the value displayed in both the sidebar and headers.
  'num-display-chars' is an optional integer value from 1 to 3 which constrains the number of characters used in the display key.  Default = 1.
  'use-full-alphabet' is optional, and when set to "true", displays the full range of 26 alphabet characters in the scrollbar, and num-display-chars is overridden to equal 1.
  'subheader' is optional, to be set if using a subheader in the view to allow proper scroll height.

For most use cases, 'sort-key' and 'display-key' will be equivalent, in which case only one need be specified.  However, in some scenarios, one may wish to sort by a hidden value which differs from the displayed value.  An example of this behavior is provided.

To display the properties of each item in the model, you can use the 'item' object within the directive:
```html
	<ion-index-scroll ng-model="model" sort-key="keyName">
	  <div>Name: {{item.name}}</div>
	  <div>Address: {{item.address}}</div>
	</ion-index-scroll>
```

Here is a simple example:

services.js
```javascript
angular.module('starter.services', [])

    .factory('Contacts', function () {

        // Some fake testing data
        var contacts = [
                {
                    id: 0,
                    name: 'Cow Bells',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
                }, {
                    id: 1,
                    name: 'Hopdoddy Bar',
                    address: '123 Fake St.',
                    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
                }, {
                    id: 2,
                    name: 'Freddie\'s Place',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
                }, {
                    id: 3,
                    name: 'Franklin BBQ',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
                }, {
                    id: 4,
                    name: 'Soco Burgers',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
                }, {
                    id: 5,
                    name: 'Sandy\'s Burgers',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
                }, {
                    id: 6,
                    name: 'Wholly Cow',
                    address: '123 Fake St.',
                    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
                }, {
                    id: 7,
                    name: 'Uncle Billy\'s',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
                }, {
                    id: 8,
                    name: 'P Terrys',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
                }, {
                    id: 9,
                    name: 'Shake Shack',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'

                }, {
                    id: 10,
                    name: 'Five Guys',
                    address: '123 Fake St.',
                    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
                }
            ]
            ;


        return {
            all: function () {
                return contacts;
            },
            remove: function (contact) {
                contacts.splice(contacts.indexOf(contact), 1);
            },
            get: function (contactId) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id === parseInt(contactId)) {
                        return contacts[i];
                    }
                }
                return null;
            }
        };
    });
```

controllers.js
```javascript
angular.module('starter.controllers', [])
    .controller('ContactsCtrl', ['$scope', 'Contacts', function ($scope, Contacts) {
        $scope.contacts = Contacts.all();
    }])
    ;
```

contacts-list.html
```html
<ion-view view-title="Contacts">
    <ion-content>
        <ion-alpha-scroll ng-model="contacts" sort-key="name">
            <div>{{item.name}}</div>
            <div>{{item.address}}</div>
        </ion-alpha-scroll>
    </ion-content>
</ion-view>
```
# Advanced Usage

A more complex example follows, where the sort key differs from the displayed key.  Specifically, we sort by the hidden "position" key, which represents the natural ordering.
However, the scroll index is represented by one of the four primary or permanent keys representing the common nomenclature, but having no consistent ordering behavior.  Also, note that selecting one of primary keys will not display a list or header element when the values are empty:

services.js
```javascript
angular.module('starter.services', [])
   .factory('Teeth', function () {
        var teeth = [
            {
                position: 1,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '',
                primaryUniversal: '',
                primaryDescription: '',
                permanentFdi: '18',
                permanentUniversal: '1',
                permanentDescription: 'Third Molar'
            }, {
                position: 2,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '',
                primaryUniversal: '',
                primaryDescription: '',
                permanentFdi: '17',
                permanentUniversal: '2',
                permanentDescription: 'Second Molar'
            }, {
                position: 3,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '',
                primaryUniversal: '',
                primaryDescription: '',
                permanentFdi: '16',
                permanentUniversal: '3',
                permanentDescription: 'First Molar'
            }, {
                position: 4,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '55',
                primaryUniversal: 'A',
                primaryDescription: 'Second Molar',
                permanentFdi: '15',
                permanentUniversal: '4',
                permanentDescription: 'Second Premolar'
            }, {
                position: 5,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '54',
                primaryUniversal: 'B',
                primaryDescription: 'First Molar',
                permanentFdi: '14',
                permanentUniversal: '5',
                permanentDescription: 'First Premolar'
            }, {
                position: 6,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '53',
                primaryUniversal: 'C',
                primaryDescription: 'Canine',
                permanentFdi: '13',
                permanentUniversal: '6',
                permanentDescription: 'Canine'
            }, {
                position: 7,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '52',
                primaryUniversal: 'D',
                primaryDescription: 'Lateral Incisor',
                permanentFdi: '12',
                permanentUniversal: '7',
                permanentDescription: 'Lateral Incisor'
            }, {
                position: 8,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Right',
                primaryFdi: '51',
                primaryUniversal: 'E',
                primaryDescription: 'Central Incisor',
                permanentFdi: '11',
                permanentUniversal: '8',
                permanentDescription: 'Central Incisor'
            }, {
                position: 9,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '61',
                primaryUniversal: 'F',
                primaryDescription: 'Central Incisor',
                permanentFdi: '21',
                permanentUniversal: '9',
                permanentDescription: 'Central Incisor'
            }, {
                position: 10,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '62',
                primaryUniversal: 'G',
                primaryDescription: 'Lateral Incisor',
                permanentFdi: '22',
                permanentUniversal: '10',
                permanentDescription: 'Lateral Incisor'
            }, {
                position: 11,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '63',
                primaryUniversal: 'H',
                primaryDescription: 'Canine',
                permanentFdi: '23',
                permanentUniversal: '11',
                permanentDescription: 'Canine'
            }, {
                position: 12,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '64',
                primaryUniversal: 'I',
                primaryDescription: 'First Molar',
                permanentFdi: '24',
                permanentUniversal: '12',
                permanentDescription: 'First Premolar'
            }, {
                position: 13,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '65',
                primaryUniversal: 'J',
                primaryDescription: 'Second Molar',
                permanentFdi: '25',
                permanentUniversal: '13',
                permanentDescription: 'Second Premolar'
            }, {
                position: 14,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '',
                primaryUniversal: '',
                primaryDescription: '',
                permanentFdi: '26',
                permanentUniversal: '14',
                permanentDescription: 'First Molar'
            }, {
                position: 15,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '',
                primaryUniversal: '',
                primaryDescription: '',
                permanentFdi: '27',
                permanentUniversal: '15',
                permanentDescription: 'Second Molar'
            }, {
                position: 16,
                arch: 'maxillary',
                quadrant: 1,
                quadrantDescription: 'Upper Left',
                primaryFdi: '',
                primaryUniversal: '',
                primaryDescription: '',
                permanentFdi: '28',
                permanentUniversal: '16',
                permanentDescription: 'Third Molar'
            }
        ];

        return {
            all: function () {
                return teeth;
            },

            ids: function (dentitionAge, dentitionLocale) {
                var returnArray = [];

                function arraysIdentical(a, b) {
                    var i = a.length;

                    if (i != b.length) return false;

                    while (i--) {
                        if (a[i] !== b[i]) return false;
                    }
                    return true;
                }

                for (var t in teeth) {
                    if (arraysIdentical(['primary', 'fdi'], [dentitionAge, dentitionLocale])) {
                        returnArray.push(teeth[t].primaryFdi);
                    }
                    else if (arraysIdentical(['primary', 'universal'], [dentitionAge, dentitionLocale])) {
                        returnArray.push(teeth[t].primaryUniversal);
                    }
                    else if (arraysIdentical(['permanent', 'fdi'], [dentitionAge, dentitionLocale])) {
                        returnArray.push(teeth[t].permanentFdi);
                    }
                    else if (arraysIdentical(['permanent', 'universal'], [dentitionAge, dentitionLocale])) {
                        returnArray.push(teeth[t].permanentUniversal);
                    }
                    else {
                        console.log('Failed to map teeth notation from the arguments provided');
                        console.log('t = ', t, ', dentitionAge = ', dentitionAge, ', dentitionLocale = ', dentitionLocale);
                    }
                }

                return returnArray;
            },

            toothDescriptions: function (dentitionAge) {
                var returnArray = [];

                for (var t in teeth) {
                    switch (dentitionAge) {
                        case 'primary':
                            returnArray.push(teeth[t].primaryDescription);
                            break;
                        case 'permanent':
                            returnArray.push(teeth[t].permanentDescription);
                            break;

                        default:
                            console.log('Failed to map teeth descriptions from the arguments provided');
                    }
                }

                return returnArray;
            },

            maxIdLength: function (dentitionAge, dentitionLocale) {
                return (dentitionAge === 'primary' && dentitionLocale === 'universal') ? 1 : 2;
            }
        }
   }
)
;

```
controllers.js
```javascript
angular.module('starter.controllers', [])

    .controller('ContactsCtrl', ['$scope', 'Contacts', function ($scope, Contacts) {
        $scope.contacts = Contacts.all();
    }])
    .controller('TeethCtrl', ['$scope', 'Teeth', function ($scope, Teeth) {
        $scope.teeth = Teeth.all();
        $scope.toothIds = Teeth.ids('permanent', 'fdi');
        $scope.toothDescriptions = Teeth.toothDescriptions('permanent');
        $scope.maxIdLength = Teeth.maxIdLength('permanent', 'fdi');
    }])
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })
;
```

teeth-list.html
```html
<ion-view view-title="Teeth">
    <ion-content>
        <ion-index-scroll ng-model="teeth" sort-key="position" display-key="permanentFdi" num-display-chars="2">
            <div>{{item.permanentDescription}}</div>
        </ion-index-scroll>
    </ion-content>
</ion-view>
```

# Issues

Using the sidebar index with the full alphabet option can lead to hyperlinks to the first divider header when list elements do not exist for that index, rather than to the nearest logical divider.

# Acknowledgements

Initial inspiration and code taken from [this codepen](http://codepen.io/mikelucid/pen/mqzLc) by mikelucid.
Further adapted from https://github.com/aquint/ion-alpha-scroll by aquint.


# License

The Ionic index-scroll directive is available under the MIT license.
