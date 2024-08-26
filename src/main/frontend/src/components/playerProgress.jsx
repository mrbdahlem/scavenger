import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import playService from "../lib/service/play.service";

export const PlayerProgress = ({game, player}) => {
    const [gameData, setGameData] = useState(game);

    useEffect(()=>{
        if (player){
            // fetch game data
            playService.getGameData(player).then((data) => {
                console.log(data);
                setGameData(data);
            });
        }
    }, [player]);


    function progress(tasks) {
        const total = tasks.length;
        const complete = tasks.filter((task) => task.complete).length;
        return (complete / total) * 100;
    }

    return ( 
        gameData && (
            <>
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                                <h1 className="font-bold text-lg">{gameData.gameTitle}</h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div dangerouslySetInnerHTML={{__html: gameData.gameDescription}} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <fieldset className="mt-5 border rounded border-black p-3">
                    <legend className="font-bold px-1">To Do</legend>
                    <Progress value={progress(gameData.tasks)} max={100} />
                    <Accordion type="single" collapsible  className="w-full">
                        {gameData.tasks
                            .filter((task) => !task.complete)
                            .map((task, index) => (  
                                <AccordionItem key={index} value={`item-${index+2}`}>
                                    <AccordionTrigger className="font-bold">
                                        {task.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div dangerouslySetInnerHTML={{__html: task.description}} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                    </Accordion>
                </fieldset>

                <fieldset className="mt-5 border rounded border-black p-3">
                    <legend className="font-bold px-1">Complete</legend>
                    <Accordion type="single" collapsible className="w-full">
                        {gameData.tasks
                            .filter((task) => task.complete)
                            .map((task, index) => (  
                                <AccordionItem key={index} value={`item-${index+2}`}>
                                    <AccordionTrigger className="font-thin" >
                                        ✅&nbsp;{task.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div dangerouslySetInnerHTML={{__html: task.description}} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                    </Accordion>
                </fieldset>
        </>
    ));
}
