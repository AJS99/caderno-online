<template>
    
</template>

<script>
module.exports = {
    data: function() {
        return {
            
        }
    },
	created () {
        Auth.logout()
        router.push('/')
        location.reload()
	},
}
</script>