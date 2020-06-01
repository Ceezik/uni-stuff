package api.paths;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import api.controllers.ColocationManager;
import api.controllers.ServiceManager;
import api.model.Colocation;
import api.model.Service;
import api.model.User;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/colocation/{id_colocation}/service")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les services d'une colocation
 */
public class ServicePaths {

	@GET
	/**
	 * Renvoie les services d'une colocation à partir de son identifiant
	 * 
	 * @param security
	 * @param idColocation
	 * @return les services
	 */
	public Response getServices(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				ArrayList<Service> services = Utils.getColocationUnachievedServices(c);
				return Response.ok(services).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@POST
	/**
	 * Crée un service dans une colocation
	 * 
	 * @param security
	 * @param idColocation
	 * @param service
	 * @return le service créé
	 */
	public Response createService(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			Service service) {
		Colocation c = ColocationManager.getById(idColocation);
		if (c != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				return Response.status(Status.CREATED).entity(ServiceManager.create(service, c)).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@GET
	@Path("/{id_service}") 
	/**
	 * Renvoie un service à partir de son identifiant
	 * 
	 * @param security
	 * @param idColocation
	 * @param idService
	 * @return le service
	 */
	public Response getService(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_service") Long idService) {
		Colocation c = ColocationManager.getById(idColocation);
		Service s = ServiceManager.getById(idService);
		if (c != null && s != null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				return Response.ok(s).build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
	@PUT
	@Path("/{id_service}") 
	/**
	 * Modifie un service à partir de son identifiant
	 * 
	 * @param security
	 * @param idColocation
	 * @param idService
	 * @param service
	 * @return une réponse vide
	 */
	public Response updateService(@Context SecurityContext security, @PathParam("id_colocation") Long idColocation,
			@PathParam("id_service") Long idService, Service service) {
		Colocation c = ColocationManager.getById(idColocation);
		Service s = ServiceManager.getById(idService);
		if (c != null && s!= null) {
			User user = Utils.getLoggedUser(security);
			if (Utils.userIsInColocation(user, c)) {
				ServiceManager.update(s, service);
				return Response.ok().build();
			}
			return Response.status(Status.UNAUTHORIZED).build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
	
}
