package org.example.repository;

import org.example.dto.MovieDTO;
import org.springframework.data.repository.ListCrudRepository;

public interface MoviesRepository extends ListCrudRepository<MovieDTO, Long> {
}
