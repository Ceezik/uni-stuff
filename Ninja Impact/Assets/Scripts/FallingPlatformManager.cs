using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FallingPlatformManager : MonoBehaviour
{
    public static FallingPlatformManager instance = null;

    public GameObject platformPrefab;

    private float respawnDelay = 5f;


    void Awake()
    {
        // Singleton
        if (instance == null)
        {
            instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }


    // Make a platform respawn
    IEnumerator Respawn(Vector3 position)
    {
        yield return new WaitForSeconds(respawnDelay);
        Instantiate(platformPrefab, position, platformPrefab.transform.rotation);
    }
}
