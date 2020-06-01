package com.example.shareloc.Utils;


import org.json.JSONObject;

/**
 * L'interface JsonObjectRequestCallback permet de gérer les différents événements suites à la réponse de l'API
 */
public interface JsonObjectRequestCallback {

    /**
     * Fonction à exéctuer après la bonne exécution de la requête vers l'API
     * @param res Réponse de l'API
     */
    void onSuccess(JSONObject res);

    /**
     * Fonction à exéctuer après la mauvaise exécution de la requête vers l'API
     * @param error Statut d'erreur
     */
    void onError(int error);

}
