<template>
	<div>
		<h1>ver depois</h1>
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