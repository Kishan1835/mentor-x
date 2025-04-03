"use client"

import React from 'react'
import { format, formatDistanceToNow } from "date-fns"
import { Badge } from '@/components/ui/badge'
import {
    LineChart,
    TrendingDown,
    TrendingUp
} from 'lucide-react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { OutdentIcon } from 'lucide-react'


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
    const OutlookColor = getMarketOutlookInfo(insights.marketOutlook).color

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
                    <OutlookIcon className={`h-4 w-4${OutlookColor}`} />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{insights.marketOutlook}
                    </div>
                    <p className='text-xs text-muted-foreground'>Next Update {nextUpdateDistance}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
                    <OutlookIcon className={`h-4 w-4${OutlookColor}`} />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{insights.marketOutlook}
                    </div>
                    <p className='text-xs text-muted-foreground'>Next Update {nextUpdateDistance}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
                    <OutlookIcon className={`h-4 w-4${OutlookColor}`} />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{insights.marketOutlook}
                    </div>
                    <p className='text-xs text-muted-foreground'>Next Update {nextUpdateDistance}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
                    <OutlookIcon className={`h-4 w-4${OutlookColor}`} />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>{insights.marketOutlook}
                    </div>
                    <p className='text-xs text-muted-foreground'>Next Update {nextUpdateDistance}</p>
                </CardContent>
            </Card>

        </div>

    </div>


}
