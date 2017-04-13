Parse.serverURL = 'https://caderno-on-line.herokuapp.com/parse';
Parse.initialize("caderno7259"); 

window.fbAsyncInit = function() {
	Parse.FacebookUtils.init({
	  appId : '707119556132405',
	  xfbml : true,
      cookie : true,
	  version : 'v2.8'
	});
	FB.AppEvents.logPageView();
};
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var InstituicaoClass = Parse.Object.extend("Instituicao");
var CursoClass = Parse.Object.extend("Curso");
var DisciplinaClass = Parse.Object.extend("Disciplina");
var AnotacaoClass = Parse.Object.extend("Anotacao");

Parse.Object.registerSubclass('Instituicao', InstituicaoClass);
Parse.Object.registerSubclass('Curso', CursoClass);
Parse.Object.registerSubclass('Disciplina', DisciplinaClass);
Parse.Object.registerSubclass('Anotacao', AnotacaoClass);

var Auth = {
	getCurrentUser: function(){
		return Parse.User.current()
	},
	isLoggedIn: function(){
		return this.getCurrentUser() != null
	},
	facebookLogin: function(successCallback, errorCallback){
		Parse.FacebookUtils.logIn("email", {
			success: function(user) {
				var profileImageUrl = "http://graph.facebook.com/"+ user.attributes.authData.facebook.id +"/picture?type=large";
				FB.api('/me', 'get', {fields: "name, email"}, function(response){
					user.save({
						"name": response.name,
						"username": response.email,
						"email": response.email,
						"profileImageUrl": profileImageUrl
					}, {
						success: function(user) {
							successCallback(user)
						},
						error: function(user, error) {
							errorCallback(error)
						}
					});
				});
			},
			error: function(user, error) {
			    errorCallback(error)
			}
		});
	},
	login: function(email, password, successCallback, errorCallback){
		Parse.User.logIn(email, password, {
			success: function(user) {
				console.log("Usuário e senha Válidos - LOGIN SUCESSO");
				console.log(user);
				successCallback(user);
			},
			error: function(user, error) {
				console.log("Usuário ou senha Inválidos");
			   	errorCallback(error);
			}
		})
	},
	logout: function(successCallback){
		Parse.User.logOut().then(function(){
			successCallback()
		});
	},
	signup: function(data, successCallback, errorCallback){
		new Parse.User().signUp(data, {
		  success: function(user) {
		  	successCallback(user)
		  },
		  error: function(user, error) {
		   	errorCallback(error)
		  }
		});
	}
}

var Api = {
	create: function(data, klass, successCallback, errorCallback){
		klass.save(data, {
		  success: function(obj) {
		    successCallback(obj)
		  },
		  error: function(obj, error) {
		    errorCallback(error)
		  }
		});
	},
	update: function(obj, successCallback, errorCallback){
		obj.save(null, {
		  success: function(obj) {
		    successCallback(obj)
		  },
		  error: function(obj, error) {
		    errorCallback(error)
		  }
		});
	},
	delete: function(obj, successCallback, errorCallback){
		obj.destroy(null, {
		  success: function(obj) {
		    successCallback(obj)
		  },
		  error: function(obj, error) {
		    errorCallback(error)
		  }
		});
	},
	getAll: function(klass, order, successCallback, errorCallback){
		var query = new Parse.Query(klass);
		query.ascending(order);
		query.find({
		  success: function(obj) {
		    successCallback(obj)
		  },
		  error: function(error) {
	    	errorCallback(error)
		  }
		});
	},
	getById: function(id, klass, successCallback, errorCallback){
		var query = new Parse.Query(klass);
		query.equalTo("objectId", id);
		query.first({
		  success: function(obj) {
		    successCallback(obj)
		  },
		  error: function(error) {
	    	errorCallback(error)
		  }
		});
	},
	getByKey: function(key, value, klass, successCallback, errorCallback){
		var query = new Parse.Query(klass);
		query.contains(key, value);
		query.first({
		  success: function(obj) {
		    successCallback(obj)
		  },
		  error: function(error) {
	    	errorCallback(error)
		  }
		});
	}
}