$(function(){
    jQuery.validator.addMethod(
        'ContainsAtLeastOneDigit',
        function(value) {
            return /[0-9]/.test(value);
        },
        'Your password must contain at least one digit.'
    );

    jQuery.validator.addMethod(
        'ContainsAtLeastOneCapitalLetter',
        function(value) {
            return /[A-Z]/.test(value);
        },
        'Your password must contain at least one capital letter.'
    );

    $("#signupForm").validate({
        rules: {
						firstname: {
							required: true
						},
						lastname: {
							required: true
						},
            email: {
                required: true
            },
            password: {
                required: true,
                minlength: 8,
                ContainsAtLeastOneDigit: true,
                ContainsAtLeastOneCapitalLetter: true
            },
            confirmpassword: {
                equalTo: "#password"
            }
        },
        messages: {
						firstname: {
								required: "firstname is required"
						},
						lastname: {
								required: "lastname is required"
						},
            email: {
                required: "email is required"
            },
            password: {
                required: "password is required"
            },
            confirmpassword: {
                required: "confirm password is required"
            }
        },
        submitHandler: function(fId) {

        }
    });

    $("#signinForm").validate({
        rules: {
            email: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: "email is required"
            },
            password: {
                required: "password is required"
            }
        },
        submitHandler: function(fId) {

        }
    });
});
