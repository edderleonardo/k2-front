<script>
import { checkLink } from "@/helpers/checkLink";
import { getAccounts } from "@/helpers/getAccounts";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const accounts = ref([]);
    const loading = ref(true);
    const totales = ref({});

    const getBalance = (accounts) => {
      let liabilitiesTotal = 0;
      let assetsTotal = 0;

      // Itera sobre las cuentas y suma los valores según el tipo de balance
      accounts.forEach((account) => {
        if (account.balance_type === "LIABILITY") {
          liabilitiesTotal += account.balance.current;
        } else if (account.balance_type === "ASSET") {
          assetsTotal += account.balance.current;
        }
      });

      // Retorna un objeto con el balance total y los valores de activos y pasivos
      return {
        balance: assetsTotal - liabilitiesTotal,
        liabilities: liabilitiesTotal,
        assets: assetsTotal,
      };
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(value);
    };

    const balanceType = (type) => {
      if (type === "ASSET") {
        return "💵 ⬆";
      } else if (type === "LIABILITY") {
        return "💸 ⬇";
      }
    }

    onMounted(async () => {
      const link = route.params.id;
      // si no tiene link, redirigir a la pagina principal
      if (!link) {
        router.push("/");
      }
      // validar si el link es valido
      const res = await checkLink(link);
      if (!res.id && res.status !== "valid") {
        router.push("/");
      }
      const payload = {
        link: link,
        save_data: false,
      };
      // obtener las cuentas
      accounts.value = await getAccounts(payload);
      loading.value = false;
      totales.value = getBalance(accounts.value);
    });

    return {
      accounts,
      loading,
      totales,
      formatCurrency,
      balanceType,
    };
  },
});
</script>
t

<template>
  <div>
    <!-- Navegacion hacia atras -->
    
        <slot class="mt-4 mb-5 breadcrumbs" name="breadcrumbs">
          <div class="flex items-center">
            <nuxt-link to="/" class="text-blue-500">Inicio</nuxt-link>
            <span class="mx-2">/</span>
            <p class="text-gray-500">Cuentas</p>
          </div>
        </slot>
        
    <h1 class="text-3xl mt-4 font-bold underline">Cuentas</h1>
    <div v-if="loading" class="text-gray-500 mt-9">Cargando...</div>
    <div v-else>
      <div v-if="accounts.length === 0" class="mt-10 text-center">
        <p class="text-2xl text-orange-500">No hay cuentas disponibles. 🫠</p>
      </div>
      <div v-else class="mt-4">
        <div class="mt-10 flex justify-end">
          <div>
            <div>
              <p class="text-5xl">{{ formatCurrency(totales.balance) }}</p>
            </div>
            <div class="text-3xl text-center"><p>Balance de cuentas</p></div>
          </div>
        </div>
        <div class="mt-9">
          <div v-for="account in accounts" :key="account.id">
            <div class="bg-gray-100 p-4 my-4 rounded-lg">
              <div class="flex justify-between">
                <div class="w-1/2">
                  <div class="text-xl font-bold">{{ account.name }}</div>
                  <div>
                    <p class="text-gray-500">
                      Tipo de cuenta:
                    </p>
                    <p class="text-gray-500">{{ account.type }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <div><p class="text-xl">{{ balanceType(account.balance_type) }}</p></div>
                  <div><p>{{ formatCurrency(account.balance.current) }} {{ account.currency }}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>