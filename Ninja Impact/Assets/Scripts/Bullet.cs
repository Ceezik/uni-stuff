using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    void Awake()
    {
        StartCoroutine(MissShoot());
    }

    // When a bullet hits something
    void OnTriggerEnter2D(Collider2D col)
    {
        if (!col.CompareTag("Turret") && !col.isTrigger)
        {
            if (col.CompareTag("Player"))
            {
                col.GetComponent<HealthBar>().TakeDamage(10);
            }

            Destroy(gameObject);
        }
    }


    // Destroy the bullet if it hasn't collide with something
    public IEnumerator MissShoot()
    {
        yield return new WaitForSeconds(3f);
        Destroy(gameObject);
    }
}
