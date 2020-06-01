package com.example.shareloc.Utils;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

/**
 * La classe EmptyRecyclerView est une sous-classe de RecyclerView qui implémente un recyclerView vide
 */
public class EmptyRecyclerView extends RecyclerView {
    /**
     * Vue vide
     */
    private View emptyView;

    /**
     * Observateur des données
     */
    final private AdapterDataObserver observer = new AdapterDataObserver() {
        /**
         * Appelle la fonction checlIfEmpty a chaque changement.
         */
        @Override
        public void onChanged() {
            checkIfEmpty();
        }

        /**
         * Appelle la fonction checkIfEmpty à chaque nouvelle insertion de données
         * @param positionStart Position de départ de l'insartion
         * @param itemCount Nombre de données insérées
         */
        @Override
        public void onItemRangeInserted(int positionStart, int itemCount) {
            checkIfEmpty();
        }

        /**
         * Appelle la fonction checkIfEmpty à chaque nouvelle suppression de données
         * @param positionStart Position de départ de la suppression
         * @param itemCount Nombre de données supprimées
         */
        @Override
        public void onItemRangeRemoved(int positionStart, int itemCount) {
            checkIfEmpty();
        }
    };

    /**
     * Constructeur
     * @param context Contexte d'utilisation
     */
    public EmptyRecyclerView(Context context) {
        super(context);
    }

    /**
     * Constructeur
     * @param context Contexte d'utilisation
     * @param attrs Attributs
     */
    public EmptyRecyclerView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    /**
     * Constructeur
     * @param context Contexte d'utilisation
     * @param attrs Attributs
     * @param defStyle Style
     */
    public EmptyRecyclerView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    /**
     * Vérifie s'il y a des données. Si oui, affiche la vue.
     */
    void checkIfEmpty() {
        if (emptyView != null && getAdapter() != null) {
            final boolean emptyViewVisible = getAdapter().getItemCount() == 0;
            emptyView.setVisibility(emptyViewVisible ? VISIBLE : GONE);
            setVisibility(emptyViewVisible ? GONE : VISIBLE);
        }
    }

    /**
     * Modifie l'observateur
     * @param adapter Nouvel observateur
     */
    @Override
    public void setAdapter(Adapter adapter) {
        final Adapter oldAdapter = getAdapter();
        if (oldAdapter != null) {
            oldAdapter.unregisterAdapterDataObserver(observer);
        }
        super.setAdapter(adapter);
        if (adapter != null) {
            adapter.registerAdapterDataObserver(observer);
        }

        checkIfEmpty();
    }

    /**
     * Modifie la vue vide
     * @param emptyView Nouvelle vue vide
     */
    public void setEmptyView(View emptyView) {
        this.emptyView = emptyView;
        checkIfEmpty();
    }
}
