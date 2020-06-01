using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelManager : MonoBehaviour
{
    private AudioManager audioManager;
    public string musicName;

    // Change background music depending on current scene
    void Awake()
    {
        audioManager = FindObjectOfType<AudioManager>();
        audioManager.StopAll();
        audioManager.Play(musicName);
    }
}
