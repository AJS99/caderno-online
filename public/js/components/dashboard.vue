<template>
	<div id="dashboard" class="container">
		<div>
			<div id="ultimos-cadernos" class="row"> 
				<div class="col s12">
					<h2>Últimos cadernos</h2>
					<div class="row">
				      <div class="col s4" v-for="caderno in ultimosCadernos">
		        		<a href="#">
				        	<div class="card-panel teal center-align z-depth-3">
								<h4 class="truncate">{{caderno.get("nome")}}</h4>
								<strong class="truncate">{{caderno.get("descricao")}}</strong>
				        	</div>
						</a>
				      </div>
				    </div>
				</div>
			</div>

			<div class="divider"></div>

			<div>
				<div id="todos-cursos" class="row">
					<div class="col s12">
						<h3>Meus cursos</h3>
						<ul class="collapsible popout" data-collapsible="accordion">
						    <li v-for="curso in cursos">
						      <div class="collapsible-header"><i class="material-icons">collections_bookmark</i>{{curso.get("nome")}}</div>
						      <div class="collapsible-body grey lighten-5">
								<div class="row">
							      <div class="col l4" v-for="caderno in cadernos[curso.id]">
					        		<a href="#">
							        	<div class="card-panel center-align light-blue darken-1">
											<h4 class="truncate">{{caderno.get("nome")}}</h4>
											<strong class="truncate">{{caderno.get("descricao")}}</strong>
							        	</div>
									</a>
							      </div>
						      	</div>
						      </div>
						    </li>
						</ul>
					</div>
				</div>
			</div>

			<div class="fixed-action-btn">
			    <a class="btn-floating btn-large red">
			      <i class="large material-icons">add</i>
			    </a>
			    <ul>
			      <li><a class="btn-floating green"><i class="material-icons">collections_bookmark</i></a></li>
			      <li><a class="btn-floating blue"><i class="material-icons">library_books</i></a></li>
			    </ul>
		  </div>
	</div>  
</template>
	
<script>
module.exports = {
	data: function() {
		return {
			ultimosCadernos: [],
			cursos: null,
			cadernos: []
		}
	},
	created () {
		var self = this
		var query = new Parse.Query(CursoClass)
		query.ascending("nome")
		query.find({
		  success: function(cursos) {
		  	for(var i in cursos){
	  			cursos[i].get("disciplinas").query().find({
		    		success: function(disciplinas) {
		    			var cursoId = null
		  				if(disciplinas != null && disciplinas.length > 0){
		  					cursoId = disciplinas[0].get("curso").id
				    		self.$data.cadernos[cursoId] = disciplinas
		  				}
		  				if(cursoId != null && cursos[cursos.length - 1].id == cursoId){
				  			self.$data.cursos = cursos
				  		}
					  },
				  	error: function(error) {
						console.log(error) 
				  	}
		    	})
		  	}
		  },
		  error: function(error) {
			console.log(error) 
		  }
		});
	},
	methods: {

	}   
}
</script>
