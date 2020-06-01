package com.example.shareloc.Utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

/**
 * La classe SharedPreferencesManager est le gestionnaire des préférences partagées (singleton)
 */
public class SharedPreferencesManager {

    /**
     * Instance du gestionnaire
     */
    private static SharedPreferencesManager instance;
    /**
     * Contexte d'utilisation
     */
    private static Context context;
    /**
     * Préférences Partagées
     */
    private SharedPreferences p;
    /**
     * Editeur des préférences
     */
    private Editor editor;

    /**
     * Constructeur
     * @param c Contexte d'utilisation
     */
    private SharedPreferencesManager(Context c) {
        context = c;
        p = c.getSharedPreferences("ShareLoc", Context.MODE_PRIVATE);
        editor = p.edit();
    }

    /**
     * Récupère l'instance du manager ou en crée une si elle n'existe pas encore
     * @param c Contexte d'utilisation
     * @return Instance de SharedPreferencesManager
     */
    public static synchronized SharedPreferencesManager getInstance(Context c) {
        if (instance == null) {
            instance = new SharedPreferencesManager(c);
        }
        return instance;
    }

    /**
     * Efface les préférences partagées
     */
    public void clear() {
        editor.clear();
        editor.commit();
    }

    /**
     * Stocke value dans les préférences avec la clé key
     * @param key Clé de la préférence
     * @param value Valeur à stocker
     */
    public void storeString(String key, String value) {
        editor.putString(key, value);
        editor.commit();
    }

    /**
     * Récupère la chaîne de caractère stockée avec la clé key
     * @param key Clé de la valeur à récupérer
     * @return Chaîne de caractère de clé key
     */
    public String retrieveString(String key) {
        return p.getString(key, "");
    }

    /**
     * Stocke value dans les préférences avec la clé key
     * @param key Clé de la préférence
     * @param value Valeur à stocker
     */
    public void storeInt(String key, int value) {
        editor.putInt(key, value);
        editor.commit();
    }

    /**
     * Récupère l'entier stocké avec la clé key
     * @param key Clé de la valeur à récupérer
     * @return Entier de clé key
     */
    public int retrieveInt(String key) { return p.getInt(key, 0); }

}
