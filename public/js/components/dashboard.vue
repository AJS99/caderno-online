<template>
	<div>
		<div class="contentBox container">
			<div class="row">
				<div class="col-md-12 list-group">
					<div class="contentBox-title">
						<h1>Sua última instuição visitada</h1>
					</div>
					<a href="#" class="list-group-item active courseDetailBox-title">
						<h4 class="list-group-item-heading">{{ ultimaInstituicao.get("nome") }}</h4>
						<p class="list-group-item-text">{{ ultimaInstituicao.get("descricao") }}</p>
					</a>
				</div>
			</div>
		</div>		
		<div class="contentBox container">
			<div class="row">
				<div class="col-md-12 list-group">
					<div class="contentBox-title">
						<h1>Mais instituições</h1>
					</div>
					<div class="col-md-4 list-group" v-for="instituicao in instituicoes">
						<a href="#" class="list-group-item list-group-item-success courseDetailBox-title">{{ instituicao.get("nome") }}</a>
					</div>
				</div>
			</div>		
		</div>
	</div>	
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
