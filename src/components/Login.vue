<template>
  <v-sheet class="d-flex align-center justify-center" height="100vh" color="grey-darken-3" rounded>
    <v-card class="mx-auto px-8 py-6" width="400" rounded>
      <h3 class="text-center mb-4">Welcome Back</h3>
      <v-form @submit.prevent="submit" >
        <v-text-field
          v-model="email"
          label="Email"
          clearable
          rounded
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          clearable
          rounded
          variant="outlined"

        ></v-text-field>

        <div class="d-flex justify-center mt-4">
          <v-btn
            size="large"
            rounded

            type="submit"
          >
            Login
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import auth from '@/api/auth/auth'; 
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async submit() {
     await auth.login({
      email: this.email,
      password: this.password,
     })
     .then((response) => {
        const data = response.data;
        data.expiration_date = new Date(Date.now()+ data.expires_in).toLocaleString()



        console.log('Login successful:', data);
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        console.log('Login request completed.');
      });
    },
  },
};
</script>