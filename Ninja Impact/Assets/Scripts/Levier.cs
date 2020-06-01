using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Levier : MonoBehaviour
{
    private Animator animator;
    private AudioManager audioManager;

    private bool isActive = false;
    public string target;
    public GameObject door;


    void Awake()
    {
        animator = GetComponent<Animator>();
        audioManager = FindObjectOfType<AudioManager>();
    }

    // Open the door when the player activates the lever
    void OnTriggerEnter2D(Collider2D col)
    {
       if (col.name.Equals(target))
        {
            if (!isActive)
            {
                animator.SetTrigger("Activate");
                isActive = true;
                door.GetComponent<Animator>().SetTrigger("Open");
                door.GetComponent<BoxCollider2D>().isTrigger = true;
                audioManager.Play("openDoor");
            }
        }
    }
}
