package com.example.shareloc.View.Message;


import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.shareloc.Adapter.MessageAdapter;
import com.example.shareloc.Controller.MessageController;
import com.example.shareloc.Model.Message;
import com.example.shareloc.Model.User;
import com.example.shareloc.R;
import com.example.shareloc.Utils.EmptyRecyclerView;
import com.example.shareloc.Utils.JsonArrayRequestCallback;
import com.example.shareloc.View.Colocation.ColocationDetails;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;

/**
 * Fragment affichant la liste des messages
 */
public class MessagesList extends Fragment implements SwipeRefreshLayout.OnRefreshListener {
    /**
     * Layout avec rafraichissement
     */
    private SwipeRefreshLayout swipeRefreshLayout;
    /**
     * RecyclerView
     */
    private static EmptyRecyclerView rv;
    /**
     * Adapter du RecyclerView
     */
    private static MessageAdapter adapter;
    /**
     * LayoutManager du RecyclerView
     */
    private RecyclerView.LayoutManager lm;
    /**
     * Liste des messages
     */
    private static ArrayList<Message> messages = new ArrayList<>();
    /**
     * Controleur des messages
     */
    private MessageController messageController;
    /**
     * Id de la colocation
     */
    private Long colocationId;

    /**
     * Constructeur vide
     */
    public MessagesList() {  }

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
        View v = inflater.inflate(R.layout.fragment_messages_list, container, false);

        messageController = new MessageController(getContext());

        colocationId = ColocationDetails.getColocationId();

        rv = v.findViewById(R.id.messages_recycler_view);
        lm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(lm);
        View emptyView = v.findViewById(R.id.empty_messages_list);
        rv.setEmptyView(emptyView);
        adapter = new MessageAdapter(messages, getContext());
        rv.setAdapter(adapter);

        swipeRefreshLayout = v.findViewById(R.id.swipe_wrapper);
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.setColorSchemeColors(getResources().getColor(R.color.colorPrimary));

        getAll();

        return v;
    }
    /**
     * Récupère tous les messages à chaque rafraichissement
     */
    @Override
    public void onRefresh() {
        getAll();
    }

    /**
     * Récupère tous les messages
     */
    public void getAll() {

        JsonArrayRequestCallback cb = new JsonArrayRequestCallback() {
            /**
             * Ajoute les messages à la liste des messages
             * @param res Réponse de l'API
             */
            @Override
            public void onSuccess(JSONArray res) {
                messages.clear();
                swipeRefreshLayout.setRefreshing(true);

                try {
                    for (int i = 0; i < res.length(); i++) {
                        JSONObject m = res.getJSONObject(i);
                        JSONObject u = m.getJSONObject("auteur");
                        User user = new User(
                          u.getString("login"),
                          u.getString("firstname"),
                          u.getString("lastname")
                        );

                        Message message = new Message(
                                m.getLong("id"),
                                m.getString("message"),
                                user,
                                getDate(m.getString("createdAt"))
                        );

                        messages.add(message);
                    }
                    sortMessagesByDate();
                    adapter.notifyDataSetChanged();
                    scrollToLastMessage();
                }
                catch (JSONException e) {
                    Toast.makeText(getContext(), R.string.get_messages_error, Toast.LENGTH_LONG).show();
                }

                swipeRefreshLayout.setRefreshing(false);
            }

            /**
             * Affiche l'erreur
             * @param error Statut d'erreur
             */
            @Override
            public void onError(int error) {
                swipeRefreshLayout.setRefreshing(false);
                Toast.makeText(getContext(), error, Toast.LENGTH_LONG).show();
            }
        };

        messageController.getAll(cb, colocationId);
    }

    /**
     * Trie les messages selon leur date
     */
    public static void sortMessagesByDate() {
        Collections.sort(messages, new Comparator<Message>() {
            @Override
            public int compare(Message a, Message b) {
                return a.getCreatedAt().compareTo(b.getCreatedAt());
            }
        });
    }

    /**
     * Scroll directement vers le dernier message du tchat
     */
    public static void scrollToLastMessage() {
        if (!messages.isEmpty()) {
            rv.smoothScrollToPosition(messages.size() - 1);
        }
    }

    /**
     * Retourne la date à partir d'une chaîne
     * @param date Date sous forme de chaîne
     * @return Objet Date
     */
    public static Date getDate(String date) {
        SimpleDateFormat formater1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat formater2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

        try {
            if (date.contains(".")) {
                return formater1.parse(date);
            }
            else {
                return formater2.parse(date);
            }
        }
        catch (ParseException e) {
            return new Date();
        }
    }

    /**
     * Ajoute le message m
     * @param m Message à ajouter
     */
    public static void addMessage(Message m) {
        messages.add(m);
        sortMessagesByDate();
        adapter.notifyDataSetChanged();
        scrollToLastMessage();
    }

}
