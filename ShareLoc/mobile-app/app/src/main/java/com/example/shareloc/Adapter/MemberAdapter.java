package com.example.shareloc.Adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.shareloc.Model.Membre;
import com.example.shareloc.R;

import java.util.ArrayList;

/**
 * La classe MemberAdapter est l'adapteur du RecyclerView des membres
 */
public class MemberAdapter extends RecyclerView.Adapter<MemberAdapter.MemberViewHolder> {

    /**
     * Liste des membres
     */
    private ArrayList<Membre> membres;

    /**
     * La classe interne MemberViewHolder est le ViewHolder du RecyclerView des membres
     */
    public static class MemberViewHolder extends RecyclerView.ViewHolder {
        private TextView fullname, points;
        private ImageView iconEstGestionnaire;

        /**
         * Constructeur
         * @param itemView Vue à créer
         */
        MemberViewHolder(View itemView) {
            super(itemView);

            fullname = itemView.findViewById(R.id.fullname);
            points = itemView.findViewById(R.id.points);
            iconEstGestionnaire = itemView.findViewById(R.id.icon_is_gestionnaire);
        }

        /**
         * Affiche le membre m dans le ViewHolder
         * @param m Membre à afficher
         */
        public void display(Membre m) {
            fullname.setText(m.getFullname());
            if (!m.estGestionnaire()) iconEstGestionnaire.setVisibility(View.INVISIBLE);

            int nbPoints = m.getPoints();
            if (nbPoints > 1) points.setText(nbPoints + " points");
            else points.setText(nbPoints + " point");
        }
    }

    /**
     * Constructeur
     * @param membres Liste des membres à afficher
     */
    public MemberAdapter(ArrayList<Membre> membres) { this.membres = membres; }

    /**
     * Relie le ViewHolder à son layout
     * @param parent Vue parente du ViewHolder
     * @param viewType Type de vue à afficher
     * @return Nouveau ViewHolder avec le bon layout
     */
    @Override
    public MemberViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.member_item, parent, false);
        return new MemberViewHolder(view);
    }

    /**
     * Affiche le message dans holder
     * @param holder Holder du message
     * @param position Position du membre dans la liste
     */
    @Override
    public void onBindViewHolder(MemberViewHolder holder, int position) {
        holder.display(membres.get(position));
    }

    /**
     * Renvoie le nombre de membres dans la colocation
     * @return Nombre de membres
     */
    @Override
    public int getItemCount() {
        return this.membres.size();
    }

    public Membre getMembre(int position) { return membres.get(position); }

}
