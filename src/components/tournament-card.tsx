import { LocateIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface TournamentCardProps {
  tournamentId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  location: string;
  prizePool: string;
}

export function TournamentCard({
  tournamentId,
  title,
  description,
  date,
  time,
  image,
  location,
  prizePool,
}: TournamentCardProps) {
  return (
    <Card className="w-[380px] bg-stone-900">
      <div className="p-6">
        <div className="">
          <div className="h-[300px] border border-white/10 rounded-lg">
            <Image
              src={image}
              alt={title}
              width={380}
              height={300}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex my-5 justify-between items-center">
          <CardTitle className="text-xl text-stone-200">{title}</CardTitle>
          <p className="text-xs font-bold text-muted-foreground">
            {date} {time}
          </p>
        </div>
        <p className="text-sm text-stone-400">{description}</p>
      </div>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border border-white/10 p-4">
          <LocateIcon className="text-stone-200" />
          <div className="flex-1 space-y-1">
            <p className="text-stone-200 text-sm font-medium leading-none">
              {location}
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <h1 className="text-lg font-bold text-stone-300">Prize Pool</h1>
          <h1 className="text-lg font-bold text-stone-300">{prizePool}</h1>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Factions%2Fjoin%2F${tournamentId}&cluster=devnet`}
        >
          <Button className="w-full hover:bg-green-500/90 bg-green-500 text-black">
            Join Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
