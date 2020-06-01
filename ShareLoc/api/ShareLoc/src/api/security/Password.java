package api.security;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class Password {
	
	private static final int ITERATIONS = 100000;
	private static final int KEY_LENGTH = 128;
	private static final String ALGORITHM = "PBKDF2WithHmacSHA512";
	private static final String secretKey = "Pgmna1nnojp9IiLacNKeVdnHd25T9ytbyrloysRDAwMrjx6MBgC//GEZbDkzJzxBhC78fZHgptKmAKQO+LXhdZmhLcyN1mZG+iSKp1m6kw5AjhGshSI/DhtvxExAi02nd1qBCqT/8pTLKuuvC63Fyaoedw2w4smTrwyQPZ8r5k8=";
	
	
	public static Optional<String> hashPassword(String password) {
		char[] chars = password.toCharArray();
	    byte[] bytes = secretKey.getBytes(); 
	    PBEKeySpec spec = new PBEKeySpec(chars, bytes, ITERATIONS, KEY_LENGTH);
	    Arrays.fill(chars, Character.MIN_VALUE);
	    
	    try {
	        SecretKeyFactory fac = SecretKeyFactory.getInstance(ALGORITHM);
	        byte[] securePassword = fac.generateSecret(spec).getEncoded();
	        return Optional.of(Base64.getEncoder().encodeToString(securePassword));

	      } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
	        return Optional.empty();

	      } finally {
	        spec.clearPassword();
	      }
	}
	
	public static boolean verifyPassword (String password, String key) {
	    Optional<String> optEncrypted = hashPassword(password);
	    if (!optEncrypted.isPresent()) return false;
	    return optEncrypted.get().equals(key);
	}
}
