using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TurretAI : MonoBehaviour
{
    private int currentHealth;

    private float wakeRange = 8f;
    private bool isAwake = false;
    private bool isLookingRight = true;

    private float shootSpeed = 1f;
    private float bulletSpeed = 10f;
    private float bulletTimer;

    public GameObject bullet;
    public Transform[] targets;
    private Animator animator;
    public Transform shootPointLeft, shootPointRight;

    private AudioManager audioManager;


    void Awake()
    {
        animator = GetComponent<Animator>();
        audioManager = FindObjectOfType<AudioManager>();
    }

    void Update()
    {
        RangeCheck();
        if (isAwake)
        {
            HandleLookingPosition();
        }
        HandleAnimations();
    }


    // Check if a player is in turret range
    void RangeCheck()
    {
        foreach(Transform target in targets)
        {
            float distance = Vector3.Distance(transform.position, target.transform.position);
            if (distance < wakeRange)
            {
                if (!target.GetComponent<Mana>().isInvisible && !target.GetComponent<HealthBar>().isDead)
                {
                    isAwake = true;
                    break;
                }
                    
            }
            else
            {
                isAwake = false;
            }
        }
    }

    // Decide in which direction the turret should look
    void HandleLookingPosition()
    {
        foreach (Transform target in targets)
        {
            if (!target.GetComponent<HealthBar>().isDead)
            {
                if (Vector3.Distance(transform.position, target.transform.position) < wakeRange)
                {
                    if (target.transform.position.x > transform.position.x)
                    {
                        isLookingRight = true;
                    }
                    else
                    {
                        isLookingRight = false;
                    }
                }
            }
        }
    }

    // Handle turret animations
    void HandleAnimations()
    {
        animator.SetBool("isAwake", isAwake);
        animator.SetBool("isLookingRight", isLookingRight);
    }

    // Throw a bullet on the player
    public void Attack(bool isAttackingRight, Transform target)
    {
        bulletTimer += Time.deltaTime;

        if (bulletTimer >= shootSpeed)
        {
            Vector2 direction = target.transform.position - transform.position;
            direction.Normalize();

            Transform shootPoint;

            if (!isAttackingRight)
            {
                shootPoint = shootPointLeft;
            }
            else
            {
                shootPoint = shootPointRight;
            }

            GameObject bulletClone = Instantiate(bullet, shootPoint.transform.position, shootPointLeft.transform.rotation);
            bulletClone.GetComponent<Rigidbody2D>().velocity = direction * bulletSpeed;
            bulletTimer = 0f;
            audioManager.Play("turretShoot");
        }
    }
}
