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
 * La classe InvitationController est le controlleur des invitations
 */
public class InvitationController {

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
     * @param context contexte d'utilisation
     */
    public InvitationController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }


    /**
     * Récupère les invitations de l'utilisateur
     * Envoie une requête GET à /invitation
     * @param cb Callback de la requête
     */
    public void getAll(final JsonArrayRequestCallback cb) {
        volleyRequest.getJsonArray(
                "/invitation",
                new Response.Listener<JSONArray>() {

                    @Override
                    public void onResponse(JSONArray res) {
                        cb.onSuccess(res);
                    }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        cb.onError(R.string.get_invitations_error);
                    }
                }
        );
    }

    /**
     * Crée une nouvelle invitation.
     * Envoie une requête POST à /invitation/colocation/{idColocation} avec le login en body.
     * @param cb Callback de la requête
     * @param login Login de l'invité
     * @param idColocation Colocation où la personne est invitée
     */
    public void create(final JsonObjectRequestCallback cb, String login, Long idColocation) {
        Map<String, String> body = new HashMap<>();
        body.put("login", login);

        volleyRequest.request(
                Request.Method.POST,
                "/invitation/colocation/" + idColocation,
                new JSONObject(body),
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject res) { cb.onSuccess(res); }
                },
                new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        if (error.networkResponse.statusCode == 409) cb.onError(R.string.already_member);
                        else if (error.networkResponse.statusCode == 406) cb.onError(R.string.user_not_found);
                        else cb.onError(R.string.generic_error);
                    }
                }
        );
    }

    /**
     * Accepte ou refuse une invitation.
     * Envoie une requête PUT à /invitation/{id} avec accepted en body
     * @param cb Callback de la requête
     * @param id Id de l'invitation
     * @param accepted
     */
    public void edit(final JsonObjectRequestCallback cb, Long id, Boolean accepted) {
        Map<String, Boolean> body = new HashMap<>();
        body.put("accepted", accepted);

        volleyRequest.request(
                Request.Method.PUT,
                "/invitation/" + id,
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

}
