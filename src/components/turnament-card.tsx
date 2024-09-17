import { LocateIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

type CardProps = React.ComponentProps<typeof Card>

export function TournamentCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px] bg-stone-900", className)} {...props}>
      <div className="p-6">
        <div className="">
            <div className="h-[300px] border border-white/10 rounded-lg">

            </div>
        </div>
        <div className="flex my-5 justify-between items-center">
        <CardTitle className="text-xl text-stone-200">PubG Game</CardTitle>
        <p className="text-xs font-bold text-muted-foreground">9/10/2024 9:12pm</p>
        </div>
        <p className="text-sm text-stone-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aperiam nobis libero..</p>
      </div>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border border-white/10 p-4">
          <LocateIcon className="text-stone-200" />
          <div className="flex-1 space-y-1">
            <p className="text-stone-200 text-sm font-medium leading-none">
              Ranchi, Jhanrkhand
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
         
        </div>
        <div className="flex justify-between">
          <h1 className="text-lg font-bold text-stone-300">Prize Pool</h1>
          <h1 className="text-lg font-bold text-stone-300">$1000</h1>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full hover:bg-green-500/90 bg-green-500 text-black">
         Join Now
        </Button>
      </CardFooter>
    </Card>
  )
}
