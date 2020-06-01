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
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * La classe ServiceController est le controlleur des services
 */
public class ServiceController {
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
    public ServiceController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }

    /**
     * Récupère tous les services d'une colocation.
     * Envoie une requête GET à /colocation/{colocationId}/service
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     */
    public void getAll(final JsonArrayRequestCallback cb, Long colocationId) {
        volleyRequest.getJsonArray(
                "/colocation/" + colocationId + "/service",
                new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray res) {
                        cb.onSuccess(res);
                    }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.get_services_error);
                    }
                }
        );
    }

    /**
     * Crée un nouveau service.
     * Envoie une requête POST à /colocation/{colocationId}/service avec en body : title, cost et description
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     * @param title Titre du service
     * @param cost Coût du service (en points)
     * @param description Description du service
     */
    public void create(final JsonObjectRequestCallback cb, Long colocationId, String title, int cost, String description) {
        JSONObject body = new JSONObject();
        try {
            body.put("title", title);
            body.put("cost", cost);
            body.put("description", description);
        }
        catch (JSONException e) {  }

        volleyRequest.request(
                Request.Method.POST,
                "/colocation/" + colocationId + "/service",
                body,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) {
                        cb.onSuccess(res);
                    }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.generic_error);
                    }
                }
        );
    }

    /**
     * Renvoie le service d'id serviceId.
     * Envoie une requête POST à /colocation/{colocationId}/service/{serviceId}
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     * @param serviceId Id du service
     */
    public void getById(final JsonObjectRequestCallback cb, Long colocationId, Long serviceId) {
        volleyRequest.request(
                Request.Method.GET,
                "/colocation/" + colocationId + "/service/" + serviceId,
                null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) {
                        cb.onSuccess(res);
                    }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.get_service_error);
                    }
                }
        );
    }

    /**
     * Vote pour le service d'id serviceId.
     * Envoie une requête POST à /colocation/{colocationId}/service/{serviceId}/vote avec accepted en body.
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     * @param serviceId Id du service
     * @param accepted Vote
     */
    public void edit(final JsonObjectRequestCallback cb, Long colocationId, Long serviceId, Boolean accepted) {
        Map<String, Boolean> body = new HashMap<>();
        body.put("agree", accepted);

        volleyRequest.request(
                Request.Method.POST,
                "/colocation/" + colocationId + "/service/" + serviceId + "/vote",
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) {
                        cb.onSuccess(res);
                    }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        int status = error.networkResponse.statusCode;
                        if (status == 409) cb.onError(R.string.vote_conflict);
                        else cb.onError(R.string.generic_error);
                    }
                }
        );
    }

}
