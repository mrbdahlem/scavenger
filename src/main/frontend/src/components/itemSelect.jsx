import {useState} from "react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer";
import {useMediaQuery} from "@/hooks/use-media-query";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const ItemSelect = ({onChange, items: items, setTitle}) => {

    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(null);

    function handleItemChange(item) {
        setItem(item);
        onChange(item);
    }

    const isDesktop = useMediaQuery("(min-width: 768px)")
    return (
            isDesktop &&
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {item ? <>{item.title || item.name}</> : <>{setTitle}</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <ItemList setOpen={setOpen} setItem={handleItemChange} items={items}/>
                </PopoverContent>
            </Popover>
        )
        || ( // !isDesktop
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {item ? <>{item.title || item.name}</> : <>{setTitle}</>}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerTitle>
                        <VisuallyHidden.Root>
                            <DrawerDescription>Choose one</DrawerDescription>
                        </VisuallyHidden.Root>
                    </DrawerTitle>
                    <div className="mt-4 border-t">
                        <ItemList setOpen={setOpen} setItem={handleItemChange} items={items}/>
                    </div>
                </DrawerContent>
            </Drawer>
        )
}

export default ItemSelect;

function ItemList({setOpen, setItem: setItem, items: items}) {
    return (
        <Command>
            <CommandInput placeholder="Filter..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {items.map((item) => (
                        <CommandItem
                            key={item.id}
                            value={""+item.id}
                            onSelect={(id) => {
                                id = parseInt(id)
                                setItem( items.find((item) => item.id === id) || null )
                                setOpen(false)
                            }}
                        >
                            {item.title || item.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}