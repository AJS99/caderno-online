<template>
    <h1>ANOTACAO</h1>
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
		console.log("ANOTACAO")
	},
}
</script>