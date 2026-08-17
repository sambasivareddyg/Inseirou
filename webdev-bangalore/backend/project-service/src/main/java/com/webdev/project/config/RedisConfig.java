package com.webdev.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.serializer.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableCaching
public class RedisConfig {

    private final Environment env;

    @Value("${spring.data.redis.mode:cluster}")
    private String redisMode;

    @Value("${spring.data.redis.host:localhost}")
    private String redisHost;

    @Value("${spring.data.redis.port:6379}")
    private int redisPort;

    public RedisConfig(Environment env) {
        this.env = env;
    }

    @Bean
    @Primary
    public LettuceConnectionFactory redisConnectionFactory() {
        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .commandTimeout(Duration.ofSeconds(2))
                .shutdownTimeout(Duration.ZERO)
                .build();

        if ("standalone".equalsIgnoreCase(redisMode)) {
            return new LettuceConnectionFactory(new RedisStandaloneConfiguration(redisHost, redisPort), clientConfig);
        }

        String[] clusterNodes = env.getProperty("spring.data.redis.cluster.nodes", String[].class);
        if (clusterNodes == null || clusterNodes.length == 0) {
            String rawNodes = env.getProperty("spring.data.redis.cluster.nodes", "localhost:6379");
            clusterNodes = Arrays.stream(rawNodes.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .toArray(String[]::new);
        }

        List<String> clusterNodeList = Arrays.stream(clusterNodes)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();

        RedisClusterConfiguration clusterConfig = new RedisClusterConfiguration(clusterNodeList);
        clusterConfig.setMaxRedirects(3);
        return new LettuceConnectionFactory(clusterConfig, clientConfig);
    }

    @Bean
    public RedisCacheManager cacheManager() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(5))
                .disableCachingNullValues()
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(serializer));
        return RedisCacheManager.builder(redisConnectionFactory())
                .cacheDefaults(config)
                .build();
    }
}
