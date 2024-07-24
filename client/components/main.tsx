"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { useState, useEffect } from "react"
import axios from 'axios'

export type CaseType = {
    case_id: number
    case_name: string
    estimated_time: number
    module: string
    priority: "High" | "Medium" | "Low"
    status: "Pass" | "Fail" | ""
}

const Main = () => {
    const [cases, setCases] = useState<CaseType[]>([])

    const getData = async () => {
        const { data } = await axios.get('http://127.0.0.1:5000/api/test-case')
        setCases(data.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleStatus = async (status: string, id: Number) => {
        const {data} = await axios.put('http://127.0.0.1:5000/api/test-case/' + id, {status})
        cases.map((item) => {
            if (item.case_id == data.id) {
                item.status = data.status
            }
        })
        setCases(cases)
    }

    return <Table>
        <TableCaption>A list of your recent test cases.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Test Case Name</TableHead>
                <TableHead>Estimated Time</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {cases.map((item) => (
                <TableRow key={item.case_id}>
                    <TableCell>
                        <div className="font-medium capitalize">{item.case_name}</div>
                        <div className="text-stone-500">Test id: {item.case_id}</div>
                    </TableCell>
                    <TableCell>{item.estimated_time} Minutes</TableCell>
                    <TableCell>{item.module}</TableCell>
                    <TableCell>{item.priority}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger className={item.status == null ? "px-2 py-1 border border-1 rounded-sm": "underline px-2 py-1"}>{item.status == null ? 'Select' : item.status}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleStatus("Pass", item.case_id)}>Pass</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatus("Fail", item.case_id)}>Fail</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}

export default Main