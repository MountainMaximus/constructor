import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchData } from "./types";

export const fetchData = createAsyncThunk("items/fetchData", async () => {
  const { data } = await axios.get<FetchData>("example.json");
  return data;
});
