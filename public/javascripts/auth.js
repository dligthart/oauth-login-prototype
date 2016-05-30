var auth = (function() {

    var oauthPublicKey = 'LAzfQOvoS0HgpzWfU1vkW8F95bo';
    OAuth.initialize(oauthPublicKey);

    var currentUser = {};

		currentUser = User.getIdentity();

    function init() {
        autoLogin();
        actions();
    }

    function autoLogin() {

			if(null != currentUser) {

				if(!currentUser.providers)
					currentUser.providers = ['tedx'];

        switch (currentUser.providers[0]) {
            case 'tedx':
                loginTedx();
                break;
            case 'facebook':
                loginFacebook();
                break;
            case 'linkedin':
                loginLinkedIn();
                break;
        }
			}
    }

    function loginLinkedIn() {
        OAuth.popup('linkedin', {
            cache: true
        }).done(function(result) {
            User.signup(result).done(function(user) {
                onLogin(user.data);
            }).fail(function(error) {
                // shit aint working'
                console.log('it aint working..');
            });
        })
    }

    function loginFacebook() {
        OAuth.popup('facebook', {
                cache: true
            })
            .done(function(result) {
                User.signup(result).done(function(user) {
                    onLogin(user.data);
                }).fail(function(error) {
                    // shit aint working'
                    console.log('it aint working..');
                });
            })
            .fail(function(err) {});
    }

    function loginTedx() {
        if (currentUser && currentUser.data && currentUser.data.email) {
            var user = currentUser;
            onLogin(user.data);
        } else {
            var userObj = {
                email: $('.signin-form #email').val(),
                password: $('.signin-form #password').val(),
            };
            User.signin(userObj.email, userObj.password, {
                cache: true
            }).done(function(user) {
                onLogin(user.data);
            }).fail(function(err) {
                console.log(err);
            });
        }
    }

    function logout() {
        var user = User.getIdentity();
        user.logout().done(function() {
                onLogout();
            })
            .fail(function(err) {
                console.log(err);
            });
    }

    function actions() {
			$(function(){
        $('button#btn-facebook').click(function() {
            loginFacebook();
        });

        $('button#btn-linkedin').click(function() {
            loginLinkedIn();
        });

				$('button#login').click(function() {
			    	loginTedx();
			  });

				$('button#btn-logout').click(function() {
            logout();
        });

        $('button#register').click(function() {
            var userObj = {
                email: $('.signup-form .email').val(),
                password: $('.signup-form .password').val(),
                firstname: $('.signup-form .firstname').val(),
                lastname: $('.signup-form .lastname').val()
            };

						console.log(userObj);
            User.signup(userObj).done(function(user) {
                onLogin(user.data)
            }).fail(function(err) {
                console.log(err);
            });
        });
			});
    }

    function onLogin(user) {
        // Do stuff upon user login.
        console.log('User loggedin', user);
        alert(user.email + ' is loggedin');
    }

    function onLogout() {
				console.log('User loggedout');
    }

    return {
        init: init
    }
})().init();
