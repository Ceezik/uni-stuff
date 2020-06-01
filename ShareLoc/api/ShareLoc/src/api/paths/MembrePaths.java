package api.paths;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import api.controllers.ColocationManager;
import api.model.Colocation;
import api.model.User;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation/{id_colocation}/membre")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les membres d'une colocation
 */
public class MembrePaths {
	
	@GET
	/**
	 * Renvoie la liste des membres d'une colocation à partir de son identifiant
	 * 
	 * @param security
	 * @param idColocation
	 * @return
	 */
	public Response getColocationMembers(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				return Response.ok(c.getMembres()).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}

}
