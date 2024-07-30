import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ManageUsers from "../Pages/ManageUsers";
import AllTransactions from "../Pages/AllTransactions";
import Welcome from "../Pages/Welcome";
import SendMoney from "../Pages/SendMoney";
import BalanceInquiry from "../Pages/BalanceInquiry";
import TransactionsHistory from "../Pages/TransactionsHistory";
import AgentTransactionsHistory from "../Pages/AgentTransactionsHistory";
import CashIn from "../Pages/CashIn";
import CashOut from "../Pages/CashOut";
import TransactionsManagement from "../Pages/TransactionsManagement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>,
    },
    {
        path: "/register",
        element: <Register></Register>,
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [

            {
                path: "welcome",
                element: <Welcome></Welcome>
            },
            {
                path: "manage-users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "all-transactions",
                element: <AllTransactions></AllTransactions>
            },
            {
                path: "send-money",
                element: <SendMoney></SendMoney>
            },
            {
                path: "balance-inquiry",
                element: <BalanceInquiry></BalanceInquiry>
            },
            {
                path: "transactions-history",
                element: <TransactionsHistory></TransactionsHistory>
            },
            {
                path: "agent-transactions-history",
                element: <AgentTransactionsHistory></AgentTransactionsHistory>
            },
            {
                path: "cash-in",
                element: <CashIn></CashIn>
            },
            {
                path: "cash-out",
                element: <CashOut></CashOut>
            },
            {
                path: "transaction-management",
                element: <TransactionsManagement></TransactionsManagement>
            },
        ]
    }
]);

export default router;