const router = new VueRouter({
  	routes: [
  	  { path: '/' },
      { path: '/entrar' },
      { path: '/cadastro' },
      { path: '/dashboard' },
  	  { path: '/sobre' },
  	  { path: '/instituicao/:id' },
  	  { path: '/curso/:id' },
  	  { path: '/disciplina/:id' },
  	  { path: '/anotacao/:id' },
  	  { path: '*' }
    ] 
})

new Vue({
  el: '#app',
  router: router,
  data: {
    user: Auth.getCurrentUser(),
    currentView: 'home',
    showModal: false,
    menu: [ 
      { name: "Dashboard", url: "#/dashboard", icon: "dashboard"},
      { name: "Perfil", url: "#/profile", icon: "person"},
      { name: "Sair", url: "#/", icon: "input"}
    ]
  },
  created: function () {
    this.changeView()
  },
  watch: {
    '$route': 'changeView'
  },
  methods: {
  	changeView: function(){
  		var path = this.$route.path
  		if(path === '/'){
			 this.currentView = 'home'
      } else if(path === '/entrar'){
       this.currentView = 'entrar'
      } else if(path === '/cadastro'){
       this.currentView = 'cadastro'
      } else if(path === '/dashboard'){
       this.currentView = 'dashboard'
  		} else if(path === '/sobre'){
			 this.currentView =  'sobre'
  		} else if(path.startsWith('/instituicao/')){
			 this.currentView = 'instituicao'
  		} else if(path.startsWith('/curso/')){
			 this.currentView = 'curso'
  		} else if(path.startsWith('/disciplina/')){
			 this.currentView = 'disciplina'
  		} else if(path.startsWith('/anotacao/')){
			 this.currentView = 'anotacao'
  		} else {
			 this.currentView =  'notFound'
  		}
  	}
  },
  components: {
    home: httpVueLoader('js/components/home.vue'),
    entrar: httpVueLoader('js/components/entrar.vue'),
    cadastro: httpVueLoader('js/components/cadastro.vue'),
    dashboard: httpVueLoader('js/components/dashboard.vue'),
    sobre: httpVueLoader('js/components/sobre.vue'),
    instituicao: httpVueLoader('js/components/instituicao.vue'),
    curso: httpVueLoader('js/components/curso.vue'),
    disciplina: httpVueLoader('js/components/disciplina.vue'),
    anotacao: httpVueLoader('js/components/anotacao.vue'),
    notFound: httpVueLoader('js/components/notFound.vue')
  }
})

// Auth.login("teste12@teste.com", "123",
//     function(obj) {
//       console.log(obj)
//       console.log(Auth.isLoggedIn())
//     },
//     function(error) {
//       console.log(error)
//     }
// )

// Auth.logout(function(){
//   console.log(Auth.isLoggedIn())
// })

// Auth.signup({
//     "name": "nome4",
//     "email": "nome4@nome.com",
//     "username": "nome4@nome.com",
//     "password": "123"
//   },
//   function(obj) {
//     console.log(obj)
//     console.log(Auth.isLoggedIn())
//   },
//   function(error) {
//     console.log(error)
//   }
// )

// Auth.facebookLogin(
//   function(obj) {
//     console.log(obj)
//     console.log(Auth.isLoggedIn())
//   },
//   function(error) {
//     console.log(error)
//   }
// )
  

// Api.create({
//       "nome": "Disciplina Teste",
//       "descricao": "Descrição Teste"
//       "curso": 
//     }, 
//     new DisciplinaClass(),
//     function(obj) {
//       alert('New object created with objectId: ' + obj.id);
//     },
//     function(error) {
//       alert('Failed to create new object, with error code: ' + error.message);
//     }
// )


// Api.getById("XFexCMIfAz", CursoClass, 
//   function(curso){
//     Api.getById("FKwSvSKtNc", DisciplinaClass, 
//       function(disciplina){
//         var relation = curso.relation("disciplinas");
//         relation.add(disciplina);
//         Api.update(curso, function(obj) {
//           console.log('Object updated: ' + obj);
//         }, function(error) {
//           console.log('Failed to create new object, with error code: ' + error.message);
//         })
//       },
//       function(error) {
//         console.log('Failed to create new object, with error code: ' + error.message);
//       }
//     )
//   },
//   function(error) {
//     console.log('Failed to create new object, with error code: ' + error.message);
//   }
// )

// Api.getByKey("assunto", "variareis php", AnotacaoClass,
//   function(obj) {
//     Api.delete(obj)
//   },
//   function(error) {
//     console.log('Failed to create new object, with error code: ' + error.message);
//   }
// )

// Api.getAll(InstituicaoClass, "nome",
//    function(obj) {
//     console.log(obj);
//     console.log(obj[11].get("nome"));
//   },
//   function(error) {
//     console.log('Failed to create new object, with error code: ' + error.message);
//   }
// )