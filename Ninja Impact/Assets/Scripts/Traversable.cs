using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class Traversable : MonoBehaviour
{
    private Collider2D wallCollider;

    void Awake()
    {
        wallCollider = gameObject.GetComponent<TilemapCollider2D>();
    }

    // Desactivate wall collider if a player is invisible
    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.collider.CompareTag("Player"))
        {
            bool traversable = col.collider.GetComponent<Mana>().isInvisible;
            wallCollider.isTrigger = traversable;
        }
    }

    // Desactivate or activate wall collider if a player is invisible or not
    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            bool traversable = col.GetComponent<Mana>().isInvisible;
            wallCollider.isTrigger = traversable;
        }
    }
}
