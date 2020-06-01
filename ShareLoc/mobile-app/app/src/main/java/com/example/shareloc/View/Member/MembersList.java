package com.example.shareloc.View.Member;


import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Adapter.MemberAdapter;
import com.example.shareloc.Controller.MemberController;
import com.example.shareloc.Model.Membre;
import com.example.shareloc.R;
import com.example.shareloc.Utils.EmptyRecyclerView;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.SharedPreferencesManager;
import com.example.shareloc.View.Colocation.ColocationDetails;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

/**
 * Fragment affichant la liste des membres
 */
public class MembersList extends Fragment implements SwipeRefreshLayout.OnRefreshListener {

    /**
     * Vue d'ajout de membres
     */
    private View addMemberForm;
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
    private static MemberAdapter adapter;
    /**
     * LayoutManager du RecyclerView
     */
    private RecyclerView.LayoutManager lm;
    /**
     * Liste des membres
     */
    private static ArrayList<Membre> membres = new ArrayList<>();
    /**
     * Controleur des membres
     */
    private MemberController memberController;
    /**
     * Id de la colocation
     */
    private Long colocationId;
    /**
     * Gestionnaire des préférences partagées
     */
    private SharedPreferencesManager pref;

    /**
     * Constructeur vide
     */
    public MembersList() {  }

    /**
     * Crée la vue associée au fragment
     * @param inflater Inflater de l'application
     * @param container Conteneur de la vue
     * @param savedInstanceState Etat de l'application
     * @return Vue du fragment
     */
    @Override
    public void onResume() {
        super.onResume();
        getAll();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_members_list, container, false);

        memberController = new MemberController(getContext());
        pref = SharedPreferencesManager.getInstance(getContext());

        colocationId = ColocationDetails.getColocationId();

        addMemberForm = v.findViewById(R.id.add_member_form);

        rv = v.findViewById(R.id.members_recycler_view);
        lm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(lm);
        View emptyView = v.findViewById(R.id.empty_members_list);
        rv.setEmptyView(emptyView);
        adapter = new MemberAdapter(membres);
        rv.setAdapter(adapter);

        swipeRefreshLayout = v.findViewById(R.id.swipe_wrapper);
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.setColorSchemeColors(getResources().getColor(R.color.colorPrimary));

        getAll();

        return v;
    }

    /**
     * Récupère tous les membres à chaque rafraichissement
     */
    @Override
    public void onRefresh() {
        getAll();
    }

    /**
     * Récupère tous les membres
     */
    public void getAll() {

        final JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            /**
             * Ajoute les membres à la liste des membres
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONArray res) {
                swipeRefreshLayout.setRefreshing(true);
                membres.clear();

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject m = res.getJSONObject(i);
                        JSONObject membre = m.getJSONObject("membre");

                        Membre member = new Membre(
                                m.getLong("id"),
                                membre.getString("login"),
                                membre.getString("firstname") + " " + membre.getString("lastname"),
                                m.getInt("points"),
                                m.getBoolean("estGestionnaire")
                        );

                        membres.add(member);
                    }
                    sortMembersByFullname();
                    adapter.notifyDataSetChanged();

                    if (userIsColocationManager()) addMemberForm.setVisibility(View.VISIBLE);
                    else addMemberForm.setVisibility(View.GONE);
                }
                catch (JSONException e) {
                    Toast.makeText(getContext(), R.string.get_members_error, Toast.LENGTH_LONG).show();
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

        memberController.getAll(cb, colocationId);
    }

    /**
     * Trie les membres selon leur nom
     */
    public static void sortMembersByFullname() {
        Collections.sort(membres, new Comparator<Membre>() {
            @Override
            public int compare(Membre a, Membre b) {
                return a.getFullname().toLowerCase().compareTo(b.getFullname().toLowerCase());
            }
        });
    }

    /**
     * Vérifie si l'utilisateur est le gestionnaire de la colocation
     * @return True si l'utilisateur est le gestionnaire
     */
    public boolean userIsColocationManager() {
        String login = pref.retrieveString("login");
        for (Membre m : membres) {
            if (m.getLogin().equals(login) && m.estGestionnaire()) {
                return true;
            }
        }
        return false;
    }

}
