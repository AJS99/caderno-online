<template>
		<header id="home-fundo">
			<div class="home-wrap"> 
				<h1 class="logo"><img src="assets/images/home-logo.png"> CadernOnline</h1>
				<p id="home-p"> Seja bem vindo ao CadernOnline. <br>Aqui sua vida acadêmica será bem mais fácil de gerenciar e controlar.</p>
				<div id="fake-nav">
					<a class="btn btn-info btn-lg" href="#entrar">Entrar</a>
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
}

</script>