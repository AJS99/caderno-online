<template>
    <h1>HOME</h1>
</template>

<script>
module.exports = {
    data: function() {
        return {
            who: 'world'
        }
    },
	created () {
		console.log("HOME")
	},
}
</script>