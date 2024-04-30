<script>
import { defineComponent } from "@vue/composition-api";
import { postLogin } from "../helpers/api";
import { setUserToken } from "../helpers/localStorageHelpers";
definePageMeta({
  middleware: "auth",
});
export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const response = await postLogin({
          email: email.value,
          password: password.value,
        });

        console.log('response => ', response.data);

        const token = response.data.access_token;
        console.log("Token ", token);
        setUserToken(token);
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    };

    const goToCreateAccount = () => {
      router.push("/create");
    };

    return {
      email,
      password,
      login,
      goToCreateAccount
    };
  },
});
</script>

<template>
  <div>
    <div class="flex items-center justify-center px-6 pt-8">
      <!-- Card -->
      <div class="w-full max-w-xl p-6 space-y-8 sm:p-8">
        <h2 class="text-2xl font-bold">Iniciar sesión</h2>
        <form class="mt-8 space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium"
              >Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>

          <button
            type="submit"
            class="bg-gray w-full px-5 py-3 text-base font-medium text-center rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 "
          >
            Enviar
          </button>
          <div class="text-sm font-medium text-gray-500">
            <a class="text-primary-700 hover:underline dark:text-primary-500 cursor-pointer"
              @click="goToCreateAccount()"
              >Crear una cuenta</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>