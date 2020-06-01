using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class EndScreen : MonoBehaviour
{
    // Return to menu
    public void Menu()
    {
        SceneManager.LoadScene(0);
    }

    // Exit the app
    public void Quit()
    {
        Application.Quit();
    }
}
