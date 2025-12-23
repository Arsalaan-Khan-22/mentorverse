package com.arsalaan.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.arsalaan.models.Category;
import com.arsalaan.repositories.CategoryRepository;
import com.arsalaan.responseWrapper.MyResponseWrapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;
	private final MyResponseWrapper responseWrapper;
	
	public ResponseEntity<?> getAllCategories() {
		List<Category> categories = categoryRepository.findAll();
		if(categories.isEmpty()) {
			return responseWrapper.response("There are no categories available", null, HttpStatus.NOT_FOUND);
		}
		return responseWrapper.response("Following Categories Found", categories, HttpStatus.OK);
	}
	
}
