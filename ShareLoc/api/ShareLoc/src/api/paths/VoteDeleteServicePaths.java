package api.paths;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import api.controllers.ColocationManager;
import api.controllers.ServiceManager;
import api.controllers.VoteDeleteServiceManager;
import api.model.Colocation;
import api.model.Service;
import api.model.User;
import api.model.VoteDeleteService;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation/{id_colocation}/service/{id_service}/delete/vote")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les votes pour valider/refuser la suppression d'un service
 */
public class VoteDeleteServicePaths {
	
	@GET
	/**
	 * Renvoie tous les votes concernant la suppression d'un service
	 * @param security
	 * @param idColocation
	 * @param idService
	 * @return ses votes
	 */
	public Response getVotes(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_service") Long idService) {
		Colocation c = ColocationManager.getById(idColocation);
		Service s = ServiceManager.getById(idService);
		if (c != null && s != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				Set<VoteDeleteService> votes = VoteDeleteServiceManager.getAll(s);
				return Response.ok(votes).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}	
	
	@POST
	/**
	 * Vote pour ou contre la suppression d'un service
	 * 
	 * @param security
	 * @param idColocation
	 * @param idService
	 * @param voteDeleteService
	 * @return le vote
	 */
	public Response createVote(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_service") Long idService, VoteDeleteService voteDeleteService) {
		Colocation c = ColocationManager.getById(idColocation);
		Service s = ServiceManager.getById(idService);
		if (c != null && s != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				if (s.getDeleted() == null) {
					VoteDeleteService v = VoteDeleteServiceManager.create(voteDeleteService, user, s);
					if (v != null) {
						return Response.status(Status.CREATED).entity(v).build();
					}
					return Response.status(Status.CONFLICT).build();
				}
				return Response.status(Status.NOT_ACCEPTABLE).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
}
