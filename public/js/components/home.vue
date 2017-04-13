<template>
	<div>
		<h1>HOME</h1>
		<a href="#login">Login</a>
	</div>
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