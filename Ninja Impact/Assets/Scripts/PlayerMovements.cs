using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovements : MonoBehaviour
{
    private Rigidbody2D rb;
    private Animator animator;
    private AudioManager audioManager;

    public KeyCode left;
    public KeyCode right;
    public KeyCode jump;
    public KeyCode mana;

    private float inputX;
    private int facingDirection = 1;

    private float speed = 9f;
    private float jumpForce = 10f;

    public Transform groundCheck;
    public LayerMask groundLayer;
    private bool isGrounded;

    public Transform wallCheck;
    private bool isTouchingWall;
    private bool isWallSliding;

    private Vector2 wallHopDirection = new Vector2(1f, 0.5f);
    private Vector2 wallJumpDirection = new Vector2(1f, 2f);
    private float wallHopForce = 6f;
    private float wallJumpForce = 12f;


    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
        audioManager = FindObjectOfType<AudioManager>();
        wallHopDirection.Normalize();
        wallJumpDirection.Normalize();
    }

    void Update()
    {
        HandleInput();
        HandlePlayerDirection();
        HandleWallSliding();
        HandleAnimations();
    }

    void FixedUpdate()
    {
        ApplyMovement();
        GroundCheck();
        WallCheck();
        if (Input.GetKey(jump))
        {
            Jump();
        }

        if (rb.velocity.y < 0f && !isWallSliding)
        {
            rb.velocity += Vector2.up * Physics2D.gravity.y * 1.5f * Time.deltaTime;
        }
        else if (rb.velocity.y > 0f && !isWallSliding)
        {
            rb.velocity += Vector2.up * Physics2D.gravity.y * 1f * Time.deltaTime;
        }
    }

    
    // Handle when the user press a key
    void HandleInput()
    {
        if (Input.GetKey(right))
        {
            if (inputX < 1f)
            {
                inputX += 0.1f;
            }
        }
        else if (Input.GetKey(left))
        {
            if (inputX > -1f)
            {
                inputX -= 0.1f;
            }
        }
        else
        {
            inputX = 0f;
        }
    }

    // Handle the player's direction
    void HandlePlayerDirection()
    {
        if ((facingDirection == 1 && inputX < 0f) || (facingDirection == -1 && inputX > 0f))
        {
            Flip();
        }
    }

    // Handle wall sliding
    void HandleWallSliding()
    {
        if (isTouchingWall && !isGrounded)
        {
            isWallSliding = true;
        }
        else
        {
            isWallSliding = false;
        }
    }

    // Move the player
    void ApplyMovement()
    {
        if (isGrounded)
        {
            rb.velocity = new Vector2(speed * inputX, rb.velocity.y);
        }
        else if (!isGrounded && !isWallSliding && inputX != 0f)
        {
            rb.AddForce(new Vector2(40f * inputX, 0f));
            if (Mathf.Abs(rb.velocity.x) > speed)
            {
                rb.velocity = new Vector2(speed * inputX, rb.velocity.y);
            }
        }

        if (isWallSliding && rb.velocity.y < -3f)
        {
            rb.velocity = new Vector2(rb.velocity.x, -3f);
        }
    }

    // Jump
    void Jump()
    {
        // Normal jump
        if (isGrounded && !isWallSliding)
        {
            rb.velocity = new Vector2(rb.velocity.y, jumpForce);
            audioManager.Play("jump");
        }
        // Wall hop
        else if (isWallSliding && inputX == 0)
        {
            isWallSliding = false;
            rb.velocity = new Vector2(wallHopForce * wallHopDirection.x * -facingDirection, wallHopForce * wallHopDirection.y);
            audioManager.Play("wallJump");
        }
        // Wall jump
        else if ((isWallSliding || isTouchingWall) && ((inputX > 0f && facingDirection == -1) || (inputX < 0f && facingDirection == 1)))
        {
            isWallSliding = false;
            rb.velocity = new Vector2(wallJumpForce * wallJumpDirection.x, wallJumpForce * wallJumpDirection.y);
            audioManager.Play("wallJump");
        }
    }

    // Flip the player
    void Flip()
    {
        if (!isWallSliding)
        {
            facingDirection *= -1;
            transform.Rotate(0f, 180f, 0f);
        }
    }

    // Check if the player is jumping or not
    void GroundCheck()
    {
        isGrounded = Physics2D.OverlapCircle(groundCheck.position, 0.3f, groundLayer);
    }

    // Check if the player is touching a wall or not
    void WallCheck()
    {
        isTouchingWall = Physics2D.Raycast(wallCheck.position, transform.right, 0.45f, groundLayer);
    }

    // Handle when a player take damages
    public void TakeDamage(int damage)
    {
        HealthBar health = GetComponent<HealthBar>();
        health.TakeDamage(damage);
        if (health.currentHealth > 0)
        {
            rb.velocity = new Vector2(rb.velocity.y, jumpForce);
        }
    }

    // Handle player animations
    void HandleAnimations()
    {
        if (rb.velocity.x > 0.1f || rb.velocity.x < -0.1f)
        {
            animator.SetBool("isWalking", true);
        }
        else
        {
            animator.SetBool("isWalking", false);
        }

        animator.SetBool("isGrounded", isGrounded);
        animator.SetFloat("yVelocity", rb.velocity.y);
        animator.SetBool("isWallSliding", isWallSliding);
    }
}