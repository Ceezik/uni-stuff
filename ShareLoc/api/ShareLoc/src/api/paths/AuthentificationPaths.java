package api.paths;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.jose4j.json.internal.json_simple.JSONObject;

import api.controllers.UserManager;
import api.model.User;
import api.security.JWTokenUtility;

@Path("/")
/**
 * Classe gérant les requêtes concernant l'authentification
 */
public class AuthentificationPaths {

	@POST
	@Path("/signup")
	@Produces(MediaType.APPLICATION_JSON)
	/**
	 * Enregistre un nouvel utilisateur
	 * @param user
	 * @return un message d'information
	 */
	public Response signup(User user) {
		if (UserManager.create(user)) {
			JSONObject res = new JSONObject();
			res.put("message", "Utilisateur créé");
			return Response.status(Status.CREATED).entity(res.toString()).build();
		}
		return Response.status(Status.CONFLICT).build();

	}

	@POST
	@Path("/signin")
	@Produces(MediaType.APPLICATION_JSON)
	/**
	 * Permet à un utilisateur de se connecter
	 * 
	 * @param user
	 * @return son token d'identification
	 */
	public Response signin(User user) {
		User u = UserManager.login(user);	
		if (u != null) {
			JSONObject res = new JSONObject();
			res.put("token", JWTokenUtility.buildJWT(u.getLogin()));
			return Response.ok(res.toString()).build();
		}
		return Response.status(Status.UNAUTHORIZED).build();		
	}

}
