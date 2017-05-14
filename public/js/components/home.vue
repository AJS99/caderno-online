<template>
		<header id="home-fundo">
			<div class="home-wrap"> 
				<h1 class="logo"><img src="assets/images/home-logo.png"> CadernOnline</h1>
				<p id="home-p"> Seja bem vindo ao CadernOnline. <br>Aqui sua vida acadêmica será bem mais fácil de gerenciar e controlar.</p>

				<!-- Using value --> 
				<b-btn v-b-modal="'modal1'" class="btn btn-info btn-lg">Entrar</b-btn>

				 <!-- Modal Component -->
				  <b-modal id="modal1" title="CadernOnline">
				  	<header>
				  		<nav>
				  			<a>Entrar</a>
				  			<a>Criar conta</a>
				  		</nav>
				  	</header>

				    
				    <form @submit.stop.prevent="submit">
				      <b-form-input type="text" placeholder="Nome" v-model="name"></b-form-input><br>
				      <b-form-input type="text" placeholder="Email" v-model="name"></b-form-input>
				    </form>
				    
				  </b-modal>
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
}

</script>