import { Domain_HackathonResponses } from '@/api/@types'

export interface HackathonInterface {
  fetchAll(): Promise<Domain_HackathonResponses[]>
  fetchById(hackathon_id: string): Promise<Domain_HackathonResponses>
}
