<template>
	<div>
		<div class="panel panel-default">
			<!-- Default panel contents -->
			<div class="panel-heading">Lista de Disciplinas</div>
				<div class="panel-body">
					<p>Isso por enquanto é um teste</p>
				</div>

				<!-- Table -->
				<table class="table">
					<thead> 
						<tr> 
							<th>#</th> 
							<th>First Name</th> 
							<th>Last Name</th> 
							<th>Username</th> 
						</tr> 
					</thead> <
					<tbody> 
						<tr> 
							<th scope="row">1</th> 
							<td>Mark</td> 
							<td>Otto</td> 
							<td>@mdo</td> 
						</tr> 
						<tr> 
							<th scope="row">2</th> 
							<td>Jacob</td> 
							<td>Thornton</td> 
							<td>@fat</td> 
						</tr> 
						<tr> 
							<th scope="row">3</th> 
							<td>Larry</td> 
							<td>the Bird</td> 
							<td>@twitter</td> 
						</tr> 
					</tbody>
				</table>
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