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

import api.controllers.AchievedServiceManager;
import api.controllers.ColocationManager;
import api.controllers.VoteAchievedServiceManager;
import api.model.AchievedService;
import api.model.Colocation;
import api.model.User;
import api.model.VoteAchievedService;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation/{id_colocation}/achieved-service/{id_achieved_service}/vote")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les votes pour valider/refuser un service effectué
 */
public class VoteAchievedServicePaths {

	@GET
	/**
	 * Renvoie tous les votes concernant un service effectué
	 * 
	 * @param security
	 * @param idColocation
	 * @param idAchievedService
	 * @return ses votes
	 */
	public Response getVotes(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_achieved_service") Long idAchievedService) {
		Colocation c = ColocationManager.getById(idColocation);
		AchievedService as = AchievedServiceManager.getById(idAchievedService);
		if (c != null && as != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				Set<VoteAchievedService> votes = VoteAchievedServiceManager.getAll(as);
				return Response.ok(votes).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@POST
	/**
	 * Vote pour ou contre un service effectué
	 * 
	 * @param security
	 * @param idColocation
	 * @param idAchievedService
	 * @param vote
	 * @return le vote
	 */
	public Response createVote(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_achieved_service") Long idAchievedService, VoteAchievedService vote) {
		Colocation c = ColocationManager.getById(idColocation);
		AchievedService as = AchievedServiceManager.getById(idAchievedService);
		if (c != null && as != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c) && Utils.userIsBeneficiary(user, as)) {
				if (as.getValid() == null) {
					VoteAchievedService v = VoteAchievedServiceManager.create(vote, user, as);
					if (v != null) {
						return Response.ok(v).build();
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
