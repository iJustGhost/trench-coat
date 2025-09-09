var username = '';
var password = '';
var email = '';
var identity = false;

export function createIdentity(textUsername, textPassword, textEmail) {
	username = textUsername;
	password = textPassword;
	email = textEmail;
	identity = true;
}

export function getIdentity() {
    return identity;
}

export function getUsername() {
    return username;
}

export function getPassword() {
    return password;
}