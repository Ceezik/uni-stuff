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
 * La classe ColocationController est le controlleur des colocations
 */
public class ColocationController {

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
    public ColocationController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }

    /**
     * Récupère l'ensemble des colocations d'un utilisateur.
     * Envoie une requête GET à /colocation.
     * @param cb Callback de la requête
     */
    public void getAll(final JsonArrayRequestCallback cb) {
        volleyRequest.getJsonArray(
                "/colocation",
                new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray res) {
                        cb.onSuccess(res);
                    }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.get_colocations_error);
                    }
                }
        );
    }

    /**
     * Crée une nouvelle colocation.
     * Envoie une requête POST à /colocation avec un objet JSON contenant name.
     * @param name Nom de la nouvelle colocation
     * @param cb Callback de la requête
     */
    public void create(String name, final JsonObjectRequestCallback cb) {
        Map<String, String> body = new HashMap<>();
        body.put("name", name);

        volleyRequest.request(
                Request.Method.POST,
                "/colocation",
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        int status = error.networkResponse.statusCode;
                        if (status == 401) cb.onError(R.string.unhautorized_error);
                        else cb.onError(R.string.generic_error);
                    }
                }
        );
    }

    /**
     * Récupère la colocation d'identifiant id.
     * Envoie une requête GET à /colocation/{id}.
     * @param id Identifiant la colocation à récupérer
     * @param cb Callback de la requête
     */
    public void getById(Long id, final JsonObjectRequestCallback cb) {
        volleyRequest.request(
                Request.Method.GET,
                "/colocation/" + id,
                null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        int status = error.networkResponse.statusCode;
                        if (status == 401) cb.onError(R.string.unhautorized_error);
                        else cb.onError(R.string.get_colocation_error);
                    }
                }
        );
    }

}
