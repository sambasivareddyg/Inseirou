package org.inseirou.repository;

import org.inseirou.dto.MovieDTO;
import org.springframework.data.repository.ListCrudRepository;

public interface MoviesRepository extends ListCrudRepository<MovieDTO, Long> {
}
