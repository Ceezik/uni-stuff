package com.example.shareloc.Utils;

import android.content.Context;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.example.shareloc.R;
import com.example.shareloc.View.Member.MembersList;
import com.example.shareloc.View.Message.MessagesList;
import com.example.shareloc.View.Service.ServicesWrapper;

/**
 * La classe ColocationPagerAdapter est le gestionnaire de la page d'une colocation
 */
public class ColocationPagerAdapter extends FragmentPagerAdapter {
    /**
     * Nombre de tabs
     */
    private int nbTabs;
    /**
     * Tableau des titres
     */
    private static final int[] TAB_TITLES = new int[]{R.string.members, R.string.services, R.string.messages};
    /**
     * Contexte d'utilisation
     */
    private final Context mContext;

    /**
     * Constructeur
     * @param context Contexte d'utilisation
     * @param fm Gestionnaire du fragment
     * @param nbTabs Nombre de tabs
     */
    public ColocationPagerAdapter(Context context, FragmentManager fm, int nbTabs) {
        super(fm);
        this.mContext = context;
        this.nbTabs = nbTabs;
    }

    /**
     * Renvoie un  fragment selon position
     * @param position Position de la vue sélectionnée
     * @return Fragment MembersList si position = 0, ServicesList si osition = 1 et MessagesList si position = 2
     */
    @Override
    public Fragment getItem(int position) {
        switch(position) {
            case 0:
                return new MembersList();
            case 1:
                return new ServicesWrapper();
            case 2:
                return new MessagesList();
            default:
                return null;
        }
    }

    /**
     * Retourne nbTabs
     * @return nbTabs
     */
    @Override
    public int getCount() {
        return this.nbTabs;
    }

    /**
     * Retourne le titre de la page selon la position
     * @param position Position de la page
     * @return Titre de la page à afficher
     */
    @Override
    public CharSequence getPageTitle(int position) {
        return mContext.getResources().getString(TAB_TITLES[position]);
    }
}
