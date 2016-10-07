Angular Google GAPI Auth
=======================

The easiest way to use Google GAPI Auth with angularJS. This module use [Google APIs Client Library for JavaScript](https://developers.google.com/api-client-library/javascript/)

## Requirements

- [Angular.js](http://angularjs.org)

## Installation

Download the [latest release](https://github.com/yvesroos/angular-gapi-auth/releases)

```html
<script type="text/javascript" src="/angular-gapi-auth/dist/angular-gapi-auth.min.js"></script>
```
### Add dependency

```javascript
var app = angular.module('myModule', ['angular-gapi-auth']);
```

## Configuration

add config in root module

```javascript
app.config(['GAuthProvider', function(GAuthProvider){
  GAuthProvider.apiKey('API KEY');
  GAuthProvider.clientId('CLIENT ID');
  GAuthProvider.scopes = ['https://www.googleapis.com/auth/gmail.readonly',
                          'https://www.googleapis.com/auth/gmail.compose',
                          'https://www.googleapis.com/auth/gmail.insert',
                          'https://www.googleapis.com/auth/gmail.labels',
                          'https://www.googleapis.com/auth/gmail.modify',
                          'https://www.googleapis.com/auth/gmail.send'];
  GAuthProvider.loginOnLoad(true);
}]);
```

## Use

```javascript
app.controller('myController', ['$scope', 'GAuth',
    function myController($scope, GAuth) {
      $scope.login = function(){
        GAuth.login().then(function(){
          console.log('logged');
        });
      }

      $scope.logout = function(){
        GAuth.logout().then(function(){
          console.log('quitted :,(');
        });
      }

      $scope.verifyStatus = function(){
        if(GAuth.isAuthenticated()) alert('LOGGED');
        else alert('NOT YET');
      }

      $scope.getToken = function(){
        alert(GAuth.getToken());
      }
    }
]);
```

## TODO

- [ ] Implement all GAPI services
- [ ] get user info
