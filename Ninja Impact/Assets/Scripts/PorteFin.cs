using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PorteFin : MonoBehaviour
{
    private Animator animator;
    private BoxCollider2D col;


    void Awake()
    {
        animator = GetComponent<Animator>();
        col = GetComponent<BoxCollider2D>();
    }


    // Open final door
    public void Open()
    {
        animator.SetTrigger("Open");
        col.isTrigger = true;
    }

    // Load next scene when a player enter in final door
    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
        }
    }
}
