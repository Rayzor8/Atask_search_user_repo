export interface UsersType {
    id:number
    login:string
    repos_url:string
}

export interface ReposType {
    id:number
    name:string
    stargazers_count:number
    description:string | null
}