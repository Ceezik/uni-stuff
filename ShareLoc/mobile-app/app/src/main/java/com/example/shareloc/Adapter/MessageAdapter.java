package com.example.shareloc.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.example.shareloc.Model.Message;
import com.example.shareloc.Model.User;
import com.example.shareloc.R;
import com.example.shareloc.Utils.SharedPreferencesManager;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

/**
 * La classe MessageAdapter est l'adapteur du RecyclerView des messages
 */
public class MessageAdapter extends RecyclerView.Adapter<MessageAdapter.MessageViewHolder> {

    /**
     * Liste des messages
     */
    private ArrayList<Message> messages;
    /**
     * Contexte d'utilisation
     */
    private Context context;
    /**
     * Gestionnaire des préférences partagées
     */
    private SharedPreferencesManager pref;

    private static final int MESSAGE_ITEM = 0;
    private static final int MESSAGE_OWNER_ITEM = 1;

    /**
     * La classe interne MessageViewHolder est le ViewHolder du recyclerView des messages
     */
    public static class MessageViewHolder extends RecyclerView.ViewHolder {
        /**
         * TextView de l'auteur, de la date et du texte
         */
        private TextView sender, date, body;

        /**
         * Constructeur
         * @param itemView Vue à créer
         */
        MessageViewHolder(View itemView) {
            super(itemView);

            sender = itemView.findViewById(R.id.message_sender);
            date = itemView.findViewById(R.id.message_date);
            body = itemView.findViewById(R.id.message_body);
        }

        /**
         * Affiche le message m dans le ViewHolder
         * @param m Message à afficher
         */
        public void display(Message m) {
            SimpleDateFormat formater = new SimpleDateFormat("dd/MM/yyyy 'à' kk:mm");
            User u = m.getSender();

            sender.setText(u.getFirstname() + " " + u.getLastname());
            date.setText(formater.format(m.getCreatedAt()));
            body.setText(m.getMessage());
        }
    }

    /**
     * Constructeur
     * @param messages Liste des messages à afficher
     * @param context Contexte d'utilisation
     */
    public MessageAdapter(ArrayList<Message> messages, Context context) {
        this.context = context;
        this.messages = messages;
        this.pref = SharedPreferencesManager.getInstance(context);
    }

    /**
     * Récupère le type de vue à afficher
     * @param position Position du message dans la liste messages
     * @return 0 pour un message classique, 1 pour celui dont la personne est l'auteur
     */
    @Override
    public int getItemViewType(int position)
    {
        Message m = getMessage(position);
        if (m.getSender().getLogin().equals(pref.retrieveString("login"))) {
            return MESSAGE_OWNER_ITEM;
        }
        else {
            return MESSAGE_ITEM;
        }
    }

    /**
     * Relie le ViewHolder à son layout
     * @param parent Vue parente du ViewHolder
     * @param viewType Type de vue à afficher
     * @return Nouveau ViewHolder avec le bon layout
     */
    @Override
    public MessageViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view;

        if (viewType == MESSAGE_OWNER_ITEM) {
            view = layoutInflater.inflate(R.layout.message_owner_item, parent, false);
        }
        else {
            view = layoutInflater.inflate(R.layout.message_item, parent, false);
        }

        return new MessageViewHolder(view);
    }

    /**
     * Affiche le message dans holder
     * @param holder Holder du message
     * @param position Position du message dans la liste
     */
    @Override
    public void onBindViewHolder(MessageViewHolder holder, int position) {
        holder.display(messages.get(position));
    }

    /**
     * Renvoie le nombre de messages
     * @return Nombre de messages
     */
    @Override
    public int getItemCount() {
        return this.messages.size();
    }

    /**
     * Renvoie le message à la position position
     * @param position Position du message
     * @return Message à la position position
     */
    public Message getMessage(int position) { return messages.get(position); }

}
