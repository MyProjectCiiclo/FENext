import api from "./api"

export const SkillService = {
    async getSkills() {
        return api.get("/profile")
    }
}