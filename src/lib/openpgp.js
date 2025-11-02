import { appConfigDir, BaseDirectory } from '@tauri-apps/api/path';
import { exists, mkdir, readFile, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import * as openpgp from 'openpgp';

export var armoredPublicKey = '';
var armoredPrivateKey = '';
export var username = '';
export var email = '';
export var comment = '';

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

	await writeTextFile('identity/publicKey.txt', publicKey, { baseDir: BaseDirectory.AppConfig });
	await writeTextFile('identity/privateKey.txt', privateKey, { baseDir: BaseDirectory.AppConfig });
}

export async function isIdentityExists() {
	const folderExists = await exists('identity/privateKey.txt', {
		baseDir: BaseDirectory.AppConfig
	});
	return folderExists;
}

export async function getIdentity() {
	try {
		await mkdir(await appConfigDir());
		await mkdir('identity', { baseDir: BaseDirectory.AppConfig });
		await mkdir('contacts', { baseDir: BaseDirectory.AppConfig });
		await mkdir('messages', { baseDir: BaseDirectory.AppConfig });
		return false;
	} catch {
		if (!(await exists('identity/privateKey.txt', { baseDir: BaseDirectory.AppConfig }))) {
			return false;
		}
	}

	armoredPublicKey = await openpgp.readKey({
		armoredKey: await readTextFile('identity/publicKey.txt', { baseDir: BaseDirectory.AppConfig})
	});

	return true;
}

export async function verifyIdentity(passphrase) {
	try {
		armoredPrivateKey = await openpgp.decryptKey({
			privateKey: await openpgp.readPrivateKey({
				armoredKey: await readTextFile('identity/privateKey.txt', {
					baseDir: BaseDirectory.AppConfig
				})
			}),
			passphrase
		});

		username = await armoredPrivateKey.users[0].userID.name;
		email = await armoredPrivateKey.users[0].userID.email;
		comment = await armoredPrivateKey.users[0].userID.comment;
		armoredPublicKey = await readTextFile('identity/publicKey.txt', {
			baseDir: BaseDirectory.AppConfig
		});

		return true;
	} catch {
		return false;
	}
}
