package com.example.shareloc.Controller;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.VolleyRequest;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * La classe UserControllet est le controlleur des utilisateurs de ShareLoc
 */
public class UserController {

    /**
     * Contexte d'utilisation
     */
    private Context context;
    /**
     * Instance de Volley à utiliser pour les requêtes
     */
    private VolleyRequest volleyRequest;

    /**
     * Constructeur
     * @param context Contexte d'utilisation
     */
    public UserController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }

    /**
     * Récupère le profil de l'utilisateur connecté.
     * Envoie une requête GET à /profil.
     * @param cb Callback de la requête
     */
    public void getProfil(final JsonObjectRequestCallback cb) {
        volleyRequest.request(
                Request.Method.GET,
                "/profil",
                null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) { cb.onError(R.string.generic_error); }
                }
        );
    }

    /**
     * Récupère tous les utilisateurs qui sont membre de la colocation en paramètre.
     * Envoie une requête GET à /user/colocation/{colocationId}.
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     */
    public void getAll(final JsonArrayRequestCallback cb, Long colocationId) {
        volleyRequest.getJsonArray(
                "/user/colocation/" + colocationId,
                new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) { cb.onError(R.string.generic_error); }
                }
        );
    }

    /**
     * Modifie le mot de passe de l'utilisateur connecté.
     * Envoie une requête PUT à /user/password avec currentPassword et newPassword en body.
     * @param cb Callback de la requête
     * @param currentPassword Mot de passe actuel
     * @param newPassword Nouveau mot de passe
     */
    public void changePassword(final JsonObjectRequestCallback cb, String currentPassword, String newPassword) {
        Map<String, String> body = new HashMap<>();
        body.put("currentPassword", currentPassword);
        body.put("newPassword", newPassword);

        volleyRequest.request(
                Request.Method.PUT,
                "/user/password",
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        int status = error.networkResponse.statusCode;
                        if (status == 406) cb.onError(1);
                        else cb.onError(2);
                    }
                }
        );
    }

}
