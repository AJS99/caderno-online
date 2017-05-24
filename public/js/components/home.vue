<template>
	<header>
		<div class="section no-pad-bot" id="index-banner">
			<div class="container">
			<br><br>
				<div class="section">
					<div class="home-wrap"> 
						<h1 class="logo"><img src="assets/images/home-logo.png"> CadernOnline</h1>
						<p id="home-p" class="header col s12 light"> Seja bem vindo ao CadernOnline. <br>Aqui sua vida acadêmica será bem mais fácil de gerenciar e controlar.</p>

						<!-- Using value --> 
						<b-btn id="btn-login" class="btn-large waves-effect waves-light blue">Entrar</b-btn>
					</div>
				</div>
			</div>
		</div>

		<div id="modalEntrar" class="modal modal-fixed-footer">
			<div class="modal-content">
				<h4 id="text-modal">Acesso ao CadernOnline</h4>
				<div class="col s12">
					<div class="row">
						<div class="col s12">
							<ul class="tabs">
								<li id="tab-login" class="tab col s6"><a class="active" href="#form-login">Login</a></li>
								<li id="tab-cadastro" class="tab col s6"><a href="#form-cadastro">Cadastrar</a></li>
							</ul>
						</div>
					</div>
					<div class="row">
						<div id="form-login" class="col s12">
							<form class="col s12">
								<div class="row">
									<button id="btn-facebook" class="btn-large waves-effect waves-light blue btn btn-secondary col s12">
										<a v-on:click="facebookLogin">Entrar com Facebook</a>
									</button><br>
								</div>
								
								<div class="divider"></div>

								<div class="row">
									<div class="input-field col s12">
										<input id="login-email" type="email" class="validate" required>
										<label for="email">E-mail</label>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<input id="login-senha" type="password" class="validate" required>
										<label for="senha">Senha</label>
									</div>
								</div>
							</form>
						</div>
						<div id="form-cadastro" class="col s12">
							<form class="col s12">
								<div class="row">
									<div class="input-field col s12">
										<input id="nome" type="text" class="validate" required>
										<label for="nome">Nome Completo</label>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<input id="email" type="email" class="validate" required> 
										<label for="email">E-mail</label>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<input id="senha" type="password" class="validate" required>
										<label for="senha">Senha</label>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>				
			<div class="modal-footer">
				<a class="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
				<a id="btn-user-cadastro" class="modal-action waves-effect waves-green btn-flat">Cadastrar</a>
				<a id="btn-user-entrar" class="modal-action waves-effect waves-green btn-flat">Entrar</a>
			</div>
		</div>
	</header>
</template>

<script>
module.exports = {
    data: function() {
        return {
            who: 'world'
        }
    },
	created () {
		console.log("HOME123");
	},
	mounted() {
		var self = this
		$('#btn-login').click(function(){
			$('.modal').modal()
			$('#modalEntrar').modal('open')
		})

		$('#btn-user-entrar').click(function(){

			var login_email = $("#login-email").val()
			var login_senha = $("#login-senha").val()

			console.log(login_email)
			console.log(login_senha)

			self.login(login_email, login_senha, function(){
			})
		}),
		
		$('#btn-user-cadastro').click(function(){
			var nome = $("#nome").val()
			var email = $("#email").val()
			var senha = $("#senha").val()
						
			// TODO validar

			self.saveUser(nome, email, senha, function(){

				Materialize.toast('Cadastro realizado com sucesso!', 8000, 'rounded')
				alert("Cadastro realizado com sucesso!") 
				$('#modalEntrar').modal('close')
				
				router.push('/dashboard')
				location.reload()
			})
		})
	},
	methods: {
		login: function(email, senha, callback){

			Auth.login(email, senha, function(user){
				alert("Login realizado com sucesso!")
				$('#modalEntrar').modal('close')

				router.push('/dashboard')
				location.reload()
			}, function(error){
				console.log(error)
			})
		},
		facebookLogin: function(){
			$('#modalEntrar').modal('close')
			Auth.facebookLogin(function(user){
				router.push('/dashboard')
				location.reload()
			}, function(error){
				console.log(error)
			})
		},
		saveUser: function(nome, email, senha, callback){
			var self = this
			Auth.signup({
				  "name" : nome,
			      "username": email,
			      "email": email,
			      "password": senha
			    },
			    function(obj) {
		    	  callback(obj)
			    },
			    function(error) {
					Materialize.toast('<i class="material-icons">error</i> Erro ao realizar cadastro: ' + error.message, 4000)
			    }
			)
		}
	}
}

</script>