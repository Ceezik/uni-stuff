package api.paths;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.jose4j.json.internal.json_simple.JSONObject;

import javax.ws.rs.core.Response.Status;

import api.controllers.AchievedServiceManager;
import api.controllers.ColocationManager;
import api.controllers.ServiceManager;
import api.model.AchievedService;
import api.model.Colocation;
import api.model.Service;
import api.model.User;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation/{id_colocation}/achieved-service")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les services effectués
 */
public class AchievedServicePaths {
	
	@GET
	/**
	 * Renvoie les services effectués dans une colocation
	 * 
	 * @param security
	 * @param idColocation
	 * @return les services effectués dans une colocation
	 */
	public Response getAchievedServices(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				List<AchievedService> achievedServices = Utils.getColocationAchievedServices(c);
				return Response.ok(achievedServices).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@POST
	@Path("/service/{id_service}")
	/**
	 * Crée un service effectué
	 * 
	 * @param security
	 * @param idColocation
	 * @param idService
	 * @param body
	 * @return le service effectué créé
	 */
	public Response createAchievedService(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_service") Long idService, JSONObject body) {
		Colocation c = ColocationManager.getById(idColocation);
		Service s = ServiceManager.getById(idService);
		if (c != null && s!= null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				ArrayList<BigDecimal> to = (ArrayList<BigDecimal>) body.get("to");
				AchievedService as = AchievedServiceManager.create(to, s, Utils.getMemberInColocation(user, c));
				if (as != null) {
					return Response.ok(as).build();
				}
				return Response.status(Status.CONFLICT).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@GET
	@Path("/{id_achieved_service}")
	/**
	 * Renvoie un service effectué à partir de son identifiant
	 * 
	 * @param security
	 * @param idColocation
	 * @param idAchievedService
	 * @return le service effectué
	 */
	public Response getAchievedService(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_achieved_service") Long idAchievedService) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				AchievedService as = AchievedServiceManager.getById(idAchievedService);
				if (as != null) {
					return Response.ok(as).build();
				}
				return Response.status(Status.NOT_FOUND).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
}
