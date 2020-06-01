package com.example.shareloc.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.shareloc.Model.Invitation;
import com.example.shareloc.R;
import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;

/**
 * La classe InvitationAdapter est l'adapteur du RecyclerView des invitations
 */
public class InvitationAdapter extends RecyclerView.Adapter<InvitationAdapter.InvitationViewHolder> {

    /**
     * Cette interface précise les fonctions à appeler selon les événements
     */
    public interface InvitationAdapterListener {
        /**
         * Action à effectuer lors du clic sur le bouton Accepter
         * @param v Vue sur laquelle l'événement s'est déclenché
         * @param i Invitation liée au holder
         */
        void onClickBtnAccepted(View v, Invitation i);
        /**
         * Action à effectuer lors du clic sur le bouton Refuser
         * @param v Vue sur laquelle l'événement s'est déclenché
         * @param i Invitation liée au holder
         */
        void onClickBtnRefused(View v, Invitation i);
    }

    /**
     * Liste des invitations
     */
    private ArrayList<Invitation> invitations;
    /**
     * Ecouteur d'événement du viewHolder
     */
    private InvitationAdapterListener listener;


    /**
     * La classe interne InvitationViewHolder est le ViewHolder du RecyclerView des invitations
     */
    public class InvitationViewHolder extends RecyclerView.ViewHolder {
        private TextView invitationText;
        private MaterialButton btnAccepted, btnRefused;
        private Context context;

        /**
         * Constructeur
         * @param itemView Vue à créer
         */
        public InvitationViewHolder(View itemView) {
            super(itemView);

            context = itemView.getContext();
            invitationText = itemView.findViewById(R.id.invitation_text);
            btnAccepted = itemView.findViewById(R.id.btn_accepted);
            btnRefused = itemView.findViewById(R.id.btn_refused);

            btnAccepted.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onClickBtnAccepted(v, getInvitation(getAdapterPosition()));
                }
            });

            btnRefused.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onClickBtnRefused(v, getInvitation(getAdapterPosition()));
                }
            });
        }

        /**
         * Affiche l'invitation i dans le ViewHolder
         * @param i Invitation à afficher
         */
        public void display(Invitation i) {
            invitationText.setText(i.getUserName() + " " + context.getResources().getString(R.string.invitation_text) + " " + i.getColocationName());
        }
    }

    /**
     * Constructeur
     * @param invitations Liste des invitations à afficher
     */
    public InvitationAdapter(ArrayList<Invitation> invitations, InvitationAdapterListener listener) {
        this.invitations = invitations;
        this.listener = listener;
    }

    /**
     * Relie le ViewHolder à son layout
     * @param parent Vue parente du ViewHolder
     * @param viewType Type de vue à afficher
     * @return Nouveau ViewHolder avec le bon layout
     */
    @Override
    public InvitationViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.invitation_item, parent, false);
        return new InvitationViewHolder(view);
    }

    /**
     * Affiche le message dans holder
     * @param holder Holder du message
     * @param position Position de l'invitation dans la liste
     */
    @Override
    public void onBindViewHolder(InvitationViewHolder holder, int position) {
        holder.display(invitations.get(position));
    }

    /**
     * Renvoie le nombre d'invitations de l'utilisateur
     * @return Nombre d'invitations
     */
    @Override
    public int getItemCount() {
        return this.invitations.size();
    }

    /**
     * Renvoie l'invitation à la position position
     * @param position Position de l'invitation
     * @return Invitation à la position position
     */
    public Invitation getInvitation(int position) { return invitations.get(position); }

}
