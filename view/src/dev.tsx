import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Card } from "@/components/ui/card"
import { Spacer } from "@/components/spacer"

function GpuCard() {
    return (
        <Card>
            <div>
                <div className="font-medium">Name</div>
                <div className="text-sm text-muted-foreground">28GB</div>
            </div>
            <Spacer size={5} axis="vertical" />
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground whitespace-nowrap">Max 6x</div>
                <Spacer size={20} axis="horizontal" />
                <div className="text-sm font-semibold whitespace-nowrap">$0.1500/hr</div>
            </div>
        </Card>
    );
}

import { Flex } from "@/components/ui/flex"


export function Dev() {
    return (
        <>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
            </div>

            <Flex variant="around">
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
                <GpuCard />
            </Flex>


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

        </>

    );
}
