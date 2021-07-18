<template>
    <div>
      <h2>Login</h2>
      <label for="username">
        Username:
        <input v-model="user.username" id="username" type="text" />
      </label>
      <label for="password"
        >Password:
        <input v-model="user.password" id="password" type="password" />
      </label>
      <button @click="login">Login</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
        user: {
            username: "user1",
            password: "secret",
        }
        }
    },
    methods:{
        async login() {
            const userCopy = JSON.parse(JSON.stringify(this.user))
            this.$emit('login', userCopy)
    },
    }
}
</script>

