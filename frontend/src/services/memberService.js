import api from "../utils/axios";


export const submitProfile = (data) => api.post("/member/profile", data);