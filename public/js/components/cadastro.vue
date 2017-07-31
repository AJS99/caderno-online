<template>
    <h1>CADASTRO</h1>
</template>

<script>
module.exports = {
    data: function() {
        return {
            who: 'world'
        }
    },
	created () {
		if(!Auth.isLoggedIn()){
			this.$router.push('/404')
			return
		} 
		console.log("CADASTRO")
	},
}
</script>