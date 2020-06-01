package com.example.shareloc.Utils;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.example.shareloc.R;
import com.example.shareloc.View.Authentication.Signin;
import com.example.shareloc.View.Authentication.Signup;
import android.content.Context;

/**
 * La classe AuthPagerAdapter est le gestionnaire de la page d'authentification
 */
public class AuthPagerAdapter extends FragmentPagerAdapter {
    /**
     * Nombre de tabs
     */
    private int nbTabs;
    /**
     * Tableau des titres
     */
    private static final int[] TAB_TITLES = new int[]{R.string.inscription, R.string.connexion};
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
    public AuthPagerAdapter(Context context, FragmentManager fm, int nbTabs) {
        super(fm);
        this.mContext = context;
        this.nbTabs = nbTabs;
    }

    /**
     * Renvoie un  fragment selon position
     * @param position Position de la vue sélectionnée
     * @return Fragment SignUp si position = 0 et Signin si position = 1
     */
    @Override
    public Fragment getItem(int position) {
        switch(position) {
            case 0:
                return new Signup();
            case 1:
                return new Signin();
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

