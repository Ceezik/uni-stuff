using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MessageManager : MonoBehaviour
{
    public GameObject messageBox;
    public Text messageText;


    // Show the message
    public void StartMessage(string sentence)
    {
        messageBox.SetActive(true);
        StopAllCoroutines();
        StartCoroutine(TypeSentence(sentence));
    }

    // Remove the message
    public void EndMessage()
    {
        messageBox.SetActive(false);
    }

    // Animate the message
    IEnumerator TypeSentence(string sentence)
    {
        messageText.text = "";
        foreach (char letter in sentence.ToCharArray())
        {
            messageText.text += letter;
            yield return new WaitForSeconds(0.025f);
        }
    }
}
