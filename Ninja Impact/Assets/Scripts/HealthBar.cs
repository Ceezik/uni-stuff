using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class HealthBar : MonoBehaviour
{
    private int maxHealth = 100;
    public int currentHealth;

    public bool isDead = false;
    private bool damaged = false;

    public Image damageImage;                                   
    private float flashSpeed = 5f;                              
    private Color flashColour = new Color(1f, 0f, 0f, 0.1f);

    public Image healthBar;

    public Cinemachine.CinemachineTargetGroup targetCamera;

    private Animator animator;
    private Rigidbody2D rb;
    private PlayerMovements playerMovements;

    private AudioManager audioManager;
    public GameObject gameOverScreen;


    void Awake()
    {
        currentHealth = maxHealth;
        animator = GetComponent<Animator>();
        rb = gameObject.GetComponent<Rigidbody2D>();
        playerMovements = gameObject.GetComponent<PlayerMovements>();
        audioManager = FindObjectOfType<AudioManager>();
    }

    // Screen animation when the player takes damages
    void Update()
    {
        if (damaged)
        {
            damageImage.color = flashColour;
        }
        else
        {
            damageImage.color = Color.Lerp(damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
        }

        damaged = false;
    }


    // Handle when a player take damages
    public void TakeDamage(int damage)
    {
        damaged = true;
        currentHealth -= damage;
        healthBar.fillAmount = (float)currentHealth / (float)maxHealth;
        if (currentHealth <= 0 && !isDead)
        {
            Die();
        }
        else
        {
            audioManager.Play("damage" + Random.Range(1, 5));
        }
    }

    // If the player has no more health
    void Die()
    {
        isDead = true;
        rb.velocity = new Vector2(0f, 0f);
        rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
        playerMovements.enabled = false;
        animator.SetBool("isDead", isDead);
        targetCamera.RemoveMember(gameObject.transform);
        audioManager.Play("playerDeath");
        if (targetCamera.IsEmpty)
        {
            gameOverScreen.SetActive(true);
        }
    }
}
