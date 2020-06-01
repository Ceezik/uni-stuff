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
import api.controllers.VoteServiceManager;
import api.model.Colocation;
import api.model.Service;
import api.model.User;
import api.model.VoteService;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation/{id_colocation}/service/{id_service}/vote")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les votes pour valider/refuser un service
 */
public class VoteServicePaths {
	
	@GET
	/**
	 * Renvoie tous les votes concernant la validation d'un service
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
				Set<VoteService> votes = VoteServiceManager.getAll(s);
				return Response.ok(votes).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}

	@POST
	/**
	 * Vote pour ou contre la validation d'un service
	 * 
	 * @param security
	 * @param idColocation
	 * @param idService
	 * @param voteService
	 * @return le vote
	 */
	public Response createVote(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_service") Long idService, VoteService voteService) {
		Colocation c = ColocationManager.getById(idColocation);
		Service s = ServiceManager.getById(idService);
		if (c != null && s != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				if (s.getAccepted() == null) {
					VoteService v = VoteServiceManager.create(voteService, user, s);
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
