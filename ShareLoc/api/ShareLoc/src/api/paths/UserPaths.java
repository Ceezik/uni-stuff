package api.paths;


import java.util.List;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.jose4j.json.internal.json_simple.JSONObject;

import api.controllers.ColocationManager;
import api.controllers.UserManager;
import api.model.Colocation;
import api.model.Membre;
import api.model.User;
import api.security.Password;
import api.security.SigninNeeded;
import api.utils.Utils;

@Path("/")
@SigninNeeded
/**
 * Classe gérant les requêtes concernant les utilisateurs
 */
public class UserPaths {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/profil")
	/**
	 * Renvoie les informatins de l'utilisateur connecté
	 * 
	 * @param security
	 * @return ses inforrmations
	 */
	public Response whoami(@Context SecurityContext security) {
		User user = UserManager.getByLogin(security.getUserPrincipal().getName());
		return Response.ok().entity(Utils.serializeUser(user)).build();
	}
	
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/profil")
	/**
	 * Modifie le nom et le prénom de l'utilisateur connecté
	 * 
	 * @param security
	 * @param user
	 * @return une réponse vide
	 */
	public Response updateAccount(@Context SecurityContext security, User user) {
		User u = UserManager.getByLogin(security.getUserPrincipal().getName());
		u.setFirstname(user.getFirstname());
		u.setLastname(user.getLastname());
		UserManager.update(u);
		return Response.ok().build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/user/colocation/{id_colocation}")
	/**
	 * Renvoie la liste de tous les utilisateurs sauf ceux faisant partie de la colocation
	 * 
	 * @param security
	 * @param colocationId
	 * @return la liste des utilisateurs
	 */
	public Response getUsers(@Context SecurityContext security, @PathParam("id_colocation") Long colocationId) {
		User user = Utils.getLoggedUser(security);
		Colocation c = ColocationManager.getById(colocationId);
		if (c != null && Utils.userIsInColocation(user, c)) {
			List<User> users = UserManager.getAll();
			users.remove(user);
			Set<Membre> membres = c.getMembres();

			for (Membre m : membres) {
				for (User u : users) {
					if (u.getLogin().equals(m.getMembre().getLogin())) {
						users.remove(u);
						break;
					}
				}
			}
			
			return Response.ok(users).build();
		}
		return Response.status(Status.UNAUTHORIZED).build();
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/user/password")
	/**
	 * Modifie le mot de passe d'un utilisateur
	 * 
	 * @param security
	 * @param params
	 * @return un message d'information
	 */
	public Response updatePassword(@Context SecurityContext security, JSONObject params) {
		try {
			String currentPassword = params.get("currentPassword").toString();
			String newPassword = params.get("newPassword").toString();
			User u = UserManager.getByLogin(security.getUserPrincipal().getName());
			if (Password.verifyPassword(currentPassword, u.getPassword())) {
				u.setPassword(Password.hashPassword(newPassword).get());
				UserManager.update(u);
				JSONObject res = new JSONObject();
				res.put("message", "Mot de passe modifié");
				return Response.ok(res.toString()).build();
			}
			return Response.status(Status.NOT_ACCEPTABLE).build();
		}
		catch (Exception e) {
			return Response.status(Status.NOT_ACCEPTABLE).build();
		}
	}
	
}
