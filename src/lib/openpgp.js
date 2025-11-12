import { appConfigDir, BaseDirectory } from '@tauri-apps/api/path';
import { exists, mkdir, readDir, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import * as openpgp from 'openpgp';

export var armoredPublicKey = '';
var armoredPrivateKey = '';
export var username = '';
export var email = '';
export var comment = '';

export async function getContactsList() {
	var contacts = await readDir('contacts', { baseDir: BaseDirectory.AppConfig });
	var list = [];
	for (var i = 0; i < contacts.length; i++) {
		try {
			var key = await openpgp.readKey({
				armoredKey: await readTextFile('contacts/' + contacts[i].name, {
					baseDir: BaseDirectory.AppConfig
				})
			});

			list.push({
				name: key.users[0].userID.name,
				email: key.users[0].userID.email,
				comment: key.users[0].userID.comment,
				filename: contacts[i].name
			});
		} catch {
			//do nothing
		}
	}
	return list;
}

export async function verifyContactKey(key) {
	try {
		var contact = await openpgp.readKey({
			armoredKey: atob(key)
		});
		await writeTextFile('contacts/' + crypto.randomUUID(), atob(key), {
			baseDir: BaseDirectory.AppConfig
		});
		return contact.users[0].userID.name + '(' + contact.users[0].userID.email + ')';
	} catch {
		return 'invalid';
	}
}

export async function createIdentity(textUsername, textPassword, textEmail, textComment) {
	var { privateKey, publicKey } = await openpgp.generateKey({
		type: 'ecc',
		curve: 'curve25519',
		userIDs: [
			{
				name: textUsername,
				email: textEmail,
				comment: textComment
			}
		],
		passphrase: textPassword
	});

	await writeTextFile('publicKey', publicKey, { baseDir: BaseDirectory.AppConfig });
	await writeTextFile('privateKey', privateKey, { baseDir: BaseDirectory.AppConfig });
}

export async function isIdentityExists() {
	const folderExists = await exists('privateKey', {
		baseDir: BaseDirectory.AppConfig
	});
	return folderExists;
}

export async function getIdentity() {
	try {
		await mkdir(await appConfigDir());
		await mkdir('contacts', { baseDir: BaseDirectory.AppConfig });
		await mkdir('messages', { baseDir: BaseDirectory.AppConfig });
		return false;
	} catch {
		if (!(await exists('privateKey', { baseDir: BaseDirectory.AppConfig }))) {
			return false;
		}
	}

	armoredPublicKey = await openpgp.readKey({
		armoredKey: await readTextFile('publicKey', { baseDir: BaseDirectory.AppConfig })
	});

	return true;
}

export async function verifyIdentity(passphrase) {
	try {
		armoredPrivateKey = await openpgp.decryptKey({
			privateKey: await openpgp.readPrivateKey({
				armoredKey: await readTextFile('privateKey', {
					baseDir: BaseDirectory.AppConfig
				})
			}),
			passphrase
		});

		username = armoredPrivateKey.users[0].userID.name;
		email = armoredPrivateKey.users[0].userID.email;
		comment = armoredPrivateKey.users[0].userID.comment;
		armoredPublicKey = await readTextFile('publicKey', {
			baseDir: BaseDirectory.AppConfig
		});

		return true;
	} catch {
		return false;
	}
}

export async function decryptMessage(message) {
	return await openpgp.decrypt({
		message: await openpgp.readMessage({ armoredMessage: message }),
		decryptionKeys: armoredPrivateKey
	});
}

export async function encryptMessage(message, key) {
	var contactKey = await readTextFile('contacts/' + key, {
		baseDir: BaseDirectory.AppConfig
	});
	return await openpgp.encrypt({
		message: await openpgp.createMessage({ text: message }),
		encryptionKeys: await openpgp.readKey({ armoredKey: contactKey })
	});
}
