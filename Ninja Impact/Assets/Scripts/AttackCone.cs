using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AttackCone : MonoBehaviour
{
    private TurretAI turret;
    public bool isRight;


    void Awake()
    {
        turret = GetComponentInParent<TurretAI>();
    }


    // If the player is in turret range then attack
    void OnTriggerStay2D(Collider2D col)
    {
        if (col.CompareTag("Player") && !col.GetComponent<Mana>().isInvisible && !col.GetComponent<HealthBar>().isDead)
        {
            turret.Attack(isRight, col.transform);
        }
    }
}
