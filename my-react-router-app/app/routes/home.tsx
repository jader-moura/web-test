import type { Route } from "./+types/home";
import { Transactions } from "../transactions/transactions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Transactions" },
    { name: "description", content: "Submit and view transactions" },
  ];
}

export default function Home() {
  return <Transactions />;
}
