package com.example.shareloc.View.Service;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Adapter.ServiceAdapter;
import com.example.shareloc.Controller.ServiceController;
import com.example.shareloc.Model.Service;
import com.example.shareloc.R;
import com.example.shareloc.Utils.EmptyRecyclerView;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.Utils.RecyclerItemClickListener;
import com.example.shareloc.View.Colocation.ColocationDetails;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

/**
 * Fragment affichant la liste des services
 */
public class ServicesList extends Fragment {
    /**
     * RecyclerView
     */
    private static EmptyRecyclerView rv;
    /**
     * Adapter du RecyclerView
     */
    private static ServiceAdapter adapter;
    /**
     * LayoutManager du RecyclerView
     */
    private RecyclerView.LayoutManager lm;
    /**
     * Liste des services
     */
    private static ArrayList<Service> services = new ArrayList<>();
    /**
     * Controleur des services
     */
    private ServiceController serviceController;
    /**
     * Id de la colocation
     */
    private Long colocationId;

    /**
     * Constructeur vide
     */
    public ServicesList() {  }

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
        View v = inflater.inflate(R.layout.fragment_service_list, container, false);

        colocationId = ColocationDetails.getColocationId();

        serviceController = new ServiceController(getContext());

        rv = v.findViewById(R.id.services_recycler_view);
        lm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(lm);
        View emptyView = v.findViewById(R.id.empty_services_list);
        rv.setEmptyView(emptyView);
        adapter = new ServiceAdapter(services, getContext());
        rv.setAdapter(adapter);

        getAll();
        configureOnClickRecyclerView();

        return v;
    }

    protected void configureOnClickRecyclerView(){
        RecyclerItemClickListener.addTo(rv, R.layout.fragment_service_list)
                .setOnItemClickListener(new RecyclerItemClickListener.OnItemClickListener() {
                    @Override
                    public void onItemClicked(RecyclerView recyclerView, int position, View v) {
                        Intent intent = new Intent(getContext(), ServiceDetails.class);
                        intent.putExtra("colocationId", colocationId);
                        intent.putExtra("serviceId", adapter.getService(position).getId());
                        startActivity(intent);
                    }
                });
    }

    /**
     * Récupère tous les services
     */
    public void getAll() {

        JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            /**
             * Ajoute les services à la liste des services
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONArray res) {
                services.clear();

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject s = res.getJSONObject(i);

                        String description = "";
                        Boolean accepted = null;
                        if (s.has("description")) description = s.getString("description");
                        if (s.has("accepted")) accepted = s.getBoolean("accepted");

                        Service service = new Service(
                                s.getLong("id"),
                                s.getString("title"),
                                s.getInt("cost"),
                                description,
                                accepted
                        );
                        services.add(service);
                    }
                    sortServicesByTitle();
                    adapter.notifyDataSetChanged();
                }
                catch (JSONException e) {
                    Toast.makeText(getContext(), R.string.get_services_error, Toast.LENGTH_LONG).show();
                }
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

        serviceController.getAll(cb, colocationId);
    }

    /**
     * Trie les services selon leur titre
     */
    public static void sortServicesByTitle() {
        Collections.sort(services, new Comparator<Service>() {
            @Override
            public int compare(Service a, Service b) {
               return a.getTitle().toLowerCase().compareTo(b.getTitle().toLowerCase());
            }
        });
    }

    /**
     * Ajoute le service s
     * @param s Service à ajouter
     */
    public static void addService(Service s) {
        services.add(s);
        sortServicesByTitle();
        adapter.notifyDataSetChanged();
        rv.smoothScrollToPosition(adapter.getPosition(s));
    }

}
