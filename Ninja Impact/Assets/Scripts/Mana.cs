using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Mana : MonoBehaviour
{
    private float maxMana = 5f;
    private float currentMana;
    private PlayerMovements player;

    private bool isRegenerating = false;

    private SpriteRenderer sprite;
    private GameObject[] walls;

    public bool isInvisible = false;
    Color defaultColor = new Color(1f, 1f, 1f, 1f);
    Color invisibleColor = new Color(1f, 1f, 1f, .4f);

    public Image manaBar;
    private HealthBar health;


    void Awake()
    {
        currentMana = maxMana;
        sprite = GetComponent<SpriteRenderer>();
        player = GetComponent<PlayerMovements>();
        walls = GameObject.FindGameObjectsWithTag("Traversable");
        health = GetComponent<HealthBar>();
    }

    void FixedUpdate()
    {
        HandleMana();
        HandleInvisibility();
        if (isRegenerating)
        {
            Regenerate();
        }
    }

    // Handle mana
    void HandleMana()
    {
        if (Input.GetKey(player.mana) && !health.isDead)
        {
            isInvisible = true;
            isRegenerating = false;
            StopAllCoroutines();
            if (currentMana < 1f)
            {
                currentMana = 0f;
                isInvisible = false;
            }
            else
            {
                currentMana -= Time.deltaTime;
            }
            manaBar.fillAmount = currentMana / maxMana;
        }
        else
        {
            isInvisible = false;
            if (currentMana < maxMana)
            {
                StartCoroutine(HandleRegenerate());
            }
        }
    }

    // Handle invisibility
    void HandleInvisibility()
    {
        if (isInvisible)
        {
            sprite.color = invisibleColor;
        }
        else if (!isInvisible && sprite.color != defaultColor)
        {
            sprite.color = defaultColor;

        }
    }

    // Regenerate mana every second
    void Regenerate()
    {
        if (currentMana < maxMana)
        {
            currentMana += Time.deltaTime;
            manaBar.fillAmount = currentMana / maxMana;
        }
        else
        {
            isRegenerating = false;
        }
    }

    // Coroutine to regenerate mana if the player doesn't use it during a certain time
    IEnumerator HandleRegenerate()
    {
        yield return new WaitForSeconds(3f);
        isRegenerating = true;
    }
}
