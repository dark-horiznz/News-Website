document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var username = document.querySelector('#login-form [name="username"]');
    var password = document.querySelector('#login-form [name="password"]');

    if (username.value === '' || password.value === '') {
        alert('Please enter a username and password');
        return;
    }

    console.log('Logging in user:', username.value);
});