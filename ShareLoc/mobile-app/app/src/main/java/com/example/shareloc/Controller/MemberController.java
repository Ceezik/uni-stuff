package com.example.shareloc.Controller;

import android.content.Context;

import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.example.shareloc.R;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.VolleyRequest;

import org.json.JSONArray;

/**
 * La classe MemberController est le controlleur des membres d'une colocation
 */
public class MemberController {

    /**
     * Contexte d'utilisation
     */
    private Context context;
    /**
     * Instancede Volley à utiliser pour les requêtes
     */
    private VolleyRequest volleyRequest;

    /**
     * Constructeur
     * @param context Contexte d'utilisation
     */
    public MemberController(Context context) {
        this.context = context;
        this.volleyRequest = VolleyRequest.getInstance(context);
    }

    /**
     * Récupère l'ensemble des membres d'une colocation excepté le membre actuellement connecté.
     * Envoie une requête GET à /colocation/{colocationId}/membre
     * @param cb Callback de la requête
     * @param colocationId Id de la colocation souhaitée
     */
    public void getAll(final JsonArrayRequestCallback cb, Long colocationId) {
        volleyRequest.getJsonArray(
        "/colocation/" + colocationId + "/membre",
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

}
