package api.paths;

import java.util.Set;

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
import api.controllers.InvitationManager;
import api.controllers.UserManager;
import api.model.Colocation;
import api.model.Invitation;
import api.model.User;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/invitation")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les invitation à rejoindre une colocation
 */
public class InvitationPaths {
	
	@GET
	/**
	 * Renvoie toutes les invitations de l'utilisateur connecté
	 * 
	 * @param security
	 * @return ses invitations
	 */
	public Response getInvitations(@Context SecurityContext security) {
		User user = Utils.getLoggedUser(security);
		Set<Invitation> invitations = user.getInvitations();
		return Response.ok(invitations).build();
	}

	@POST
	@Path("/colocation/{id_colocation}")
	/**
	 * Invite un utilisateur à rejoindre une colocation
	 * 
	 * @param security
	 * @param idColocation
	 * @param body
	 * @return l'invitation
	 */
	public Response createInvitation(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			JSONObject body) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.isColocationOwner(c, user)) {
				String login = (String) body.get("login");
				User u = UserManager.getByLogin(login);
				if (u != null) {
					if (!Utils.userIsInvitedInColocation(u, c)) {
						Invitation i = InvitationManager.create(c, u, user);
						if (i != null) {
							return Response.status(Status.CREATED).entity(i).build();
						}
						return Response.status(Status.CONFLICT).build();
					}
					return Response.status(Status.CONFLICT).build();
				}
				return Response.status(Status.NOT_ACCEPTABLE).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@PUT
	@Path("/{id_invitation}")
	/**
	 * Accepte ou refuse une invitation à partir de son identifiant
	 * 
	 * @param security
	 * @param idInvitation
	 * @param body
	 * @return un message d'information
	 */
	public Response updateInivtation(@Context SecurityContext security, @PathParam("id_invitation") Long idInvitation,
			JSONObject body) {
		Invitation i = InvitationManager.getById(idInvitation);
		User u = Utils.getLoggedUser(security);
		if (i != null) {
			if (Utils.isInvitationOwner(u, i)) {
				boolean accepted = (boolean) body.get("accepted");
				InvitationManager.update(i, accepted);
				JSONObject res = new JSONObject();
				if (accepted) {
					res.put("message", "Vous faites désormais partie de cette colocation.");
				}
				else {
					res.put("message", "Vous avez refusé l'invitation.");
				}
				return Response.ok(res).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
}
