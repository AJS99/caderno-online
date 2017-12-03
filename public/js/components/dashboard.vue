<template>
	<main id="dashboard" class="container">
		<div>
			<div id="ultimos-cadernos" class="row"> 
				<div class="col s12">
					<img id="instituicao-logo" src="http://facol.com/site/wp-content/uploads/2016/01/logo-site4.png">
				</div>
			</div>

			<div class="divider"></div>

			<div>
				<div id="todos-cursos" class="row">
					<div class="col s12">
						<h3>Meus cursos</h3>
						<ul class="collapsible popout" data-collapsible="accordion">
						    <li v-for="curso in cursos">
						      <div class="collapsible-header"><i class="material-icons">collections_bookmark</i>{{curso.get("nome")}} <i class="delete right material-icons" v-on:click="deleteCurso(curso)">delete</i></div>
						      <div class="collapsible-body grey lighten-5">
								<div class="row">
							      <div class="col l4" v-for="caderno in cadernos[curso.id]">
					        		<a v-bind:href="'#/caderno/'+caderno.id">
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
			      <li><a id="btn-cadastrar-curso" class="btn-floating green"><i class="material-icons">collections_bookmark</i></a></li>
			      <li><a id="btn-cadastrar-caderno" class="btn-floating blue"><i class="material-icons">library_books</i></a></li>
			    </ul>
		  </div>

		  <!-- MODAL CADASTRO DE CURSO -->

		<div id="cadastrar-curso" class="modal modal-fixed-footer">
		   <div class="modal-content">
		      <h4>Novo Curso</h4>
		      <div class="row">
		         <form class="col s12">
		            <div class="row">
		               <div class="input-field col s12">
		                  <input id="nomeCurso" type="text">
		                  <label for="nomeCurso">Nome do curso</label>
		               </div>
		            </div>
		            <div class="row">
		               <div class="input-field col s12">
		                  <input id="nomeCoordenador" type="text">
		                  <label for="nomeCoordenador">Nome do coordenador</label>
		               </div>
		            </div>
		            <div class="row">
		               <div class="input-field col s12">
		                  <textarea id="descricao" class="materialize-textarea validate"></textarea>
		                  <label for="descricao">Descrição</label>
		               </div>
		            </div>
		         </form>
		      </div>
		   </div>
	      <div class="modal-footer">
	         <a class="modal-action modal-close waves-effect waves-red btn-flat red-text">Cancelar</a>
	         <a id="btn-salvar-curso" class="modal-action waves-effect waves-green btn-flat green-text">Salvar</a>
	      </div>
		</div>

		<!-- MODAL CADASTRO DE CADERNO -->
		
		<div id="cadastrar-caderno" class="modal modal-fixed-footer">
		   <div class="modal-content">
		     <h4>Nova Disciplina</h4>
		      <div class="row">
		         <form class="col s12">
		            <div class="row">
		               <div class="input-field col s6">
		                  <input id="nomeDisciplina" type="text">
		                  <label for="nomeDisciplina">Nome da disciplina</label>
		               </div>
		               <div class="input-field col s6">
 							<select id="select-cursos">
								<option v-for="curso in cursos" v-bind:value="curso.id">{{ curso.get("nome") }}</option>
							</select>
							<label>A qual curso pertence essa disciplina?</label>
						</div>
		            </div>
		            <div class="row">
		               <div class="input-field col s12">
		                  <input id="nomeProfessor" type="text">
		                  <label for="nomeProfessor">Nome do professor</label>
		               </div>
		            </div>
		            <div class="row">
		               <div class="input-field col s12">
		                  <textarea id="descricaoDisciplina" class="materialize-textarea validate"></textarea>
		                  <label for="descricao">Descrição</label>
		               </div>
		            </div>
		         </form>
		      </div>
		   </div>
	      <div class="modal-footer">
	         <a class="modal-action modal-close waves-effect waves-red btn-flat red-text">Cancelar</a>
	         <a id="btn-salvar-caderno" class="modal-action waves-effect waves-green btn-flat green-text">Salvar</a>
	      </div>
		</div>
		</div>
	</main>
</template>
	
<script>
module.exports = {
	data: function() {
		return {
			ultimosCadernos: [],
			cadernos: [],
			cursos: null,
			instituicoes: null
		}
	},
	created () {
		if(!Auth.isLoggedIn()){
			this.$router.push('/404')
			return
		} 
			
		this.loadAll()
	},
	mounted() {
		var self = this
		
		$('#btn-cadastrar-curso').click(function(){
			$('#cadastrar-curso').modal()
			$('#cadastrar-curso').modal('open')
		})
		
		$('#btn-salvar-curso').click(function(){
			var nomeCurso = $("#nomeCurso").val()
			var nomeCoordenador = $("#nomeCoordenador").val()
			var descricao = $("#descricao").val()
			
			if(nomeCurso == "" || nomeCoordenador == ""){
				Materialize.toast('<i class="material-icons">error</i> Nome do curso e coordenador não podem ser vazios', 3000)
			} else {
				self.saveCurso(nomeCurso, nomeCoordenador, descricao, function(curso){
					$('#cadastrar-curso').modal('close')
					$("#nomeCurso").val("")
					$("#nomeCoordenador").val("")
					$("#descricao").val("")

					Materialize.toast('<i class="material-icons">check</i> Curso criado com sucesso', 4000)
					self.loadAll()
				})
			}
		})

		//CREATE WEW DISCIPLINA (CADERNO)

		$('#btn-cadastrar-caderno').click(function(){
			$('#cadastrar-caderno').modal()
			$('#cadastrar-caderno').modal('open')
			$('#select-cursos').material_select()
		})

		$('#btn-salvar-caderno').click(function(){
			var nomeDisciplina = $("#nomeDisciplina").val()
			var nomeProfessor = $("#nomeProfessor").val()
			var descricaoDisciplina = $("#descricaoDisciplina").val()
			var cursoId = $("#select-cursos").val()
			var curso = self.getCursoById(cursoId)
			
			if(nomeDisciplina == "" || nomeProfessor == ""){
				Materialize.toast('<i class="material-icons">error</i> Nome da disciplina e professor não podem ser vazios', 3000)
			} else {
				self.saveCaderno(nomeDisciplina, nomeProfessor, descricaoDisciplina, curso, function(caderno){
					$('#cadastrar-caderno').modal('close')
					$("#nomeDisciplina").val("")
					$("#nomeProfessor").val("")
					$("#descricaoDisciplina").val("")
					$("#select-cursos").val("")

					Materialize.toast('<i class="material-icons">check</i> Disciplina criada com sucesso! Novo caderno disponivel!', 4000)
					self.loadAll()
				})
			}
		})
	},
	methods: {
		loadAll: function(){
			var self = this
			self.loadCadernos(function(cadernos){
				self.loadCursos(function(cursos){
					self.loadInstituicoes(function(instituicoes){
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
						self.$data.instituicoes = instituicoes
						$('.collapsible').collapsible()
					})
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
		},
		loadInstituicoes: function(callback){
			Api.getAll(InstituicaoClass, "nome", function(instituicoes){
				callback(instituicoes)
			}, function(error){
				console.log(error)
			})
		},
		saveCurso: function(nomeCurso, nomeCoordenador, descricao, callback){
			var self = this
			Api.create({
			      "nome": nomeCurso,
			      "nomeCoordenador": nomeCoordenador,
			      "descricao": descricao,
			      "instituicao": self.$data.instituicoes[0],
			      "user": Auth.getCurrentUser()
			    }, 
			    new CursoClass(),
			    function(obj) {
		    	  callback(obj)
			    },
			    function(error) {
					Materialize.toast('<i class="material-icons">error</i> Erro ao salvar curso: ' + error.message, 4000)
			    }
			)
		},
		saveCaderno: function(nomeDisciplina, nomeProfessor, descricaoDisciplina, curso, callback){
			var self = this
			Api.create({
			      "nome": nomeDisciplina,
			      "nomeProfessor": nomeProfessor,
			      "descricao": descricaoDisciplina,
			      "curso": curso,
			      "user": Auth.getCurrentUser()
			    }, 
			    new DisciplinaClass(),
			    function(obj) {
		    	  callback(obj)
			    },
			    function(error) {
					Materialize.toast('<i class="material-icons">error</i> Erro ao salvar disciplina: ' + error.message, 4000)
			    }
			)
		},
		deleteCurso: function(curso){
			var self = this
			Api.delete(curso, 
			    function(obj) {
			    	console.log(obj)
		    	  	Materialize.toast('<i class="material-icons">check</i> Curso excluido', 4000)
		    	  	self.loadAll()
			    },
			    function(error) {
					Materialize.toast('<i class="material-icons">error</i> Erro ao excluir curso: ' + error.message, 4000)
			    }
			)
		},
		getCursoById: function(id){
			for(var i in this.$data.cursos){
				var curso = this.$data.cursos[i]
				if(curso.id == id){
					return curso
				}
			}
			return null
		}
	}   
}
</script>
