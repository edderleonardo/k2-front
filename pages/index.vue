<script>
import { ref } from "vue";
import { getInstitutions } from "@/helpers/getInstitutions";
import { getLink } from "@/helpers/getLink";
import { generatePasswordInSandBox } from "~/helpers/generateRandomPassword";
definePageMeta({
  middleware: "auth",
});

export default defineComponent({
  setup() {
    
    const router = useRouter();
    const institutions = ref([]);
    const error = ref(null);
    const isLoading = ref(false);

    const setCountryFlag = (country_code) => {
      switch (country_code) {
        case "MX":
          return "🇲🇽";
        case "CO":
          return "🇨🇴";
        case "BR":
          return "🇧🇷";
        default:
          return "🏳️";
      }
    };

    // TODO: proteger rutas

    const generateDataForLink = async (name) => {
      //isLoading.value = true;
      const payload = generatePasswordInSandBox(name);
      const link = await getLink(payload);
      link;
      router.push(`/accounts/${link.id}`);
    };

    onMounted(async () => {
      try {
        institutions.value = await getInstitutions();
      } catch (e) {
        error.value = e;
      }
    });

    return {
      institutions,
      error,
      isLoading,
      setCountryFlag,
      generateDataForLink,
    };
  },
});
</script>

<template>
  <div>
    <slot name="breadcrumbs">
      <div class="flex items-center">
        <nuxt-link to="/" class="text-blue-500">Inicio</nuxt-link>
      </div>
    </slot>

    <h1 class="mt-4 text-3xl font-bold underline">Instituciones</h1>
    <p class="text-gray-500 mt-3">
      Selecciona una institución para ver el detalle de las cuentas:
    </p>
    <div class="p-4 mt-4 mb-9 text-blue-950 bg-blue-100 rounded-lg">
      <p>Datos de prueba solo Bancos Erebor</p>
      <ul class="bold">
        <li>🇲🇽 Full</li>
        <li>🇨🇴 No Data</li>
        <li>🇧🇷 Low</li>
      </ul>
    </div>

    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div v-if="institutions.length === 0" class="text-gray-500">
        Cargando...
      </div>
      <div v-else class="mt-4">
        <!-- Mostrar datos en forma de tabla -->
        <table class="table-auto hover:shadow-lg w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Nombre</th>
              <th class="px-4 py-2">Pais</th>
              <th class="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="institution in institutions"
              :key="institution.id"
              class="bg-gray-100"
            >
              <td class="border px-4 py-2">{{ institution.display_name }}</td>
              <td class="border px-4 py-2">
                {{ institution.country_code }}
                {{ setCountryFlag(institution.country_code) }}
              </td>
              <td class="border px-4 py-2 text-center">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:text-sm sm:py-1 sm:px-2 md:text-sm md:py-1 md:px-2"
                  @click="generateDataForLink(institution.name)"
                >
                  Ver cuentas
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>