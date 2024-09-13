import createTournamentSchema from '@/app/(mongodb)/schema/createTournamentSchema';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tournamentId } = req.query;

  const tournament = createTournamentSchema.find(tournamentId);

  if (tournament) {
    res.status(200).json(tournament);
  } else {
    res.status(404).json({ error: 'Tournament not found' });
  }
}
