export default function (to, from) {
    const router = useRouter();
    if (process.client) {
      if (localStorage.getItem("token")) {
        // authenticated
        if (to.path !== "/") {
          router.push("/");
        }
      } else {
        // not authenticated
        if (to.path !== "/login") {
          router.push("/login");
        }
      }
    }
  }