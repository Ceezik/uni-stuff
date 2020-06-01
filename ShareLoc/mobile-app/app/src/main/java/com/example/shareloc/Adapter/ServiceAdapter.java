package com.example.shareloc.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.shareloc.Model.Service;
import com.example.shareloc.R;

import java.util.ArrayList;

/**
 * La classe ServiceAdapter est l'adapteur du RecyclerView des services
 */
public class ServiceAdapter extends RecyclerView.Adapter<ServiceAdapter.ServiceViewHolder> {

    /**
     * Liste des services
     */
    private ArrayList<Service> services;
    /**
     * Contexte d'utilisation
     */
    private static Context context;

    /**
     * La classe interne ServiceViewHolder est le ViewHolder du recyclerView des services
     */
    public static class ServiceViewHolder extends RecyclerView.ViewHolder {
        private TextView title, cost, description, accepted;

        /**
         * Constructeur
         * @param itemView Vue à créer
         */
        ServiceViewHolder(View itemView) {
            super(itemView);

            title = itemView.findViewById(R.id.service_item_title);
            cost = itemView.findViewById(R.id.service_item_cost);
            description = itemView.findViewById(R.id.service_item_description);
            accepted = itemView.findViewById(R.id.service_item_accepted);
        }

        /**
         * Affiche le service s dans le ViewHolder
         * @param s Service à afficher
         */
        public void display(Service s) {
            title.setText(s.getTitle());
            cost.setText(String.valueOf(s.getCost()) + " points");
            description.setText(s.getDescription());

            Boolean statut = s.isAccepted();
            if (statut == null) {
                accepted.setText(R.string.waiting_for_votes);
                accepted.setTextColor(context.getResources().getColor(R.color.gold));
            }
            else if (statut == false) {
                accepted.setText(R.string.refused);
                accepted.setTextColor(context.getResources().getColor(R.color.red));
            }
            else {
                accepted.setText(R.string.accepted);
                accepted.setTextColor(context.getResources().getColor(R.color.colorPrimary));
            }
        }
    }

    /**
     * Constructeur
     * @param services Liste des services à afficher
     * @param context Contexte d'utilisation
     */
    public ServiceAdapter(ArrayList<Service> services, Context context) {
        this.services = services;
        this.context = context;
    }

    /**
     * Relie le ViewHolder à son layout
     * @param parent Vue parente du ViewHolder
     * @param viewType Type de vue à afficher
     * @return Nouveau ViewHolder avec le bon layout
     */
    @Override
    public ServiceViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.service_item, parent, false);
        return new ServiceViewHolder(view);
    }

    /**
     * Affiche le service dans holder
     * @param holder Holder du service
     * @param position Position du service dans la liste
     */
    @Override
    public void onBindViewHolder(ServiceViewHolder holder, int position) {
        holder.display(services.get(position));
    }

    /**
     * Renvoie le nombre de services
     * @return Nombre de services
     */
    @Override
    public int getItemCount() {
        return this.services.size();
    }

    public Service getService(int position) { return services.get(position); }

    /**
     * Renvoie la position du service s
     * @param s Service concerné
     * @return Position du service s
     */
    public int getPosition(Service s) { return services.indexOf(s); }

}
