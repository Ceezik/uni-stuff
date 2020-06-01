package api.paths;

import java.util.Set;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.jose4j.json.internal.json_simple.JSONObject;

import api.controllers.ColocationManager;
import api.controllers.MessageManager;
import api.model.Colocation;
import api.model.Message;
import api.model.User;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation/{id_colocation}/message")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les messages envoyés au sein d'une colocation
 */
public class MessagePaths {

	@GET
	/**
	 * Renvoie tous les messages envoyés dans une colocation
	 * 
	 * @param security
	 * @param idColocation
	 * @return les messages envoyés
	 */
	public Response getMessages(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (user != null && Utils.userIsInColocation(user, c)) {
				Set<Message> messages = MessageManager.getAllByColocation(c);
				return Response.ok(messages).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@POST
	/**
	 * Envoie un message dans une colocation
	 * 
	 * @param security
	 * @param idColocation
	 * @param message
	 * @return le message envoyé
	 */
	public Response addMessageToColocation(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			Message message) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (user != null && Utils.userIsInColocation(user, c)) {
				Message m = MessageManager.create(message, user, c);
				return Response.status(Status.CREATED).entity(m).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@PUT
	@Path("/{id_message}")
	/**
	 * Modifie un message à partir de son identifiant
	 * 
	 * @param security
	 * @param idColocation
	 * @param idMessage
	 * @param message
	 * @return le message modifié
	 */
	public Response updateMessage(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			 @PathParam("id_message") Long idMessage, Message message) {
		Colocation c = ColocationManager.getById(idColocation);
		Message m = MessageManager.getById(idMessage);
		if (c != null && m != null) {
			User user = Utils.getLoggedUser(security);
			if (user != null && Utils.isMessageOwner(user, m)) {
				m.setMessage(message.getMessage());
				Message newMessage = MessageManager.update(m);
				return Response.ok(newMessage).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@DELETE
	@Path("/{id_message}")
	/**
	 * Supprime un message à partir de son identifiant
	 * 
	 * @param security
	 * @param idColocation
	 * @param idMessage
	 * @return un message d'information
	 */
	public Response deleteMessage(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			 @PathParam("id_message") Long idMessage) {
		Colocation c = ColocationManager.getById(idColocation);
		Message m = MessageManager.getById(idMessage);
		if (c != null && m != null) {
			User user = Utils.getLoggedUser(security);
			if (user != null && Utils.isMessageOwner(user, m)) {
				MessageManager.delete(m);
				JSONObject res = new JSONObject();
				res.put("message", "Message supprimé");
				return Response.ok(res).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
}
