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
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        children: [
            {
                path: "welcome",
                element: <ProtectedRoute><Welcome /></ProtectedRoute>
            },
            {
                path: "manage-users",
                element: <ProtectedRoute><ManageUsers /></ProtectedRoute>
            },
            {
                path: "all-transactions",
                element: <ProtectedRoute><AllTransactions /></ProtectedRoute>
            },
            {
                path: "send-money",
                element: <ProtectedRoute><SendMoney /></ProtectedRoute>
            },
            {
                path: "balance-inquiry",
                element: <ProtectedRoute><BalanceInquiry /></ProtectedRoute>
            },
            {
                path: "transactions-history",
                element: <ProtectedRoute><TransactionsHistory /></ProtectedRoute>
            },
            {
                path: "agent-transactions-history",
                element: <ProtectedRoute><AgentTransactionsHistory /></ProtectedRoute>
            },
            {
                path: "cash-in",
                element: <ProtectedRoute><CashIn /></ProtectedRoute>
            },
            {
                path: "cash-out",
                element: <ProtectedRoute><CashOut /></ProtectedRoute>
            },
            {
                path: "transaction-management",
                element: <ProtectedRoute><TransactionsManagement /></ProtectedRoute>
            },
        ]
    }
]);

export default router;
