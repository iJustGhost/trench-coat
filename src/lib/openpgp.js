import { appConfigDir, BaseDirectory } from '@tauri-apps/api/path';
import { exists, mkdir, readFile, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import * as openpgp from 'openpgp';

export var armoredPublicKey = '';
var armoredPrivateKey = '';
export var username = '';
export var email = '';
export var comment = '';
var password = '';

export async function verifyContactKey(key) {
	try {
		var contact = await openpgp.readKey({
			armoredKey: atob(key)
		});
		var filename = await contact.users[0].userID.name + '(' + await contact.users[0].userID.email + ')';
		await writeTextFile('contacts/' + filename, atob(key), { baseDir: BaseDirectory.AppConfig });
		return filename;
	} catch {
		return invalid;
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

		username = await armoredPrivateKey.users[0].userID.name;
		email = await armoredPrivateKey.users[0].userID.email;
		comment = await armoredPrivateKey.users[0].userID.comment;
		armoredPublicKey = await readTextFile('publicKey', {
			baseDir: BaseDirectory.AppConfig
		});

		password = passphrase;
		return true;
	} catch {
		return false;
	}
}
