using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class KeyManager : MonoBehaviour
{
    public int maxKey;
    private int nbKey = 0;

    private PorteFin porteFin;


    void Awake()
    {
        porteFin = FindObjectOfType<PorteFin>();
    }


    // When the player takes a key
    public void TakeKey()
    {
        if (nbKey < maxKey)
        {
            nbKey++;
        }
        
        // Open the final door if the player has all keys
        if (HasAllKeys())
        {
            porteFin.Open();
        }
    }

    // If the player has taken all keys
    public bool HasAllKeys()
    {
        if (nbKey == maxKey)
        {
            return true;
        }
        return false;
    }
}
