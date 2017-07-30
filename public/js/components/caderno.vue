<template>
	<div id="caderno">
	  	<div class="row">
	      <div class="col s3"> 
			<ul id="assuntos" class="collection with-header">
				<li class="collection-header" v-if="caderno">
					<h4>{{caderno.get("nome")}}</h4>
				</li>
				<li class="collection-item" v-on:click="onAssuntoClicked(assunto.id)" v-if="assuntos" v-for="(assunto, i) in assuntos" v-bind:class="{ active: i == 0 }">
				<span v-if="i == 0">{{onAssuntoClicked(assunto.id)}}</span>
				{{assunto.get("assunto")}}</li>
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
		      		<div id="text" contentEditable="true" data-ph="Texto..."></div>
		      		<!--<img src="" height="200" style=" position: relative; height: 350px; padding-left: 250px;"><br><br>-->

		      		<!--<canvas id="canvas" width="640" height="480" style="display: none;"></canvas>-->
		      	</div>
	      	</div>
			<div id="edicao" class="fixed-action-btn horizontal">
				<a class="btn-floating btn-large red">
					<i class="material-icons">mode_edit</i>
				</a>
				<ul>
					<li>
						<a  id="btn-anexo" type="file" class="btn-floating red">
							<i class="material-icons">attach_file</i>
						</a>
								<!-- <input type="file" @change="onFileChange" accept="text/plain,text/rtf,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet/image/*,video/*" style="display: none;"> -->
								<input id="input-file" type="file" accept="image/png, image/jpeg" v-on:change="previewFile()" style="display: none;">					
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
			currentAssunto: null,
			image: ''
		}
	},
	created () {
		$("#app .progress").show()
		this.loadAll()
	},
	mounted() {
		var self = this

		// FUNÇÕES DO CADERNO - INICIO
		$('#btn-foto').click(function(){
			$('#text').attr('contenteditable','true')

			$("#video").click()
			var video = document.getElementById('video');
			
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

			self.saveAnotacao(nomeAssunto, self.$data.caderno, function(curso){
				$('#cadastrar-anotacao').modal('close')
				$("#nomeAssunto").val("")

				Materialize.toast('<i class="material-icons">check</i> Assunto criado com sucesso', 4000)
				self.loadAll()
			})
		})

		$('.nav-wrapper #save').click(function(){
			self.updateCurrentAnotacao()
		})
	},
	methods: {
		loadAll: function(){
			var self = this
			self.loadCaderno(self.$route.params.id, function(caderno){
				self.loadAssuntos(caderno, function(assuntos){
					self.$data.assuntos = assuntos
					self.$data.caderno = caderno
					$("#app .progress").hide()
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
			if(assunto){
				var texto = assunto.get("texto")
				$('#text').html(texto === undefined ? "" : texto)
			}
		},
		onAssuntoClicked: function(assuntoId){
			var assuntoPosition = this.getAssuntoPosition(assuntoId)
			var assunto = this.$data.assuntos[assuntoPosition]
			this.$data.currentAssunto = assunto

			$('#assuntos li').each(function(){
				$(this).removeClass("active")
			})
			$('#assuntos li').eq(assuntoPosition + 1).addClass("active")
			this.loadAssuntoText(assunto)
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
		saveAnotacao: function(nomeAssunto, disciplina, callback){
			var self = this
			Api.create({
			      "assunto": nomeAssunto,
			      "disciplina": disciplina,
			      "texto": ""
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
		updateCurrentAnotacao: function(){
			var texto = $('#text').html()
			this.$data.currentAssunto.set("texto", texto)
			Api.update(this.$data.currentAssunto,
			    function(obj) {
		    	  Materialize.toast('<i class="material-icons">check</i> Assunto salvo', 4000)
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
			$("#app .progress").show()
		  	var fileUploadControl = $("#input-file")[0]
		  	if (fileUploadControl.files.length > 0) {
			  	var file = fileUploadControl.files[0]
			  	var name = file.name
			  	var parseFile = new Parse.File(name, file)
			  	parseFile.save().then(function() {
				  $("#text").append("<br><br><img src='"+parseFile.url()+"' class='image-body responsive-img'></img><br><br>")
				  $("#app .progress").hide()
				}, function(error) {
				  console.log(error)
				});

			}
		}

	}   
}
</script>