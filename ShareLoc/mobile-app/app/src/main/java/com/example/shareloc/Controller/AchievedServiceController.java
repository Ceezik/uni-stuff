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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * La classe AchievedServiceController est le controlleur des services effectués
 */
public class AchievedServiceController {

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
    public AchievedServiceController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }

    /**
     * Récupère tous les services effectués d'une colocation.
     * Envoie une requête GET à /colocation/{colocationId}/achieved-service
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     */
    public void getAll(final JsonArrayRequestCallback cb, Long colocationId) {
        volleyRequest.getJsonArray(
                "/colocation/" + colocationId + "/achieved-service",
                new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.get_achieved_services_error);
                    }
                }
        );
    }

    /**
     * Crée un nouveau service effectué.
     * Envoie une requête POST à /colocation/{colocationId}/achieved-service/service/{serviceId} avec en body beneficiaries
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     * @param serviceId Id du service
     * @param beneficiaries Bénéficiaires
     */
    public void create(final JsonObjectRequestCallback cb, Long colocationId, Long serviceId, ArrayList<Long> beneficiaries) {
        Map<String, ArrayList<Long>> body = new HashMap<>();
        body.put("to", beneficiaries);


        volleyRequest.request(
                Request.Method.POST,
                "/colocation/" + colocationId + "/achieved-service/service/" + serviceId,
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
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
     * Récupère le service effectué d'id achievedServiceId.
     * Envoie une requête GET à /colocation/{colocationId}/achieved-service/{achievedServiceId}
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     * @param achievedServiceId Id du service
     */
    public void getById(final  JsonObjectRequestCallback cb, Long colocationId, Long achievedServiceId) {
        volleyRequest.request(
                Request.Method.GET,
                "/colocation/" + colocationId + "/achieved-service/" + achievedServiceId,
                null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.get_achieved_service_error);
                    }
                }
        );
    }

    /**
     * Vote pour un service effectué.
     * Envoie une requête POST à /colocation/{colocationId}/achieved-service/{achievedServiceId}/vote avec accepted en body.
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     * @param achievedServiceId Id du service achevé
     * @param accepted Vote
     */
    public void vote(final  JsonObjectRequestCallback cb, Long colocationId, Long achievedServiceId, Boolean accepted) {
        Map<String, Boolean> body = new HashMap<>();
        body.put("agree", accepted);

        volleyRequest.request(
                Request.Method.POST,
                "/colocation/" + colocationId + "/achieved-service/" + achievedServiceId + "/vote",
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
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
