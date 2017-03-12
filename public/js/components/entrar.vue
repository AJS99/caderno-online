<template>
	<div>
    	<h1>ENTRAR</h1>
	    <a v-on:click="login">Entrar</a>
	    <a v-on:click="facebookLogin">Facebook</a>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            who: 'world'
        }
    },
	created: function() {
		console.log("ENTRAR")
	},
	methods: {
		login: function(){
			Auth.login("teste12@teste.com", "123", function(user){
				router.push('/dashboard')
			}, function(error){
				console.log(error)
			})
		},
		facebookLogin: function(){
			Auth.facebookLogin(function(user){
				router.push('/dashboard')
			}, function(error){
				console.log(error)
			})
		}
	}
}
</script>