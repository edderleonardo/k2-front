<script>
import { defineComponent } from "@vue/composition-api";
import { registerUser } from "../helpers/api";

export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref("");
    const password_1 = ref("");
    const password_2 = ref("");

    const createUser = async () => {
      try {
        const response = await registerUser({
          email: email.value,
          password_1: password_1.value,
          password_2: password_2.value,
        });

        console.log(response.data);
        router.push("/login");
      } catch (e) {
        console.log(e);
      }
    };

    const goBack = () => {
      router.push("/login");
    }

    return {
      email,
      password_1,
      password_2,
      createUser,
      goBack
    };
  },
});
</script>

<template>
  <div>
    <div class="flex items-center justify-center px-6 pt-8">
      <!-- Card -->
      <div class="w-full max-w-xl p-6 space-y-8 sm:p-8">
        <h2 class="text-2xl font-bold">Crear una cuenta</h2>
        <form class="mt-8 space-y-6" @submit.prevent="createUser">
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
              name="password_1"
              id="password_1"
              v-model="password_1"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium"
              >Repetir password</label
            >
            <input
              type="password"
              name="password_2"
              id="password_2"
              v-model="password_2"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>

          <button
            type="submit"
            class="bg-gray w-full px-5 py-3 text-base font-medium text-center rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
          >
            Enviar
          </button>
          <div class="text-sm font-medium text-gray-500">
            <a class="text-primary-700 hover:underline dark:text-primary-500 cursor-pointer"
              @click="goBack()"
              >Regresar</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>