import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export function Dev() {
    return (
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
    );
}
