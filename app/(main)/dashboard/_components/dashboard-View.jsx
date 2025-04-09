"use client"

import React from 'react'
import { format, formatDistanceToNow } from "date-fns"
import {
    BriefcaseIcon,
    LineChart,
    TrendingUp,
    TrendingDown,
    Brain,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Rectangle,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Progress } from "@/components/ui/progress";



export const DashboardView = ({ insights }) => {

    const salaryData = (insights.salaryrange || []).map((range) => ({
        name: range.role,
        min: range.min ? range.min / 1000 : 0,
        max: range.max ? range.max / 1000 : 0,
        medium: range.medium ? range.medium / 1000 : 0,
    }))

    const getDemandLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "bg-green-500"
            case "medium":
                return "bg-yellow-500"
            case "low":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    const getMarketOutlookInfo = (outlook) => {
        if (typeof outlook !== 'string') {
            // Handle the case where outlook is not a string
            return { icon: LineChart, color: "text-gray-500" }; // Default case
        }

        switch (outlook.toLowerCase()) { // Now safe to call toLowerCase()
            case "positive":
                return { icon: TrendingUp, color: "text-green-500" }
            case "neutral":
                return { icon: LineChart, color: "text-yellow-500" }
            case "negative":
                return { icon: TrendingDown, color: "text-red-500" }
            default:
                return { icon: LineChart, color: "text-gray-500" }
        }
    }

    const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

    // it will show when it was last updated
    const lastUpdatedDate = insights.lastUpdated ? format(new Date(insights.lastUpdated), "dd/MM/yyyy") : "N/A";

    const nextUpdateDistance = insights.nextUpdate ? formatDistanceToNow(
        new Date(insights.nextUpdate),
        { addSuffix: true }
    ) : "N/A";

    return <div className='space-y-6'>
        <div className='flex justify-between items-center'>
            <Badge variant="outline">Last Updated: {lastUpdatedDate}</Badge>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
                    <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{insights.marketOutlook}
                    </div>
                    <p className='text-xs text-muted-foreground'>Next Update {nextUpdateDistance}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
                    <TrendingUp className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{insights.growthRate.toFixed(1)}%
                    </div>
                    <Progress value={insights.growthRate} className="mt-2" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
                    <BriefcaseIcon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{insights.demandLevel}
                    </div>
                    <div className={`h-2 w-full rounder-full mt-2 
                    ${getDemandLevelColor(
                        insights.demandLevel
                    )}`}></div>

                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
                    <Brain className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='flex flex-wrap gap-1'>
                        {insights.topskills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>


            <Card>
                <CardHeader >
                    <CardTitle >Salary Ranges by role</CardTitle>
                    <CardDescription>
                        Displaying minimum, median, and maximum salaries (in thousands)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='h-[400px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={salaryData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="pv"
                                    fill="#8884d8"
                                    activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

        </div>

    </div>


}
