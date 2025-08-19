package com.planstack.api.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
     @Bean
    public OpenAPI springOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("SGP API")
                .description("Documentação da API do Sistema de Gerenciamento de Projetos"));
    }
}
