<template>
	<main>
		<div class="container">
			<div class="row">
				<div class="col-md-12 list-group">
					<h1 id="page-title">Cursos da {{ ultimaInstituicao.get("nome") }}</h1>
					  <a href="#/disciplina/o9ApPNkdFl" class="list-group-item list-group-item-action flex-column align-items-start active">
					    <div class="d-flex w-100 justify-content-between">
					      <h4 class="mb-1">{{ ultimaInstituicao.get("nome") }}</h4>
					      <small>visto à 3 dias</small>
					    </div>
					    <p class="mb-1">{{ ultimaInstituicao.get("descricao") }}</p>
					  </a>
					</div>
				</div>
			</div>      
	</main>  
</template>
	
<script>
module.exports = {
	data: function() {
		return {
			ultimaInstituicao: Api.getById("B6zU7uWbu3", InstituicaoClass,  
				function(obj){
					return obj
				}, 
				function(error){
					console.log(error) 
					return null
				}),
			instituicoes: null
		}
	},
	created () {
		if(!Auth.isLoggedIn()){
			this.$router.push('/404')
			return
		} 
		
		var updateHeader = this.updateHeader
		Api.getById("B6zU7uWbu3", InstituicaoClass,
			function(obj){
				updateHeader(obj)
			}, 
			function(error){
				console.log(error) 
			})

		var updateList = this.updateList
		Api.getAll(InstituicaoClass, "nome", 
			function(obj){
				updateList(obj)
			}, 
			function(error){
				console.log(error) 
			})
	},
	methods: {
		updateHeader (obj) {
			this.ultimaInstituicao = obj
		},
		updateList (obj) {
			this.instituicoes = obj
		}
	}   
}
</script>