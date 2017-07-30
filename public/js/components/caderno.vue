<template>
	<div id="caderno">
	  	<div class="row">
	      <div class="col s3"> 
			<ul id="assuntos" class="collection with-header">
				<li class="collection-header" v-if="caderno">
					<h4>{{caderno.get("nome")}}</h4>
				</li>
				<li class="collection-item" v-on:click="onAssuntoClicked(assunto.id)" v-if="assuntos" v-for="assunto in assuntos">{{assunto.get("assunto")}}</li>
			</ul>
			<a id="btn-cadastrar-anotacao" class="btn-floating btn-large waves-effect waves-light red">
				<i class="material-icons">add</i>
			</a>

<!-- 			<div id="app">
			  <div v-if="!image">
			    <h2>Select an image</h2>
			    <input type="file" @change="onFileChange">
			  </div>
			  <div v-else>
			    <img :src="image" />
			    <button @click="removeImage">Remove image</button>
			  </div>
			</div>
 -->			

      	  </div>
	      <div class="col s9">
	      	<div id="assunto-container">
		      	<div id="assunto">
		      		<div id="text" contentEditable="false" data-ph="Texto..."></div>
		      		<img src="" height="200" style=" position: relative; height: 350px; padding-left: 250px;"><br><br>
		      		<div id="text" contentEditable="true"></div>

		      		<canvas id="canvas" width="640" height="480" style="display: none;"></canvas>
		      	</div>
	      	</div>
			<div id="edicao" class="fixed-action-btn horizontal click-to-toggle">
				<a class="btn-floating btn-large red">
					<i class="material-icons">mode_edit</i>
				</a>
				<ul>
					<li>
						<a  id="btn-anexo" type="file" onchange="previewFile()" class="btn-floating red">
							<i class="material-icons">attach_file</i>
						</a>
								<!-- <input type="file" @change="onFileChange" accept="text/plain,text/rtf,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet/image/*,video/*" style="display: none;"> -->
								<input id="input-file" type="file" onchange="previewFile()" style="display: none;">					
					</li>
					<li><a id="btn-audio" class="btn-floating yellow darken-1"><i class="material-icons">mic</i></a></li>
					<li>
						<a id="btn-video" class="btn-floating green">
							<i class="material-icons">videocam</i>
						</a>
						<input type="file" id="take-picture" accept="image/*" style="display: none;">
					</li>
					<li>
						<a id="btn-foto" class="btn-floating blue">
							<i class="material-icons">camera_alt</i>
						</a>
						<video id="video" width="640" height="480" autoplay style="display: none;"></video>
					</li>
				</ul>
			</div>
	      </div>

	       <!-- MODAL CADASTRO DE ANOTAÇÃO -->

		<div id="cadastrar-anotacao" class="modal modal-fixed-footer">
		   <div class="modal-content">
		      <h4>Novo Assunto</h4>
		         <form class="col s12">
	               <div class="input-field col s12">
		                  <input id="nomeAssunto" type="text" class="validate">
		                  <label for="nomeAssunto">Nome</label>
		            </div>
		         </form>
		   </div>
	      <div class="modal-footer">
	         <a class="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
	         <a id="btn-salvar-anotacao" class="modal-action waves-effect waves-green btn-flat">Salvar</a>
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
			assuntos: null,
			image: ''
		}
	},
	created () {
		this.loadAll()
	},
	mounted() {
		var self = this

		// FUNÇÕES DO CADERNO - INICIO
		$('#btn-foto').click(function(){
			$('#text').attr('contenteditable','true')
			console.log("acessou")

			$("#video").click()
			var video = document.getElementById('video');
			
			console.log("clicou")
			// Get access to the camera!
			if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			    // Not adding `{ audio: true }` since we only want video now
			    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
			        video.src = window.URL.createObjectURL(stream);
			        video.play();
			    });
			}

			// Elements for taking the snapshot
			$("#canvas").click()
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');
			var video = document.getElementById('video');

			// Trigger photo take
			document.getElementById("snap").addEventListener("click", function() {
				context.drawImage(video, 0, 0, 640, 480);
			});


			console.log("função de tirar foto")	
		})
		$('#btn-video').click(function(){
			$('#text').attr('contenteditable','true')
			console.log("função de filmar")	
		})
		$('#btn-audio').click(function(){
			$('#text').attr('contenteditable','true')
			console.log("função de gravar áudio")	
		})
		$('#btn-anexo').click(function(){
			$("#input-file").click()
			self.previewFile()

			$('#text').attr('contenteditable','true')
			console.log("função de anexar")	
		})

		// FUNÇÕES DO CADERNO - FIM

		// CREATE NEW ANOTAÇÃO - ASSUNTO

		$('#btn-cadastrar-anotacao').click(function(){
			$('.modal').modal()
			$('#cadastrar-anotacao').modal('open')
		})

		$('#btn-salvar-anotacao').click(function(){
			var nomeAssunto = $("#nomeAssunto").val()
			
			// TODO validar

			self.saveAnotacao(nomeAssunto, function(curso){
				$('#cadastrar-anotacao').modal('close')

				Materialize.toast('<i class="material-icons">check</i> Assunto criado com sucesso', 4000)
				self.loadAll()
			})
		})
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
		},
		saveAnotacao: function(nomeAssunto, callback){
			var self = this
			Api.create({
			      "assunto": nomeAssunto,
			    }, 
			    new AnotacaoClass(),
			    function(obj) {
		    	  callback(obj)
			    },
			    function(error) {
					Materialize.toast('<i class="material-icons">error</i> Erro ao salvar assunto: ' + error.message, 4000)
			    }
			)
		},

		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
				if (!files.length)
					return;
				this.createImage(files[0]);
		},
		createImage(file) {
			var image = new Image();
			var reader = new FileReader();
			var vm = this;

			reader.onload = (e) => {
				vm.image = e.target.result;
			};
			reader.readAsDataURL(file);
		},
		removeImage: function (e) {
			this.image = '';
		},

		previewFile() {
		  var preview = document.querySelector('img');
		  var file    = document.querySelector('input[type=file]').files[0];
		  var reader  = new FileReader();

		  reader.addEventListener("load", function () {
		    preview.src = reader.result;
		  }, false);

		  if (file) {
		    reader.readAsDataURL(file);
		  }
		}

	}   
}
</script>