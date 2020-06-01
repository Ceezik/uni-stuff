package com.example.shareloc.Controller;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.VolleyRequest;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * La classe AuthController est un controlleur qui gère l'authentification
 */
public class AuthController {

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
    public AuthController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }

    /**
     * Permet à un utilisateur de se connecter.
     * Envoie une requête POST à /signin avec un objet JSON contenant login et password
     * @param login Login de l'utilisateur (adresse mail)
     * @param password Mot de passe de l'utilisateur
     * @param cb Callback de la requête
     */
    public void signin(String login, String password, final JsonObjectRequestCallback cb) {
        Map<String, String> body = new HashMap<>();
        body.put("login", login);
        body.put("password", password);

        volleyRequest.request(
                Request.Method.POST,
                "/signin",
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        try {
                            int status = error.networkResponse.statusCode;
                            if (status == 401) cb.onError(R.string.credentials_error);
                            else cb.onError(R.string.generic_error);
                        }
                        catch (Exception e) {
                            cb.onError(R.string.server_error);
                        }
                    }
                }
        );
    }

     /**
     * Permet à une personne de créer un compte utilisateur.
     * Envoie une requête POST à /signup avec un objet JSON contenant login, password, firstname et lastname
     * @param login
     * @param password
     * @param firstname
     * @param lastname
     * @param cb
     */
    public void signup(String login, String password, String firstname, String lastname, final JsonObjectRequestCallback cb) {
        Map<String, String> body = new HashMap<>();
        body.put("login", login);
        body.put("password", password);
        body.put("firstname", firstname);
        body.put("lastname", lastname);

        volleyRequest.request(
                Request.Method.POST,
                "/signup",
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        try {
                            int status = error.networkResponse.statusCode;
                            if (status == 409) cb.onError(R.string.login_error);
                            else cb.onError(R.string.generic_error);
                        }
                        catch (Exception e) {
                            cb.onError(R.string.server_error);
                        }
                    }
                }
        );
    }

}
