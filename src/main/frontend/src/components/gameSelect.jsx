import {useState} from "react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {useMediaQuery} from "@/hooks/use-media-query";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

const GameSelect = ({onChange, games}) => {

    const [open, setOpen] = useState(false);
    const [game, setGame] = useState(null);

    function handleGameChange(game) {
        setGame(game);
        onChange(game);
    }

    const isDesktop = useMediaQuery("(min-width: 768px)")
    return (
            isDesktop &&
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {game ? <>{game.title}</> : <>+ Set game</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <GameList setOpen={setOpen} setGame={setGame} games={games}/>
                </PopoverContent>
            </Popover>
        )
        || ( // !isDesktop
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {game ? <>{game.title}</> : <>+ Set game</>}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerTitle>
                        <DrawerDescription>Select a game</DrawerDescription>
                    </DrawerTitle>
                    <div className="mt-4 border-t">
                        <GameList setOpen={setOpen} setGame={handleGameChange} games={games}/>
                    </div>
                </DrawerContent>
            </Drawer>
        )
}

export default GameSelect;

function GameList({setOpen, setGame, games}) {
    return (
        <Command>
            <CommandInput placeholder="Filter games..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {games.map((game) => (
                        <CommandItem
                            key={game.id}
                            value={""+game.id}
                            onSelect={(id) => {
                                id = parseInt(id)
                                setGame( games.find((game) => game.id === id) || null )
                                setOpen(false)
                            }}
                        >
                            {game.title}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}