using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pics : MonoBehaviour
{
    // Hurt the player which touches spikes
    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            col.gameObject.GetComponent<PlayerMovements>().TakeDamage(25);
        }
    }
}
