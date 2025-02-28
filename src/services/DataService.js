import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/login", data);
  }

  register(data) {
    return http.post("/register", data);
  }
  
 getCourses() {
    return http.get("/courses");
  }

  deleteCourse(id) {
    return http.delete(`/courses/${id}`);
  }
}



export default new DataService();
