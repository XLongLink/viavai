import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Spacer } from "@/components/spacer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Gpu {
    name: string;
    vram: string;
    price: string;
    max: string;
}

const gpus = {
    enterprise: [
        {
            name: "A100 PCIe 80GB",
            vram: "80 GB VRAM",
            price: "$1.0000/hr",
            max: "Max 1x",
        },
    ],
    consumer: [
        {
            name: "RTX 3090 Ti PCIe 24GB",
            vram: "24 GB VRAM",
            price: "$0.2800/hr",
            max: "Max 2x",
        },
        {
            name: "RTX 4090 PCIe 24GB",
            vram: "24 GB VRAM",
            price: "$0.2490/hr",
            max: "Max 2x",
        },
        {
            name: "RTX 3090 PCIe 24GB",
            vram: "24 GB VRAM",
            price: "$0.2000/hr",
            max: "Max 1x",
        },
        {
            name: "RTX 4000 ADA PCIe 20GB",
            vram: "20 GB VRAM",
            price: "$0.1500/hr",
            max: "Max 6x",
        },
    ],
};

interface GpuCardProps {
    gpu: Gpu;
    selected: boolean;
    onSelect: () => void;
}

function GpuCard({ gpu, selected, onSelect }: GpuCardProps) {
    return (
        <Card
            className={cn(
                "border-2 transition cursor-pointer",
                selected ? "border-green-500" : "border-muted"
            )}
            onClick={onSelect}
        >
            <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                    <div className="font-medium">{gpu.name}</div>
                    <div className="text-sm text-muted-foreground">{gpu.vram}</div>
                </div>
                <Spacer size={5} axis="vertical" />
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{gpu.max}</div>
                    <div className="text-sm font-semibold">{gpu.price}</div>
                </div>
            </CardContent>
        </Card>
    );
}

export function Dev() {
    const [selectedGpus, setSelectedGpus] = useState<
        { enterprise: number | null; consumer: number | null }
    >({ enterprise: null, consumer: null });

    const handleGpuSelect = (type: "enterprise" | "consumer", index: number) => {
        setSelectedGpus((prev) => ({ ...prev, [type]: index }));
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>GPU Deployment</CardTitle>
                    <CardDescription>Select a GPU instance for your workloads</CardDescription>
                </CardHeader>
                <CardContent>


                    <div>
                        <h3 className="font-semibold text-lg mb-3">Enterprise GPUs</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {gpus.enterprise.map((gpu, i) => (
                                <GpuCard
                                    key={i}
                                    gpu={gpu}
                                    selected={selectedGpus.enterprise === i}
                                    onSelect={() => handleGpuSelect("enterprise", i)}
                                />
                            ))}
                        </div>
                    </div>

                    <Spacer size={5} axis="vertical" />

                    <div>
                        <h3 className="font-semibold text-lg mb-3">Consumer GPUs</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {gpus.consumer.map((gpu, i) => (
                                <GpuCard
                                    key={i}
                                    gpu={gpu}
                                    selected={selectedGpus.consumer === i}
                                    onSelect={() => handleGpuSelect("consumer", i)}
                                />
                            ))}
                        </div>
                    </div>

                </CardContent>
            </Card>

            <Card border>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>You have 3 unread messages.</CardDescription>
                    <CardAction><Button>New</Button></CardAction>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead> Description </TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="h-16">
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell><Badge variant="outline" className="bg-green-100 text-green-800 border-green-500">Paid</Badge></TableCell>
                                <TableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                            <TableRow className="h-16">
                                <TableCell className="font-medium">INV002</TableCell>
                                <TableCell><Badge variant="outline" className="bg-green-100 text-green-800 border-green-500">Paid</Badge></TableCell>
                                <TableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TableCell>
                                <TableCell className="text-right">$150.00</TableCell>
                            </TableRow>
                            <TableRow className="h-16">
                                <TableCell className="font-medium">INV003</TableCell>
                                <TableCell><Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-500">Pending</Badge></TableCell>
                                <TableCell>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</TableCell>
                                <TableCell className="text-right">$2500.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
