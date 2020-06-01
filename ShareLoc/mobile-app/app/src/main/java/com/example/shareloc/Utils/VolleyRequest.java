package com.example.shareloc.Utils;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * La classe VolleyRequest permet d'executer les requêtes vers l'API. (singleton)
 */
public class VolleyRequest {

    /**
     * Instance de VolleyRequest
     */
    private static VolleyRequest instance;
    /**
     * Contexte d'utilisation
     */
    private static Context context;
    /**
     * URL de l'API
     */
    private static String url = "http://cdad95.iutrs.unistra.fr:8080/ShareLoc/api";
    /**
     * File des requêtes à exécuter
     */
    private RequestQueue rq;
    /**
     * Gestionnaire des préférences partagées
     */
    private SharedPreferencesManager pref;

    /**
     * Constructeur
     * @param c Contexte d'utilisation
     */
    private VolleyRequest(Context c) {
        context = c;
        rq = getRequestQueue();
        pref = SharedPreferencesManager.getInstance(c);
    }

    /**
     * Récupère l'instance de VolleyRequest ou en crée une si elle n'existe pas encore
     * @param c Contexte d'utilisation
     * @return Instance de VolleyRequest
     */
    public static VolleyRequest getInstance(Context c) {
        if (instance == null) {
            instance = new VolleyRequest(c);
        }
        return instance;
    }

    /**
     * Renvoie la file des requetes
     * @return File des requêtes
     */
    public RequestQueue getRequestQueue() {
        if (rq == null) {
            rq = Volley.newRequestQueue(context);
        }
        return rq;
    }

    /**
     * Ajoute la requête req dans la file
     * @param req Requête à exécuter
     */
    public <T> void addToRequestQueue(Request<T> req) {
        getRequestQueue().add(req);
    }

    /**
     * Exécute une requête Volley
     * @param method Methode de la requête
     * @param uri URL à contacter
     * @param body Corps de la requête
     * @param listener Ecouteur de la réponse
     * @param errorListener Ecouteur d'erreur
     */
    public void request(int method, String uri, JSONObject body,
                        Response.Listener<JSONObject> listener,
                        Response.ErrorListener errorListener) {
        JsonObjectRequest req = new JsonObjectRequest(method, url + uri, body, listener, errorListener) {

            /**
             * Renvoie les en-têtes de la requête HTTP
             * @return En-têtes de la requête
             */
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json");
                String token = pref.retrieveString("token");
                if(!token.isEmpty()) headers.put("Authorization", "Bearer " + token);
                return headers;
            }
        };

        addToRequestQueue(req);
    }

    /**
     * Récupère un JSONArray d'une requête
     * @param uri URL à contacter
     * @param listener Ecouteur de la réponse
     * @param errorListener Ecouteur d'erreur
     */
    public void getJsonArray(String uri,
                        Response.Listener<JSONArray> listener,
                        Response.ErrorListener errorListener) {
        JsonArrayRequest req = new JsonArrayRequest(Request.Method.GET, url + uri, null, listener, errorListener) {
                        
            /**
             * Renvoie les en-têtes de la requête HTTP
             * @return En-têtes de la requête
             */
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json");
                String token = pref.retrieveString("token");
                if(!token.isEmpty()) headers.put("Authorization", "Bearer " + token);
                return headers;
            }
        };

        addToRequestQueue(req);
    }
}
