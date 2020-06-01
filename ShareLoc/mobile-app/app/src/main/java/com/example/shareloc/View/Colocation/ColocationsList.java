package com.example.shareloc.View.Colocation;


import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Adapter.ColocationAdapter;
import com.example.shareloc.Controller.ColocationController;
import com.example.shareloc.Model.Colocation;
import com.example.shareloc.R;
import com.example.shareloc.Utils.EmptyRecyclerView;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.RecyclerItemClickListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

/**
 * Fragment affichant la liste des colocations
 */
public class ColocationsList extends Fragment implements SwipeRefreshLayout.OnRefreshListener {

    /**
     * Layout avec rafraîchissement
     */
    private SwipeRefreshLayout swipeRefreshLayout;
    /**
     * RecyclerView
     */
    private static EmptyRecyclerView rv;
    /**
     * Adapter  du recyclerView
     */
    private static ColocationAdapter adapter;
    /**
     * LayoutManager du RecyclerView
     */
    private RecyclerView.LayoutManager lm;
    /**
     * Liste des colocations
     */
    private static ArrayList<Colocation> colocations = new ArrayList<>();
    /**
     * Controleur des colocations
     */
    private ColocationController colocationController;

    /**
     * Constructeur vide
     */
    public ColocationsList() { }

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
        View v = inflater.inflate(R.layout.fragment_colocations_list, container, false);

        colocationController = new ColocationController(getContext());

        rv = v.findViewById(R.id.colocations_recycler_view);
        lm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(lm);
        View emptyView = v.findViewById(R.id.empty_colocations_list);
        rv.setEmptyView(emptyView);
        adapter = new ColocationAdapter(colocations);
        rv.setAdapter(adapter);

        swipeRefreshLayout = v.findViewById(R.id.swipe_wrapper);
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.setColorSchemeColors(getResources().getColor(R.color.colorPrimary));

        getAll();
        configureOnClickRecyclerView();

        return v;
    }

    /**
     * Récupère les colocations à chaque rafraichissement
     */
    @Override
    public void onRefresh() {
        getAll();
    }

    /**
     * Configure le clic dans le recyclerView
     */
    protected void configureOnClickRecyclerView(){
        RecyclerItemClickListener.addTo(rv, R.layout.fragment_colocations_list)
                .setOnItemClickListener(new RecyclerItemClickListener.OnItemClickListener() {
                    /**
                     * Affiche le détail de la colocation sélectionnée
                     * @param recyclerView RecyclerView cliqué
                     * @param position Position de l'élément cliqué dans le RecyclerView
                     * @param v Vue cliquée
                     */
                    @Override
                    public void onItemClicked(RecyclerView recyclerView, int position, View v) {
                        Intent intent = new Intent(getContext(), ColocationDetails.class);
                        intent.putExtra("id", adapter.getColocation(position).getId());
                        startActivity(intent);
                    }
                });
    }

    /**
     * Récupère toutes les colocations
     */
    public void getAll() {
        final JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            /**
             * Ajoute les colocations à la liste
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONArray res) {
                swipeRefreshLayout.setRefreshing(true);
                colocations.clear();

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject c = res.getJSONObject(i);
                        Colocation colocation = new Colocation(
                                c.getLong("id"),
                                c.getString("name"),
                                c.getJSONArray("membres").length()
                        );
                        colocations.add(colocation);
                    }
                    sortColocationsByName();
                    adapter.notifyDataSetChanged();
                }
                catch(JSONException e) {
                    Toast.makeText(getContext(), R.string.get_colocations_error, Toast.LENGTH_LONG).show();
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

        colocationController.getAll(cb);
    }

    /**
     * Trie les colocations par leur nom
     */
    public static void sortColocationsByName() {
        Collections.sort(colocations, new Comparator<Colocation>() {
            @Override
            public int compare(Colocation a, Colocation b) {
                return a.getName().toLowerCase().compareTo(b.getName().toLowerCase());
            }
        });
    }

    /**
     * Ajoute une colocation à la liste
     * @param c
     */
    public static void addColocation(Colocation c) {
        colocations.add(c);
        sortColocationsByName();
        adapter.notifyDataSetChanged();
        rv.smoothScrollToPosition(adapter.getPosition(c));
    }
}
