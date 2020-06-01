package com.example.shareloc.Adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.shareloc.Model.Colocation;
import com.example.shareloc.R;

import java.util.ArrayList;

/**
 * La classe ColocationAdapter est l'adapteur du RecyclerView des colocations
 */
public class ColocationAdapter extends RecyclerView.Adapter<ColocationAdapter.ColocationViewHolder> {

    /**
     * Liste des colocations
     */
    private ArrayList<Colocation> colocations;


    /**
     * La classe interne ColocationViewHolder est le ViewHolder du RecyclerView des colocations
     */
    public static class ColocationViewHolder extends RecyclerView.ViewHolder {
        private TextView name, nbMembers;

        /**
         * Constructeur
         * @param itemView Vue à créer
         */
        ColocationViewHolder(View itemView) {
            super(itemView);

            name = itemView.findViewById(R.id.colocation_item_name);
            nbMembers = itemView.findViewById(R.id.colocation_item_nb_members);
        }

        /**
         * Affiche la colocation c dans le ViewHolder
         * @param c Colocation à afficher
         */
        public void display(Colocation c) {
            name.setText(c.getName());

            int members = c.getNbMembers();
            if (members > 1) nbMembers.setText(members + " membres");
            else nbMembers.setText(members + " membre");
        }
    }

    /**
     * Constructeur
     * @param colocations Liste des colocations à afficher
     */
    public ColocationAdapter(ArrayList<Colocation> colocations) {
        this.colocations = colocations;
    }

    /**
     * Relie le ViewHolder à son layout
     * @param parent Vue parente du ViewHolder
     * @param viewType Type de vue à afficher
     * @return Nouveau ViewHolder avec le bon layout
     */
    @Override
    public ColocationViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.colocation_item, parent, false);
        return new ColocationViewHolder(view);
    }

    /**
     * Affiche le message dans holder
     * @param holder Holder du message
     * @param position Position de la colocation dans la liste
     */
    @Override
    public void onBindViewHolder(ColocationViewHolder holder, int position) {
        holder.display(colocations.get(position));
    }

    /**
     * Renvoie le nombre de colocations de l'utilisateur
     * @return Nombre de colocations
     */
    @Override
    public int getItemCount() {
        return this.colocations.size();
    }

    /**
     * Renvoie la colocation à la position position
     * @param position Position de la colocation
     * @return Colocation à la position position
     */
    public Colocation getColocation(int position) { return colocations.get(position); }

    /**
     * Renvie le rang de la colocation c dans la liste
     * @param c Colocation
     * @return Rang dans la liste de la colocation c
     */
    public int getPosition(Colocation c) { return colocations.indexOf(c); }

}
