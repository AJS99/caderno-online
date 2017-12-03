<template>
	<main>
		<!-- <section id="index-banner" class="section no-pad-bot">
			<div class="home-wrap"> 
				<h1 class="logo"><img src="assets/images/home-logo.png"> CadernOnline</h1>
				<p id="home-p" class="header col s12 light"> Seja bem vindo ao CadernOnline. <br>Aqui sua vida acadêmica será bem mais fácil de gerenciar e controlar.</p>
				<b-btn id="btn-login" class="btn-large waves-effect waves-light blue">Entrar</b-btn>
			</div>
		</section> -->

		<section class="carousel carousel-slider center section" data-indicators="true">
			<div id="btn-login" class="carousel-fixed-item center">
				<a class="btn-large waves-effect waves-light white-text light-blue">Entrar</a>
			</div>
			<div id="index-banner-1" class="carousel-item white-text" href="#one!">
			</div>
			<div id="index-banner-2" class="carousel-item white-text" href="#two!">
			</div>
			<div id="index-banner-3" class="carousel-item white-text" href="#three!">
			</div>
		</section>

		<footer class="page-footer light-blue">
          <!-- <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">CadernOnline</h5>
                <p class="grey-text text-lighten-4">Sua vida academica mais acessível.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Experimente agora</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#">Criar Conta</a></li>
                  <li><a class="grey-text text-lighten-3 " href="#">Entrar</a></li>
                </ul>
              </div>
            </div>
          </div> -->
          <div class="footer-copyright">
            <div class="container">
            © Todos os direitos reservados
            <a class="grey-text text-lighten-4 right" href="raccoonsoft.info">Desenvolvido por Raccoon Soft</a>
            </div>
          </div>
        </footer>

		<div id="modalEntrar" class="modal modal-fixed-footer">
			<div class="modal-content">
				<h4 id="text-modal">Acesso ao CadernOnline</h4>
				<div class="col s12">
					<div class="row">
						<div class="col s12">
							<ul class="tabs tabs-fixed-width">
								<li id="tab-login" class="tab"><a class="active" href="#form-login">Entrar</a></li>
								<li id="tab-cadastro" class="tab"><a href="#form-cadastro">Registrar</a></li>
							</ul>
						</div>
						<div id="form-login" class="col s12">
							<form class="col s12">
								<div class="row">
									<div class="input-field col s12">
										<input id="login-email" type="email">
										<label for="email">E-mail</label>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<input id="login-senha" type="password">
										<label for="senha">Senha</label>
									</div>
								</div>
								<div class="divider"></div>
									<a v-on:click="facebookLogin" id="btn-facebook" class="btn-large waves-effect waves-light btn blue col s12">
										<img src="assets/images/facebook.png">
										<i>Entrar com Facebook</i>
									</a><br>
							</form>
						</div>
						<div id="form-cadastro" class="col s12">
							<form class="col s12">
								<div class="row">
									<div class="input-field col s12">
										<input id="nome" type="text">
										<label for="nome">Nome Completo</label>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<input id="email" type="email"> 
										<label for="email">E-mail</label>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<input id="senha" type="password">
										<label for="senha">Senha</label>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>				
			<div class="modal-footer">
				<a class="modal-action modal-close waves-effect waves-red btn-flat red-text">Cancelar</a>
				<a id="btn-user-cadastro" class="modal-action waves-effect waves-green btn-flat green-text">Cadastrar</a>
				<a id="btn-user-entrar" class="modal-action waves-effect waves-green btn-flat green-text">Entrar</a>
			</div>
		</div>
	</main>
</template>

<script>
module.exports = {
    data: function() {
        return {
            who: 'world'
        }
    },
	created () {

	},
	mounted() {
		var self = this
		$('.carousel.carousel-slider').carousel({fullWidth: true});
		setTimeout(this.autoplay, 5000);
		$('#modalEntrar').tabs({
			onShow: function(tab) {
				var currentTabId = tab[0].id
				if(currentTabId === "form-login"){
					$("#btn-user-entrar").show()
					$("#btn-user-cadastro").hide()
				} else if(currentTabId === "form-cadastro"){
					$("#btn-user-entrar").hide()
					$("#btn-user-cadastro").show()
				}
			}
		});

		$('#btn-login').click(function(){
			$('#modalEntrar').modal()
			$('#modalEntrar').modal('open')
			$('#modalEntrar .tabs').tabs()
		})

		$('#btn-user-entrar').click(function(){
			var email = $("#login-email").val()
			var senha = $("#login-senha").val()

			self.login(email, senha, function(){
				console.log("success")
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
				$('#modalEntrar').modal('close')

				router.push('/dashboard')
				location.reload()
			}, function(error){
				Materialize.toast('<i class="material-icons">error</i> Usuário ou senha Inválidos', 2000)
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
						Materialize.toast('<i class="material-icons">error</i> Email já cadastrado', 2000)
			    }
			)
		},
		autoplay: function() {
				$('.carousel').carousel('next');
				setTimeout(this.autoplay, 5000);
		}
	}
}

</script>