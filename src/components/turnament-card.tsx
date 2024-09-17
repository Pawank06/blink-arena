import { LocateIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"


interface TournamentCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  prizePool: string;
}

export function TournamentCard({
  title,
  description,
  date,
  time,
  location,
  prizePool,
}: TournamentCardProps) {
  return (
    <Card className="w-[380px] bg-stone-900">
      <div className="p-6">
        <div className="">
          <div className="h-[300px] border border-white/10 rounded-lg">
            {/* You can add an image here if needed */}
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
        <Button className="w-full hover:bg-green-500/90 bg-green-500 text-black">
          Join Now
        </Button>
      </CardFooter>
    </Card>
  );
}
