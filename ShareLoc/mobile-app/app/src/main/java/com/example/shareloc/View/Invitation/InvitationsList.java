package com.example.shareloc.View.Invitation;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.example.shareloc.Adapter.InvitationAdapter;
import com.example.shareloc.Controller.InvitationController;
import com.example.shareloc.Model.Invitation;
import com.example.shareloc.R;
import com.example.shareloc.Utils.EmptyRecyclerView;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.JsonObjectRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.example.shareloc.View.MainActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Fragment affichant la liste des invitations
 */
public class InvitationsList extends Fragment implements SwipeRefreshLayout.OnRefreshListener {
    /**
     * Layout avec rafraichissement
     */
    private SwipeRefreshLayout swipeRefreshLayout;
    /**
     * RecyclerView
     */
    private EmptyRecyclerView rv;
    /**
     * Adapter du RecyclerView
     */
    private static InvitationAdapter adapter;
    /**
     * LayoutManager du RecyclerView
     */
    private RecyclerView.LayoutManager lm;
    /**
     * Liste des invitations
     */
    private static ArrayList<Invitation> invitations = new ArrayList<>();
    /**
     * Controleur des invitations
     */
    private InvitationController invitationController;
    /**
     * Gestionnaire des préférences partagées
     */
    private SharedPreferencesManager pref;

    /**
     * Constructeur vide
     */
    public InvitationsList() {  }

    /**
     * Crée la vue associée au fragment
     * @param inflater Inflater de l'application
     * @param container Conteneur de la vue
     * @param savedInstanceState Etat de l'application
     * @return Vue du fragment
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_invitations_list, container, false);

        pref = SharedPreferencesManager.getInstance(getContext());
        invitationController = new InvitationController(getContext());

        rv = v.findViewById(R.id.invitations_recycler_view);
        lm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(lm);
        View emptyView = v.findViewById(R.id.empty_invitations_list);
        rv.setEmptyView(emptyView);

        InvitationAdapter.InvitationAdapterListener listener = new InvitationAdapter.InvitationAdapterListener() {
            /**
             * Accepte une invitation
             * @param v Vue sur laquelle l'événement s'est déclenché
             * @param i Invitation liée au holder
             */
            @Override
            public void onClickBtnAccepted(View v, Invitation i) { edit(i, true); }

            /**
             * Refuse une invitation
             * @param v Vue sur laquelle l'événement s'est déclenché
             * @param i Invitation liée au holder
             */
            @Override
            public void onClickBtnRefused(View v, Invitation i) { edit(i, false); }
        };

        adapter = new InvitationAdapter(invitations, listener);
        rv.setAdapter(adapter);

        swipeRefreshLayout = v.findViewById(R.id.swipe_wrapper);
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.setColorSchemeColors(getResources().getColor(R.color.colorPrimary));

        getAll();

        return v;
    }

    /**
     * Récupère toutes les invitations à chaque rafraichissement
     */
    @Override
    public void onRefresh() {
        getAll();
    }

    /**
     * Récupère tous les invitations
     */
    public void getAll() {

        final JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            /**
             * Ajoute les invitations à la liste des invitations
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONArray res) {
                swipeRefreshLayout.setRefreshing(true);
                invitations.clear();

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject inv = res.getJSONObject(i);
                        JSONObject from = inv.getJSONObject("from");
                        Invitation invitation = new Invitation(
                                inv.getLong("id"),
                                from.getString("firstname") + " " + from.getString("lastname"),
                                inv.getJSONObject("colocation").getString("name")
                        );
                        invitations.add(invitation);
                    }
                    adapter.notifyDataSetChanged();
                }
                catch (JSONException e) {
                    Toast.makeText(getContext(), R.string.get_invitations_error, Toast.LENGTH_LONG).show();
                }

                swipeRefreshLayout.setRefreshing(false);
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                Toast.makeText(getContext(), error, Toast.LENGTH_LONG).show();
                swipeRefreshLayout.setRefreshing(false);
            }
        };

        invitationController.getAll(cb);
    }

    /**
     * Accepte ou refuse l'invitation i
     * @param i Invitation à accepter
     * @param accepted accepté ou non
     */
    public void edit(final Invitation i, Boolean accepted) {

        final JsonObjectRequestCallback cb =  new JsonObjectRequestCallback() {
            /**
             * Supprime l'invitation de la liste des invitations
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONObject res) {
                invitations.remove(i);
                adapter.notifyDataSetChanged();

                MainActivity.removeInvitation();

                try {
                    Toast.makeText(getContext(), res.getString("message"), Toast.LENGTH_LONG).show();
                }
                catch(JSONException e) { }
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                Toast.makeText(getContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        invitationController.edit(cb, i.getId(), accepted);
    }
}
