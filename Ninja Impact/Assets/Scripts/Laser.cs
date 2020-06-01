using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Laser : MonoBehaviour
{
    private Animator animator;
    private SpriteRenderer sprite;
    private BoxCollider2D col;

    private float timer = 0f;
    private int timeShooting = 3;
    private bool isShooting = false;


    void Awake()
    {
        animator = GetComponent<Animator>();
        sprite = GetComponent<SpriteRenderer>();
        col = GetComponent<BoxCollider2D>();
    }

    void Update()
    {
        HandleShooting();
    }


    // Handle laser shooting
    void HandleShooting()
    {
        if (timer % 60 > timeShooting)
        {
            isShooting = !isShooting;
            timer = 0f;
            animator.SetBool("isShooting", isShooting);
        }
        timer += Time.deltaTime;
    }

    // Change laser size when it's shooting
    public void Fire()
    {
        RaycastHit2D hit = Physics2D.Raycast(transform.position, -transform.right);
        sprite.size = new Vector2(hit.distance, 1f);
        col.size = new Vector2(hit.distance, 0.6f);
        col.offset = new Vector2(-hit.distance / 2, 0f);
    }

    // Reset laser size after shooting
    public void resetFire()
    {
        sprite.size = new Vector2(1f, 1f);
        col.size = new Vector2(1f, 0.6f);
        col.offset = new Vector2(-0.5f, 0f);
    }

    // If the player hits the laser
    void OnTriggerEnter2D(Collider2D col)
    {
        if (isShooting && col.CompareTag("Player"))
        {
            if (!col.GetComponent<HealthBar>().isDead)
            {
                col.gameObject.GetComponent<PlayerMovements>().TakeDamage(50);
            }
        }
    }
}
