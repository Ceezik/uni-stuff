using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Message : MonoBehaviour
{
    [TextArea(3, 10)]
    public string sentence;

    private MessageManager messageManager;


    void Awake()
    {
        messageManager = FindObjectOfType<MessageManager>();

    }

    // Show a message when a player touches a sign
    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            messageManager.StartMessage(sentence);
        }
    }

    // Remove message when a player exits a sign
    void OnTriggerExit2D(Collider2D col)
    {
        if (col.CompareTag("Player"))
        {
            messageManager.EndMessage();
        }
    }

    
}
