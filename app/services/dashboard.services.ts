import client from "../api/grapgql_api";
import { GET_DASHBOARD_DATA } from "../grapgql/grapgql_query/dashboard_query";

export const getDashboardData = async () => {
    try {
        const data = await client.query({
          query: GET_DASHBOARD_DATA,
        });
        if (data) {
          return data;
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
  };