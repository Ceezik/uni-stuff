using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameOverScreen : MonoBehaviour
{
    private AudioManager audioManager;


    void Awake()
    {
        audioManager = FindObjectOfType<AudioManager>();
    }


    // Stop the background music and play game over music
    public void StopMusic()
    {
        audioManager.StopAll();
        audioManager.Play("gameOver");
    }

    // Reload the current scene
    public void Retry()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

    // Exit the app
    public void Quit()
    {
        Application.Quit();
    }
}
