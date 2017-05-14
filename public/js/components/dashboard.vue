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
			cadernos: [],
			cursos: null
		}
	},
	created () {
		this.loadAll()
	},
	methods: {
		loadAll: function(){
			var self = this
			this.loadCadernos(function(cadernos){
				self.loadCursos(function(cursos){
					for(var i in cursos){
						var cursoId = cursos[i].id
						var cursoCadernos = []
						for(var j in cadernos){
							var caderno = cadernos[j]
							if(caderno.get("curso") != undefined && caderno.get("curso").id == cursoId){
								cursoCadernos.push(caderno)
							}
						}
						self.$data.cadernos[cursoId] = cursoCadernos
					}
					self.$data.cursos = cursos
				})
			})
		},
		loadCadernos: function(callback){
			Api.getAll(DisciplinaClass, "nome", function(cadernos){
				callback(cadernos)
			}, function(error){
				console.log(error)
			})
		},
		loadCursos: function(callback){
			Api.getAll(CursoClass, "nome", function(cursos){
				callback(cursos)
			}, function(error){
				console.log(error)
			})
		}
	}   
}
</script>
