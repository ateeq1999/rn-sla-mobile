import { RegisterUserInput, LoginUserInput, Partner, ListApiResponse, SingleApiResponse } from "@/types/user";
import { Api } from "./api";

async function index(page?: number, limit?: number, search?: string): Promise<ListApiResponse<Partner>> {
    return await Api.get(`/partners?page=${page ?? 1},limit=${limit ?? 10},search=${search ?? ''}`);
}

async function show(id: string): Promise<SingleApiResponse<Partner>> {
    return await Api.get(`/partners/${id}`);
}

async function store(data: any): Promise<SingleApiResponse<Partner>> {
    return await Api.post(`/partners`, data);
}

async function update(id: string, data: any): Promise<SingleApiResponse<Partner>> {
    return await Api.put(`/partners/${id}`, data);
}

async function destroy(id: string): Promise<SingleApiResponse<Partner>> {
    return await Api.delete(`/partners/${id}`);
}

const partnerService = {
    index,
    show,
    store,
    update,
    destroy,
};

export { partnerService };