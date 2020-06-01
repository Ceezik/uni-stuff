package com.example.shareloc.Utils;

import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

/**
 * La classe RecyclerItemClickListener est l'écouteur des événements sur les items d'un recyclerView
 */
public class RecyclerItemClickListener {
    /**
     * RecyclerViewsur lequel écoute l'instance.
     */
    private final RecyclerView mRecyclerView;
    /**
     * Ecouteur du clic sur un item
     */
    private OnItemClickListener mOnItemClickListener;
    /**
     * Ecouteur du clic long sur un item
     */
    private OnItemLongClickListener mOnItemLongClickListener;
    /**
     * Id de l'item du RecyclerView
     */
    private int mItemID;

    /**
     * Ecouteur du clic sur le RecyclerView
     */
    private View.OnClickListener mOnClickListener = new View.OnClickListener() {
        /**
         * Execute onItemClicked sur l'item cliqué à chaque clic sur le recyclerView
         * @param v Vue cliquée
         */
        @Override
        public void onClick(View v) {
            if (mOnItemClickListener != null) {
                RecyclerView.ViewHolder holder = mRecyclerView.getChildViewHolder(v);
                mOnItemClickListener.onItemClicked(mRecyclerView, holder.getAdapterPosition(), v);
            }
        }
    };

    /**
     * Ecouteur du clic long sur le RecyclerView
     */
    private View.OnLongClickListener mOnLongClickListener = new View.OnLongClickListener() {
        /**
         * Execute onItemLongClicked sur l'item cliqué à chaque clic sur le recyclerView
         * @param v Vue cliquée
         * @return
         */
        @Override
        public boolean onLongClick(View v) {
            if (mOnItemLongClickListener != null) {
                RecyclerView.ViewHolder holder = mRecyclerView.getChildViewHolder(v);
                return mOnItemLongClickListener.onItemLongClicked(mRecyclerView, holder.getAdapterPosition(), v);
            }
            return false;
        }
    };

    /**
     * Lien entre les vues et les écouteurs
     */
    private RecyclerView.OnChildAttachStateChangeListener mAttachListener
            = new RecyclerView.OnChildAttachStateChangeListener() {
        /**
         * Associe la vue attachée à l'écran à un écouteur.
         * @param view Vue à l'écran
         */
        @Override
        public void onChildViewAttachedToWindow(View view) {
            if (mOnItemClickListener != null) {
                view.setOnClickListener(mOnClickListener);
            }
            if (mOnItemLongClickListener != null) {
                view.setOnLongClickListener(mOnLongClickListener);
            }
        }

        @Override
        public void onChildViewDetachedFromWindow(View view) {

        }
    };

    /**
     * Constructeur
     * @param recyclerView RecyclerView à traité
     * @param itemID Id de l'item
     */
    private RecyclerItemClickListener(RecyclerView recyclerView, int itemID) {
        mRecyclerView = recyclerView;
        mItemID = itemID;
        mRecyclerView.setTag(itemID, this);
        mRecyclerView.addOnChildAttachStateChangeListener(mAttachListener);
    }

    /**
     * Ajoute l'écouteur à la vue
     * @param view Vue à traiter
     * @param itemID Id de l'item dans le RecyclerView
     * @return Ecouteur de la vue view
     */
    public static RecyclerItemClickListener addTo(RecyclerView view, int itemID) {
        RecyclerItemClickListener support = (RecyclerItemClickListener) view.getTag(itemID);
        if (support == null) {
            support = new RecyclerItemClickListener(view, itemID);
        }
        return support;
    }

    public static RecyclerItemClickListener removeFrom(RecyclerView view, int itemID) {
        RecyclerItemClickListener support = (RecyclerItemClickListener) view.getTag(itemID);
        if (support != null) {
            support.detach(view);
        }
        return support;
    }

    /**
     * Modifie l'écouteur du clic
     * @param listener Nouvel écouteur
     * @return Ecouteur global
     */
    public RecyclerItemClickListener setOnItemClickListener(OnItemClickListener listener) {
        mOnItemClickListener = listener;
        return this;
    }

    public RecyclerItemClickListener setOnItemLongClickListener(OnItemLongClickListener listener) {
        mOnItemLongClickListener = listener;
        return this;
    }

    /**
     * Détache la vue de l'écran et de son écouteur
     * @param view
     */
    private void detach(RecyclerView view) {
        view.removeOnChildAttachStateChangeListener(mAttachListener);
        view.setTag(mItemID, null);
    }

    /**
     * Interface qui permet de coder le clic sur un item
     */
    public interface OnItemClickListener {
        /**
         * Actions à réaliser après le clic sur un item
         * @param recyclerView RecyclerView cliqué
         * @param position Position de l'élément cliqué dans le RecyclerView
         * @param v Vue cliquée
         */
        void onItemClicked(RecyclerView recyclerView, int position, View v);
    }

    /**
     * Interface qui permet de coder le clic long sur un item
     */
    public interface OnItemLongClickListener {
        /**
         * Actions à réaliser après le clic long sur un item
         * @param recyclerView RecyclerView cliqué
         * @param position Position de l'élément cliqué dans le RecyclerView
         * @param v Vue cliquée
         */
        boolean onItemLongClicked(RecyclerView recyclerView, int position, View v);
    }
}
