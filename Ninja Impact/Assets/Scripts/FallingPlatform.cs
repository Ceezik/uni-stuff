using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FallingPlatform : MonoBehaviour
{
    private Rigidbody2D rb;
    private Animator animator;
    private Collider2D col;
    private AudioManager audioManager;

    private float fallDelay = 1f;
    private bool isCollided = false;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
        col = GetComponent<Collider2D>();
        audioManager = FindObjectOfType<AudioManager>();
    }


    // If the player is on the platform
    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.collider.CompareTag("Player"))
        {
            if (!isCollided)
            {
                StartCoroutine(Fall());
                FallingPlatformManager.instance.StartCoroutine("Respawn", gameObject.transform.position);
            }
            isCollided = true;
        }
    }

    // Make the platform fall
    IEnumerator Fall()
    {
        yield return new WaitForSeconds(fallDelay);
        rb.bodyType = RigidbodyType2D.Dynamic;
        col.isTrigger = true;
        animator.SetTrigger("Fall");
        Destroy(gameObject, 2f);
        audioManager.Play("fallingPlatform");
    }
}
