import * as openpgp from 'openpgp';

var identity = false;

export async function createIdentity(textUsername, textPassword, textEmail, textComment) {
	var { privateKey, publicKey } = await openpgp.generateKey({
		type: 'ecc',
		curve: 'curve25519Legacy',
		userIDs: [
			{
				name: textUsername,
				email: textEmail,
				comment: textComment
			}
		],
		passphrase: textPassword
	});

	console.log(publicKey);
	identity = true;
}

export function getIdentity() {
	return identity;
}

export function getUsername() {}

export function getPassword() {}
