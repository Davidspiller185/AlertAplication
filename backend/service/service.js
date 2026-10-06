import { repoAllAlert, repoAlertById, repoPost,repoDelete,repoPut } from "../repository/repo.js"
export async function serviceAllAlert() {
    const allAlert = await repoAllAlert()
    return allAlert
}

export async function serviceAlertById(id) {
    const AlertById = await repoAlertById(id)
    return AlertById
}

export async function servicePost(body) {
    return await repoPost(body)
}

export async function serviceDelete(id) {
    return await repoDelete(id)
}

export async function putService(id, body) {
    return await repoPut(id,body)
}