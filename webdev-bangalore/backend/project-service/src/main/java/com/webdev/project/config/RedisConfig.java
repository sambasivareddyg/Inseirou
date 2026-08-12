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
        if ("standalone".equalsIgnoreCase(redisMode)) {
            return new LettuceConnectionFactory(new RedisStandaloneConfiguration(redisHost, redisPort));
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
        return new LettuceConnectionFactory(clusterConfig);
    }

    @Bean
    public RedisCacheManager cacheManager() {
        // 1. Configure Jackson ObjectMapper to handle Java 8 Date/Time
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    // Optional: Write dates as ISO-8601 strings ("2026-08-11T19:41:00") instead of array timestamps ([2026,8,11,19,41])
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    // 2. Pass the configured ObjectMapper to the serializer
    GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(15))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(serializer));
        return RedisCacheManager.builder(redisConnectionFactory())
                .cacheDefaults(config).build();
    }
}
