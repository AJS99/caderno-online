Parse.initialize("caderno7259"); 
Parse.serverURL = 'https://caderno-on-line.herokuapp.com/parse';

var Instituicao = Parse.Object.extend("Instituicao");
var Curso = Parse.Object.extend("Curso");
var Disciplina = Parse.Object.extend("Disciplina");
var Anotacao = Parse.Object.extend("Anotacao");

Parse.Object.registerSubclass('Instituicao', Instituicao);
Parse.Object.registerSubclass('Curso', Curso);
Parse.Object.registerSubclass('Disciplina', Disciplina);
Parse.Object.registerSubclass('Anotacao', Anotacao);

// Auth

function getCurrentUser(){
	return Parse.User.current()
}

function isLoggedIn(){
	return getCurrentUser() != null
}

function facebookLogin(){
	Parse.FacebookUtils.logIn("email", {
		success: function(user) {
			var profileImageUrl = "http://graph.facebook.com/"+ user.attributes.authData.facebook.id +"/picture?type=large";
			FB.api('/me', 'get', {fields: "name, email"}, function(response){
				user.set("name", response.name);
				user.set("username", response.email);
				user.set("email", response.email);
				user.set("profileImageUrl", profileImageUrl);
				user.save(null, {
				  success: function(obj) {
				    if (!user.existed()) {
					  console.log("User signed up and logged in through Facebook!");
					} else {
					  console.log("User logged in through Facebook!");
					}
				  	router.push('dashboard')
				  },
				  error: function(obj, error) {
				    console.log('Failed to create new object, with error code: ' + error.message);
				  }
				});
			});
		},
		error: function(user, error) {
			console.log("User cancelled the Facebook login or did not fully authorize.");
		}
	});
}

function login(email, password){
	Parse.User.logIn(email, password, {
		success: function(user) {
		  	console.log("Logado com sucesso");
	  		router.push('dashboard')
		},
		error: function(user, error) {
			console.log(JSON.stringify(error));
		}
	}
}

function logout(){
	Parse.User.logOut().then(() => {
	  	router.push('home')
	});
}

function signup(name, email, password){
	var user = new Parse.User();
	user.set("name", name);
	user.set("username", email);
	user.set("password", password);
	user.set("email", email);
	user.signUp(null, {
	  success: function(user) {
	  	router.push('dashboard')
	  },
	  error: function(user, error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});
}

// CRUD

