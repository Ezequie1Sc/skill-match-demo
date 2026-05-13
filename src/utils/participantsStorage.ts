import participantsJson from '../assets/data/participants.json'
import type { Participant } from '../types/participant_model'

const STORAGE_KEY = 'participants'

export function getBaseParticipants(): Participant[] {
  return participantsJson as Participant[]
}

export function getLocalParticipants(): Participant[] {
  const savedParticipants = localStorage.getItem(STORAGE_KEY)

  if (!savedParticipants) {
    return []
  }

  return JSON.parse(savedParticipants) as Participant[]
}

export function getAllParticipants(): Participant[] {
  const baseParticipants = getBaseParticipants()
  const localParticipants = getLocalParticipants()

  return [...baseParticipants, ...localParticipants]
}

export function getNextParticipantId(): number {
  const allParticipants = getAllParticipants()

  if (allParticipants.length === 0) {
    return 1
  }

  const maxId = Math.max(
    ...allParticipants.map((participant) => participant.id),
  )

  return maxId + 1
}

export function saveParticipant(participant: Participant): void {
  const localParticipants = getLocalParticipants()

  const updatedParticipants = [...localParticipants, participant]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedParticipants))
}