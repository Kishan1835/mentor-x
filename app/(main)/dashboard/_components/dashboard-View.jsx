"use client"

import React from 'react'
import {
    LineChart,
    TrendingDown,
    TrendingUp
} from 'lucide-react'
import { format, formatDistanceToNow } from "date-fns"
import { Badge } from '@/components/ui/badge'

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

    const outlookIcon = getMarketOutlookInfo(insights.marketoutlook).icon;
    const outlookColor = getMarketOutlookInfo(insights.marketoutlook).color

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
    </div>


}
