import { Progress } from "@/components/ui/progress";

export const PlayInfo = ({data}) => {
    console.log(data);

    return (
        <div className="border rounded border-black p-3">
            <div className="flex flex-row items-center justify-between gap-3">
                <h2 className="text-lg font-bold">Player: {data.name}</h2>
                <div>Started: {new Date(data.startTime + 'Z').toLocaleString()}</div>
            </div>
            <Progress value={data.percentComplete} />
        </div>
    )
};

export default PlayInfo;