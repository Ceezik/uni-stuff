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
 * La classe MessageController est le controller de la messagerie ShareLoc
 */
public class MessageController {

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
    public MessageController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }

    /**
     * Récupère l'ensemble des messages d'une colocation.
     * Envoe une requête GET à /colocation/{colocationId}/message.
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     */
    public void getAll(final JsonArrayRequestCallback cb, Long colocationId) {
        volleyRequest.getJsonArray(
                "/colocation/" + colocationId + "/message",
                new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.get_members_error);
                    }
                }
        );
    }

    /**
     * Ajoute un message dans une colocation.
     * Envoie une requête POST à /colocation/{colocationId}/message avec message en body.
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation
     * @param message Message à envoyer
     */
    public void create(final JsonObjectRequestCallback cb, Long colocationId, String message) {
        Map<String, String> body = new HashMap<>();
        body.put("message", message);

        volleyRequest.request(
                Request.Method.POST,
                "/colocation/" + colocationId + "/message",
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.send_message_error);
                    }
                }
        );
    }
}
