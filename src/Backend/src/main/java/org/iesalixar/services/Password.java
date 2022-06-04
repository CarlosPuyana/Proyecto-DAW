package org.iesalixar.services;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class Password {

	public String getPassword() {

		String password = "12345678";
		int[] pwdindex = { 0, 1, 2, 3, 4, 5, 6, 7 };

		char[] specialCharacters = { '@', '#', '.', '!', '$' };

		char[] numbers = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

		char[] upperLetters = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
				'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

		char[] lowerLetters = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
				'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };

		char[] allCharacters = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
				'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b',
				'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
				'x', 'y', 'z' };

		// 1. Genere caracteres especiales al azar y colóquelos al azar en la posición
		// de contraseña 2-7 (los caracteres especiales no aparecen al principio o al
		// final)
		// aleatoriamente en la posición de contraseña 2-7 ");
		int aindex = new Random().nextInt(5);
		int aposition = new Random().nextInt(6) + 1;
		password = password.replace(password.charAt(aposition), specialCharacters[aindex]);

		// 2. Genere datos aleatoriamente y colóquelos aleatoriamente en las posiciones
		// 1-8 (excluyendo la posición ocupada por el paso 1)
		int bindex = new Random().nextInt(10);
		int bposition = 0;
		do {
			bposition = new Random().nextInt(8);
		} while (bposition == aposition);
		password = password.replace(password.charAt(bposition), numbers[bindex]);

		// 3. Genere letras mayúsculas al azar y colóquelas al azar en las posiciones
		// 1-8 (excluyendo las posiciones ocupadas por los pasos 1 y 2)
		int cindex = new Random().nextInt(26);
		int cposition = 0;
		do {
			cposition = new Random().nextInt(8);
		} while (cposition == aposition || cposition == bposition);
		password = password.replace(password.charAt(cposition), upperLetters[cindex]);

		// 4. Genere aleatoriamente letras minúsculas y colóquelas aleatoriamente en las
		// posiciones 1-8 (excluyendo las posiciones ocupadas por los pasos 1, 2 y 3)
		int dindex = new Random().nextInt(26);
		//System.out.println(lowerLetters[dindex]);
		int dposition = 0;
		do {
			dposition = new Random().nextInt(8);
		} while (dposition == aposition || dposition == cposition || dposition == bposition);
		password = password.replace(password.charAt(dposition), lowerLetters[dindex]);

		// Los primeros 4 pasos aseguran que la contraseña contenga (caracteres
		// especiales y letras mayúsculas y minúsculas y números y las posiciones son
		// aleatorias)
		// 5. Genere números al azar en mayúsculas y minúsculas y colóquelos al azar en
		// las posiciones 1-8 (excluyendo las posiciones ocupadas por los pasos 1, 2, 3,
		// 4 y los cuatro dígitos restantes)
		for (int i = 0; i < pwdindex.length; i++) {
			if (pwdindex[i] != aposition && pwdindex[i] != bposition && pwdindex[i] != cposition
					&& pwdindex[i] != dposition) {
				int eindex = new Random().nextInt(62);
				password = password.replace(password.charAt(pwdindex[i]), allCharacters[eindex]);
			}
		}
		
		
		return password;
	}
	
}
