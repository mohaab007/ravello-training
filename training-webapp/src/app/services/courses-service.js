'use strict';

angular.module('trng.services').factory('trng.services.CoursesService', [
	'trng.proxies.CoursesProxy',
	'trng.transformers.CoursesTransformer',
	function(coursesProxy, coursesTrans) {
		
		var service = {
			getAllCourses: function() {
				var promise = coursesProxy.getAllCourses();

                var courseEntities = [];

                return promise.then(function(result) {
                    _.forEach(result.data, function(currentLabDto) {
						var currentLabEntity = coursesTrans.dtoToEntity(currentLabDto);
                        courseEntities.push(currentLabEntity);
                    });
                    return courseEntities;
				});
			},

            getCourseById: function(courseId) {
                return coursesProxy.getCourseById(courseId).then(
                    function(result) {
                        return coursesTrans.dtoToEntity(result.data);
                    }
                );
            },

            add: function(entity) {
                var dto = coursesTrans.entityToDto(entity);
                return coursesProxy.add(dto).then(
                    function(result) {
                        return coursesTrans.dtoToEntity(result.data);
                    }
                );
            },

            update: function(entity) {
                var dto = coursesTrans.entityToDto(entity);
                return coursesProxy.update(dto);
            },

            delete: function(entity) {
                var dto = coursesTrans.entityToDto(entity);
                return coursesProxy.delete(dto);
            },

            deleteById: function(entityId) {
                return coursesProxy.deleteById(entityId);
            }
        };
		
		return service;
}]);