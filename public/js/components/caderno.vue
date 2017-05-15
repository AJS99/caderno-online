<template>
	<div id="caderno">
	  	<div class="row">
	      <div class="col s3">
		      <ul id="assuntos" class="collection with-header">
		        <li class="collection-header" v-if="caderno"><h4>{{caderno.get("nome")}}</h4></li>
		        <li class="collection-item" v-on:click="onAssuntoClicked(assunto.id)" v-if="assuntos" v-for="assunto in assuntos">{{assunto.get("assunto")}}</li>
		      </ul>
      	  </div>
	      <div class="col s9">
	      	<div id="assunto-container">
		      	<div id="assunto">
		      		<div id="text" contentEditable="true" data-ph="Texto..."></div>
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
			caderno: null,
			assuntos: null
		}
	},
	created () {
		this.loadAll()
	},
	mounted() {

	},
	methods: {
		loadAll: function(){
			var self = this
			self.loadCaderno(self.$route.params.id, function(caderno){
				self.loadAssuntos(caderno, function(assuntos){
					self.$data.assuntos = assuntos
					self.$data.caderno = caderno
				})
			})
		},
		loadCaderno: function(cadernoId, callback){
			Api.getById(cadernoId, DisciplinaClass,  
				function(obj){
					callback(obj)
				}, 
				function(error){
					console.log(error)
				})
		},
		loadAssuntos: function(caderno, callback){
			var query = new Parse.Query(AnotacaoClass);
			query.equalTo("disciplina", caderno);
			query.descending("createdAt")
			query.find({
			  success: function(obj) {
			    callback(obj)
			  },
			  error: function(error) {
		    	console.log(error)
			  }
			});
		},
		loadAssuntoText: function(assunto){
			console.log(assunto.get("assunto"))
			if(assunto){
				$('#text').html(assunto.get("texto"))
			}
		},
		onAssuntoClicked: function(assuntoId){
			var assuntoPosition = this.getAssuntoPosition(assuntoId)
			$('#assuntos li').each(function(){
				$(this).removeClass("active")
			})
			$('#assuntos li').eq(assuntoPosition + 1).addClass("active")
			this.loadAssuntoText(this.$data.assuntos[assuntoPosition])
		},
		getAssuntoPosition: function(assuntoId){
			var assuntos = this.$data.assuntos
			if(assuntos){
				for(var i in assuntos){
					var assunto = assuntos[i]
					if(assunto.id == assuntoId){
						return parseInt(i)
					}
				}
			} else {
				return -1
			}
		}
	}   
}
</script>