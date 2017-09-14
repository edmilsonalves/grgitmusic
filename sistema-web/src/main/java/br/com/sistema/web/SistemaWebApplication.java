package br.com.sistema.web;

import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.DispatcherServlet;

import com.opensymphony.sitemesh.webapp.SiteMeshFilter;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SistemaWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaWebApplication.class, args);
	}

    @Bean(name="multipartResolver")
    public CommonsMultipartResolver getResolver() throws IOException{
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();

        //Set the maximum allowed size (in bytes) for each individual file.
        resolver.setMaxUploadSizePerFile(50242880);
        resolver.setMaxUploadSize(50242880);
        resolver.setDefaultEncoding("utf-8");
        //You may also set other available properties.

        return resolver;
    }

	@Bean
	public ServletRegistrationBean dispatcherRegistration(DispatcherServlet dispatcherServlet) {
		ServletRegistrationBean registration = new ServletRegistrationBean(dispatcherServlet);
		registration.setName("sistema-web");
		registration.addUrlMappings("/page/*", "/none/*", "/plain/*");
		return registration;
	}

	@Bean
	public FilterRegistrationBean sitemeshFilter() {
		FilterRegistrationBean filter = new FilterRegistrationBean();
		filter.setName("sitemesh");
		filter.setFilter(new SiteMeshFilter());
		filter.addUrlPatterns("*.html");
		filter.addInitParameter("decorators-file", "/WEB-INF/decorators.xml");
		return filter;
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
