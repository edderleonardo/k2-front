<script>
import { checkLink } from "@/helpers/checkLink";
import { getAccounts } from "@/helpers/getAccounts";
import { getTransactions } from "@/helpers/getTransactions";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const accounts = ref([]);
    const loading = ref(true);
    const totales = ref({});
    const transactions = ref([]);
    const transactionsByAccountData = ref({});

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
    };

    onMounted(async () => {
      const link = route.params.id;
      // si no tiene link, redirigir a la pagina principal
      if (!link) {
        router.push("/");
        return;
      }
      // validar si el link es valido
      const res = await checkLink(link);
      if (!res.id && res.status !== "valid") {
        router.push("/");
        return;
      }
      const payload = {
        link: link,
        save_data: false,
      };

      const payload_transactions = {
        link: link,
        date_from: "2024-02-01",
        date_to: "2024-04-01",
      };
      // obtener las cuentas
      const accountsData = await getAccounts(payload);
      accounts.value = accountsData;
      console.log("🚀 ~ onMounted ~ accountsData:", accountsData)
      // obtener las transacciones
      const transactionsData = await getTransactions(payload_transactions);
      transactions.value = transactionsData;

      // Agrupar transacciones por nombre de cuenta
      const transactionsByAccount = {};
      transactionsData.forEach((transaction) => {
        console.log("🚀 ~ onMounted ~ transaction:", transaction);
        const account = accountsData.find(
          (account) => account.name === transaction.account.name
        );
        if (account) {
          const accountName = account.name;
          if (!transactionsByAccount[accountName]) {
            transactionsByAccount[accountName] = [];
          }
          transactionsByAccount[accountName].push(transaction);
        }
      });
      console.log(
        "🚀 ~ onMounted ~ transactionsByAccount:",
        transactionsByAccount
      );
      transactionsByAccountData.value = transactionsByAccount;

      loading.value = false;
      totales.value = getBalance(accounts.value);
    });

    return {
      accounts,
      loading,
      totales,
      formatCurrency,
      balanceType,
      transactions,
      transactionsByAccountData,
    };
  },
});
</script>
t

<template>
  <div>

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
          <div
            v-for="(transactions, accountName) in transactionsByAccountData"
            :key="accountName"
          >
            <div class="bg-gray-100 p-4 my-4 rounded-lg">
              <div class="flex justify-between">
                <div class="w-1/2">
                  <div class="text-xl font-bold">{{ accountName }}</div>
                  <div>
                    <p class="text-gray-500">Tipo de cuenta:</p>
                    <!-- <p class="text-gray-500">{{ account.type }}</p> -->
                  </div>
                </div>
                <div class="text-right">
                  <div>
                    <p class="text-xl">
                      <!-- {{ balanceType(account.balance_type) }} -->
                    </p>
                  </div>
                  <div>
                    <p>
                      <!-- {{ formatCurrency(account.balance.current) }} -->
                      <!-- {{ account.currency }} -->
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ transaction.accounting_date }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ transaction.account.balance_type }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ transaction.category }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ transaction.description }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ formatCurrency(transaction.amount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    {{ formatCurrency(transaction.balance) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>