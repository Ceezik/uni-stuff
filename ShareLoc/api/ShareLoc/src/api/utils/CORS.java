package api.utils;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

@Provider
/**
 * Classe permettant d'�viter les probl�mes de CORS
 */
public class CORS implements ContainerResponseFilter {

	@Override
	/**
	 * Rajoute des options aux headers de toutes les requ�tes pour ne pas avoir de probl�mes de CORS
	 */
	  public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
	    responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
	    responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
	    responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
	    responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
	  }
	
}
