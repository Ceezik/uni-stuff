using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Key : MonoBehaviour
{
    private Animator animator;
    private AudioManager audioManager;
    private KeyManager keyManager;

    private bool isTaken = false;


    void Awake()
    {
        animator = GetComponent<Animator>();
        audioManager = FindObjectOfType<AudioManager>();
        keyManager = FindObjectOfType<KeyManager>();
    }

    // If the player takes the key
    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            if (!isTaken)
            {
                animator.SetTrigger("Take");
                audioManager.Play("takeKey");
                keyManager.TakeKey();
                Destroy(gameObject, 0.3f);
            }
            isTaken = true;
        }
    }
}
