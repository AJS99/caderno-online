<template>
	<main id="caderno">
	  	<div class="row">
	      <aside class="col s3"> 
			<ul id="assuntos" class="collection with-header">
				<li class="collection-header" v-if="caderno">
					<h4>{{caderno.get("nome")}}</h4>
					<div class="input-field">
						<i class="material-icons prefix">search</i>
						<input id="search" type="text">
						<label for="search">Pesquisar</label>
					</div>
					<a id="btn-cadastrar-anotacao" class="btn waves-effect waves-light light-blue">
						<i class="material-icons">add</i>
					</a>
				</li>
				<li class="collection-item" v-on:click="onAssuntoClicked(assunto.id)" v-if="assuntos" v-for="(assunto, i) in assuntos" v-bind:class="{ active: i == 0 }"><span v-if="i == 0">
					{{onAssuntoClicked(assunto.id)}}</span><span class="title">{{assunto.get("assunto") == undefined || assunto.get("assunto") == "" ? "Sem título" : assunto.get("assunto")}}</span> <i>{{assunto.createdAt | format}}</i>
				</li>
			</ul>
			

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

      	  </aside>
	      <div id="assunto-col" class="col s9">
	      	<div id="assunto-container">
		      	<div id="assunto">
		      		<div id="text" data-ph="Seu texto aqui..."></div>
		      		<!--<img src="" height="200" style=" position: relative; height: 350px; padding-left: 250px;"><br><br>-->

		      		<!--<canvas id="canvas" width="640" height="480" style="display: none;"></canvas>-->
		      	</div>
	      	</div>
			<div id="edicao" class="fixed-action-btn horizontal">
				<a class="btn-floating btn-large red">
					<i class="material-icons">add</i>
				</a>
				<ul>
					<li>
						<a id="btn-anexar-pdf" type="file" class="btn-floating blue">
							<i class="material-icons">picture_as_pdf</i>
						</a>
						<input id="input-pdf" type="file" accept="application/pdf" v-on:change="attachPdf()" style="display: none;">
					</li>
					<li>
						<a id="btn-anexar-imagem" type="file" class="btn-floating green">
							<i class="material-icons">collections</i>
						</a>
						<input id="input-image" type="file" accept="image/*" v-on:change="attachImage()" style="display: none;">
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
											<input id="nomeAssunto" type="text">
											<label for="nomeAssunto">Nome</label>
			            </div>
			         </form>
			   </div>
		      <div class="modal-footer">
		         <a class="modal-action modal-close waves-effect waves-red btn-flat red-text">Cancelar</a>
		         <a id="btn-salvar-anotacao" class="modal-action waves-effect waves-green btn-flat green-text">Salvar</a>
		      </div>
			</div>

			<div id="modal-webcam" class="modal modal-fixed-footer">
			   <div class="modal-content">
			      	<h4>Capturar imagem</h4>
		         	<div id="webcam"></div>
			   </div>
		      <div class="modal-footer">
		         <a class="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
		         <a id="btn-salvar-imagem-webcam" class="modal-action waves-effect waves-green btn-flat" v-on:click="onSaveFotoClicked()">Salvar</a>
		      </div>
			</div>
	    </div>
	</main>  
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
		if(!Auth.isLoggedIn()){
			this.$router.push('/404')
			return
		} 
		
		$("#app .progress").show()
		
		this.loadAll()
	},
	mounted() {
		var self = this
		new MediumEditor('#text', {
				placeholder: false
		});
		self.toggleEdit(false)
		
		navigator.getUserMedia(
		    {
		      video: true
		    },
		    function(localMediaStream) {
	    		console.log(localMediaStream)
		    },
		    function(err) {
		      console.log(err);
		    }
	  	)

		$('.modal').modal()
		$('#text a, .medium-editor-toolbar-anchor-preview-inner').bind('click', function(e){
			if(!self.isEditMode()){
				e.preventDefault()
				var win = window.open($(this).attr("href"), '_blank')
				win.focus()
			}
		})

		// FUNÇÕES DO CADERNO - INICIO
		// $('#btn-foto').click(function(){
		// 	Webcam.set({
		// 		width: 320,
		// 		height: 240,
		// 		dest_width: 640,
		// 		dest_height: 480,
		// 		crop_width: 480,
		// 		crop_height: 480,
		// 		image_format: 'jpeg',
		// 		jpeg_quality: 95
		// 	});
		// 	Webcam.attach('#webcam');
		// })
		$('#btn-anexar-pdf').click(function(){
			$("#input-pdf").click()
		})
		$('#btn-anexar-imagem').click(function(){
			$("#input-image").click()
		})

		// FUNÇÕES DO CADERNO - FIM

		$('#btn-salvar-anotacao').click(function(){
			var nomeAssunto = $("#nomeAssunto").val()
			
			if(nomeAssunto == ""){
				Materialize.toast('<i class="material-icons">error</i> Nome não pode ser vazio', 2000)
			} else {
				self.saveAnotacao(nomeAssunto, self.$data.caderno, function(curso){
					$('#cadastrar-anotacao').modal('close')
					$("#nomeAssunto").val("")

					Materialize.toast('<i class="material-icons">check</i> Assunto criado com sucesso', 4000)
					self.loadAll()
				})
			}
		})

		$('.nav-wrapper #save').click(function(){
			self.updateCurrentAnotacao()
		})
		$('.nav-wrapper #print').click(function(){
			self.printCurrentAnotacao()
		})
		$('.nav-wrapper #toggle-edit').click(function(){
			self.toggleEdit(!self.isEditMode())
		})
		
		setTimeout(function(){
			$('#btn-cadastrar-anotacao').click(function(){
				$('.modal').modal()
				$('#cadastrar-anotacao').modal('open')
			})
			$('#search').keyup(function(){
				var query = $(this).val().trim()
				self.filter(query)
			})
			setTimeout(function(){
				$('#btn-cadastrar-anotacao').click(function(){
					$('.modal').modal()
					$('#cadastrar-anotacao').modal('open')
				})
				$('#search').keyup(function(){
					var query = $(this).val().trim()
					self.filter(query)
				})
			}, 2000);
		}, 1000);
	},
	filters: {
	    format: function (date) {
	      return moment(date).format('D/MM/YY');
	    }
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

			$('#assuntos .collection-item').each(function(){
				$(this).removeClass("active")
			})
			$('#assuntos .collection-item').eq(assuntoPosition).addClass("active")
			this.loadAssuntoText(assunto)
		},
		onSaveFotoClicked: function(){
	       	Webcam.snap(function(data) {
				$("#app .progress").show()
	        	var parseFile = new Parse.File("foto.jpg", {base64: data})
          		parseFile.save().then(function() {
		          	$("#text").append("<br><br><img src='"+parseFile.url()+"' class='image-body responsive-img'></img><br><br>")
		          	$("#app .progress").hide()
		          	$('#modal-webcam').modal('close')
		          	Webcam.reset()
	        	}, function(error) {
	          		console.log(error)
		          	$("#app .progress").hide()
	        	});
	      	});
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
			      "texto": "",
			      "user": Auth.getCurrentUser()
			    }, 
			    new AnotacaoClass(),
			    function(obj) {
						console.log($("#search").val())
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
		printCurrentAnotacao: function(){
			window.print();
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
		attachPdf() {
			var fileUploadControl = $("#input-pdf")[0]
			if (fileUploadControl.files.length > 0) {
				$("#app .progress").show()
				var regexIsImage = /\.(jpg|jpeg|png)$/
				var file = fileUploadControl.files[0]
				var name = getSlug(file.name)
				var parseFile = new Parse.File(name, file)
				parseFile.save().then(function() {
					$("#text").append("<br><br><a href='"+parseFile.url()+"' target='_blank'>"+file.name+"</a><br><br>")
					$("#app .progress").hide()
				}, function(error) {
					$("#app .progress").hide()
					console.log(error)
				});
			}
		},
		attachImage() {
			var fileUploadControl = $("#input-image")[0]
			if (fileUploadControl.files.length > 0) {
				$("#app .progress").show()
				var file = fileUploadControl.files[0]
				var name = getSlug(file.name)
				var parseFile = new Parse.File(name, file)
				parseFile.save().then(function() {
					$("#text").append("<br><br><img src='"+parseFile.url()+"'><br><br>")
					$("#app .progress").hide()
				}, function(error) {
					$("#app .progress").hide()
					console.log(error)
				});
			}
		},
		toggleEdit(editMode){
			if(editMode){
				$("#toggle-edit i").text("mode_edit")
				$("#text").attr("contenteditable", true)
				$("#edicao").css("visibility", "visible")
			} else {
				$("#toggle-edit i").text("remove_red_eye")
				$("#text").attr("contenteditable", false)
				$("#edicao").css("visibility", "hidden")
			}
		},
		isEditMode(){
			return $("#toggle-edit").text().trim() == "mode_edit"
		},
		filter(query){
			query = getSlug(query)
			$("#assuntos .collection-item").each(function(){
				var title = getSlug($(this).find(".title").text())
				if(title.startsWith(query)){
						$(this).css("display", "block")
				} else {
						$(this).css("display", "none")
				}
			})
		}

	}   
}
</script>