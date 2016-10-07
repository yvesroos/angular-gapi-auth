(function(){
angular.module('angular-gapi',[])

angular.module('angular-gapi').provider("GAuth", function GAuthProvider(){
  var apiKey = '';
  var cliendId = '';
  var scopes = '';
  var loginOnLoad = false;

  this.apiKey = function(value){
    apiKey = !!value ? value : '';
  }

  this.clientId = function(value){
    clientId = !!value ? value : '';
  }

  this.scopes = function(value){
    scopes = !!value instanceof Array ? value.join(' ') : '';
  }

  this.loginOnLoad = function(value){
    loginOnLoad = +!!value
  }

  this.$get = ["$window", "$q", "$rootScope", function($window, $q, $rootScope){
    var auth2 = undefined;
    var asyncUrl = 'https://apis.google.com/js/api.js?onload=', onLoad = $q.defer();
    var exports = {};

    $window.globalGoogleAuthInitialized = function(){
      $rootScope.$emit('GoogleAuthLoaded');
      $window.gapi.load('client:auth2', googleAuthInitialized);
    }

    var asyncLoad = function(asyncUrl, callbackName) {
      var script = document.createElement('script');
      script.src = asyncUrl + callbackName;
      document.body.appendChild(script);
    };
    asyncLoad(asyncUrl, 'globalGoogleAuthInitialized');

    function googleAuthInitialized(){
      $rootScope.$emit('GoogleAuthInitialized');
      $window.gapi.client.setApiKey(apiKey);
      $window.gapi.auth2.init({
        client_id: clientId,
        scope: scopes
      }).then(googleAuthAuthenticated);
    }

    function googleAuthAuthenticated(){
      $rootScope.$emit('GoogleAuthAuthenticated');
      auth2 = gapi.auth2.getAuthInstance();
      if(!auth2.isSignedIn.get() && loginOnLoad){
        auth2.signIn();
      }
    }

    exports.login = function(){
      if(!!auth2) return auth2.signIn();
    }

    exports.logout = function(){
      if(!!auth2) return auth2.signOut();
    }

    exports.isAuthenticated = function(){
      if(!!auth2) return auth2.isSignedIn.get();
    }

    exports.getToken = function(){
      if(!!auth && auth2.isSignedIn.get()){
        return auth2.currentUser.get().getAuthResponse().access_token;
      }
      return '';
    }

    return exports;
  }];
})
})();