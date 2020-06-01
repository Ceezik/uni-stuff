package api.paths;


import java.util.ArrayList;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import api.controllers.ColocationManager;
import api.controllers.MembreManager;
import api.model.Colocation;
import api.model.Membre;
import api.model.User;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les colocations
 */
public class ColocationPaths {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	/**
	 * Renvoie les colocations dont un utilisateur fait partie
	 * 
	 * @param security
	 * @return les colocations dont il fait partie
	 */
	public Response getColocations(@Context SecurityContext security) {
		User user = Utils.getLoggedUser(security);
		Set<Membre> membres = user.getColocations();
		ArrayList<Colocation> colocations = new ArrayList<>();
		for (Membre membre : membres) {
			colocations.add(ColocationManager.getById(membre.getColocation().getId()));
		}
		return Response.ok(colocations).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	/**
	 * Crée une colocation
	 * 
	 * @param security
	 * @param colocation
	 * @return la colocation créée
	 */
	public Response createColocation(@Context SecurityContext security, Colocation colocation) {
		User user = Utils.getLoggedUser(security);
		Colocation c = ColocationManager.create(colocation);
		MembreManager.create(colocation, user, true);
		return Response.status(Status.CREATED).entity(c).build();
	}
	
	@GET
	@Path("/{id}")
	/**
	 * Renvoie une colocation à partir de son identifiant
	 * 
	 * @param security
	 * @param id
	 * @return la colocation
	 */
	public Response getColocation(@Context SecurityContext security, @PathParam("id") Long id) {
		Colocation c = ColocationManager.getById(id);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				return Response.ok(c).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@PUT
	@Path("/{id}")
	/**
	 * Modifie une colocation
	 * 
	 * @param security
	 * @param id
	 * @param colocation
	 * @return une réponse vide
	 */
	public Response updateColocation(@Context SecurityContext security, @PathParam("id") Long id, Colocation colocation) {
		Colocation c = ColocationManager.getById(id);
		if (c != null) {
			User u = Utils.getLoggedUser(security);
			if (Utils.isColocationOwner(c, u)) {
				c.setName(colocation.getName());
				ColocationManager.update(c);
				return Response.ok().build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
}
